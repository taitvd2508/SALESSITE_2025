<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  export let data: any;

  const cover = (imgs: string[] | null | undefined) =>
    imgs?.[0] ?? '/images/placeholder-product.png';

  const formatVND = (n: any) =>
    new Intl.NumberFormat('vi-VN').format(Number(n ?? 0)) + ' đ';

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('vi-VN', {
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

  // build query string giữ filter khi chuyển trang
  function buildQs(nextPage: number) {
    const p = new URLSearchParams();
    if (data.filters?.q) p.set('q', data.filters.q);
    if (data.filters?.type) p.set('type', data.filters.type);
    if (data.filters?.brand) p.set('brand', data.filters.brand);
    if (data.filters?.status) p.set('status', data.filters.status);
    p.set('page', String(nextPage));
    return `?${p.toString()}`;
  }

  $: totalPages = Math.max(
    1,
    Math.ceil((data.total ?? 0) / (data.pageSize ?? 12))
  );
  $: fromItem =
    (data.total ?? 0) === 0 ? 0 : (data.page - 1) * data.pageSize + 1;
  $: toItem = Math.min(data.total ?? 0, data.page * data.pageSize);

  const enhanceToggle = (node: HTMLFormElement) =>
    enhance(node, () => {
      return async ({ update }) => {
        await update(); // cập nhật dữ liệu sau action
        await invalidateAll(); // reload load() hiện tại
      };
    });
</script>

<svelte:head>
  <title>Admin - Sản phẩm TT STORE</title>
</svelte:head>

<div class="flex-1 p-8 overflow-y-auto scroll-smooth">
  <div class="max-w-[1400px] mx-auto flex flex-col gap-6">
    <!-- Page Heading -->
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h2 class="text-3xl font-bold tracking-tight text-white">
          Quản lý sản phẩm
        </h2>
        <p class="text-[#92a4c9] text-sm">
          Danh sách tất cả sản phẩm hiện có trong kho hàng.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <a
          href="/admin/products/new"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-600 active:scale-[0.98] transition-all"
        >
          <span class="material-symbols-outlined text-[20px]">add</span>
          Thêm sản phẩm
        </a>
      </div>
    </div>

    <!-- Filters -->
    <form method="GET" class="grid grid-cols-1 gap-3 lg:grid-cols-10">
      <div class="lg:col-span-4">
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <span class="material-symbols-outlined text-[#92a4c9]">search</span>
          </div>
          <input
            class="block w-full pl-10 pr-3 py-2.5 border border-[#232f48] rounded-lg bg-[#111722] text-white placeholder:text-[#92a4c9]/60 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Tìm kiếm theo tên sản phẩm..."
            type="text"
            name="q"
            value={data.filters?.q ?? ''}
          />
        </div>
      </div>

      <div class="lg:col-span-3">
        <select
          class="block w-full pl-3 pr-10 py-2.5 text-base border border-[#232f48] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-[#111722] text-white"
          name="type"
          value={data.filters?.type ?? ''}
        >
          <option value="">Tất cả danh mục</option>
          {#each data.facets?.types ?? [] as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
      </div>

      <div class="lg:col-span-2">
        <select
          class="block w-full pl-3 pr-10 py-2.5 text-base border border-[#232f48] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-[#111722] text-white"
          name="brand"
          value={data.filters?.brand ?? ''}
        >
          <option value="">Tất cả thương hiệu</option>
          {#each data.facets?.brands ?? [] as b}
            <option value={b}>{b}</option>
          {/each}
        </select>
      </div>

      <div class="lg:col-span-1">
        <select
          class="block w-full pl-3 pr-10 py-2.5 text-base border border-[#232f48] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-[#111722] text-white"
          name="status"
          value={data.filters?.status ?? ''}
        >
          <option value="">Trạng thái</option>
          <option value="active">Active</option>
          <option value="inactive">Disable</option>
        </select>
      </div>

      <div class="flex justify-end lg:col-span-10">
        <button
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#232f48] bg-[#111722] text-white font-bold hover:bg-[#232f48]/60 transition-colors"
          type="submit"
        >
          <span class="material-symbols-outlined text-[20px]">filter_alt</span>
          Lọc
        </button>
      </div>
    </form>

    <!-- Table Card -->
    <div
      class="bg-[#111722] border border-[#232f48] rounded-2xl overflow-hidden"
    >
      <div class="flex items-center justify-between px-6 py-4">
        <div class="text-sm text-[#92a4c9]">
          Hiển thị <span class="font-bold text-white">{fromItem}-{toItem}</span>
          trong
          <span class="font-bold text-white">{data.total ?? 0}</span> sản phẩm
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-[#0b0f16] text-[#92a4c9]">
            <tr class="text-left">
              <th class="px-6 py-4">Sản phẩm</th>
              <th class="px-6 py-4">Slug</th>
              <th class="px-6 py-4">Danh mục</th>
              <th class="px-6 py-4 text-right">Giá bán</th>
              <th class="px-6 py-4 text-center">Tồn kho</th>
              <th class="px-6 py-4 text-center">Trạng thái</th>
              <th class="px-6 py-4">Ngày tạo</th>
              <th class="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-[#232f48]">
            {#if (data.products?.length ?? 0) === 0}
              <tr>
                <td class="px-6 py-6 text-[#92a4c9]" colspan="8">
                  Không có sản phẩm phù hợp bộ lọc.
                </td>
              </tr>
            {:else}
              {#each data.products as p}
                <tr class="hover:bg-[#232f48]/50 transition-colors group">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-4">
                      <div
                        class="size-12 rounded-lg bg-white/5 flex-shrink-0 bg-center bg-cover border border-[#232f48]"
                        style={`background-image: url('${cover(p.images)}');`}
                      ></div>
                      <div class="min-w-0">
                        <p
                          class="text-sm font-medium text-white transition-colors group-hover:text-primary line-clamp-1"
                        >
                          <a href={`/products/${p.slug}`}>{p.name}</a>
                        </p>
                        <p class="text-xs text-[#92a4c9] line-clamp-1">
                          {p.brand}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="px-6 py-4 text-[#92a4c9]">{p.slug}</td>
                  <td class="px-6 py-4 text-[#92a4c9]">{p.type}</td>

                  <td class="px-6 py-4 text-right">
                    <div class="font-bold text-white">{formatVND(p.price)}</div>
                    {#if p.old_price && Number(p.old_price) > Number(p.price ?? 0)}
                      <div class="text-xs text-[#92a4c9] line-through">
                        {formatVND(p.old_price)}
                      </div>
                    {/if}
                  </td>

                  <td class="px-6 py-4 text-center">
                    <span class="font-bold text-white">{p.quantity ?? 0}</span>
                  </td>

                  <td class="px-6 py-4 text-center">
                    {#if p.active}
                      <span
                        class="px-3 py-1 text-xs font-bold text-green-200 border rounded-full border-green-500/30 bg-green-500/10"
                      >
                        Active
                      </span>
                    {:else}
                      <span
                        class="px-3 py-1 text-xs font-bold text-red-200 border rounded-full border-red-500/30 bg-red-500/10"
                      >
                        Disable
                      </span>
                    {/if}
                  </td>

                  <td class="px-6 py-4 text-[#92a4c9]"
                    >{formatDate(p.created_at)}</td
                  >

                  <td class="px-6 py-4">
                    <div class="flex items-center justify-end gap-2">
                      <a
                        class="p-1.5 text-[#92a4c9] hover:text-white hover:bg-[#232f48] rounded transition-colors"
                        href={`/admin/products/${p.id}`}
                        title="Chỉnh sửa"
                      >
                        <span class="material-symbols-outlined text-[20px]"
                          >edit</span
                        >
                      </a>

                      <!-- ✅ Toggle Active/Disable -->
                      <form
                        method="POST"
                        action="?/toggleActive"
                        use:enhanceToggle
                      >
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="active" value={!p.active} />
                        <button
                          class="p-1.5 hover:bg-[#232f48] rounded transition-colors"
                          title={p.active ? 'Ẩn sản phẩm' : 'Bật sản phẩm'}
                          type="submit"
                        >
                          <span
                            class={'material-symbols-outlined text-[20px] ' +
                              (p.active ? 'text-red-300' : 'text-green-300')}
                          >
                            {p.active ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </form>

                      <!-- Xoá: làm sau -->
                      <button
                        class="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                        title="Xóa (làm sau)"
                        type="button"
                      >
                        <span class="material-symbols-outlined text-[20px]"
                          >delete</span
                        >
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="px-6 py-4 flex items-center justify-between gap-3 border-t border-[#232f48]"
      >
        <div class="text-xs text-[#92a4c9]">
          Trang <span class="font-bold text-white">{data.page}</span> / {totalPages}
        </div>

        <div class="flex items-center gap-2">
          <a
            class="px-3 py-1.5 rounded-lg border border-[#232f48] text-[#92a4c9] hover:text-white hover:bg-[#232f48] text-sm transition-colors {data.page <=
            1
              ? 'pointer-events-none opacity-50'
              : ''}"
            href={buildQs(Math.max(1, data.page - 1))}
          >
            Trước
          </a>

          <a
            class="px-3 py-1.5 rounded-lg border border-[#232f48] text-[#92a4c9] hover:text-white hover:bg-[#232f48] text-sm transition-colors {data.page >=
            totalPages
              ? 'pointer-events-none opacity-50'
              : ''}"
            href={buildQs(Math.min(totalPages, data.page + 1))}
          >
            Sau
          </a>
        </div>
      </div>
    </div>
  </div>

  <footer class="mt-8 mb-4 text-center text-xs text-[#92a4c9]">
    © 2024 TT STORE. All rights reserved.
  </footer>
</div>
