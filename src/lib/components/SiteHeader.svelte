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
  $: role = $page.data?.role ?? null;
  $: isAdminOrStaff = role === 'admin' || role === 'staff';

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

  function isDesktop() {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 768px)').matches
    );
  }

  function openMenuDesktopOnly(key: string) {
    if (!isDesktop()) return;
    openMenu(key);
  }

  function scheduleCloseDesktopOnly() {
    if (!isDesktop()) return;
    scheduleClose();
  }

  let mobileOpenKey: string | null = null;
  let mobileCatalogOpen = false;

  function toggleMobileMenu(key: string) {
    mobileOpenKey = mobileOpenKey === key ? null : key;
  }

  function toggleCatalog() {
    mobileCatalogOpen = !mobileCatalogOpen;
    if (!mobileCatalogOpen) mobileOpenKey = null;
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
    <div class="flex items-center justify-between gap-3">
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

      <!-- SEARCH FORM -->
      <form
        class="w-full sm:flex-1 sm:max-w-[1000px]"
        on:submit={onSearchSubmit}
      >
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
    </div>
  </div>
</header>

<!--MENU 2-->
<div
  class="sticky top-0 z-[99999] border-b border-[#232f48] bg-background-dark/95 backdrop-blur-md"
>
  <div class="mx-auto w-full max-w-[1200px] px-4 md:px-10">
    <!-- MENU 2 - MOBILE -->
    <div
      class="flex items-center justify-between w-full gap-2 md:hidden flex-nowrap"
    >
      <button
        type="button"
        class="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#232f48] bg-[#121a2a] text-white shrink-0"
        on:click={toggleCatalog}
      >
        <span class="material-symbols-outlined text-[22px]">
          {mobileCatalogOpen ? 'close' : 'menu'}
        </span>
        <span class="text-sm font-semibold">Danh mục</span>
      </button>
      <!-- ACCOUNT + CART -->
      <div class="flex items-center gap-2 shrink-0">
        {#if user}
          <a
            href="/account"
            class="flex items-center gap-2 rounded-lg px-3 py-2 bg-[#232f48] hover:bg-[#2c3a55] text-white transition-colors"
            title="Tài khoản"
          >
            <span class="material-symbols-outlined">account_circle</span>
            <span class="text-sm"
              >Hello, {shortName(profile?.full_name ?? user.email)}</span
            >
            <!--Nếu có profile thì lấy fullname. Còn ko có thì lấy user.email-->
          </a>
        {:else}
          <a
            aria-label="Tài khoản / Đăng nhập"
            href="/auth/login"
            class="flex size-10 items-center justify-center rounded-lg bg-[#232f48] hover:bg-primary transition-colors text-white"
          >
            <span class="material-symbols-outlined">account_circle</span>
          </a>
        {/if}
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

    {#if mobileCatalogOpen}
      <!-- lớp nền click để đóng -->
      <div
        role="presentation"
        class="fixed inset-0 z-[99990] bg-black/40 md:hidden"
        on:click={() => (mobileCatalogOpen = false)}
      ></div>

      <!-- panel -->
      <div
        role="presentation"
        class="fixed left-4 right-4 top-[72px] z-[99999] md:hidden rounded-2xl border border-[#232f48] bg-[#2b3138] shadow-2xl overflow-hidden"
        on:click|stopPropagation
      >
        <!-- 2) 3 danh mục accordion (dùng item.mega như desktop) -->
        <div class="divide-y divide-[#232f48]">
          {#each menu as item}
            <div>
              <button
                type="button"
                class="flex items-center justify-between w-full px-4 py-3 text-white"
                on:click={() =>
                  (mobileOpenKey =
                    mobileOpenKey === item.key ? null : item.key)}
              >
                <span class="flex items-center gap-3">
                  <span
                    class="material-symbols-outlined text-[20px] opacity-90"
                  >
                    {item.key === 'laptop'
                      ? 'laptop_mac'
                      : item.key === 'monitor'
                        ? 'monitor'
                        : 'devices_other'}
                  </span>
                  <span class="font-medium">{item.label}</span>
                </span>

                <span class="material-symbols-outlined text-[22px] opacity-90">
                  {mobileOpenKey === item.key ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {#if mobileOpenKey === item.key}
                <div class="bg-[#0f1729] px-4 pb-4">
                  <div class="grid grid-cols-1 gap-6 pt-3 sm:grid-cols-2">
                    {#each item.mega as col}
                      <div>
                        <div class="mb-2 text-sm font-semibold text-primary">
                          {col.title}
                        </div>
                        <div class="space-y-2">
                          {#each col.links as l}
                            <a
                              href={l.href}
                              class="block text-sm text-white/90 hover:text-white hover:underline underline-offset-4"
                              on:click={() => {
                                mobileCatalogOpen = false;
                                mobileOpenKey = null;
                              }}
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

          <!-- 3) Tài khoản accordion (đúng theo block bạn đưa) -->
          <div>
            <button
              type="button"
              class="flex items-center justify-between w-full px-4 py-3 text-white"
              on:click={() =>
                (mobileOpenKey =
                  mobileOpenKey === 'account' ? null : 'account')}
            >
              <span class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px]">person</span
                >
                <span class="font-medium">Tài khoản</span>
              </span>
              <span class="material-symbols-outlined text-[22px] opacity-90">
                {mobileOpenKey === 'account' ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {#if mobileOpenKey === 'account'}
              <div class="bg-[#0f1729]">
                {#if !user}
                  <a
                    href="/account/orders"
                    class="flex items-center gap-3 px-10 py-3 text-sm text-white/90 hover:bg-[#232f48]/60"
                    on:click={() => (mobileCatalogOpen = false)}
                  >
                    <span class="material-symbols-outlined text-[20px]"
                      >receipt_long</span
                    >
                    Kiểm tra đơn hàng
                  </a>
                {:else}
                  <a
                    href="/account"
                    class="flex items-center gap-3 px-10 py-3 text-sm text-white/90 hover:bg-[#232f48]/60"
                    on:click={() => (mobileCatalogOpen = false)}
                  >
                    <span class="material-symbols-outlined text-[20px]"
                      >badge</span
                    >
                    Thông tin cá nhân
                  </a>

                  <a
                    href="/account/orders"
                    class="flex items-center gap-3 px-10 py-3 text-sm text-white/90 hover:bg-[#232f48]/60"
                    on:click={() => (mobileCatalogOpen = false)}
                  >
                    <span class="material-symbols-outlined text-[20px]"
                      >local_shipping</span
                    >
                    Đơn hàng của bạn
                  </a>

                  <div class="h-px my-1 bg-primary/30"></div>

                  <a
                    href="/account/change-password"
                    class="flex items-center gap-3 px-10 py-3 text-sm text-white/90 hover:bg-[#232f48]/60"
                    on:click={() => (mobileCatalogOpen = false)}
                  >
                    <span class="material-symbols-outlined text-[20px]"
                      >encrypted</span
                    >
                    Đổi mật khẩu
                  </a>

                  <button
                    type="button"
                    class="w-full text-left flex items-center gap-3 px-10 py-3 text-sm text-white/90 hover:bg-[#232f48]/60"
                    on:click={() => {
                      mobileCatalogOpen = false;
                      logout();
                    }}
                  >
                    <span class="material-symbols-outlined text-[20px]"
                      >logout</span
                    >
                    Đăng xuất
                  </button>
                {/if}
              </div>
            {/if}
          </div>

          <!-- 4) Administrator -->
          {#if isAdminOrStaff}
            <a
              href="/admin"
              class="flex items-center justify-between px-4 py-3 text-white hover:bg-[#232f48]/60"
              on:click={() => (mobileCatalogOpen = false)}
            >
              <span class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px]"
                  >admin_panel_settings</span
                >
                <span class="font-medium">Administrator</span>
              </span>
              <span class="material-symbols-outlined text-[20px] opacity-80"
                >chevron_right</span
              >
            </a>
          {/if}
        </div>
      </div>
    {/if}

    <!-- MENU 2 - DESKTOP -->
    <div class="items-center justify-between hidden py-2 md:flex">
      <nav class="flex items-center flex-1 min-w-0">
        <div
          class="flex items-center flex-1 min-w-0 gap-2 pr-2 overflow-x-auto md:gap-4 whitespace-nowrap md:overflow-visible"
        >
          {#each menu as item}
            <div
              class="relative"
              role="presentation"
              on:mouseenter={() => openMenuDesktopOnly(item.key)}
              on:mouseleave={scheduleCloseDesktopOnly}
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
                  class="hidden md:block absolute left-0 top-full z-[100000] w-[760px] max-w-[calc(100vw-2rem)] rounded-xl border border-[#232f48] bg-[#2b3138] shadow-2xl overflow-hidden"
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
                on:mouseenter={() => openMenuDesktopOnly('account')}
                on:mouseleave={scheduleCloseDesktopOnly}
              >
                <button
                  type="button"
                  class="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white transition-colors rounded-lg hover:text-primary"
                  class:text-primary={openKey === 'account'}
                >
                  <span class="material-symbols-outlined text-[20px]"
                    >person</span
                  >
                  Tài khoản
                  <span class="material-symbols-outlined text-[18px] opacity-80"
                    >expand_more</span
                  >
                </button>

                {#if openKey === 'account'}
                  <div
                    class="hidden md:block absolute left-0 top-full mt-2 z-[100000] w-[320px] max-w-[calc(100vw-2rem)] rounded-xl border border-[#232f48] bg-[#2b3138] shadow-2xl overflow-hidden"
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
                    <button
                      on:click={logout}
                      class="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-[#232f48]/60"
                      title="Logout"
                    >
                      <span class="material-symbols-outlined text-[20px]"
                        >logout</span
                      >Đăng xuất
                    </button>
                  </div>
                {/if}
              </div>
            {/if}
          </div>
          <div class="relative">
            {#if isAdminOrStaff}
              <a
                href="/admin"
                class="items-center hidden gap-1 px-3 py-2 text-sm font-medium text-white transition-colors rounded-lg md:inline-flex hover:text-primary"
                title="Administrator"
              >
                <span class="material-symbols-outlined text-[20px]"
                  >admin_panel_settings</span
                >
                <span class="text-sm font-semibold">Administrator</span>
              </a>

              <!-- mobile icon-only -->
              <a
                href="/admin"
                class="md:hidden flex size-10 items-center justify-center rounded-lg bg-[#232f48] hover:bg-[#2c3a55] text-white transition-colors"
                aria-label="Administrator"
                title="Administrator"
              >
                <span class="material-symbols-outlined"
                  >admin_panel_settings</span
                >
              </a>
            {/if}
          </div>
        </div>
      </nav>

      <!-- ACCOUNT + CART -->
      <div class="flex items-center gap-2 shrink-0">
        {#if user}
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
        {:else}
          <a
            aria-label="Tài khoản / Đăng nhập"
            href="/auth/login"
            class="flex size-10 items-center justify-center rounded-lg bg-[#232f48] hover:bg-primary transition-colors text-white shrink-0"
          >
            <span class="material-symbols-outlined">account_circle</span>
          </a>
        {/if}
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
