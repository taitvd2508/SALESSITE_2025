<!-- src/routes/(site)/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { cart } from '$lib/stores/cart';

  export let data: any;

  // admin không được mua
  $: isAdmin = $page.data.role === 'admin';

  let toast = '';
  let toastType: 'success' | 'warning' = 'success';
  let toastTimer: any;

  function showToast(msg: string, type: 'success' | 'warning' = 'success') {
    toast = msg;
    toastType = type;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast = ''), 2500);
  }

  const ATC_COOLDOWN_MS = 60_000;

  function vnd(n: number) {
    return new Intl.NumberFormat('vi-VN').format(Number(n ?? 0)) + ' ₫';
  }

  function coverOf(p: any) {
    return p?.images?.[0] ?? '/images/placeholder-product.png';
  }

  function toCartItem(p: any) {
    return {
      product_id: Number(p.id),
      slug: p.slug,
      name: p.name,
      price: Number(p.price),
      old_price: p.old_price ? Number(p.old_price) : null,
      image: p.images?.[0] ?? null,
    };
  }

  async function addCardToCart(p: any) {
    if (isAdmin) {
      showToast('Vui lòng sử dụng tài khoản khác để mua hàng', 'warning');
      return;
    }
    if (!p?.id) return;

    cart.add(toCartItem(p), 1);

    // track add_to_cart (giống trang product detail)
    const pid = Number(p.id);
    const key = `atc_${pid}`;
    const now = Date.now();
    const last = Number(sessionStorage.getItem(key) ?? '0');
    const shouldSend = now - last >= ATC_COOLDOWN_MS;

    if (shouldSend) {
      sessionStorage.setItem(key, String(now));
      try {
        await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ event_type: 'add_to_cart', product_id: pid }),
        });
      } catch {}
    }

    showToast('Đã thêm vào giỏ');
  }

  // data từ server
  $: trending = data?.trendingProducts ?? [];
  $: forYou = data?.forYou ?? [];
</script>

<svelte:head>
  <title>TT STORE - Phụ kiện công nghệ cao cấp</title>
</svelte:head>

