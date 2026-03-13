import type { PageServerLoad } from './$types';

type Range = 'today' | '7d' | '30d' | 'month';

function getDateRange(range: Range) {
  const now = new Date();
  let currentFrom: Date;
  let currentTo: Date = now;
  let prevFrom: Date;
  let prevTo: Date;

  switch (range) {
    case 'today': {
      currentFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      prevFrom = new Date(currentFrom);
      prevFrom.setDate(prevFrom.getDate() - 1);
      prevTo = new Date(currentFrom);
      prevTo.setMilliseconds(-1);
      break;
    }
    case '7d': {
      currentFrom = new Date(now);
      currentFrom.setDate(now.getDate() - 7);
      prevFrom = new Date(currentFrom);
      prevFrom.setDate(prevFrom.getDate() - 7);
      prevTo = new Date(currentFrom);
      prevTo.setMilliseconds(-1);
      break;
    }
    case 'month': {
      currentFrom = new Date(now.getFullYear(), now.getMonth(), 1);
      const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      prevFrom = prevMonth;
      prevTo = new Date(currentFrom);
      prevTo.setMilliseconds(-1);
      break;
    }
    case '30d':
    default: {
      currentFrom = new Date(now);
      currentFrom.setDate(now.getDate() - 30);
      prevFrom = new Date(currentFrom);
      prevFrom.setDate(prevFrom.getDate() - 30);
      prevTo = new Date(currentFrom);
      prevTo.setMilliseconds(-1);
      break;
    }
  }

  return {
    currentFrom: currentFrom.toISOString(),
    currentTo: currentTo.toISOString(),
    prevFrom: prevFrom.toISOString(),
    prevTo: prevTo.toISOString(),
  };
}

