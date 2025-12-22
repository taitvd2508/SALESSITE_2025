<script lang="ts">
  import { onMount } from 'svelte';
  export let data: any;

  let forYou: any[] = [];

  // gallery state
  let selectedIndex = 0;

  let images: string[] = []

  // derived
  $: product = data?.product;
  $: title = product?.name ?? '';
  $: desc = product?.description ?? '';
  $: price = product?.price ?? 0;
  $: brand = product?.brand ?? '';
  $: type = product?.type ?? '';
  $: quantity = product?.quantity ?? 0;
  $: images = product?.images ?? [];
  $: cover = images?.[selectedIndex] ?? images?.[0] ?? '/images/placeholder-product.png';

  function vnd(n: number) {
    return new Intl.NumberFormat('vi-VN').format(n) + ' ₫';
  }

  function coverOf(p: any) {
    return p?.images?.[0] ?? '/images/placeholder-product.png';
  }

  // choose what to show in "Sản phẩm thường mua kèm"
  /*Ưu tiên hiển thị “Sản phẩm thường mua kèm”
  nếu có dữ liệu mua chung,
  ngược lại thì fallback sang “Đang thịnh hành”.*/
  $: relatedTitle = (data?.similarProducts?.length ?? 0) > 0 ? 'Sản phẩm thường mua kèm' : 'Đang thịnh hành';
  $: relatedProducts =
    (data?.similarProducts?.length ?? 0) > 0 ? (data?.similarProducts ?? []) : (data?.trendingProducts ?? []);

  onMount(async () => {
    const productId = data?.product?.id;
    if (!productId) return;

    // (A) track view_product (chặn spam)
    const key = `viewed_${productId}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');

      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'view_product',
          product_id: productId
        })
      });
    }

    // (B) for you
    const res = await fetch(`/api/recommendations?current=${productId}`);
    const js = await res.json();
    if (js?.ok) forYou = js.forYou ?? [];
  });
</script>

{#if data.productError}
  <p class="text-red-500 font-medium">Lỗi load sản phẩm: {data.productError}</p>
{/if}

<svelte:head>
  <title>{title ? `${title} | TT STORE` : 'Chi tiết sản phẩm | TT STORE'}</title>
</svelte:head>

<main class="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-6">
  <!-- Breadcrumbs -->
  <div class="flex flex-wrap gap-2 py-4 mb-4">
    <a class="text-[#92a4c9] hover:text-primary text-sm font-medium leading-normal" href="/">Trang chủ</a>
    <span class="text-[#92a4c9] text-sm font-medium leading-normal">/</span>
    <a class="text-[#92a4c9] hover:text-primary text-sm font-medium leading-normal" href={`/products?type=${encodeURIComponent(type)}`}>
      {type || 'Sản phẩm'}
    </a>
    <span class="text-[#92a4c9] text-sm font-medium leading-normal">/</span>
    <span class="text-white text-sm font-medium leading-normal">{title}</span>
  </div>

  <!-- Product Main Section -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
    <!-- Left: Gallery -->
    <div class="lg:col-span-7 flex flex-col gap-4">
      <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-dark border border-[#232f48] relative group cursor-zoom-in">
        <div
          class="absolute inset-0 bg-center bg-contain bg-no-repeat transition-transform duration-500 hover:scale-110"
          style={`background-image: url('${cover}');`}
        />
        <div class="absolute top-4 left-4 z-10">
          <span class="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">
            {brand || 'TT STORE'}
          </span>
        </div>
      </div>

      <div class="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {#if images.length > 0}
          {#each images as img, i}
            <button
              type="button"
              class={i === selectedIndex
                ? 'flex-shrink-0 w-24 h-24 rounded-lg border-2 border-primary bg-surface-dark overflow-hidden p-1'
                : 'flex-shrink-0 w-24 h-24 rounded-lg border border-[#232f48] bg-surface-dark overflow-hidden p-1 opacity-70 hover:opacity-100 transition-opacity'}
              on:click={() => (selectedIndex = i)}
            >
              <div class="w-full h-full bg-center bg-contain bg-no-repeat" style={`background-image: url('${img}');`} />
            </button>
          {/each}
        {:else}
          <button class="flex-shrink-0 w-24 h-24 rounded-lg border border-[#232f48] bg-surface-dark overflow-hidden p-1 opacity-70">
            <div class="w-full h-full bg-center bg-contain bg-no-repeat" style={`background-image: url('/images/placeholder-product.png');`} />
          </button>
        {/if}
      </div>
    </div>

    <!-- Right: Product Info (Sticky) -->
    <div class="lg:col-span-5 relative">
      <div class="lg:sticky lg:top-24 flex flex-col gap-6">
        <!-- Title & Rating -->
        <div>
          <h1 class="text-white text-3xl font-bold leading-tight mb-2">{title}</h1>
          <div class="flex items-center gap-4">
            <div class="flex items-center text-yellow-400">
              <span class="material-symbols-outlined text-[20px] fill-1">star</span>
              <span class="material-symbols-outlined text-[20px] fill-1">star</span>
              <span class="material-symbols-outlined text-[20px] fill-1">star</span>
              <span class="material-symbols-outlined text-[20px] fill-1">star</span>
              <span class="material-symbols-outlined text-[20px] fill-1">star_half</span>
            </div>
            <span class="text-[#92a4c9] text-sm font-medium border-l border-[#232f48] pl-4">128 đánh giá</span>

            {#if quantity > 0}
              <span class="text-green-500 text-sm font-medium flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">verified</span> Còn hàng
              </span>
            {:else}
              <span class="text-red-400 text-sm font-medium flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">block</span> Hết hàng
              </span>
            {/if}
          </div>
        </div>

        <!-- Price -->
        <div class="p-4 bg-surface-dark rounded-xl border border-[#232f48]">
          <div class="flex items-end gap-3">
            <span class="text-primary text-4xl font-bold tracking-tight">{vnd(price)}</span>

            {#if product?.old_price && product.old_price > price}
              <span class="text-[#92a4c9] text-lg font-semibold line-through">
                {vnd(product.old_price)}
              </span>

              <span class="px-2 py-1 rounded-md bg-primary/15 text-primary text-xs font-bold"> 
                {#if product?.old_price && Number(product.old_price) > Number(price)}  <!-- ép số khi tính -->
                  -{Math.round(((Number(product.old_price) - Number(price)) / Number(product.old_price)) * 100)}% 
                {/if}
              </span>
            {/if}
          </div>
          <p class="text-[#92a4c9] text-xs mt-2">Loại: {type || '—'} • Thương hiệu: {brand || '—'}</p>
        </div>

        <!-- Short Description -->
        <p class="text-[#92a4c9] text-base leading-relaxed">
          {desc || 'Sản phẩm chính hãng, chất lượng cao. Vui lòng xem thêm thông tin bên dưới.'}
        </p>

        <!-- Variants (giữ UI tĩnh để demo trước) -->
        <div class="flex flex-col gap-4">
          <div class="space-y-3">
            <span class="text-white text-sm font-bold">Màu sắc: <span class="text-[#92a4c9] font-normal">Tuỳ mẫu</span></span>
            <div class="flex gap-3">
              <button class="w-10 h-10 rounded-full bg-[#2e2c2e] border-2 border-white ring-2 ring-primary ring-offset-2 ring-offset-background-dark"></button>
              <button class="w-10 h-10 rounded-full bg-[#e3e4e5] border-2 border-transparent hover:border-white ring-offset-2 ring-offset-background-dark transition-all"></button>
            </div>
          </div>

          <div class="space-y-3">
            <span class="text-white text-sm font-bold">Cấu hình:</span>
            <div class="flex flex-wrap gap-3">
              <button class="px-4 py-2 rounded-lg border border-[#232f48] bg-[#232f48] text-white hover:border-primary transition-all">Tuỳ chọn</button>
              <button class="px-4 py-2 rounded-lg border-2 border-primary bg-primary/20 text-white font-medium">Mặc định</button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="pt-4 border-t border-[#232f48] flex flex-col gap-4">
          <div class="flex gap-4">
            <div class="flex items-center rounded-lg bg-surface-dark border border-[#232f48] h-12 w-32">
              <button class="w-10 h-full flex items-center justify-center text-white hover:bg-[#232f48] rounded-l-lg">
                <span class="material-symbols-outlined text-sm">remove</span>
              </button>
              <input class="w-full h-full bg-transparent text-center text-white border-none focus:ring-0 font-bold" readonly type="text" value="1" />
              <button class="w-10 h-full flex items-center justify-center text-white hover:bg-[#232f48] rounded-r-lg">
                <span class="material-symbols-outlined text-sm">add</span>
              </button>
            </div>

            <button class="flex-1 h-12 rounded-lg border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2" disabled={quantity <= 0}>
              <span class="material-symbols-outlined">add_shopping_cart</span>
              Thêm vào giỏ
            </button>
          </div>

          <button class="w-full h-14 rounded-lg bg-primary text-white text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20" disabled={quantity <= 0}>
            Mua ngay
          </button>
        </div>

        <!-- Policies -->
        <div class="grid grid-cols-2 gap-4 pt-2">
          <div class="flex items-start gap-3 p-3 rounded-lg bg-[#232f48]/30">
            <span class="material-symbols-outlined text-primary">verified_user</span>
            <div>
              <p class="text-white text-xs font-bold">Bảo hành chính hãng</p>
              <p class="text-[#92a4c9] text-[11px]">12 tháng</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-[#232f48]/30">
            <span class="material-symbols-outlined text-primary">local_shipping</span>
            <div>
              <p class="text-white text-xs font-bold">Miễn phí vận chuyển</p>
              <p class="text-[#92a4c9] text-[11px]">Toàn quốc</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Detailed Info Section (Tabs) - giữ tĩnh để demo -->
  <div class="mt-20">
    <div class="border-b border-[#232f48] flex gap-8 mb-8 overflow-x-auto">
      <button class="pb-4 border-b-2 border-primary text-primary font-bold text-base whitespace-nowrap">Mô tả sản phẩm</button>
      <button class="pb-4 border-b-2 border-transparent text-[#92a4c9] hover:text-white font-medium text-base whitespace-nowrap transition-colors">Thông số kỹ thuật</button>
      <button class="pb-4 border-b-2 border-transparent text-[#92a4c9] hover:text-white font-medium text-base whitespace-nowrap transition-colors">Đánh giá &amp; Nhận xét</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div class="lg:col-span-8 space-y-6 text-[#d1d5db]">
        <h3 class="text-2xl font-bold text-white">Mô tả</h3>
        <p class="leading-relaxed">{desc || 'Chưa có mô tả chi tiết.'}</p>

        {#if images.length > 0}
          <div class="rounded-xl overflow-hidden my-6">
            <img class="w-full object-cover" src={images[0]} alt={title} />
          </div>
        {/if}
      </div>

      <div class="lg:col-span-4">
        <div class="bg-surface-dark rounded-xl p-6 border border-[#232f48]">
          <h4 class="text-white font-bold mb-4">Thông tin nhanh</h4>
          <ul class="space-y-4">
            <li class="flex justify-between pb-3 border-b border-[#232f48]">
              <span class="text-[#92a4c9]">Thương hiệu</span>
              <span class="text-white font-medium">{brand || '—'}</span>
            </li>
            <li class="flex justify-between pb-3 border-b border-[#232f48]">
              <span class="text-[#92a4c9]">Loại</span>
              <span class="text-white font-medium">{type || '—'}</span>
            </li>
            <li class="flex justify-between pb-3 border-b border-[#232f48]">
              <span class="text-[#92a4c9]">Tồn kho</span>
              <span class="text-white font-medium">{quantity}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-[#92a4c9]">Giá</span>
              <span class="text-white font-medium">{vnd(price)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Related Products (data thật, đúng style card) -->
  <div class="mt-20 mb-12">
    <div class="flex items-center justify-between mb-8">
      <h3 class="text-2xl font-bold text-white">{relatedTitle}</h3>
      <div class="flex gap-2">
        <button class="w-10 h-10 rounded-full border border-[#232f48] flex items-center justify-center text-white hover:bg-[#232f48] transition-colors">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="w-10 h-10 rounded-full border border-[#232f48] flex items-center justify-center text-white hover:bg-[#232f48] transition-colors">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>

    {#if relatedProducts?.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each relatedProducts as p}
          <a href={`/products/${p.slug}`} class="group flex flex-col gap-4 rounded-lg p-3 hover:bg-[#1a2332] transition-colors border border-transparent hover:border-[#232f48]">
            <div class="w-full aspect-square bg-surface-dark rounded-lg flex items-center justify-center overflow-hidden relative">
              <div class="w-full h-full bg-center bg-contain bg-no-repeat group-hover:scale-105 transition-transform duration-500"
                   style={`background-image: url('${coverOf(p)}');`} />
              <button class="absolute bottom-3 right-3 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" type="button" on:click|preventDefault={() => {}}>
                <span class="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <div>
              <p class="text-[#92a4c9] text-xs font-bold mb-1">{p.type ?? 'Sản phẩm'}</p>
              <div class="text-white font-medium hover:text-primary line-clamp-2 mb-2 h-12">{p.name}</div>
              <div class="flex items-end gap-2">
              <p class="text-white font-bold">{vnd(p.price ?? 0)}</p>
              {#if p.old_price && p.old_price > (p.price ?? 0)}
                <p class="text-[#92a4c9] text-xs line-through font-semibold">
                  {vnd(p.old_price)}
                </p>
              {/if}
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="bg-surface-dark rounded-xl p-6 border border-[#232f48] text-[#92a4c9]">
        Chưa có đủ dữ liệu để gợi ý sản phẩm liên quan.
      </div>
    {/if}
  </div>

  <!-- For You (cùng style card) -->
  <div class="mt-16 mb-10">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-2xl font-bold text-white">Dành cho bạn</h3>
      <p class="text-[#92a4c9] text-sm">Dựa trên lịch sử xem của bạn</p>
    </div>

    {#if forYou.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each forYou as p}
          <a href={`/products/${p.slug}`} class="group flex flex-col gap-4 rounded-lg p-3 hover:bg-[#1a2332] transition-colors border border-transparent hover:border-[#232f48]">
            <div class="w-full aspect-square bg-surface-dark rounded-lg flex items-center justify-center overflow-hidden relative">
              <div class="w-full h-full bg-center bg-contain bg-no-repeat group-hover:scale-105 transition-transform duration-500"
                   style={`background-image: url('${coverOf(p)}');`} />
              <button class="absolute bottom-3 right-3 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" type="button" on:click|preventDefault={() => {}}>
                <span class="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <div>
              <p class="text-[#92a4c9] text-xs font-bold mb-1">{p.type ?? 'Gợi ý'}</p>
              <div class="text-white font-medium hover:text-primary line-clamp-2 mb-2 h-12">{p.name}</div>
              <p class="text-white font-bold">{vnd(p.price ?? 0)}</p>
              {#if p.old_price && p.old_price > (p.price ?? 0)}
                <p class="text-[#92a4c9] text-xs line-through font-semibold">
                  {vnd(p.old_price)}
                </p>
              {/if}
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="bg-surface-dark rounded-xl p-6 border border-[#232f48] text-[#92a4c9]">
        Chưa đủ hành vi xem để cá nhân hoá. Hãy xem vài sản phẩm, hệ thống sẽ gợi ý ngay.
      </div>
    {/if}
  </div>
</main>
