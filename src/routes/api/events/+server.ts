import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(event: RequestEvent) {
  const { request, cookies } = event;

  const sid = cookies.get('tt_sid');
  if (!sid) {
    return json({ ok: false, error: 'Missing session_id cookie' }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const { event_type, product_id, order_id, quantity, meta } = body;

  const allowed = new Set(['view_product', 'add_to_cart', 'purchase']);
  if (!allowed.has(event_type)) {
    return json({ ok: false, error: 'Invalid event_type' }, { status: 400 });
  }

  const { error } = await supabase.from('user_events').insert({
    session_id: sid,
    event_type,
    product_id: product_id ?? null,
    order_id: order_id ?? null,
    quantity: quantity ?? null,
    meta: meta ?? {}
  });

  if (error) {
    return json({ ok: false, error: error.message }, { status: 500 });
  }

  return json({ ok: true });
}

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