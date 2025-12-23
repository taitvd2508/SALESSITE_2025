// BƯỚC 5.1 — +page.server.ts để lấy dữ liệu gợi ý
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const supabase = locals.supabase; // dùng client từ hooks
  const slug = params.slug;

  // 1) Product by slug
  const { data: product, error: productErr } = await supabase
    .from('products')
    .select('id,slug,name,brand,type,price,old_price,quantity,description,images,active,created_at')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (productErr || !product) {
    return {
      product: null,
      productError: productErr?.message ?? 'Không tìm thấy sản phẩm',
      similarProducts: [],
      trendingProducts: []
    };
  }

  const productId = product.id; // UUID string

  // 2) Similar (copurchase view)
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
      .select('id,name,slug,price,old_price,images,brand,type')
      .in('id', similarIds)
      .eq('active', true);

    // giữ đúng thứ tự theo weight
    const map = new Map((data ?? []).map((p) => [p.id, p]));
    similarProducts = similarIds.map((id) => map.get(id)).filter(Boolean);
  }

  // 3) Trending (fallback / thêm block)
  let trendingProducts: any[] = [];
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
      .select('id,name,slug,price,old_price,images,brand,type')
      .in('id', trendingIds)
      .eq('active', true);

    // ✅ Giữ đúng thứ tự theo score_30d (theo trendingIds)
    const map = new Map((data ?? []).map((p) => [p.id, p]));
    trendingProducts = trendingIds.map((id) => map.get(id)).filter(Boolean).slice(0, 8); // lấy 8
  }

  return {
    product,
    productError: null,
    similarProducts,
    trendingProducts
  };
};
