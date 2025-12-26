<script lang="ts">
  import { page } from '$app/stores';
  import { goto, invalidateAll } from '$app/navigation';
  import { cart, cartTotals } from '$lib/stores/cart';
  import { supabase } from '$lib/supabase/client'; // bạn phải có file này

  let q = '';
  $: pathname = $page.url.pathname;

  // auth data từ (site)/+layout.server.ts
  $: user = $page.data?.user ?? null;
  $: profile = $page.data?.profile ?? null;

  const shortName = (name: string) => {
    const s = (name ?? '').trim();
    if (!s) return 'bạn';
    const parts = s.split(/\s+/);
    return parts[parts.length - 1];
  };

  // Menu link sửa theo /products params: type, brand
  const menu = [
    {
      key: 'laptop',
      label: 'Laptop',
      href: '/products?type=Laptop',
      mega: [
        {
          title: 'Thương hiệu',
          links: [
            { label: 'Tất cả', href: '/products?type=Laptop' },
            { label: 'Asus', href: '/products?type=Laptop&brand=Asus' },
            { label: 'Acer', href: '/products?type=Laptop&brand=Acer' },
            { label: 'MSI', href: '/products?type=Laptop&brand=MSI' },
            { label: 'Lenovo', href: '/products?type=Laptop&brand=Lenovo' },
          ],
        },
        {
          title: 'Dòng máy',
          links: [
            { label: 'Gaming', href: '/products?type=laptop&des=gaming' },
            { label: 'Văn phòng', href: '/products?type=laptop&des=office' },
            { label: 'Đồ hoạ', href: '/products?type=laptop&des=creator' },
            { label: 'Cao cấp', href: '/products?type=laptop&des=premium' },
          ],
        },
        {
          title: 'Sắp xếp',
          links: [
            { label: 'Mới nhất', href: '/products?type=Laptop&sort=newest' },
            {
              label: 'Giá tăng dần',
              href: '/products?type=Laptop&sort=price_asc',
            },
            {
              label: 'Giá giảm dần',
              href: '/products?type=Laptop&sort=price_desc',
            },
            {
              label: 'Dưới 20 Triệu',
              href: '/products?type=Laptop&min=0&max=20000000',
            },
            {
              label: '20 - 30 Triệu',
              href: '/products?type=Laptop&min=20000000&max=30000000',
            },
            {
              label: 'Trên 30 Triệu',
              href: '/products?type=Laptop&min=30000000&max=1000000000',
            },
          ],
        },
      ],
    },
    {
      key: 'monitor',
      label: 'Màn hình',
      href: '/products?type=Màn%20hình',
      mega: [
        {
          title: 'Thương hiệu',
          links: [
            { label: 'Tất cả', href: '/products?type=Màn%20hình' },
            { label: 'Dell', href: '/products?type=Màn%20hình&brand=Dell' },
            { label: 'LG', href: '/products?type=Màn%20hình&brand=LG' },
            { label: 'AOC', href: '/products?type=Màn%20hình&brand=AOC' },
          ],
        },
        {
          title: 'Kích thước',
          links: [
            { label: '24 inch', href: '/products?type=Màn%20hình&size=24' },
            { label: '27 inch', href: '/products?type=Màn%20hình&size=27' },
            { label: '32 inch', href: '/products?type=Màn%20hình&size=32' },
          ],
        },
        {
          title: 'Tần số quét',
          links: [
            { label: '75Hz', href: '/products?type=Màn%20hình&hz=75' },
            { label: '144Hz', href: '/products?type=Màn%20hình&hz=144' },
            { label: '240Hz+', href: '/products?type=Màn%20hình&hz=240' },
          ],
        },
      ],
    },
    {
      key: 'accessories',
      label: 'Phụ kiện khác',
      href: '/products',
      mega: [
        {
          title: 'Thiết bị',
          links: [
            { label: 'Bàn phím', href: '/products?type=Bàn%20phím' },
            { label: 'Chuột', href: '/products?type=Chuột' },
            { label: 'Tai nghe', href: '/products?type=Tai%20nghe' },
            { label: 'Lót chuột', href: '/products?type=Lót%20chuột' },
          ],
        },
        {
          title: 'Thương hiệu Bàn phím',
          links: [
            {
              label: 'Logitech',
              href: '/products?type=Bàn%20phím&brand=Logitech',
            },
            { label: 'Razer', href: '/products?type=Bàn%20phím&brand=Razer' },
            {
              label: 'Akko',
              href: '/products?type=Bàn%20phím&brand=Akko',
            },
            {
              label: 'Keychron',
              href: '/products?type=Bàn%20phím&brand=Keychron',
            },
            {
              label: 'HyperX',
              href: '/products?type=Bàn%20phím&brand=HyperX',
            },
            {
              label: 'Corsair',
              href: '/products?type=Bàn%20phím&brand=Corsair',
            },
            {
              label: 'DareU',
              href: '/products?type=Bàn%20phím&brand=DareU',
            },
          ],
        },
        {
          title: 'Thương hiệu Tai Nghe',
          links: [
            {
              label: 'Sony',
              href: '/products?type=Tai%20nghe&brand=Sony',
            },
            { label: 'Apple', href: '/products?type=Tai%20nghe&brand=Apple' },
            {
              label: 'Samsung',
              href: '/products?type=Tai%20nghe&brand=Samsung',
            },
            {
              label: 'JBL',
              href: '/products?type=Tai%20nghe&brand=JBL',
            },
            {
              label: 'Beats',
              href: '/products?type=Tai%20nghe&brand=Beats',
            },
            {
              label: 'Razer',
              href: '/products?type=Tai%20nghe&brand=Razer',
            },
            {
              label: 'HyperX',
              href: '/products?type=Tai%20nghe&brand=HyperX',
            },
          ],
        },
      ],
    },
  ];

  // dropdown state
  let openKey: string | null = null;
  let closeTimer: any = null;

  function openMenu(key: string) {
    if (closeTimer) clearTimeout(closeTimer);
    openKey = key;
  }
  function scheduleClose() {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(() => (openKey = null), 180);
  }
  function closeNow() {
    if (closeTimer) clearTimeout(closeTimer);
    openKey = null;
  }

  // function onSearchSubmit(e: Event) {
  //   e.preventDefault();
  //   const query = q.trim();
  //   window.location.href = query
  //     ? `/products?q=${encodeURIComponent(query)}`
  //     : '/products';
  // }

  function onSearchSubmit(e: Event) {
    e.preventDefault();
    const query = q.trim();
    goto(query ? `/products?q=${encodeURIComponent(query)}` : '/products');
  }

  async function logout() {
    await supabase.auth.signOut();

    // ép SvelteKit reload lại +layout.server.ts => user/profile = null
    await invalidateAll();

    // chuyển về trang chủ
    await goto('/');
  }

  $: count = cartTotals($cart.items).count;
