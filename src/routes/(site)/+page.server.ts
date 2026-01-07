import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch }) => {
  // 1) Trending: lấy từ view trending_products (đã dùng ở trang product/slug)
  let trendingProducts: any[] = [];
  try {
    const { data, error } = await locals.supabase
      .from('trending_products')
      .select('*')
      .order('score_30d', { ascending: false })
      .limit(8);

    if (!error && data) trendingProducts = data as any[];
  } catch {}

  // 2) ForYou: gọi lại API recommendations (dựa trên cookies/session)
  let forYou: any[] = [];
  try {
    const res = await fetch('/api/recommendations');
    const js = await res.json();
    if (js?.ok) forYou = js.forYou ?? [];
  } catch {}

  return {
    trendingProducts,
    forYou,
  };
};
