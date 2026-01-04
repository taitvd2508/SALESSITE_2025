<script lang="ts">
  import { goto } from '$app/navigation';
  import { cart } from '$lib/stores/cart';
  import { page } from '$app/stores';

  let toast = '';
  let toastTimer: any;

  function showToast(msg: string) {
    toast = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast = ''), 1200);
  }

  async function addProductToCart(p: any) {
    cart.add(
      {
        product_id: Number(p.id),
        slug: p.slug,
        name: p.name,
        price: Number(p.price),
        old_price: p.old_price ? Number(p.old_price) : null,
        image: p.images?.[0] ?? null,
      },
      1
    );

    //ghi event add_to_cart để trending tính điểm
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'add_to_cart',
        product_id: Number(p.id),
      }),
    });

    showToast('Đã thêm vào giỏ');
  }

  export let data: {
    products: Array<{
      id: string;
      slug: string;
      name: string;
      brand: string;
      type: string;
      price: number;
      old_price: number;
      quantity: number;
      images: string[] | null;
      created_at: string;
    }>;
    total: number;
    page: number;
    pageSize: number;
    filters: {
      q: string;
      type: string;
      brand: string;
      min: string;
      max: string;
      sort: string;
    };
    facets: { types: string[]; brands: string[] };
  };

  //local states (sync từ server) (UI)
  let qInput = data.filters.q ?? '';
  let selectedType = data.filters.type ?? '';
  let selectedBrand = data.filters.brand ?? '';
  let min = data.filters.min || '0';
  let max = data.filters.max || '1000000000';
  let sort = data.filters.sort || 'newest';

  // Sync lại state khi URL/filter đổi -> server load trả về data.filters mới
  //(nhưng không overwrite khi user đang gõ nếu qInput đã giống qUrl)
  $: {
    const qUrl = data.filters.q ?? '';
    if (qInput !== qUrl) qInput = qUrl;

    selectedType = data.filters.type ?? '';
    selectedBrand = data.filters.brand ?? '';
    min = data.filters.min || '0';
    max = data.filters.max || '1000000000';
    sort = data.filters.sort || 'newest';
  }

  $: totalPages = Math.max(
    1,
    Math.ceil((data.total ?? 0) / (data.pageSize ?? 12))
  );
  $: pageNumbers = buildPageNumbers(data.page, totalPages);

  function formatVND(n: number) {
    return new Intl.NumberFormat('vi-VN').format(n) + '₫';
  }

  function cover(images: string[] | null) {
    return images?.[0] ?? '/images/placeholder-product.png';
  }

  function buildUrl(
    overrides: Partial<{
      q: string;
      type: string;
      brand: string;
      min: string;
      max: string;
      sort: string;
      page: number;
    }>
  ) {
    const params = new URLSearchParams();

    // q lấy từ overrides hoặc từ qInput (input state)
    const _q = overrides.q ?? qInput;
    const _type = overrides.type ?? selectedType;
    const _brand = overrides.brand ?? selectedBrand;
    const _min = overrides.min ?? min;
    const _max = overrides.max ?? max;
    const _sort = overrides.sort ?? sort;
    const _page = overrides.page ?? 1;

    if (_q) params.set('q', _q);
    if (_type) params.set('type', _type);
    if (_brand) params.set('brand', _brand);
    if (_min) params.set('min', _min);
    if (_max) params.set('max', _max);
    if (_sort) params.set('sort', _sort);
    params.set('page', String(_page));

    return `/products?${params.toString()}`;
  }

  function applyFilters() {
    goto(buildUrl({ page: 1 }));
  }

  function toggleType(t: string) {
    selectedType = selectedType === t ? '' : t;
    goto(buildUrl({ type: selectedType, page: 1 }));
  }

  function toggleBrand(b: string) {
    selectedBrand = selectedBrand === b ? '' : b;
    goto(buildUrl({ brand: selectedBrand, page: 1 }));
  }

  function onSortChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    sort = value;
    goto(buildUrl({ sort, page: 1 }));
  }

  function onSearchEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') goto(buildUrl({ q: qInput, page: 1 }));
  }

  function goPage(p: number) {
    goto(buildUrl({ page: p }));
  }

  function buildPageNumbers(current: number, total: number) {
    //hiển thị tối đa 5 trang
    const maxButtons = 5;
    const half = Math.floor(maxButtons / 2);

    let start = Math.max(1, current - half);
    let end = Math.min(total, start + maxButtons - 1);

    //cân lại start nếu end chạm trần
    start = Math.max(1, end - maxButtons + 1);

    const arr: number[] = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  }
</script>

<svelte:head>
  <title>TT STORE - Sản Phẩm</title>
</svelte:head>