</script>

<header
  class="w-full border-b border-[#232f48] bg-background-dark/95 backdrop-blur-md"
>
  <div class="mx-auto w-full max-w-[1200px] px-4 md:px-10 py-3">
    <div class="flex items-center justify-between gap-4">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="/" class="flex items-center gap-3 text-white shrink-0">
        <div
          class="flex items-center justify-center text-white rounded size-8 bg-primary"
        >
          <span class="material-symbols-outlined text-[20px]">diamond</span>
        </div>
        <h2
          class="text-white text-xl font-black leading-tight tracking-[-0.015em]"
        >
          TT STORE
        </h2>
      </a>

      <!-- search nhỏ lại để còn chỗ hello/logout -->
      <form class="flex-1 max-w-[620px]" on:submit={onSearchSubmit}>
        <div class="relative">
          <span
            class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#92a4c9]"
            >search</span
          >
          <input
            bind:value={q}
            class="w-full rounded-lg border border-[#232f48] bg-[#121a2a] pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-[#92a4c9] focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Tìm kiếm sản phẩm..."
            type="text"
          />
        </div>
      </form>

      {#if user}
        <div class="flex items-center gap-3 shrink-0">
          <a
            href="/account"
            class="hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 bg-[#232f48] hover:bg-[#2c3a55] text-white transition-colors"
            title="Tài khoản"
          >
            <span class="material-symbols-outlined">account_circle</span>
            <span class="text-sm"
              >Hello, {shortName(profile?.full_name ?? user.email)}</span
            >
            <!--Nếu có profile thì lấy fullname. Còn ko có thì lấy user.email-->
          </a>

          <button
            type="button"
            on:click={logout}
            class="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-[#232f48] hover:bg-red-600/80 text-white transition-colors"
            title="Đăng xuất"
          >
            <span class="material-symbols-outlined text-[20px]">logout</span>
            <span class="hidden text-sm font-medium md:inline">Logout</span>
          </button>

          <!-- mobile icon -->
          <a
            class="sm:hidden flex size-10 items-center justify-center rounded-lg bg-[#232f48] hover:bg-primary transition-colors text-white"
            href="/account"
            aria-label="Tài khoản"
          >
            <span class="material-symbols-outlined">account_circle</span>
          </a>
        </div>
      {:else}
        <a
          aria-label="Tài khoản / Đăng nhập"
          href="/auth/login"
          class="flex size-10 items-center justify-center rounded-lg bg-[#232f48] hover:bg-primary transition-colors text-white shrink-0"
        >
          <span class="material-symbols-outlined">account_circle</span>
        </a>
      {/if}
    </div>
  </div>
</header>

<div
  class="sticky top-0 z-[99999] border-b border-[#232f48] bg-background-dark/95 backdrop-blur-md"
>
  <div class="mx-auto w-full max-w-[1200px] px-4 md:px-10">
    <div class="flex items-center justify-between py-2">
      <nav class="flex items-center gap-2 md:gap-4">
        {#each menu as item}
          <div
            class="relative"
            role="presentation"
            on:mouseenter={() => openMenu(item.key)}
            on:mouseleave={scheduleClose}
          >
            <a
              href={item.href}
              class="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white transition-colors rounded-lg hover:text-primary"
              class:text-primary={openKey === item.key}
            >
              <span class="material-symbols-outlined text-[18px] opacity-90">
                {item.key === 'laptop'
                  ? 'laptop_mac'
                  : item.key === 'monitor'
                    ? 'monitor'
                    : 'devices_other'}
              </span>
              <span>{item.label}</span>
              <span class="material-symbols-outlined text-[18px] opacity-80"
                >expand_more</span
              >
            </a>

            {#if openKey === item.key}
              <div
                class="absolute left-0 top-full z-[100000] w-[760px] max-w-[calc(100vw-2rem)] rounded-xl border border-[#232f48] bg-[#2b3138] shadow-2xl overflow-hidden"
                role="presentation"
                on:mouseenter={() => openMenu(item.key)}
                on:mouseleave={scheduleClose}
              >
                <div class="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3">
                  {#each item.mega as col}
                    <div>
                      <div class="mb-3 text-sm font-semibold text-primary">
                        {col.title}
                      </div>
                      <div class="space-y-2">
                        {#each col.links as l}
                          <a
                            href={l.href}
                            class="block text-sm text-white/90 hover:text-white hover:underline underline-offset-4"
                          >
                            {l.label}
                          </a>
                        {/each}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/each}
        <div class="relative">
          <!-- ✅ Guest(chưa login): thêm "Kiểm tra đơn hàng" -->
          {#if !user}
            <a
              href="/account/orders"
              class="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white transition-colors rounded-lg hover:text-primary"
            >
              <span class="material-symbols-outlined text-[20px]"
                >receipt_long</span
              >
              Kiểm tra đơn hàng
            </a>
          {/if}
          <!-- ✅ Logged in: dropdown "Tài Khoản" -->
          {#if user}
            <div
              class="relative"
              role="presentation"
              on:mouseenter={() => openMenu('account')}
              on:mouseleave={scheduleClose}
            >
              <button
                type="button"
                class="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white transition-colors rounded-lg hover:text-primary"
                class:text-primary={openKey === 'account'}
              >
                <span class="material-symbols-outlined text-[20px]">person</span
                >
                Tài khoản
                <span class="material-symbols-outlined text-[18px] opacity-80"
                  >expand_more</span
                >
              </button>

              {#if openKey === 'account'}
                <div
                  class="absolute left-0 top-full mt-2 z-[100000] w-[320px] max-w-[calc(100vw-2rem)] rounded-xl border border-[#232f48] bg-[#2b3138] shadow-2xl overflow-hidden"
                  role="presentation"
                  on:mouseenter={() => openMenu('account')}
                  on:mouseleave={scheduleClose}
                >
                  <a
                    href="/account"
                    class="flex items-center gap-3 px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-[#232f48]/60"
                  >
                    <span class="material-symbols-outlined text-[20px]"
                      >badge</span
                    >
                    Thông tin cá nhân
                  </a>

                  <a
                    href="/account/orders"
                    class="flex items-center gap-3 px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-[#232f48]/60"
                  >
                    <span class="material-symbols-outlined text-[20px]"
                      >local_shipping</span
                    >
                    Đơn hàng của bạn
                  </a>

                  <div class="h-px my-1 bg-primary/30"></div>

                  <a
                    href="/account/change-password"
                    class="flex items-center gap-3 px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-[#232f48]/60"
                  >
                    <span class="material-symbols-outlined text-[20px]"
                      >encrypted</span
                    >
                    Đổi mật khẩu
                  </a>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </nav>

      <a
        aria-label="Giỏ hàng"
        href="/cart"
        class="relative flex size-10 items-center justify-center rounded-lg bg-[#232f48] hover:bg-primary transition-colors text-white"
      >
        <span class="material-symbols-outlined">shopping_bag</span>
        {#if count > 0}
          <span
            class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-[11px] leading-[18px] text-white text-center"
          >
            {count}
          </span>
        {/if}
      </a>
    </div>
  </div>

  {#if openKey}
    <button
      type="button"
      class="fixed inset-0 z-[99990] cursor-default"
      aria-label="Close menu overlay"
      on:click={closeNow}
      style="background: transparent;"
    />
  {/if}
</div>
