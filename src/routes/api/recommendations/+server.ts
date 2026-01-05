import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from './$types';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
  // cookie session cho guest tracking
  const sid = cookies.get('tt_sid') ?? null;

  // userId (Login sẽ có).
  let userId: string | null = null;
  try {
    const sess = await locals.getSession?.();
    userId = sess?.user?.id ?? null;
  } catch {
    userId = null;
  }

  // current product id (URL /api/recommendations?current=123)
  const currentParam = url.searchParams.get('current');
  const currentProductId = currentParam ? Number(currentParam) : null;
  const currentIdValid =
    currentProductId !== null && !Number.isNaN(currentProductId);

  // Không có sid và cũng không có user => không thể cá nhân hoá
  if (!userId && !sid)
    return json({
      ok: true,
      forYou: [],
      debug: { reason: 'no-user-no-session' },
    });

  // 1) Lấy recent view theo user_id (ưu tiên) hoặc session_id
  // ---------------------------------------------------------
  let evQuery = supabase
    .from('user_events')
    .select('product_id, created_at')
    .eq('event_type', 'view_product')
    .not('product_id', 'is', null)
    .order('created_at', { ascending: false })
    .limit(5);

  if (userId) evQuery = evQuery.eq('user_id', userId);
  else evQuery = evQuery.eq('session_id', sid);

  const { data: recentViews, error: evErr } = await evQuery;
  if (evErr) return json({ ok: false, error: evErr.message }, { status: 500 });

  // product_id có thể là bigint => ép Number
  const recentIds = Array.from(
    new Set(
      (recentViews ?? [])
        .map((x) => x.product_id)
        .filter((v) => v !== null && v !== undefined)
    )
  )
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id))
    .filter((id) => (currentIdValid ? id !== currentProductId : true));

  if (recentIds.length === 0) {
    return json({
      ok: true,
      forYou: [],
      debug: { userId, sid, recentIds, reason: 'no-recent-views' },
    });
  }

  // // 2) Lấy type/brand của những sản phẩm đã xem
  const { data: recentProducts, error: rpErr } = await supabase
    .from('products')
    .select('id,type,brand')
    .in('id', recentIds)
    .eq('active', true);

  if (rpErr) return json({ ok: false, error: rpErr.message }, { status: 500 });

  const types = Array.from(
    new Set((recentProducts ?? []).map((p) => p.type).filter(Boolean))
  );
  const brands = Array.from(
    new Set((recentProducts ?? []).map((p) => p.brand).filter(Boolean))
  );

  // loại trừ: sản phẩm đã xem + sản phẩm đang xem
  const excludeIds = Array.from(
    new Set([
      ...(recentIds ?? []),
      ...(currentIdValid ? [currentProductId!] : []),
    ])
  );

  //BIGINT => NOT IN (1,2,3) KHÔNG QUOTE
  const excludeSqlList =
    excludeIds.length > 0 ? `(${excludeIds.join(',')})` : null;

  // 3) Ưu tiên: Gợi ý theo TYPE trước
  let forYou: any[] = [];

  // ưu tiên cùng type
  if (types.length > 0) {
    let q = supabase
      .from('products')
      .select('id,slug,name,price,old_price,images,brand,type') //thêm slug để UI href
      .in('type', types)
      .eq('active', true)
      .limit(8);

    if (excludeSqlList) q = q.not('id', 'in', excludeSqlList);

    const { data, error } = await q;
    if (error)
      return json({ ok: false, error: error.message }, { status: 500 });

    forYou = data ?? [];
  }

  // 4) Nếu chưa đủ => bổ sung theo BRAND
  if (forYou.length < 8 && brands.length > 0) {
    let q = supabase
      .from('products')
      .select('id,slug,name,price,old_price,images,brand,type')
      .in('brand', brands)
      .eq('active', true)
      .limit(8);

    if (excludeSqlList) q = q.not('id', 'in', excludeSqlList);

    const { data, error } = await q;
    if (error)
      return json({ ok: false, error: error.message }, { status: 500 });

    // merge unique
    const map = new Map<number, any>();
    for (const p of forYou) map.set(p.id, p);
    for (const p of data ?? []) map.set(p.id, p);
    forYou = Array.from(map.values()).slice(0, 8);
  }

  return json({
    ok: true,
    debug: {
      userId,
      sid,
      recentIds,
      excludeIds,
      types,
      brands,
      used: userId ? 'user_id' : 'session_id',
    },
    forYou,
  });
};
