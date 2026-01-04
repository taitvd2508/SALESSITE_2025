import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, locals }) => {
  const q = (url.searchParams.get('q') ?? '').trim();
  const type = url.searchParams.get('type') ?? '';
  const brand = url.searchParams.get('brand') ?? '';
  const status = url.searchParams.get('status') ?? ''; //active|inactive

  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
  const pageSize = 12;

  let query = locals.supabase
    .from('products')
    .select(
      'id, slug, name, brand, type, price, old_price, quantity, images, active, created_at',
      { count: 'exact' }
    );

  if (q) query = query.ilike('name', `%${q}%`);
  if (type) query = query.eq('type', type);
  if (brand) query = query.eq('brand', brand);
  if (status === 'active') query = query.eq('active', true);
  if (status === 'inactive') query = query.eq('active', false);

  query = query.order('created_at', { ascending: false });

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: products, count, error } = await query.range(from, to);
  if (error) throw new Error(error.message);

  //facets
  const { data: typesData } = await locals.supabase
    .from('products')
    .select('type');
  const { data: brandsData } = await locals.supabase
    .from('products')
    .select('brand');

  const types = Array.from(
    new Set((typesData ?? []).map((x) => x.type).filter(Boolean))
  ).sort();
  const brands = Array.from(
    new Set((brandsData ?? []).map((x) => x.brand).filter(Boolean))
  ).sort();

  return {
    products: products ?? [],
    total: count ?? 0,
    page,
    pageSize,
    filters: { q, type, brand, status },
    facets: { types, brands },
  };
};

export const actions: Actions = {
  toggleActive: async ({ request, locals }) => {
    const fd = await request.formData();
    const id = Number(fd.get('id'));
    const active = String(fd.get('active')) === 'true';

    if (!Number.isFinite(id)) return fail(400, { message: 'Invalid id' });

    const { error } = await locals.supabase
      .from('products')
      .update({ active })
      .eq('id', id);

    if (error) return fail(500, { message: error.message });

    return { ok: true };
  },
};
