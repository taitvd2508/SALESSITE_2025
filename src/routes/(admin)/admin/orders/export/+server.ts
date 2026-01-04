import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
  const status = url.searchParams.get('status'); //pending/paid/...
  const method = url.searchParams.get('method'); //wallet/cod/...
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');

  let q = locals.supabase
    .from('orders')
    .select(
      `
      id, full_name, email, phone, address, total_price, created_at,
      order_status:status_id!inner (id, code, name),
      order_method:method_id!inner (id, code, name)
    `
    )
    .order('created_at', { ascending: false });

  //filter theo code (ăn theo URL admin/orders)
  if (status) q = q.eq('order_status.code', status);
  if (method) q = q.eq('order_method.code', method);

  if (from) q = q.gte('created_at', `${from}T00:00:00Z`);
  if (to) q = q.lte('created_at', `${to}T23:59:59Z`);

  const { data, error } = await q;
  if (error)
    return new Response(`Export error: ${error.message}`, { status: 500 });

  const rows = data ?? [];

  const escapeCsv = (v: any) => {
    const s = String(v ?? '');
    if (/[",\r\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
    return s;
  };

  const sep = ',';
  const header = [
    'id',
    'created_at',
    'status',
    'method',
    'full_name',
    'email',
    'phone',
    'address',
    'total_price',
  ].join(sep);

  const body = rows
    .map((o: any) =>
      [
        o.id,
        o.created_at,
        o.order_status?.name ?? '',
        o.order_method?.name ?? '',
        o.full_name,
        o.email,
        o.phone,
        o.address,
        o.total_price,
      ]
        .map(escapeCsv)
        .join(sep)
    )
    .join('\r\n');

  //BOM UTF-8 để Excel không lỗi tiếng Việt
  const csv = `\uFEFF${header}\r\n${body}\r\n`;

  const filename = `orders_${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
      'cache-control': 'no-store',
    },
  });
};
