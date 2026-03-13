import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
  const q = (url.searchParams.get('q') ?? '').trim();
  if (!q || q.length < 2) {
    return json({ ok: true, items: [] });
  }

  const supabase = locals.supabase;
  const safeQ = q.replace(/[%_]/g, '');
  const pattern = `%${safeQ}%`;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('id,slug,name,brand,type,price,old_price,images')
      .eq('active', true)
      .or(
        `name.ilike.${pattern},slug.ilike.${pattern},brand.ilike.${pattern},description.ilike.${pattern}`
      )
      .order('price', { ascending: true })
      .limit(5);

    if (error) {
      return json({ ok: false, items: [], error: error.message });
    }

    const items = (data ?? []).map((p: any) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand ?? '',
      type: p.type ?? '',
      price: Number(p.price ?? 0),
      old_price: p.old_price ? Number(p.old_price) : null,
      image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null,
    }));

    return json({ ok: true, items });
  } catch (e: any) {
    return json({ ok: false, items: [], error: e?.message ?? 'Unknown' });
  }
};
