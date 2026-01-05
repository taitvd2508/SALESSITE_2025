import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
  const sid = cookies.get('tt_sid');
  if (!sid)
    return json({ ok: false, error: 'Missing tt_sid cookie' }, { status: 400 });

  const body = await request.json().catch(() => null);
  if (!body) return json({ ok: false, error: 'Invalid JSON' }, { status: 400 });

  const { event_type, product_id, order_id, quantity, meta } = body;

  const allowed = new Set(['view_product', 'add_to_cart', 'purchase']);
  if (!allowed.has(event_type)) {
    return json({ ok: false, error: 'Invalid event_type' }, { status: 400 });
  }

  // Lấy user đăng nhập (nếu có)
  const { user } = await locals.getSession(); // user có thể null

  // Dùng locals.supabase để request mang auth context
  const { error } = await locals.supabase.from('user_events').insert({
    session_id: sid,
    user_id: user?.id ?? null,
    event_type,
    product_id: product_id ?? null,
    order_id: order_id ?? null,
    quantity: quantity ?? null,
    meta: meta ?? {},
  });

  if (error) return json({ ok: false, error: error.message }, { status: 500 });

  return json({ ok: true, user_id: user?.id ?? null });
};

/* 
Bước 3 = tạo 1 API nội bộ /api/events để ghi “hành vi người dùng” vào bảng user_events.
Cụ thể:

- Mỗi lần user xem sản phẩm / thêm giỏ / mua hàng → frontend gọi /api/events

- API sẽ:

    +lấy session_id từ cookie tt_sid (guest cũng có)

    +insert 1 dòng vào user_events (event_type, product_id, …)
- Đây là “dữ liệu đầu vào” để hệ gợi ý hoạt động:
    + trending_products cần event để tính điểm phổ biến
    + sau này “gợi ý cho bạn” dựa vào lịch sử view/add_to_cart của session/user
*/
