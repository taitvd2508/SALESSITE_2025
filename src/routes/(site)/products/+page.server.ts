import type { PageServerLoad } from './$types';

type SortKey = 'newest' | 'price_asc' | 'price_desc';

export const load: PageServerLoad = async ({ url, locals }) => {
	const q = (url.searchParams.get('q') ?? '').trim();
	const type = url.searchParams.get('type') ?? '';
	const brand = url.searchParams.get('brand') ?? '';
	//const sort = (url.searchParams.get('sort') ?? 'newest') as SortKey;
	const sortRaw = url.searchParams.get('sort') ?? 'newest';
	const sort: SortKey = (sortRaw === 'price_asc' || sortRaw === 'price_desc' || sortRaw === 'newest') ? sortRaw : 'newest';

	const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
	const pageSize = 12;

	// ✅ parse min/max đúng cách
	const minStr = url.searchParams.get('min');
	const maxStr = url.searchParams.get('max');
	const min = minStr !== null && minStr !== '' ? Number(minStr) : null;
	const max = maxStr !== null && maxStr !== '' ? Number(maxStr) : null;

	const supabase = locals.supabase;

	let query = supabase
		.from('products')
		.select('id,slug,name,brand,type,price,old_price,quantity,images,created_at', { count: 'exact' })
		.eq('active', true);

	// Search
	if (q) query = query.ilike('name', `%${q}%`);

	// Filters
	if (type) query = query.eq('type', type);
	if (brand) query = query.eq('brand', brand);
	if (min !== null && !Number.isNaN(min)) query = query.gte('price', min);
	if (max !== null && !Number.isNaN(max)) query = query.lte('price', max);

	// Sort
	if (sort === 'price_asc') query = query.order('price', { ascending: true });
	else if (sort === 'price_desc') query = query.order('price', { ascending: false });
	else query = query.order('created_at', { ascending: false });

	// Pagination
	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;

	const { data: products, count, error } = await query.range(from, to);
	if (error) throw new Error(error.message);

	// Facets
	const { data: typesData } = await supabase.from('products').select('type').eq('active', true).limit(1000);
	const { data: brandsData } = await supabase.from('products').select('brand').eq('active', true).limit(1000);

	const types = Array.from(new Set((typesData ?? []).map((x) => x.type).filter(Boolean))).sort();
	const brands = Array.from(new Set((brandsData ?? []).map((x) => x.brand).filter(Boolean))).sort();

	return {
		products: products ?? [],
		total: count ?? 0,
		page,
		pageSize,
		filters: {
			q,
			type,
			brand,
			min: min === null || Number.isNaN(min) ? '' : String(min),
			max: max === null || Number.isNaN(max) ? '' : String(max),
			sort
		},
		facets: { types, brands }
	};
};
