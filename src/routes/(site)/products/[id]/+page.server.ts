// BƯỚC 5.1 — +page.server.ts để lấy dữ liệu gợi ý
import type { PageServerLoad } from './$types';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export const load: PageServerLoad = async ({ params }) => {
  const productId = Number(params.id);

  const { data: product, error: productErr } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  const { data: similarRows } = await supabase
    .from('similar_products_copurchase')
    .select('similar_product_id, weight')
    .eq('product_id', productId)
    .order('weight', { ascending: false })
    .limit(8);

  const similarIds = (similarRows ?? []).map((r) => r.similar_product_id);

  let similarProducts: any[] = [];
  if (similarIds.length > 0) {
    const { data } = await supabase
      .from('products')
      .select('id,name,slug,price,images')
      .in('id', similarIds)
      .eq('active', true);

    const map = new Map((data ?? []).map((p) => [p.id, p]));
    similarProducts = similarIds.map((id) => map.get(id)).filter(Boolean);
  }

  let trendingProducts: any[] = [];
  if (similarProducts.length < 4) {
    const { data: trendingRows } = await supabase
      .from('trending_products')
      .select('product_id, score_30d')
      .order('score_30d', { ascending: false })
      .limit(12);

    const trendingIds = (trendingRows ?? [])
      .map((r) => r.product_id)
      .filter((id) => id !== productId);

    if (trendingIds.length > 0) {
      const { data } = await supabase
        .from('products')
        .select('id,name,slug,price,images')
        .in('id', trendingIds)
        .eq('active', true)
        .limit(8);

      trendingProducts = data ?? [];
    }
  }

  return {
    product: product ?? null,
    productError: productErr?.message ?? null,
    similarProducts,
    trendingProducts
  };
};
