<!-- src/routes/(admin)/admin/orders/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  export let data: any;
  let t: any;

  $: exportHref = `/admin/orders/export${$page.url.search}`;

  const formatVND = (n: any) =>
    new Intl.NumberFormat('vi-VN').format(Number(n ?? 0)) + ' ₫';

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

  function buildUrl(
    patch: Record<string, string | null | undefined>,
    nextPage?: number
  ) {
    const u = new URL($page.url);

    for (const [k, v] of Object.entries(patch)) {
      if (!v) u.searchParams.delete(k);
      else u.searchParams.set(k, v);
    }

    if (typeof nextPage === 'number')
      u.searchParams.set('page', String(nextPage));
    else u.searchParams.delete('page'); // đổi filter => về page 1

    return u.pathname + '?' + u.searchParams.toString();
  }

  $: totalPages = Math.max(
    1,
    Math.ceil((data.total ?? 0) / (data.pageSize ?? 12))
  );
  $: fromItem =
    (data.total ?? 0) === 0 ? 0 : (data.page - 1) * data.pageSize + 1;
  $: toItem = Math.min(data.total ?? 0, data.page * data.pageSize);

  function badgeClass(code: string) {
    switch (code) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'shipping':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'done':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'paid':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-gray-500/10 text-gray-300 border-gray-500/20';
    }
  }

  // FILTER HANDLERS
  function onSearchChange(e: Event) {
    const v = (e.currentTarget as HTMLInputElement).value.trim();
    clearTimeout(t);
    t = setTimeout(() => {
      goto(buildUrl({ q: v || null }));
    }, 300);
  }

  function onFromDateChange(e: Event) {
    const v = (e.currentTarget as HTMLInputElement).value;
    goto(buildUrl({ from: v || null }), { replaceState: true });
  }

  function onToDateChange(e: Event) {
    const v = (e.currentTarget as HTMLInputElement).value;
    goto(buildUrl({ to: v || null }), { replaceState: true });
  }

  function onMethodChange(e: Event) {
    const v = (e.currentTarget as HTMLSelectElement).value;
    goto(buildUrl({ method: v || null }), { replaceState: true });
  }

  // PAGINATION
  function goPage(p: number) {
    if (p < 1 || p > data.totalPages) return;
    goto(buildUrl({}, p));
  }
</script>

<svelte:head>
  <title>Admin - Orders</title>
</svelte:head>

