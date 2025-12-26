import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

function parseOrderId(input: string) {
  const digits = (input || '').replace(/[^\d]/g, '');
  const n = Number(digits);
  return Number.isFinite(n) && n > 0 ? n : null;
}

const admin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession?.();
  const user = session?.user ?? null;

  let orders: any[] = [];
  if (user) {
    const { data } = await locals.supabase
      .from('orders')
      .select(
        `
        id, created_at, total_price,
        status:order_status(id, code, name),
        method:order_method(id, code, name),
        order_details:order_details(
          quantity, price,
          product:products(id, slug, name, price, old_price, images)
        )
      `
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    orders = data ?? [];
  }

  return { user, orders, guestOrder: null };
};

export const actions: Actions = {
  lookup: async ({ request }) => {
    const form = await request.formData();
    const orderCode = String(form.get('order_code') ?? '');
    const contact = String(form.get('contact') ?? '').trim();

    const orderId = parseOrderId(orderCode);

    if (!orderId || !contact) {
      return fail(400, {
        lookupError: 'Vui lòng nhập mã đơn hàng và Email/SĐT.',
      });
    }

    // ✅ Tránh .or(...) bị “special char” khó chịu: thử email trước, không có thì thử phone
    const baseSelect = `
      id, created_at, total_price, full_name, phone, address, email,
      status:order_status(id, code, name),
      method:order_method(id, code, name),
      order_details:order_details(
        quantity, price,
        product:products(id, slug, name, price, old_price, images)
      )
    `;

    // 1) match email
    let { data: orderByEmail, error: errEmail } = await admin
      .from('orders')
      .select(baseSelect)
      .eq('id', orderId)
      .eq('email', contact)
      .maybeSingle();

    // 2) nếu không có -> match phone
    if (!orderByEmail) {
      const { data: orderByPhone, error: errPhone } = await admin
        .from('orders')
        .select(baseSelect)
        .eq('id', orderId)
        .eq('phone', contact)
        .maybeSingle();

      orderByEmail = orderByPhone;
      errEmail = errEmail ?? errPhone;
    }

    if (errEmail) {
      // log để bạn debug trên terminal
      console.error('GUEST LOOKUP ERROR:', errEmail);
      return fail(500, {
        lookupError: 'Có lỗi khi tra cứu. Vui lòng thử lại sau.',
      });
    }

    if (!orderByEmail) {
      return fail(404, {
        lookupError: 'Không tìm thấy đơn hàng hoặc Email/SĐT không khớp.',
      });
    }

    return { guestOrder: orderByEmail, lookupError: null };
  },
};
