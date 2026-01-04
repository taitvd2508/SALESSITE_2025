import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from './$types';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export const GET: RequestHandler = async ({ cookies, url }) => {
  const sid = cookies.get('tt_sid');
  if (!sid) return json({ ok: true, forYou: [] });

  //BIGINT => parse number
  const currentParam = url.searchParams.get('current');
  const currentProductId = currentParam ? Number(currentParam) : null;
  const currentIdValid = currentProductId !== null && !Number.isNaN(currentProductId);

  const { data: recentViews, error: evErr } = await supabase
    .from('user_events')
    .select('product_id, created_at')
    .eq('session_id', sid)
    .eq('event_type', 'view_product')
    .not('product_id', 'is', null)
    .order('created_at', { ascending: false })
    .limit(5);

  if (evErr) return json({ ok: false, error: evErr.message }, { status: 500 });

  const recentIds = Array.from(
    new Set((recentViews ?? []).map((x) => x.product_id).filter((v) => v !== null && v !== undefined))
  )
    .map((id) => Number(id))
    .filter((id) => !Number.isNaN(id))
    .filter((id) => (currentIdValid ? id !== currentProductId : true));

  if (recentIds.length === 0) return json({ ok: true, forYou: [] });

  const { data: recentProducts, error: rpErr } = await supabase
    .from('products')
    .select('id,type,brand')
    .in('id', recentIds)
    .eq('active', true);

  if (rpErr) return json({ ok: false, error: rpErr.message }, { status: 500 });

  const types = Array.from(new Set((recentProducts ?? []).map((p) => p.type).filter(Boolean)));
  const brands = Array.from(new Set((recentProducts ?? []).map((p) => p.brand).filter(Boolean)));

  const excludeIds = Array.from(
    new Set([...(recentIds ?? []), ...(currentIdValid ? [currentProductId!] : [])])
  );

  //BIGINT => NOT IN (1,2,3) KHÔNG QUOTE
  const excludeSqlList = excludeIds.length > 0 ? `(${excludeIds.join(',')})` : null;

  let forYou: any[] = [];

  //ưu tiên cùng type
  if (types.length > 0) {
    let q = supabase
      .from('products')
      .select('id,slug,name,price,old_price,images,brand,type') //thêm slug để UI href
      .in('type', types)
      .eq('active', true)
      .limit(8);

    if (excludeSqlList) q = q.not('id', 'in', excludeSqlList);

    const { data, error } = await q;
    if (error) return json({ ok: false, error: error.message }, { status: 500 });
    forYou = data ?? [];
  }

  //thiếu thì bổ sung cùng brand
  if (forYou.length < 8 && brands.length > 0) {
    let q = supabase
      .from('products')
      .select('id,slug,name,price,old_price,images,brand,type') //thêm slug để UI href
      .in('brand', brands)
      .eq('active', true)
      .limit(8);

    if (excludeSqlList) q = q.not('id', 'in', excludeSqlList);

    const { data, error } = await q;
    if (error) return json({ ok: false, error: error.message }, { status: 500 });

    const map = new Map<number, any>();
    for (const p of forYou) map.set(p.id, p);
    for (const p of data ?? []) map.set(p.id, p);
    forYou = Array.from(map.values()).slice(0, 8);
  }

  return json({ ok: true, debug: { types, brands, recentIds, excludeIds }, forYou });
};
