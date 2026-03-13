<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  export let data: any;

  $: kpi = data.kpi ?? {};
  $: revenueByDay = data.revenueByDay ?? [];
  $: ordersByStatus = data.ordersByStatus ?? [];
  $: topProducts = data.topProducts ?? [];
  $: recentOrders = data.recentOrders ?? [];
  $: activeRange = data.range ?? '30d';

  const ranges = [
    { value: 'today', label: 'Hôm nay' },
    { value: '7d', label: '7 ngày' },
    { value: '30d', label: '30 ngày' },
    { value: 'month', label: 'Tháng này' },
  ];

  function setRange(r: string) {
    const u = new URL($page.url);
    u.searchParams.set('range', r);
    goto(u.pathname + '?' + u.searchParams.toString(), { replaceState: true });
  }

  // Format helpers
  const formatVND = (n: number) =>
    new Intl.NumberFormat('vi-VN').format(n) + ' đ';

  const formatCompact = (n: number) => {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + ' tỷ';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + ' tr';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
    return new Intl.NumberFormat('vi-VN').format(n);
  };

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  const formatShortDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  function pctChange(current: number, prev: number): number {
    if (prev === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - prev) / prev) * 1000) / 10;
  }

  // SVG chart helpers
  $: chartWidth = 800;
  $: chartHeight = 300;
  $: chartPadding = { top: 20, right: 20, bottom: 10, left: 20 };

  $: maxRevenue = Math.max(...revenueByDay.map((d: any) => d.total), 1);

  $: chartPoints = revenueByDay.map((d: any, i: number) => {
    const x =
      chartPadding.left +
      (i / Math.max(revenueByDay.length - 1, 1)) *
        (chartWidth - chartPadding.left - chartPadding.right);
    const y =
      chartPadding.top +
      (1 - d.total / maxRevenue) *
        (chartHeight - chartPadding.top - chartPadding.bottom);
    return { x, y, date: d.date, total: d.total };
  });

  $: linePath =
    chartPoints.length > 0
      ? chartPoints.map((p: any, i: number) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
      : '';

  $: areaPath =
    chartPoints.length > 0
      ? linePath +
        ` L${chartPoints[chartPoints.length - 1].x},${chartHeight} L${chartPoints[0].x},${chartHeight} Z`
      : '';

  function badgeClass(code: string) {
    switch (code) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'shipping':
        return 'bg-amber-500/10 text-amber-500';
      case 'done':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      case 'paid':
        return 'bg-blue-500/10 text-blue-500';
      default:
        return 'bg-gray-500/10 text-gray-300';
    }
  }

  function badgeDot(code: string) {
    switch (code) {
      case 'pending':
        return 'bg-yellow-500';
      case 'shipping':
        return 'bg-amber-500';
      case 'done':
        return 'bg-emerald-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'paid':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  }

  function getInitials(name: string) {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(-2)
      .map((w) => w[0]?.toUpperCase())
      .join('');
  }

  const avatarColors = [
    'bg-slate-700',
    'bg-purple-700',
    'bg-blue-700',
    'bg-pink-700',
    'bg-emerald-700',
    'bg-amber-700',
    'bg-cyan-700',
    'bg-rose-700',
  ];

  // KPI % changes (computed reactively, not via @const in template)
  $: revChange = pctChange(kpi.totalRevenue ?? 0, kpi.prevRevenue ?? 0);
  $: ordChange = pctChange(kpi.totalOrders ?? 0, kpi.prevOrders ?? 0);
  $: custChange = pctChange(kpi.newCustomers ?? 0, kpi.prevNewCustomers ?? 0);
  $: cancelDiff = Math.round(((kpi.cancelRate ?? 0) - (kpi.prevCancelRate ?? 0)) * 10) / 10;

  // Status bar chart
  $: totalStatusOrders = ordersByStatus.reduce((s: number, st: any) => s + st.count, 0);

  const statusColors: Record<string, string> = {
    pending: '#eab308',
    shipping: '#f59e0b',
    done: '#10b981',
    cancelled: '#ef4444',
    paid: '#3b82f6',
  };
</script>

<svelte:head>
  <title>Admin Dashboard TT STORE</title>
</svelte:head>

<div class="flex-1 overflow-y-auto p-8 scroll-smooth">
  <div class="flex flex-col gap-8 max-w-[1400px] mx-auto">
    <!-- TIME FILTER -->
    <div class="flex items-center gap-2">
      {#each ranges as r}
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {activeRange ===
          r.value
            ? 'bg-primary text-white shadow-sm'
            : 'bg-card-dark border border-white/5 text-text-secondary hover:text-white'}"
          on:click={() => setRange(r.value)}
        >
          {r.label}
        </button>
      {/each}
    </div>

    <!-- KPI STATS ROW 1 -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Doanh thu -->
      <div
        class="flex flex-col gap-2 rounded-xl p-5 bg-card-dark border border-white/5 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/20 rounded-lg text-primary">
            <span class="material-symbols-outlined">payments</span>
          </div>
          <span
            class="flex items-center text-xs font-medium px-2 py-1 rounded-full {revChange >= 0
              ? 'text-[#0bda5e] bg-[#0bda5e]/10'
              : 'text-red-400 bg-red-400/10'}"
          >
            {revChange >= 0 ? '+' : ''}{revChange}%
          </span>
        </div>
        <div class="mt-2">
          <p class="text-text-secondary text-sm font-medium">Doanh thu</p>
          <p class="text-white text-2xl font-bold tracking-tight mt-1">
            {formatCompact(kpi.totalRevenue ?? 0)} đ
          </p>
        </div>
      </div>

      <!-- Tổng đơn hàng -->
      <div
        class="flex flex-col gap-2 rounded-xl p-5 bg-card-dark border border-white/5 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/20 rounded-lg text-primary">
            <span class="material-symbols-outlined">shopping_cart</span>
          </div>
          <span
            class="flex items-center text-xs font-medium px-2 py-1 rounded-full {ordChange >= 0
              ? 'text-[#0bda5e] bg-[#0bda5e]/10'
              : 'text-red-400 bg-red-400/10'}"
          >
            {ordChange >= 0 ? '+' : ''}{ordChange}%
          </span>
        </div>
        <div class="mt-2">
          <p class="text-text-secondary text-sm font-medium">Tổng đơn hàng</p>
          <p class="text-white text-2xl font-bold tracking-tight mt-1">
            {new Intl.NumberFormat('vi-VN').format(kpi.totalOrders ?? 0)}
          </p>
        </div>
      </div>

      <!-- Khách hàng mới -->
      <div
        class="flex flex-col gap-2 rounded-xl p-5 bg-card-dark border border-white/5 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/20 rounded-lg text-primary">
            <span class="material-symbols-outlined">person_add</span>
          </div>
          <span
            class="flex items-center text-xs font-medium px-2 py-1 rounded-full {custChange >= 0
              ? 'text-[#0bda5e] bg-[#0bda5e]/10'
              : 'text-red-400 bg-red-400/10'}"
          >
            {custChange >= 0 ? '+' : ''}{custChange}%
          </span>
        </div>
        <div class="mt-2">
          <p class="text-text-secondary text-sm font-medium">Khách hàng mới</p>
          <p class="text-white text-2xl font-bold tracking-tight mt-1">
            {kpi.newCustomers ?? 0}
          </p>
        </div>
      </div>

      <!-- Tỷ lệ hủy -->
      <div
        class="flex flex-col gap-2 rounded-xl p-5 bg-card-dark border border-white/5 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 bg-red-500/20 rounded-lg text-red-500">
            <span class="material-symbols-outlined">cancel</span>
          </div>
          <span
            class="flex items-center text-xs font-medium px-2 py-1 rounded-full {cancelDiff <= 0
              ? 'text-[#0bda5e] bg-[#0bda5e]/10'
              : 'text-red-400 bg-red-400/10'}"
          >
            {cancelDiff <= 0 ? '' : '+'}{cancelDiff}%
          </span>
        </div>
        <div class="mt-2">
          <p class="text-text-secondary text-sm font-medium">Tỷ lệ hủy</p>
          <p class="text-white text-2xl font-bold tracking-tight mt-1">
            {kpi.cancelRate ?? 0}%
          </p>
        </div>
      </div>
    </section>

    <!-- KPI STATS ROW 2 -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Giá trị đơn trung bình -->
      <div
        class="flex flex-col gap-2 rounded-xl p-5 bg-card-dark border border-white/5 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/20 rounded-lg text-primary">
            <span class="material-symbols-outlined">avg_pace</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-text-secondary text-sm font-medium">
            Giá trị đơn trung bình
          </p>
          <p class="text-white text-2xl font-bold tracking-tight mt-1">
            {formatVND(kpi.avgOrderValue ?? 0)}
          </p>
        </div>
      </div>

      <!-- Đơn chờ xử lý -->
      <div
        class="flex flex-col gap-2 rounded-xl p-5 bg-card-dark border border-white/5 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 bg-yellow-500/20 rounded-lg text-yellow-500">
            <span class="material-symbols-outlined">pending_actions</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-text-secondary text-sm font-medium">
            Đơn chờ xử lý
          </p>
          <p class="text-white text-2xl font-bold tracking-tight mt-1">
            {kpi.pendingOrders ?? 0}
          </p>
        </div>
      </div>

      <!-- SP sắp hết hàng -->
      <div
        class="flex flex-col gap-2 rounded-xl p-5 bg-card-dark border border-white/5 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 bg-orange-500/20 rounded-lg text-orange-500">
            <span class="material-symbols-outlined">inventory_2</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-text-secondary text-sm font-medium">
            SP sắp hết hàng
          </p>
          <p class="text-white text-2xl font-bold tracking-tight mt-1">
            {kpi.lowStockProducts ?? 0}
          </p>
        </div>
      </div>
    </section>

    <!-- CHARTS & TOP PRODUCTS -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue Chart -->
      <div
        class="lg:col-span-2 bg-card-dark rounded-xl p-6 border border-white/5 flex flex-col h-full"
      >
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-white text-lg font-bold">Biểu đồ doanh thu</h3>
            <p class="text-text-secondary text-sm">
              Thống kê theo ngày ({ranges.find((r) => r.value === activeRange)?.label})
            </p>
          </div>
        </div>

        {#if revenueByDay.length === 0}
          <div
            class="flex-1 flex items-center justify-center text-text-secondary text-sm"
          >
            <div class="text-center">
              <span class="material-symbols-outlined text-4xl mb-2 block opacity-30"
                >bar_chart</span
              >
              Chưa có dữ liệu doanh thu trong kỳ này
            </div>
          </div>
        {:else}
          <div class="relative h-[300px] w-full mt-auto">
            <svg
              class="w-full h-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 {chartWidth} {chartHeight}"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="chartGradient"
                  x1="400"
                  x2="400"
                  y1="0"
                  y2={chartHeight}
                >
                  <stop stop-color="#1152d4" stop-opacity="0.5"></stop>
                  <stop offset="1" stop-color="#1152d4" stop-opacity="0"
                  ></stop>
                </linearGradient>
              </defs>
              <!-- Grid lines -->
              <line
                stroke="#334155"
                stroke-width="1"
                x1="0"
                x2={chartWidth}
                y1={chartHeight - 1}
                y2={chartHeight - 1}
              ></line>
              <line
                stroke="#334155"
                stroke-dasharray="4 4"
                stroke-width="1"
                x1="0"
                x2={chartWidth}
                y1={chartHeight * 0.75}
                y2={chartHeight * 0.75}
              ></line>
              <line
                stroke="#334155"
                stroke-dasharray="4 4"
                stroke-width="1"
                x1="0"
                x2={chartWidth}
                y1={chartHeight * 0.5}
                y2={chartHeight * 0.5}
              ></line>
              <line
                stroke="#334155"
                stroke-dasharray="4 4"
                stroke-width="1"
                x1="0"
                x2={chartWidth}
                y1={chartHeight * 0.25}
                y2={chartHeight * 0.25}
              ></line>
              <!-- Area Path -->
              {#if areaPath}
                <path d={areaPath} fill="url(#chartGradient)"></path>
              {/if}
              <!-- Line Path -->
              {#if linePath}
                <path
                  d={linePath}
                  stroke="#1152d4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                ></path>
              {/if}
              <!-- Dots -->
              {#each chartPoints as p}
                <circle
                  cx={p.x}
                  cy={p.y}
                  fill="#1152d4"
                  r="4"
                  stroke="#101622"
                  stroke-width="2"
                >
                  <title>{formatShortDate(p.date)}: {formatVND(p.total)}</title>
                </circle>
              {/each}
            </svg>
          </div>
          <div
            class="flex justify-between mt-4 text-xs text-text-secondary font-medium px-2 overflow-x-auto gap-1"
          >
            {#each revenueByDay as d, i}
              {#if revenueByDay.length <= 14 || i % Math.ceil(revenueByDay.length / 10) === 0 || i === revenueByDay.length - 1}
                <span class="whitespace-nowrap">{formatShortDate(d.date)}</span>
              {/if}
            {/each}
          </div>
        {/if}
      </div>

      <!-- Top Products -->
      <div
        class="bg-card-dark rounded-xl p-6 border border-white/5 flex flex-col h-full"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-white text-lg font-bold">Top sản phẩm</h3>
          <a
            href="/admin/products"
            class="text-primary text-sm font-medium hover:underline"
          >
            Xem tất cả
          </a>
        </div>

        {#if topProducts.length === 0}
          <div
            class="flex-1 flex items-center justify-center text-text-secondary text-sm"
          >
            <div class="text-center">
              <span class="material-symbols-outlined text-4xl mb-2 block opacity-30"
                >inventory</span
              >
              Chưa có sản phẩm bán chạy
            </div>
          </div>
        {:else}
          <div class="flex flex-col gap-4 overflow-y-auto pr-1">
            {#each topProducts as product, i}
              <div
                class="flex items-center gap-4 p-2 rounded-lg hover:bg-[#111722] transition-colors group cursor-pointer"
              >
                {#if product.image}
                  <div
                    class="size-12 rounded-lg bg-cover bg-center shrink-0 border border-white/10"
                    style="background-image: url('{product.image}');"
                  ></div>
                {:else}
                  <div
                    class="size-12 rounded-lg bg-[#1a2336] shrink-0 border border-white/10 flex items-center justify-center text-text-secondary"
                  >
                    <span class="material-symbols-outlined text-lg">image</span>
                  </div>
                {/if}
                <div class="flex-1 min-w-0">
                  <p
                    class="text-white text-sm font-medium truncate group-hover:text-primary transition-colors"
                  >
                    {product.name}
                  </p>
                  <p class="text-text-secondary text-xs">
                    {formatVND(product.price)}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-white text-sm font-bold">
                    {product.total_sold}
                  </p>
                  <p class="text-text-secondary text-[10px]">Đã bán</p>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </section>

    <!-- ORDER STATUS STATS -->
    {#if ordersByStatus.length > 0 && totalStatusOrders > 0}
      <section
        class="bg-card-dark rounded-xl p-6 border border-white/5"
      >
        <h3 class="text-white text-lg font-bold mb-4">
          Thống kê đơn theo trạng thái
        </h3>
        <div class="flex flex-col gap-3">
          {#each ordersByStatus as s}
            {@const pct = totalStatusOrders > 0 ? Math.round((s.count / totalStatusOrders) * 100) : 0}
            <div class="flex items-center gap-4">
              <span class="text-sm text-text-secondary w-28 shrink-0 truncate"
                >{s.name}</span
              >
              <div class="flex-1 h-3 bg-[#111722] rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  style="width: {pct}%; background-color: {statusColors[s.code] ?? '#6b7280'};"
                ></div>
              </div>
              <span class="text-white text-sm font-medium w-14 text-right"
                >{s.count}
                <span class="text-text-secondary text-xs">({pct}%)</span>
              </span>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- RECENT ORDERS TABLE -->
    <section class="bg-card-dark rounded-xl border border-white/5 overflow-hidden">
      <div class="p-6 border-b border-[#232f48] flex justify-between items-center">
        <h3 class="text-white text-lg font-bold">Đơn hàng gần đây</h3>
        <a
          href="/admin/orders"
          class="bg-primary hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Xem tất cả
        </a>
      </div>

      {#if recentOrders.length === 0}
        <div class="px-6 py-12 text-center text-text-secondary text-sm">
          <span class="material-symbols-outlined text-4xl mb-2 block opacity-30"
            >receipt_long</span
          >
          Chưa có đơn hàng nào
        </div>
      {:else}
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm whitespace-nowrap">
            <thead
              class="bg-[#1a2336] text-text-secondary uppercase text-xs font-semibold"
            >
              <tr>
                <th class="px-6 py-4">Mã đơn hàng</th>
                <th class="px-6 py-4">Khách hàng</th>
                <th class="px-6 py-4">Ngày đặt</th>
                <th class="px-6 py-4">Tổng tiền</th>
                <th class="px-6 py-4">Trạng thái</th>
                <th class="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#232f48]">
              {#each recentOrders as o, i}
                <tr class="hover:bg-[#1a2336] transition-colors">
                  <td class="px-6 py-4 text-white font-medium">
                    <a
                      href="/admin/orders/{o.id}"
                      class="text-primary hover:underline"
                    >
                      #{o.id}
                    </a>
                  </td>
                  <td class="px-6 py-4 text-text-secondary">
                    <div class="flex items-center gap-3">
                      <div
                        class="size-8 rounded-full {avatarColors[
                          i % avatarColors.length
                        ]} flex items-center justify-center text-xs text-white font-bold"
                      >
                        {getInitials(o.full_name ?? '')}
                      </div>
                      <span>{o.full_name}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-text-secondary"
                    >{formatDate(o.created_at)}</td
                  >
                  <td class="px-6 py-4 text-white font-medium"
                    >{formatVND(Number(o.total_price))}</td
                  >
                  <td class="px-6 py-4">
                    <span
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium {badgeClass(
                        o.status?.code ?? ''
                      )}"
                    >
                      <span
                        class="size-1.5 rounded-full {badgeDot(
                          o.status?.code ?? ''
                        )}"
                      ></span>
                      {o.status?.name ?? '—'}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <a
                      href="/admin/orders/{o.id}"
                      class="text-text-secondary hover:text-white transition-colors"
                    >
                      <span class="material-symbols-outlined text-lg"
                        >visibility</span
                      >
                    </a>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </section>
  </div>
</div>