<main class="flex flex-col items-center flex-1 w-full">
  <!-- Hero Section (giữ nguyên) -->
  <section class="w-full max-w-[1200px] px-4 md:px-10 py-6">
    <div class="@container">
      <div
        class="rounded-2xl overflow-hidden relative min-h-[500px] flex flex-col items-center justify-center bg-cover bg-center text-center p-6 md:p-12 shadow-2xl"
        data-alt="High-end dark futuristic workspace setup with neon lights"
        style="
          background-image: linear-gradient(
              rgba(16, 22, 34, 0.3) 0%,
              rgba(16, 22, 34, 0.8) 100%
            ),
            url('https://elabcalarempslfrkwbx.supabase.co/storage/v1/object/public/products/homepage/homePage_banner.png');
        "
      >
        <div class="flex flex-col max-w-2xl gap-4 animate-fade-in-up">
          <h1
            class="text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-lg"
          >
            Nâng Tầm <br /><span class="text-primary">Trải Nghiệm</span> Công Nghệ
          </h1>
          <h2
            class="max-w-xl mx-auto text-lg font-normal leading-normal text-gray-200 md:text-xl drop-shadow-md"
          >
            Bộ sưu tập phụ kiện cao cấp chính hãng dành cho không gian làm việc
            chuyên nghiệp và setup gaming đỉnh cao.
          </h2>
          <div class="pt-4">
            <a
              href="/products"
              class="inline-flex items-center justify-center h-12 px-8 text-base font-bold text-white transition-all transform rounded-lg shadow-lg cursor-pointer bg-primary hover:bg-blue-600 hover:scale-105 shadow-primary/30"
            >
              Mua ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Categories (giữ UI, đổi href cho đúng) -->
  <section class="w-full max-w-[1200px] px-4 md:px-10 py-10">
    <div class="flex items-end justify-between mb-6">
      <h2
        class="text-white text-2xl font-bold leading-tight tracking-[-0.015em]"
      >
        Danh mục sản phẩm
      </h2>
      <a
        class="text-sm font-bold text-primary hover:underline"
        href="/products"
      >
        Xem tất cả
      </a>
    </div>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-5">
      <!-- Laptop -->
      <a
        class="flex flex-col gap-3 pb-3 cursor-pointer group"
        href="/products?type=Laptop"
      >
        <div
          class="relative w-full overflow-hidden transition-all border aspect-square bg-card-dark rounded-xl border-white/5 group-hover:border-primary/50"
        >
          <div
            class="absolute inset-0 transition-transform duration-500 bg-center bg-no-repeat bg-contain group-hover:scale-110"
            style="background-image: url('https://elabcalarempslfrkwbx.supabase.co/storage/v1/object/public/products/homepage/laptop.png');"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent opacity-60"
          />
          <div class="absolute bottom-3 left-3">
            <p class="text-base font-bold text-white">Laptop</p>
          </div>
        </div>
      </a>

      <!-- Màn hình -->
      <a
        class="flex flex-col gap-3 pb-3 cursor-pointer group"
        href="/products?type=Màn%20hình"
      >
        <div
          class="relative w-full overflow-hidden transition-all border aspect-square bg-card-dark rounded-xl border-white/5 group-hover:border-primary/50"
        >
          <div
            class="absolute inset-0 transition-transform duration-500 bg-center bg-no-repeat bg-cover group-hover:scale-110"
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhW9nR2spufqZJIreicg08KAuU5TJGiDwOnAMeAeUX2HF1Mdx8SZgTOdicqPLBatBy9bx2N-oMbXCnUQmordDdhh-YhlwD7N0hgNxq-J0Dw1CPTc4nrs8uNmvZPRbguT6OCweWR176nmXadPEEAD_x0etj4ckdX_j-RelmyRlflGIzE8fJgtG9xdeJNwRLH0K3Gt-kTMLQZ-LpJ6tUn-Mjib_N_0uEN7aD_FndjA7dxjUvVu7tOF_g_ZfXcRunIMzF9nkEsuatsg');"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent opacity-60"
          />
          <div class="absolute bottom-3 left-3">
            <p class="text-base font-bold text-white">Màn hình</p>
          </div>
        </div>
      </a>

      <!-- Tai nghe -->
      <a
        class="flex flex-col gap-3 pb-3 cursor-pointer group"
        href="/products?type=Tai%20nghe"
      >
        <div
          class="relative w-full overflow-hidden transition-all border aspect-square bg-card-dark rounded-xl border-white/5 group-hover:border-primary/50"
        >
          <div
            class="absolute inset-0 transition-transform duration-500 bg-center bg-no-repeat bg-cover group-hover:scale-110"
            style="background-image: url('https://elabcalarempslfrkwbx.supabase.co/storage/v1/object/public/products/homepage/earphone.png');"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent opacity-60"
          />
          <div class="absolute bottom-3 left-3">
            <p class="text-base font-bold text-white">Tai nghe</p>
          </div>
        </div>
      </a>

      <!-- Chuột -->
      <a
        class="flex flex-col gap-3 pb-3 cursor-pointer group"
        href="/products?type=chuột"
      >
        <div
          class="relative w-full overflow-hidden transition-all border aspect-square bg-card-dark rounded-xl border-white/5 group-hover:border-primary/50"
        >
          <div
            class="absolute inset-0 transition-transform duration-500 bg-center bg-no-repeat bg-cover group-hover:scale-110"
            style="background-image: url('https://elabcalarempslfrkwbx.supabase.co/storage/v1/object/public/products/homepage/mouse.png');"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent opacity-60"
          />
          <div class="absolute bottom-3 left-3">
            <p class="text-base font-bold text-white">Chuột</p>
          </div>
        </div>
      </a>

      <!-- Bàn phím -->
      <a
        class="flex flex-col gap-3 pb-3 cursor-pointer group"
        href="/products?type=bàn%20phím"
      >
        <div
          class="relative w-full overflow-hidden transition-all border aspect-square bg-card-dark rounded-xl border-white/5 group-hover:border-primary/50"
        >
          <div
            class="absolute inset-0 transition-transform duration-500 bg-center bg-no-repeat bg-cover group-hover:scale-110"
            style="background-image: url('https://elabcalarempslfrkwbx.supabase.co/storage/v1/object/public/products/homepage/keyboard.png');"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent opacity-60"
          />
          <div class="absolute bottom-3 left-3">
            <p class="text-base font-bold text-white">Bàn phím</p>
          </div>
        </div>
      </a>
    </div>
  </section>

  <!-- Trending (thay cho “Sản phẩm bán chạy” static) -->
  <section class="w-full max-w-[1200px] px-4 md:px-10 py-10">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <span class="text-yellow-500 material-symbols-outlined"
          >local_fire_department</span
        >
        <h2
          class="text-white text-2xl font-bold leading-tight tracking-[-0.015em]"
        >
          Đang thịnh hành
        </h2>
      </div>
      <a
        class="text-sm font-bold text-primary hover:underline"
        href="/products"
      >
        Xem tất cả
      </a>
    </div>

    {#if trending.length > 0}
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {#each trending as p}
          <a
            href={`/products/${p.slug}`}
            class="group flex flex-col gap-4 rounded-lg p-3 hover:bg-[#1a2332] transition-colors border border-transparent hover:border-[#232f48]"
          >
            <div
              class="relative flex items-center justify-center w-full overflow-hidden rounded-lg aspect-square bg-surface-dark"
            >
              <div
                class="w-full h-full transition-transform duration-500 bg-center bg-no-repeat bg-contain group-hover:scale-105"
                style={`background-image: url('${coverOf(p)}');`}
              />
              <button
                class="absolute flex items-center justify-center w-10 h-10 text-white transition-opacity rounded-full shadow-lg opacity-0 bg-primary hover:bg-blue-600 bottom-3 right-3 group-hover:opacity-100"
                type="button"
                on:click|preventDefault|stopPropagation={() => addCardToCart(p)}
              >
                <span class="text-sm material-symbols-outlined">add</span>
              </button>
            </div>

            <div>
              <p class="text-[#92a4c9] text-xs font-bold mb-1">
                {p.type ?? 'Sản phẩm'}
              </p>
              <div
                class="h-12 mb-2 font-medium text-white hover:text-primary line-clamp-2"
              >
                {p.name}
              </div>

              <div class="flex items-end gap-2">
                <p class="font-bold text-white">{vnd(p.price ?? 0)}</p>
                {#if p.old_price && p.old_price > (p.price ?? 0)}
                  <p class="text-[#92a4c9] text-xs line-through font-semibold">
                    {vnd(p.old_price)}
                  </p>
                {/if}
              </div>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div
        class="bg-surface-dark rounded-xl p-6 border border-[#232f48] text-[#92a4c9]"
      >
        Chưa có dữ liệu thịnh hành.
      </div>
    {/if}
  </section>

  <!-- Personalized Recommendations (giữ 2 banner setup như bạn) -->
  <section class="w-full max-w-[1200px] px-4 md:px-10 py-10">
    <h2
      class="text-white text-2xl font-bold leading-tight tracking-[-0.015em] mb-6"
    >
      Dành riêng cho bạn
    </h2>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Setup Card 1 -->
      <div
        class="relative h-64 overflow-hidden cursor-pointer rounded-2xl md:h-80 group"
      >
        <div
          class="absolute inset-0 transition-transform duration-700 bg-center bg-cover group-hover:scale-105"
          style="background-image: url('https://elabcalarempslfrkwbx.supabase.co/storage/v1/object/public/products/homepage/banner2.png');"
        />
        <div
          class="absolute inset-0 transition-colors bg-black/50 group-hover:bg-black/40"
        />
        <div class="absolute bottom-0 left-0 p-8">
          <span
            class="inline-block px-3 py-1 mb-3 text-xs font-bold text-white rounded bg-primary"
            >Office</span
          >
          <h3 class="mb-2 text-3xl font-bold text-white">Minimalist Setup</h3>
          <p class="max-w-xs mb-4 text-sm text-gray-200">
            Tinh tế, gọn gàng. Phụ kiện không dây giúp bàn làm việc thoáng đãng.
          </p>
          <a class="text-sm font-medium text-white underline" href="/products">
            Khám phá ngay
          </a>
        </div>
      </div>

      <!-- Setup Card 2 -->
      <div
        class="relative h-64 overflow-hidden cursor-pointer rounded-2xl md:h-80 group"
      >
        <div
          class="absolute inset-0 transition-transform duration-700 bg-center bg-cover group-hover:scale-105"
          style="background-image: url('https://elabcalarempslfrkwbx.supabase.co/storage/v1/object/public/products/homepage/banner3.png');"
        />
        <div
          class="absolute inset-0 transition-colors bg-black/50 group-hover:bg-black/40"
        />
        <div class="absolute bottom-0 left-0 p-8">
          <span
            class="inline-block px-3 py-1 mb-3 text-xs font-bold text-white bg-purple-600 rounded"
            >Gaming</span
          >
          <h3 class="mb-2 text-3xl font-bold text-white">Pro Gamer Space</h3>
          <p class="max-w-xs mb-4 text-sm text-gray-200">
            Hiệu năng cao, LED RGB rực rỡ. Nâng tầm trải nghiệm chiến game.
          </p>
          <a class="text-sm font-medium text-white underline" href="/products">
            Khám phá ngay
          </a>
        </div>
      </div>
    </div>

    <!-- Grid forYou (data thật) -->
    <div class="mt-10">
      <div class="flex items-center justify-between mb-6">
        <p class="text-[#92a4c9] text-sm">Gợi ý dựa trên lịch sử xem của bạn</p>
      </div>

      {#if forYou.length > 0}
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {#each forYou as p}
            <a
              href={`/products/${p.slug}`}
              class="group flex flex-col gap-4 rounded-lg p-3 hover:bg-[#1a2332] transition-colors border border-transparent hover:border-[#232f48]"
            >
              <div
                class="relative flex items-center justify-center w-full overflow-hidden rounded-lg aspect-square bg-surface-dark"
              >
                <div
                  class="w-full h-full transition-transform duration-500 bg-center bg-no-repeat bg-contain group-hover:scale-105"
                  style={`background-image: url('${coverOf(p)}');`}
                />
                <button
                  class="absolute flex items-center justify-center w-10 h-10 text-white transition-opacity rounded-full shadow-lg opacity-0 bg-primary hover:bg-blue-600 bottom-3 right-3 group-hover:opacity-100"
                  type="button"
                  on:click|preventDefault|stopPropagation={() =>
                    addCardToCart(p)}
                >
                  <span class="text-sm material-symbols-outlined">add</span>
                </button>
              </div>

              <div>
                <p class="text-[#92a4c9] text-xs font-bold mb-1">
                  {p.type ?? 'Gợi ý'}
                </p>
                <div
                  class="h-12 mb-2 font-medium text-white hover:text-primary line-clamp-2"
                >
                  {p.name}
                </div>

                <div class="flex items-end gap-2">
                  <p class="font-bold text-white">{vnd(p.price ?? 0)}</p>
                  {#if p.old_price && p.old_price > (p.price ?? 0)}
                    <p
                      class="text-[#92a4c9] text-xs line-through font-semibold"
                    >
                      {vnd(p.old_price)}
                    </p>
                  {/if}
                </div>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div
          class="bg-surface-dark rounded-xl p-6 border border-[#232f48] text-[#92a4c9]"
        >
          Chưa đủ hành vi xem để cá nhân hoá. Hãy xem vài sản phẩm, hệ thống sẽ
          gợi ý ngay.
        </div>
      {/if}
    </div>
  </section>

  <!-- Voucher Banner (giữ nguyên) -->
  <section class="w-full max-w-[1200px] px-4 md:px-10 py-6">
    <div
      class="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 to-[#111722] border border-primary/30"
    >
      <div
        class="absolute top-0 right-0 p-32 bg-primary/20 blur-[100px] rounded-full"
      />
      <div
        class="relative z-10 flex flex-col items-center justify-between gap-6 p-8 md:flex-row md:p-12"
      >
        <div class="flex flex-col gap-2 text-center md:text-left">
          <h3 class="text-2xl font-black text-white md:text-3xl">
            Ưu đãi tháng 10
          </h3>
          <p class="text-gray-300">
            Giảm ngay <span class="font-bold text-primary">500.000₫</span> cho đơn
            hàng từ 5 triệu.
          </p>
        </div>
        <div
          class="flex items-center gap-3 p-2 border rounded-lg bg-white/10 border-white/10 backdrop-blur-sm"
        >
          <div class="px-4 py-2 border-r border-white/20">
            <span class="block text-xs text-gray-400">MÃ VOUCHER</span>
            <span class="font-mono text-lg font-bold tracking-wider text-white"
              >TTSTORE10</span
            >
          </div>
          <button
            class="px-4 py-2 text-sm font-bold text-white transition-colors rounded bg-primary hover:bg-blue-600"
          >
            Lưu mã
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials (giữ nguyên phần của bạn) -->
  <section class="w-full max-w-[1200px] px-4 md:px-10 py-10 pb-20">
    <div class="mb-10 text-center">
      <h2 class="mb-2 text-2xl font-bold text-white"></h2>
      <div class="flex justify-center gap-1 text-yellow-400">
        <span class="material-symbols-outlined">star</span>
        <span class="material-symbols-outlined">star</span>
        <span class="material-symbols-outlined">star</span>
        <span class="material-symbols-outlined">star</span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <!-- giữ nguyên 3 card đánh giá của bạn -->
      <!-- ... bạn paste y nguyên phần testimonials ở đây ... -->
    </div>
  </section>

  {#if toast}
    <div
      class="fixed top-3 right-24 z-[99999] border text-white px-4 py-2 rounded-lg shadow-xl shadow-black/40 animate-fade-in flex items-center gap-2"
      class:bg-primary={toastType === 'success'}
      class:bg-amber-600={toastType === 'warning'}
    >
      {#if toastType === 'warning'}
        <span class="text-lg material-symbols-outlined">warning</span>
      {/if}
      {toast}
    </div>
  {/if}
</main>
