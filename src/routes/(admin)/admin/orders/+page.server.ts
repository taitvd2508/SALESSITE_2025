// src/routes/(admin)/admin/orders/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
  const q = (url.searchParams.get('q') ?? '').trim();
  const user = (url.searchParams.get('user') ?? '').trim();

  const status = url.searchParams.get('status') ?? ''; // code: pending/paid/...
  const method = url.searchParams.get('method') ?? ''; // code: cod/bank/momo

  const fromStr = url.searchParams.get('from') ?? '';
  const toStr = url.searchParams.get('to') ?? '';

  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
  const pageSize = 12;

  const supabase = locals.supabase;

  // facets (status/method)
  const [{ data: statusRows }, { data: methodRows }] = await Promise.all([
    supabase.from('order_status').select('id, code, name').order('id'),
    supabase.from('order_method').select('id, code, name').order('id'),
  ]);

  const statusMap = new Map((statusRows ?? []).map((s) => [s.code, s.id]));
  const methodMap = new Map((methodRows ?? []).map((m) => [m.code, m.id]));

  let query = supabase
    .from('orders')
    // embed status/method
    .select(
      `
      id, created_at, full_name, phone, email, total_price,
      status:order_status(id, code, name),
      method:order_method(id, code, name)
    `,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false });

  // search: id / name / phone / email
  if (q) {
    const qNum = Number(q);
    if (Number.isFinite(qNum)) {
      query = query.eq('id', qNum);
    } else {
      // OR trên nhiều cột
      // (postgrest uses: or('col.ilike.%x%,col2.ilike.%x%'))
      const like = `%${q}%`;
      query = query.or(
        `full_name.ilike.${like},phone.ilike.${like},email.ilike.${like}`
      );
    }
  }

  // filter userid
  if (user) query = query.eq('user_id', user);

  // filter status/method by code
  if (status && statusMap.has(status))
    query = query.eq('status_id', statusMap.get(status));
  if (method && methodMap.has(method))
    query = query.eq('method_id', methodMap.get(method));

  // date range (created_at)
  // from/to nên là YYYY-MM-DD
  if (fromStr) query = query.gte('created_at', `${fromStr}T00:00:00`);
  if (toStr) query = query.lte('created_at', `${toStr}T23:59:59`);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: orders, count, error } = await query.range(from, to);
  if (error) throw new Error(error.message);

  return {
    orders: orders ?? [],
    total: count ?? 0,
    page,
    pageSize,
    filters: { q, status, method, from: fromStr, to: toStr },
    facets: {
      statuses: statusRows ?? [],
      methods: methodRows ?? [],
    },
  };
};