<div class="flex-1 p-4 overflow-y-auto md:p-8">
  <div class="max-w-[1400px] mx-auto flex flex-col gap-6">
    <!-- Filters -->
    <div class="flex flex-col gap-4">
      <!-- Status chips -->
      <div class="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
        <button
          class={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            (data.filters.status ?? '') === ''
              ? 'bg-primary text-white'
              : 'bg-surface-dark border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600'
          }`}
          on:click={() =>
            goto(buildUrl({ status: null }), { replaceState: true })}
        >
          Tất cả
        </button>

        {#each data.facets.statuses as s}
          <button
            class={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              data.filters.status === s.code
                ? 'bg-primary text-white'
                : 'bg-surface-dark border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600'
            }`}
            on:click={() =>
              goto(buildUrl({ status: s.code }), { replaceState: true })}
          >
            {s.name}
          </button>
        {/each}
      </div>

      <!-- Advanced -->
      <div
        class="grid items-end grid-cols-1 gap-4 p-4 border border-gray-800 md:grid-cols-12 bg-surface-dark rounded-xl"
      >
        <div class="md:col-span-5 lg:col-span-4 flex flex-col gap-1.5">
          <label class="ml-1 text-xs font-medium text-gray-400"
            >Tìm kiếm đơn hàng</label
          >
          <div class="relative">
            <span
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined text-[20px]"
              >search</span
            >
            <input
              class="w-full bg-background-dark text-white text-sm rounded-lg pl-10 pr-4 py-2.5 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-600"
              placeholder="Nhập mã đơn, tên, email, SĐT..."
              type="text"
              value={data.filters.q ?? ''}
              on:input={onSearchChange}
            />
          </div>
        </div>

        <div class="md:col-span-3 lg:col-span-2 flex flex-col gap-1.5">
          <label class="ml-1 text-xs font-medium text-gray-400">Từ ngày</label>
          <input
            class="w-full bg-background-dark text-white text-sm rounded-lg px-4 py-2.5 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
            type="date"
            value={data.filters.from ?? ''}
            on:change={onFromDateChange}
          />
        </div>

        <div class="md:col-span-3 lg:col-span-2 flex flex-col gap-1.5">
          <label class="ml-1 text-xs font-medium text-gray-400">Đến ngày</label>
          <input
            class="w-full bg-background-dark text-white text-sm rounded-lg px-4 py-2.5 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
            type="date"
            value={data.filters.to ?? ''}
            on:change={onToDateChange}
          />
        </div>

        <div class="md:col-span-3 lg:col-span-2 flex flex-col gap-1.5">
          <label class="ml-1 text-xs font-medium text-gray-400"
            >Phương thức</label
          >
          <select
            class="w-full bg-background-dark text-white text-sm rounded-lg px-4 py-2.5 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
            value={data.filters.method ?? ''}
            on:change={onMethodChange}
          >
            <option value="">Tất cả</option>
            {#each data.facets.methods as m}
              <option value={m.code}>{m.name}</option>
            {/each}
          </select>
        </div>
        <div class="md:col-span-3 lg:col-span-2 flex flex-col gap-1.5">
          <label class="ml-1 text-xs font-medium text-gray-400">Xuất file</label
          >
          <button
            on:click={() => (window.location.href = exportHref)}
            class="px-4 py-2 font-medium text-white rounded-lg w-fit bg-primary"
          >
            Export CSV
          </button>
        </div>
      </div>
    </div>

    <!-- Table Card -->
    <div
      class="overflow-hidden border border-gray-800 shadow-xl bg-surface-dark rounded-xl shadow-black/20"
    >
      <div class="flex items-center justify-between px-6 py-4">
        <div class="text-sm text-[#92a4c9]">
          Hiển thị <span class="font-bold text-white">{fromItem}-{toItem}</span>
          trong
          <span class="font-bold text-white">{data.total ?? 0}</span> đơn hàng
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[#0b0f16] text-[#92a4c9]">
            <tr class="text-left border-b border-gray-700">
              <th class="py-4 px-6 text-xs uppercase tracking-wider w-[100px]">
                Mã đơn
              </th>
              <th
                class="py-4 px-6 text-xs uppercase tracking-wider min-w-[260px]"
              >
                Khách hàng
              </th>
              <th class="py-4 px-6 text-xs uppercase tracking-wider w-[180px]">
                Ngày tạo
              </th>
              <th class="py-4 px-6 text-xs uppercase tracking-wider w-[170px]">
                Thanh toán
              </th>
              <th
                class="py-4 px-6 text-xs uppercase tracking-wider text-right w-[160px]"
              >
                Tổng tiền
              </th>
              <th
                class="py-4 px-6 text-xs uppercase tracking-wider text-center w-[170px]"
              >
                Trạng thái
              </th>
              <th
                class="py-4 px-6 text-xs uppercase tracking-wider text-center w-[120px]"
              >
                Hành động
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-800">
            {#if (data.orders?.length ?? 0) === 0}
              <tr>
                <td class="px-6 py-8 text-gray-400" colspan="7">
                  Không có đơn hàng phù hợp bộ lọc.
                </td>
              </tr>
            {:else}
              {#each data.orders as o}
                <tr class="transition-colors group hover:bg-gray-800/40">
                  <td class="px-6 py-4">
                    <a
                      class="text-sm font-medium text-primary hover:underline"
                      href={`/admin/orders/${o.id}`}
                    >
                      #{o.id}
                    </a>
                  </td>

                  <td class="px-6 py-4">
                    <div class="flex flex-col">
                      <span class="text-sm font-medium text-white"
                        >{o.full_name}</span
                      >
                      <span class="text-xs text-gray-500"
                        >{o.phone}{#if o.email}
                          • {o.email}{/if}</span
                      >
                    </div>
                  </td>

                  <td class="px-6 py-4">
                    <span class="text-sm text-gray-300"
                      >{formatDate(o.created_at)}</span
                    >
                  </td>

                  <td class="px-6 py-4">
                    <span class="text-sm text-gray-300"
                      >{o.method?.name ?? '—'}</span
                    >
                  </td>

                  <td class="px-6 py-4 text-right">
                    <span class="text-sm font-bold text-white"
                      >{formatVND(o.total_price)}</span
                    >
                  </td>

                  <td class="px-6 py-4 text-center">
                    <span
                      class={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${badgeClass(
                        o.status?.code ?? ''
                      )}`}
                    >
                      <span class="w-1.5 h-1.5 rounded-full mr-1.5 bg-current"
                      ></span>
                      {o.status?.name ?? '—'}
                    </span>
                  </td>

                  <td class="px-6 py-4 text-right">
                    <a
                      class="inline-flex items-center gap-2 px-3 py-2 text-sm text-white transition-colors border border-gray-700 rounded-lg bg-background-dark hover:bg-gray-800"
                      href={`/admin/orders/${o.id}`}
                    >
                      <span class="material-symbols-outlined text-[18px]"
                        >visibility</span
                      >
                      Xem
                    </a>
                  </td>
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
