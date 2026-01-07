import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from './$types';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function num(v: any): number | null {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function uniqNums(arr: number[]) {
  return Array.from(new Set(arr)).filter((x) => Number.isFinite(x));
}

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
  const sid = cookies.get('tt_sid') ?? null;

  let userId: string | null = null;
  try {
    const sess = await locals.getSession?.();
    userId = sess?.user?.id ?? null;
  } catch {
    userId = null;
  }

  // optional current (product detail)
  const currentParam = url.searchParams.get('current');
  const currentProductId = currentParam ? Number(currentParam) : null;
  const hasCurrent =
    currentProductId !== null && Number.isFinite(currentProductId);

  if (!userId && !sid && !hasCurrent) {
    // homepage mà không có session/user thì không cá nhân hoá được
    return json({
      ok: true,
      forYou: [],
      debug: { reason: 'no-user-no-session' },
    });
  }

  // 0) build exclude list
  const excludeIds: number[] = [];
  if (hasCurrent) excludeIds.push(currentProductId!);

  // 1) recent views (để làm anchor cho homepage / fallback)
  let recentIds: number[] = [];
  if (userId || sid) {
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
    if (evErr)
      return json({ ok: false, error: evErr.message }, { status: 500 });

    recentIds = uniqNums(
      (recentViews ?? [])
        .map((x) => Number(x.product_id))
        .filter((id) => Number.isFinite(id))
        .filter((id) => (hasCurrent ? id !== currentProductId : true))
    );

    excludeIds.push(...recentIds);
  }

  const excludeUniq = uniqNums(excludeIds);
  const excludeSqlList = excludeUniq.length
    ? `(${excludeUniq.join(',')})`
    : null;

  // helper: map products by ids (giữ order theo ids input)
  async function fetchProductsByIds(ids: number[]) {
    const clean = uniqNums(ids);
    if (!clean.length) return [];

    let q = supabase
      .from('products')
      .select('id,slug,name,price,old_price,images,brand,type')
      .in('id', clean)
      .eq('active', true);

    const { data, error } = await q;
    if (error) throw new Error(error.message);

    const map = new Map<number, any>();
    for (const p of data ?? []) map.set(Number(p.id), p);

    // giữ nguyên thứ tự ids (weight/trending order)
    return clean.map((id) => map.get(id)).filter(Boolean);
  }

  // 2) PRIORITY A: nếu có current => ưu tiên mua kèm theo similar_products_copurchase
  let picked: any[] = [];

  if (hasCurrent) {
    const { data: simRows, error: simErr } = await supabase
      .from('similar_products_copurchase')
      .select('similar_product_id, weight')
      .eq('product_id', currentProductId)
      .order('weight', { ascending: false })
      .limit(12);

    if (simErr)
      return json({ ok: false, error: simErr.message }, { status: 500 });

    const simIds = uniqNums(
      (simRows ?? [])
        .map((r: any) => Number(r.similar_product_id))
        .filter((id) => Number.isFinite(id))
        .filter((id) => !excludeUniq.includes(id))
    );

    try {
      const simProducts = await fetchProductsByIds(simIds);
      picked.push(...simProducts);
    } catch (e: any) {
      return json(
        { ok: false, error: String(e?.message ?? e) },
        { status: 500 }
      );
    }
  }

  // 3) PRIORITY B: score theo type/brand/price dựa trên anchor (sản phẩm xem gần nhất hoặc current)
  // anchor = current nếu có, else = recentIds[0]
  const anchorId = hasCurrent ? currentProductId! : recentIds[0];

  if (picked.length < 8 && anchorId) {
    const { data: anchor, error: aErr } = await supabase
      .from('products')
      .select('id,type,brand,price')
      .eq('id', anchorId)
      .eq('active', true)
      .maybeSingle();

    if (aErr) return json({ ok: false, error: aErr.message }, { status: 500 });

    const anchorType = anchor?.type ?? null;
    const anchorBrand = anchor?.brand ?? null;
    const anchorPrice = num(anchor?.price);

    // lấy candidate rộng hơn 1 chút: cùng type OR cùng brand
    // (Supabase filter OR: dùng .or)
    let cand = supabase
      .from('products')
      .select('id,slug,name,price,old_price,images,brand,type')
      .eq('active', true)
      .limit(80);

    const orParts: string[] = [];
    if (anchorType) orParts.push(`type.eq.${anchorType}`);
    if (anchorBrand) orParts.push(`brand.eq.${anchorBrand}`);
    if (orParts.length) cand = cand.or(orParts.join(','));

    if (excludeSqlList) cand = cand.not('id', 'in', excludeSqlList);

    // order ổn định để đỡ cảm giác “nhảy”
    cand = cand.order('id', { ascending: false });

    const { data: candidates, error: cErr } = await cand;
    if (cErr) return json({ ok: false, error: cErr.message }, { status: 500 });

    const exist = new Set(picked.map((x) => Number(x.id)));

    const scored = (candidates ?? [])
      .filter((p) => !exist.has(Number(p.id)))
      .map((p) => {
        let score = 0;
        if (anchorType && p.type === anchorType) score += 2;
        if (anchorBrand && p.brand === anchorBrand) score += 1;

        const pPrice = num(p.price);
        if (anchorPrice !== null && pPrice !== null) {
          if (pPrice >= anchorPrice * 0.8 && pPrice <= anchorPrice * 1.2)
            score += 1;
        }

        return { ...p, _score: score };
      })
      .filter((p) => (p._score ?? 0) > 0)
      .sort(
        (a, b) =>
          (b._score ?? 0) - (a._score ?? 0) || Number(b.id) - Number(a.id)
      )
      .slice(0, 8 - picked.length)
      .map(({ _score, ...rest }) => rest);

    picked.push(...scored);
  }

  // 4) PRIORITY C: fill bằng trending_products (đúng schema product_id + score_30d)
  if (picked.length < 8) {
    let tq = supabase
      .from('trending_products')
      .select('product_id, score_30d')
      .order('score_30d', { ascending: false })
      .limit(30);

    // loại trừ những cái exclude (recent/current) + đã picked
    // trending_products không có id mà có product_id
    const pickedIds = new Set(picked.map((x) => Number(x.id)));
    const allExclude = new Set([...excludeUniq, ...pickedIds]);

    const { data: trendRows, error: tErr } = await tq;
    if (tErr) return json({ ok: false, error: tErr.message }, { status: 500 });

    const trendIds = uniqNums(
      (trendRows ?? [])
        .map((r: any) => Number(r.product_id))
        .filter((id) => Number.isFinite(id))
        .filter((id) => !allExclude.has(id))
    ).slice(0, 12);

    try {
      const trendProducts = await fetchProductsByIds(trendIds);
      picked.push(...trendProducts);
    } catch (e: any) {
      return json(
        { ok: false, error: String(e?.message ?? e) },
        { status: 500 }
      );
    }
  }

  const forYou = picked.slice(0, 8);

  return json({
    ok: true,
    forYou,
    debug: {
      used: userId ? 'user_id' : sid ? 'session_id' : 'current-only',
      userId,
      sid,
      currentProductId: hasCurrent ? currentProductId : null,
      recentIds,
      anchorId,
      excludeIds: excludeUniq,
      scoring: { type: 2, brand: 1, priceWithin20Percent: 1 },
      pickedCount: forYou.length,
      pipeline: hasCurrent
        ? ['copurchase', 'score(type/brand/price)', 'trending_fill']
        : ['score(type/brand/price)', 'trending_fill'],
    },
  });
};