export const load: PageServerLoad = async ({ url, locals }) => {
  const range = (url.searchParams.get('range') ?? '30d') as Range;
  const validRanges: Range[] = ['today', '7d', '30d', 'month'];
  const safeRange = validRanges.includes(range) ? range : '30d';

  const { currentFrom, currentTo, prevFrom, prevTo } = getDateRange(safeRange);
  const supabase = locals.supabase;

  // 1. Fetch order_status to find cancelled & pending status ids dynamically
  const { data: statusRows } = await supabase
    .from('order_status')
    .select('id, code, name')
    .order('id');

  const statuses = statusRows ?? [];
  const cancelledId = statuses.find((s) => s.code === 'cancelled')?.id;
  const pendingId = statuses.find((s) => s.code === 'pending')?.id;

  // Helper: count & sum orders in a date range
  async function getOrderStats(from: string, to: string) {
    // Total orders
    const { count: totalOrders } = await supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', from)
      .lte('created_at', to);

    // Revenue (exclude cancelled)
    let revenueQuery = supabase
      .from('orders')
      .select('total_price')
      .gte('created_at', from)
      .lte('created_at', to);
    if (cancelledId != null) {
      revenueQuery = revenueQuery.neq('status_id', cancelledId);
    }
    const { data: revenueRows } = await revenueQuery;
    const totalRevenue = (revenueRows ?? []).reduce(
      (sum, r) => sum + Number(r.total_price ?? 0),
      0
    );

    // Cancelled count
    let cancelledCount = 0;
    if (cancelledId != null) {
      const { count } = await supabase
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', from)
        .lte('created_at', to)
        .eq('status_id', cancelledId);
      cancelledCount = count ?? 0;
    }

    return {
      totalOrders: totalOrders ?? 0,
      totalRevenue,
      cancelledCount,
    };
  }

  // Helper: new customers count
  async function getNewCustomers(from: string, to: string) {
    const { count } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', from)
      .lte('created_at', to);
    return count ?? 0;
  }

  // Run current & previous period queries in parallel
  const [current, prev, newCustomers, prevNewCustomers] = await Promise.all([
    getOrderStats(currentFrom, currentTo),
    getOrderStats(prevFrom, prevTo),
    getNewCustomers(currentFrom, currentTo),
    getNewCustomers(prevFrom, prevTo),
  ]);

  // Cancel rate
  const cancelRate =
    current.totalOrders > 0
      ? (current.cancelledCount / current.totalOrders) * 100
      : 0;
  const prevCancelRate =
    prev.totalOrders > 0
      ? (prev.cancelledCount / prev.totalOrders) * 100
      : 0;

  // Average order value
  const avgOrderValue =
    current.totalOrders > 0
      ? Math.round(current.totalRevenue / current.totalOrders)
      : 0;

  // Pending orders (global, not filtered by date range)
  let pendingOrders = 0;
  if (pendingId != null) {
    const { count } = await supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .eq('status_id', pendingId);
    pendingOrders = count ?? 0;
  }

  // Low stock products (quantity <= 5, active)
  const { count: lowStockCount } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('active', true)
    .lte('quantity', 5);
  const lowStockProducts = lowStockCount ?? 0;

  // Revenue by day (within current period)
  const { data: revenueByDayRaw } = await supabase
    .from('orders')
    .select('created_at, total_price, status_id')
    .gte('created_at', currentFrom)
    .lte('created_at', currentTo)
    .order('created_at', { ascending: true });

  const revMap = new Map<string, number>();
  for (const row of revenueByDayRaw ?? []) {
    if (cancelledId != null && row.status_id === cancelledId) continue;
    const day = new Date(row.created_at).toISOString().slice(0, 10);
    revMap.set(day, (revMap.get(day) ?? 0) + Number(row.total_price ?? 0));
  }
  const revenueByDay = Array.from(revMap.entries())
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Orders by status (within current period)
  const { data: allOrdersInPeriod } = await supabase
    .from('orders')
    .select('status_id')
    .gte('created_at', currentFrom)
    .lte('created_at', currentTo);

  const statusCountMap = new Map<number, number>();
  for (const row of allOrdersInPeriod ?? []) {
    const sid = row.status_id ?? 0;
    statusCountMap.set(sid, (statusCountMap.get(sid) ?? 0) + 1);
  }
  const ordersByStatus = statuses.map((s) => ({
    id: s.id,
    code: s.code,
    name: s.name,
    count: statusCountMap.get(s.id) ?? 0,
  }));

  // Top products (by quantity sold, within current period)
  const { data: orderIdsInPeriod } = await supabase
    .from('orders')
    .select('id')
    .gte('created_at', currentFrom)
    .lte('created_at', currentTo);

  const orderIds = (orderIdsInPeriod ?? []).map((o) => o.id);

  let topProducts: {
    product_id: number;
    name: string;
    price: number;
    image: string | null;
    total_sold: number;
    total_revenue: number;
  }[] = [];

  if (orderIds.length > 0) {
    const { data: detailRows } = await supabase
      .from('order_details')
      .select('product_id, quantity, price')
      .in('order_id', orderIds);

    // Aggregate by product
    const prodMap = new Map<
      number,
      { total_sold: number; total_revenue: number }
    >();
    for (const d of detailRows ?? []) {
      const pid = d.product_id;
      const existing = prodMap.get(pid) ?? { total_sold: 0, total_revenue: 0 };
      existing.total_sold += d.quantity;
      existing.total_revenue += d.quantity * Number(d.price);
      prodMap.set(pid, existing);
    }

    // Sort and take top 5
    const sorted = Array.from(prodMap.entries())
      .sort((a, b) => b[1].total_sold - a[1].total_sold)
      .slice(0, 5);

    const topProdIds = sorted.map(([pid]) => pid);

    if (topProdIds.length > 0) {
      const { data: prodRows } = await supabase
        .from('products')
        .select('id, name, price, images')
        .in('id', topProdIds);

      const prodInfo = new Map(
        (prodRows ?? []).map((p) => [
          p.id,
          {
            name: p.name,
            price: Number(p.price),
            image: p.images?.[0] ?? null,
          },
        ])
      );

      topProducts = sorted.map(([pid, stats]) => ({
        product_id: pid,
        name: prodInfo.get(pid)?.name ?? 'Sản phẩm #' + pid,
        price: prodInfo.get(pid)?.price ?? 0,
        image: prodInfo.get(pid)?.image ?? null,
        total_sold: stats.total_sold,
        total_revenue: stats.total_revenue,
      }));
    }
  }

  // Recent orders (latest 8, global)
  const { data: recentOrdersRaw } = await supabase
    .from('orders')
    .select(
      `id, created_at, full_name, phone, email, total_price,
       status:order_status(id, code, name),
       method:order_method(id, code, name)`
    )
    .order('created_at', { ascending: false })
    .limit(8);

  const recentOrders = (recentOrdersRaw ?? []).map((o: any) => ({
    id: o.id,
    created_at: o.created_at,
    full_name: o.full_name,
    phone: o.phone,
    email: o.email,
    total_price: o.total_price,
    status: o.status,
    method: o.method,
  }));

  return {
    range: safeRange,
    kpi: {
      totalRevenue: current.totalRevenue,
      prevRevenue: prev.totalRevenue,
      totalOrders: current.totalOrders,
      prevOrders: prev.totalOrders,
      newCustomers,
      prevNewCustomers,
      cancelRate: Math.round(cancelRate * 10) / 10,
      prevCancelRate: Math.round(prevCancelRate * 10) / 10,
      avgOrderValue,
      pendingOrders,
      lowStockProducts,
    },
    revenueByDay,
    ordersByStatus,
    topProducts,
    recentOrders,
    statuses,
  };
};
