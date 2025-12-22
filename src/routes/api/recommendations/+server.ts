import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from './$types';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export const GET: RequestHandler = async ({ cookies, url }) => {
  const sid = cookies.get('tt_sid');
  if (!sid) return json({ ok: true, forYou: [] });

  const currentProductId = Number(url.searchParams.get('current')) || null;

  // debug nhanh (nếu muốn): return json({ ok:true, sid })
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
    new Set((recentViews ?? []).map((x) => x.product_id).filter(Boolean))
  ).filter((id) => id !== currentProductId);

  if (recentIds.length === 0) return json({ ok: true, forYou: [] });

  const { data: recentProducts, error: rpErr } = await supabase
    .from('products')
    .select('id,type,brand')
    .in('id', recentIds)
    .eq('active', true);

  if (rpErr) return json({ ok: false, error: rpErr.message }, { status: 500 });

  const types = Array.from(new Set((recentProducts ?? []).map((p) => p.type)));
  const brands = Array.from(new Set((recentProducts ?? []).map((p) => p.brand)));

  const excludeIds = [...new Set([...(recentIds ?? []), ...(currentProductId ? [currentProductId] : [])])];

  let forYou: any[] = [];

  if (types.length > 0) {
    const { data } = await supabase
      .from('products')
      .select('id,name,price,images')
      .in('type', types)
      .eq('active', true)
      .not('id', 'in', `(${excludeIds.join(',')})`)
      .limit(8);

    forYou = data ?? [];
  }

  if (forYou.length < 8 && brands.length > 0) {
    const { data } = await supabase
      .from('products')
      .select('id,name,price,images')
      .in('brand', brands)
      .eq('active', true)
      .not('id', 'in', `(${excludeIds.join(',')})`)
      .limit(8);

    const map = new Map<number, any>();
    for (const p of forYou) map.set(p.id, p);
    for (const p of data ?? []) map.set(p.id, p);
    forYou = Array.from(map.values()).slice(0, 8);
  }

  return json({ ok: true, debug: { types, brands, recentIds }, forYou });
};