<main class="flex-grow w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
  <!-- Breadcrumbs & Heading -->
  <div class="mb-8">
    <nav aria-label="Breadcrumb" class="flex mb-4">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a
            class="inline-flex items-center text-sm font-medium text-text-secondary hover:text-white"
            href="#"
          >
            <span class="mr-1 text-lg material-symbols-outlined">home</span>
            Trang chủ
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-1 material-symbols-outlined text-text-secondary"
              >chevron_right</span
            >
            <span class="text-sm font-medium text-white">Sản phẩm</span>
          </div>
        </li>
      </ol>
    </nav>

    <div
      class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <h1
          class="mb-2 text-3xl font-black tracking-tight text-white md:text-4xl"
        >
          Danh sách sản phẩm
        </h1>
        <p class="text-base text-text-secondary">
          Khám phá bộ sưu tập thiết bị công nghệ cao cấp chính hãng.
        </p>
      </div>
      <div class="text-sm font-medium text-text-secondary">
        {#if data.total > 0}
          Hiển thị {(data.page - 1) * data.pageSize + 1}-{Math.min(
            data.page * data.pageSize,
            data.total
          )} trong {data.total} sản phẩm
        {:else}
          0 sản phẩm
        {/if}
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-8 lg:flex-row">
    <!-- Sidebar Filters -->
    <aside class="flex-shrink-0 w-full space-y-8 lg:w-64">
      <!-- Categories -->
      <div class="bg-surface-dark rounded-xl p-5 border border-[#232f48]">
        <h3
          class="flex items-center justify-between mb-4 text-lg font-bold text-white"
        >
          Danh mục
          <span class="text-sm material-symbols-outlined text-text-secondary"
            >expand_less</span
          >
        </h3>

        <ul class="space-y-3">
          {#if data.facets.types?.length}
            {#each data.facets.types as t}
              <li>
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input
                    class="form-checkbox h-4 w-4 rounded border-gray-600 bg-[#101622] text-primary focus:ring-offset-background-dark focus:ring-primary"
                    type="checkbox"
                    checked={selectedType === t}
                    on:change={() => toggleType(t)}
                  />
                  <span
                    class={selectedType === t
                      ? 'text-white font-medium text-sm'
                      : 'text-text-secondary group-hover:text-white transition-colors text-sm'}
                  >
                    {t}
                  </span>
                </label>
              </li>
            {/each}
          {:else}
            <li class="text-sm text-text-secondary">Chưa có danh mục.</li>
          {/if}
        </ul>
      </div>

      <!-- Price Range -->
      <div class="bg-surface-dark rounded-xl p-5 border border-[#232f48]">
        <h3 class="mb-4 text-lg font-bold text-white">Khoảng giá</h3>
        <div class="flex items-center gap-2 mb-4">
          <div class="relative w-full">
            <span
              class="absolute text-xs -translate-y-1/2 left-2 top-1/2 text-text-secondary"
              >₫</span
            >
            <input
              class="w-full bg-[#101622] border border-[#232f48] rounded px-2 pl-4 py-1.5 text-xs text-white focus:border-primary focus:ring-0"
              type="number"
              bind:value={min}
              on:change={applyFilters}
            />
          </div>
          <span class="text-text-secondary">-</span>
          <div class="relative w-full">
            <span
              class="absolute text-xs -translate-y-1/2 left-2 top-1/2 text-text-secondary"
              >₫</span
            >
            <input
              class="w-full bg-[#101622] border border-[#232f48] rounded px-2 pl-4 py-1.5 text-xs text-white focus:border-primary focus:ring-0"
              type="number"
              bind:value={max}
              on:change={applyFilters}
            />
          </div>
        </div>
      </div>

      <!-- Brands -->
      <div class="bg-surface-dark rounded-xl p-5 border border-[#232f48]">
        <h3 class="mb-4 text-lg font-bold text-white">Thương hiệu</h3>
        <div class="flex flex-wrap gap-2">
          {#if data.facets.brands?.length}
            {#each data.facets.brands as b}
              <button
                type="button"
                on:click={() => toggleBrand(b)}
                class={selectedBrand === b
                  ? 'px-3 py-1.5 rounded-lg border border-primary bg-primary/10 text-xs text-primary font-bold transition-all'
                  : 'px-3 py-1.5 rounded-lg border border-[#232f48] bg-[#101622] text-xs text-white hover:border-primary hover:text-primary transition-all'}
              >
                {b}
              </button>
            {/each}
          {:else}
            <span class="text-sm text-text-secondary">Chưa có thương hiệu.</span
            >
          {/if}
        </div>
      </div>
    </aside>

    <!-- Product Grid Area -->
    <div class="flex-1">
      <!-- Toolbar -->
      <div
        class="bg-surface-dark rounded-xl p-4 mb-6 border border-[#232f48] flex flex-wrap items-center justify-between gap-4"
      >
        <div class="flex items-center flex-1 gap-4">
          <div class="relative hidden w-full max-w-xs sm:block">
            <span
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary"
            >
              <span class="text-lg material-symbols-outlined">search</span>
            </span>
            <input
              class="block w-full pl-9 pr-3 py-2 border border-[#232f48] rounded-lg bg-[#101622] text-white text-sm focus:border-primary focus:ring-0 placeholder:text-text-secondary"
              placeholder="Tìm trong danh sách..."
              type="text"
              bind:value={qInput}
              on:keydown={onSearchEnter}
            />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 mr-2">
            <span class="hidden text-sm text-text-secondary sm:inline"
              >Sắp xếp:</span
            >
            <select
              class="bg-[#101622] border border-[#232f48] text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
              bind:value={sort}
              on:change={onSortChange}
            >
              <option value="newest">Mới nhất</option>
              <option value="price_asc">Giá: Thấp đến Cao</option>
              <option value="price_desc">Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products -->
      {#if data.products.length === 0}
        <div
          class="bg-surface-dark rounded-xl p-8 border border-[#232f48] text-text-secondary"
        >
          Không tìm thấy sản phẩm phù hợp.
        </div>
      {:else}
        <div
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
        >
          {#each data.products as p}
            <a
              href={`/products/${p.slug}`}
              class="group bg-surface-dark rounded-2xl border border-[#232f48] overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full"
            >
              <div class="relative aspect-[4/3] bg-white overflow-hidden p-4">
                <img
                  alt={p.name}
                  class="object-contain object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
                  src={cover(p.images)}
                />
              </div>

              <div class="flex flex-col flex-1 p-5">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-text-secondary"
                    >{p.brand} • {p.type}</span
                  >
                  <span class="text-xs text-text-secondary"
                    >Kho: {p.quantity}</span
                  >
                </div>

                <h3
                  class="mb-2 text-lg font-bold leading-tight text-white transition-colors group-hover:text-primary line-clamp-2"
                >
                  {p.name}
                </h3>

                <div
                  class="flex items-center justify-between gap-3 pt-4 mt-auto"
                >
                  <!-- Price block -->
                  <div class="flex flex-col">
                    <p class="text-xl font-black text-white">
                      {formatVND(p.price)}
                    </p>
                    {#if p.old_price && Number(p.old_price) > Number(p.price ?? 0)}
                      <div class="flex items-center gap-2">
                        <span class="text-xs text-[#92a4c9] line-through"
                          >{formatVND(p.old_price)}</span
                        >
                        <span class="text-xs font-bold text-primary"
                          >-{Math.round(
                            ((Number(p.old_price) - Number(p.price)) /
                              Number(p.old_price)) *
                              100
                          )}%</span
                        >
                      </div>
                    {/if}
                  </div>
                  <!-- Add to cart -->
                  <button
                    type="button"
                    on:click|preventDefault|stopPropagation={() =>
                      addProductToCart(p)}
                    class="flex items-center justify-center w-10 h-10 text-white transition-all rounded-lg shadow-lg bg-primary hover:bg-blue-600 active:scale-95 shadow-blue-900/20"
                  >
                    <span class="material-symbols-outlined"
                      >add_shopping_cart</span
                    >
                  </button>
                </div>
              </div>
            </a>
          {/each}
        </div>
      {/if}

      <!-- Pagination -->
      {#if totalPages > 1}
        <div class="flex justify-center mt-12">
          <nav class="flex items-center gap-2">
            <button
              class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#232f48] bg-[#101622] text-text-secondary hover:text-white hover:border-primary transition-colors disabled:opacity-40"
              disabled={data.page <= 1}
              on:click={() => goPage(data.page - 1)}
            >
              <span class="material-symbols-outlined">chevron_left</span>
            </button>

            {#each pageNumbers as p}
              <button
                class={p === data.page
                  ? 'w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/25'
                  : 'w-10 h-10 flex items-center justify-center rounded-lg border border-[#232f48] bg-[#101622] text-text-secondary hover:text-white hover:border-primary transition-colors'}
                on:click={() => goPage(p)}
              >
                {p}
              </button>
            {/each}

            <button
              class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#232f48] bg-[#101622] text-text-secondary hover:text-white hover:border-primary transition-colors disabled:opacity-40"
              disabled={data.page >= totalPages}
              on:click={() => goPage(data.page + 1)}
            >
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </nav>
        </div>
      {/if}
    </div>
  </div>
  {#if toast}
    <div
      class="fixed top-3 right-24 z-[99999] bg-[#101622] border bg-primary/90 text-white px-4 py-2 rounded-lg shadow-xl shadow-black/40 animate-fade-in"
    >
      {toast}
    </div>
  {/if}
</main>
