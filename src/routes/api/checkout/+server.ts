// API tạo đơn hàng
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
  price: number;
};

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
  const sid = cookies.get('tt_sid');
  if (!sid) return json({ ok: false, error: 'Missing session cookie' }, { status: 400 });

  const body = await request.json().catch(() => null);
  if (!body) return json({ ok: false, error: 'Invalid JSON' }, { status: 400 });

  const {
    full_name,
    phone,
    email,
    address,
    note,
    payment_method,
    items
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
    return json({ ok: false, error: 'Thiếu thông tin giao hàng' }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return json({ ok: false, error: 'Giỏ hàng trống' }, { status: 400 });
  }
  if (!['cod', 'bank', 'wallet'].includes(payment_method)) {
    return json({ ok: false, error: 'Phương thức thanh toán không hợp lệ' }, { status: 400 });
  }

  // lấy user hiện tại (nếu đã login)
  let user_id: string | null = null;
  try {
    const { data } = await locals.supabase.auth.getUser();
    user_id = data.user?.id ?? null;
  } catch {
    user_id = null;
  }

  // ---- 1) Tính total (tin dữ liệu giá từ client là KHÔNG an toàn)
  // Lấy price từ DB theo product_id
  const ids = items.map((x) => x.product_id);
  const { data: dbProducts, error: prodErr } = await admin
    .from('products')
    .select('id, price, active, quantity')
    .in('id', ids);

  if (prodErr) return json({ ok: false, error: prodErr.message }, { status: 500 });

  const priceMap = new Map<number, any>((dbProducts ?? []).map((p) => [Number(p.id), p]));

  let total_price = 0;
  for (const it of items) {
    const p = priceMap.get(it.product_id);
    if (!p || !p.active) return json({ ok: false, error: 'Có sản phẩm không hợp lệ' }, { status: 400 });
    if (it.quantity < 1) return json({ ok: false, error: 'Số lượng không hợp lệ' }, { status: 400 });
    // (tuỳ bạn) check tồn kho:
    // if (p.quantity < it.quantity) return json({ ok:false, error:'Không đủ tồn kho' }, { status:400 });

    total_price += Number(p.price) * it.quantity;
  }

  // ---- 2) method_id
  const { data: methodRow } = await admin
    .from('order_method')
    .select('id, code')
    .eq('code', payment_method)
    .maybeSingle();

  const method_id = methodRow?.id ?? 1; // fallback nếu bảng bạn không có code/seed khác

  // ---- 3) status_id (pending)
  const { data: statusRow } = await admin
    .from('order_status')
    .select('id, code')
    .eq('code', 'pending')
    .maybeSingle();

  const status_id = statusRow?.id ?? 1;

  // ---- 4) Tạo order
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
      total_price
    })
    .select('id')
    .single();

  if (orderErr) return json({ ok: false, error: orderErr.message }, { status: 500 });

  // ---- 5) Insert order_details
  const details = items.map((it) => {
    const p = priceMap.get(it.product_id);
    return {
      order_id: order.id,
      product_id: it.product_id,
      quantity: it.quantity,
      price: Number(p.price)
    };
  });

  const { error: detErr } = await admin.from('order_details').insert(details);
  if (detErr) return json({ ok: false, error: detErr.message }, { status: 500 });

  // ---- 6) Ghi purchase events (để trending + copurchase chạy thật)
  const purchaseEvents = items.map((it) => ({
    session_id: sid,
    event_type: 'purchase',
    product_id: it.product_id,
    order_id: order.id,
    quantity: it.quantity,
    meta: { payment_method }
  }));

  const { error: evErr } = await admin.from('user_events').insert(purchaseEvents);
  if (evErr) return json({ ok: false, error: evErr.message }, { status: 500 });

  // ---- 7) Tạo account guest bằng invite (redirect đúng domain hiện tại)
  if (!user_id) {
    const redirectTo = `${new URL(request.url).origin}/auth/callback`;

    // Nếu email đã tồn tại, invite có thể fail -> bỏ qua không chặn checkout
    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
        redirectTo,
        data: { full_name, role: 'customer' }
    });

    // nếu user đã tồn tại / đã invite trước đó, invErr có thể xảy ra
    // checkout vẫn OK, nhưng ta vẫn cố gắng update profile nếu tìm được user
    if (invErr) console.log('invite error:', invErr.message);

    // lấy uid
    const uid = inv?.user?.id ?? null;

    let targetUserId = uid;

    // nếu không có uid (tuỳ SDK), fallback tìm theo email
    if (!targetUserId) {
      const { data: usersRes, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (!listErr) {
        const u = usersRes.users.find((x) => (x.email ?? '').toLowerCase() === email.toLowerCase());
        targetUserId = u?.id ?? null;
      }
    }

    if (targetUserId) {
      await admin
        .from('profiles')
        .update({ full_name, phone, address, email })
        .eq('id', targetUserId);
    }
  }
  return json({ ok: true, order_id: order.id });
};