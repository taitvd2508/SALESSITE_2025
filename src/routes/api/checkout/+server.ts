import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

const admin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type PaymentCode = 'cod' | 'bank' | 'wallet';

type CheckoutItem = {
  product_id: number;
  quantity: number;
  price?: number; // client gửi cho vui, server không tin
};

export const POST: RequestHandler = async (event) => {
  const { request, cookies, locals } = event;

  const sid = cookies.get('tt_sid');
  if (!sid)
    return json(
      { ok: false, error: 'Missing session cookie' },
      { status: 400 }
    );

  const body = await request.json().catch(() => null);
  if (!body) return json({ ok: false, error: 'Invalid JSON' }, { status: 400 });

  const {
    full_name,
    phone,
    email,
    address,
    note,
    payment_method,
    items,
  }: {
    full_name: string;
    phone: string;
    email: string;
    address: string;
    note?: string;
    payment_method: PaymentCode;
    items: CheckoutItem[];
  } = body;

  if (!full_name || !phone || !email || !address) {
    return json(
      { ok: false, error: 'Thiếu thông tin giao hàng' },
      { status: 400 }
    );
  }
  if (!Array.isArray(items) || items.length === 0) {
    return json({ ok: false, error: 'Giỏ hàng trống' }, { status: 400 });
  }
  if (!['cod', 'bank', 'wallet'].includes(payment_method)) {
    return json(
      { ok: false, error: 'Phương thức thanh toán không hợp lệ' },
      { status: 400 }
    );
  }

  // lấy user hiện tại (nếu đã login)
  let user_id: string | null = null;
  try {
    const { data } = await locals.supabase.auth.getUser();
    user_id = data.user?.id ?? null;
  } catch {
    user_id = null;
  }

  // 1) Tính tổng tiền dựa trên DB
  const ids = items.map((x) => x.product_id);
  const { data: dbProducts, error: prodErr } = await admin
    .from('products')
    .select('id, price, active, quantity')
    .in('id', ids);

  if (prodErr)
    return json({ ok: false, error: prodErr.message }, { status: 500 });

  const priceMap = new Map<number, any>(
    (dbProducts ?? []).map((p) => [Number(p.id), p])
  );

  let total_price = 0;
  for (const it of items) {
    const p = priceMap.get(it.product_id);
    if (!p || !p.active)
      return json(
        { ok: false, error: 'Có sản phẩm không hợp lệ' },
        { status: 400 }
      );
    if (it.quantity < 1)
      return json(
        { ok: false, error: 'Số lượng không hợp lệ' },
        { status: 400 }
      );

    total_price += Number(p.price) * it.quantity;
  }

  // 2) method_id theo code
  const { data: methodRow, error: methodErr } = await admin
    .from('order_method')
    .select('id')
    .eq('code', payment_method)
    .single();

  if (methodErr)
    return json({ ok: false, error: methodErr.message }, { status: 500 });
  const method_id = methodRow.id;

  // 3) status_id pending
  const { data: statusRow, error: statusErr } = await admin
    .from('order_status')
    .select('id')
    .eq('code', 'pending')
    .single();

  if (statusErr)
    return json({ ok: false, error: statusErr.message }, { status: 500 });
  const status_id = statusRow.id;

  // 4) tạo order
  const { data: order, error: orderErr } = await admin
    .from('orders')
    .insert({
      user_id,
      full_name,
      phone,
      email,
      address,
      note: note ?? null,
      status_id,
      method_id,
      total_price,
    })
    .select('id')
    .single();

  if (orderErr)
    return json({ ok: false, error: orderErr.message }, { status: 500 });

  // 5) order_details + rollback nếu lỗi
  const details = items.map((it) => {
    const p = priceMap.get(it.product_id);
    return {
      order_id: order.id,
      product_id: it.product_id,
      quantity: it.quantity,
      price: Number(p.price),
    };
  });

  const { error: detErr } = await admin.from('order_details').insert(details);
  if (detErr) {
    await admin.from('orders').delete().eq('id', order.id);
    return json({ ok: false, error: detErr.message }, { status: 500 });
  }

  // 6) purchase events + rollback nếu lỗi
  const purchaseEvents = items.map((it) => ({
    session_id: sid,
    event_type: 'purchase',
    product_id: it.product_id,
    order_id: order.id,
    quantity: it.quantity,
    meta: { payment_method },
  }));

  const { error: evErr } = await admin
    .from('user_events')
    .insert(purchaseEvents);
  if (evErr) {
    await admin.from('order_details').delete().eq('order_id', order.id);
    await admin.from('orders').delete().eq('id', order.id);
    return json({ ok: false, error: evErr.message }, { status: 500 });
  }

  // 7) Guest: tạo user + update profile (không phụ thuộc email gửi được)
  if (!user_id) {
    const redirectTo = `${event.url.origin}/auth/callback`;

    try {
      // A) tìm user theo email trước (đỡ tạo trùng)
      let targetUserId: string | null = null;

      const { data: usersRes, error: listErr } =
        await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (!listErr) {
        const u = usersRes.users.find(
          (x) => (x.email ?? '').toLowerCase() === email.toLowerCase()
        );
        targetUserId = u?.id ?? null;
      }

      // B) nếu chưa có user: thử invite (gửi mail)
      if (!targetUserId) {
        const { data: inv, error: invErr } =
          await admin.auth.admin.inviteUserByEmail(email, {
            redirectTo,
            data: { full_name, role: 'customer' },
          });

        if (invErr) {
          console.log('INVITE ERROR message:', invErr.message);
          console.log('INVITE ERROR name:', (invErr as any).name);
          console.log('INVITE ERROR status:', (invErr as any).status);
          console.log('INVITE ERROR full:', JSON.stringify(invErr, null, 2));

          // C) fallback: createUser để chắc chắn có auth.users => trigger tạo profiles/user_roles
          const { data: created, error: createErr } =
            await admin.auth.admin.createUser({
              email,
              email_confirm: true,
              user_metadata: { full_name, role: 'customer' },
            });

          if (createErr) {
            console.log('createUser error:', createErr.message);
          } else {
            targetUserId = created.user?.id ?? null;
          }
        } else {
          targetUserId = inv.user?.id ?? null;
        }
      }

      // D) update profile từ dữ liệu checkout (nếu bạn đã thêm profiles.email thì càng chuẩn)
      if (targetUserId) {
        const { error: upErr } = await admin
          .from('profiles')
          .update({ full_name, phone, address, email })
          .eq('id', targetUserId);

        if (upErr) console.log('update profile error:', upErr.message);
      }
    } catch (e) {
      console.log('guest account flow error:', e);
      // không chặn checkout
    }
  }

  return json({ ok: true, order_id: order.id });
};
