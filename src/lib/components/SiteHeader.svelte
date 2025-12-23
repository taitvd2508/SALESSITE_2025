<script>
  import { page } from "$app/stores";
  import { cart, cartTotals } from '$lib/stores/cart';

  // Mega menu data
  const menu = [
    {
      key: "laptop",
      label: "Laptop",
      href: "/products?cat=laptop",
      mega: [
        {
          title: "Thương hiệu",
          links: [
            { label: "Tất cả", href: "/products?cat=laptop" },
            { label: "Asus", href: "/products?cat=laptop&brand=asus" },
            { label: "Acer", href: "/products?cat=laptop&brand=acer" },
            { label: "MSI", href: "/products?cat=laptop&brand=msi" },
            { label: "Lenovo", href: "/products?cat=laptop&brand=lenovo" }
          ]
        },
        {
          title: "Dòng máy",
          links: [
            { label: "Gaming", href: "/products?cat=laptop&type=gaming" },
            { label: "Văn phòng", href: "/products?cat=laptop&type=office" },
            { label: "Đồ hoạ", href: "/products?cat=laptop&type=creator" },
            { label: "Cao cấp", href: "/products?cat=laptop&type=premium" }
          ]
        },
        {
          title: "Mức giá",
          links: [
            { label: "Dưới 20 triệu", href: "/products?cat=laptop&price=under20" },
            { label: "20 - 25 triệu", href: "/products?cat=laptop&price=20-25" },
            { label: "25 - 30 triệu", href: "/products?cat=laptop&price=25-30" },
            { label: "Trên 30 triệu", href: "/products?cat=laptop&price=over30" }
          ]
        }
      ]
    },
    {
      key: "monitor",
      label: "Màn hình",
      href: "/products?cat=monitor",
      mega: [
        {
          title: "Nhu cầu",
          links: [
            { label: "Gaming", href: "/products?cat=monitor&type=gaming" },
            { label: "Đồ hoạ", href: "/products?cat=monitor&type=graphic" },
            { label: "Văn phòng", href: "/products?cat=monitor&type=office" }
          ]
        },
        {
          title: "Kích thước",
          links: [
            { label: "24 inch", href: "/products?cat=monitor&size=24" },
            { label: "27 inch", href: "/products?cat=monitor&size=27" },
            { label: "32 inch", href: "/products?cat=monitor&size=32" }
          ]
        },
        {
          title: "Tần số quét",
          links: [
            { label: "75Hz", href: "/products?cat=monitor&hz=75" },
            { label: "144Hz", href: "/products?cat=monitor&hz=144" },
            { label: "240Hz+", href: "/products?cat=monitor&hz=240" }
          ]
        }
      ]
    },
    {
      key: "accessories",
      label: "Phụ kiện khác",
      href: "/products?cat=accessories",
      mega: [
        {
          title: "Thiết bị",
          links: [
            { label: "Bàn phím", href: "/products?cat=keyboard" },
            { label: "Chuột", href: "/products?cat=mouse" },
            { label: "Tai nghe", href: "/products?cat=audio" },
            { label: "Lót chuột", href: "/products?cat=mousepad" }
          ]
        },
        {
          title: "Thương hiệu",
          links: [
            { label: "Logitech", href: "/products?cat=accessories&brand=logitech" },
            { label: "Razer", href: "/products?cat=accessories&brand=razer" },
            { label: "Corsair", href: "/products?cat=accessories&brand=corsair" },
            { label: "Keychron", href: "/products?cat=accessories&brand=keychron" }
          ]
        },
        {
          title: "Khác",
          links: [
            { label: "Khuyến mãi", href: "/products?sale=1" },
            { label: "Hàng mới về", href: "/products?sort=new" },
            { label: "Bán chạy", href: "/products?sort=best" }
          ]
        }
      ]
    }
  ];

  let q = "";
  $: pathname = $page.url.pathname;

  // --- dropdown state (JS-controlled, không bị rớt hover)
  let openKey = null;
  let closeTimer = null;

  function openMenu(key) {
    if (closeTimer) clearTimeout(closeTimer);
    openKey = key;
  }

  function scheduleClose() {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      openKey = null;
    }, 180);
  }

  function closeNow() {
    if (closeTimer) clearTimeout(closeTimer);
    openKey = null;
  }

  function onSearchSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    window.location.href = query ? `/products?q=${encodeURIComponent(query)}` : "/products";
  }

  function onKeyDown(e) {
    if (e.key === "Escape") closeNow();
  }

  $: count = cartTotals($cart.items).count;
</script>

<!-- Header row 1: KHÔNG sticky -->
<header class="w-full border-b border-[#232f48] bg-background-dark/95 backdrop-blur-md">
  <div class="mx-auto w-full max-w-[1200px] px-4 md:px-10 py-3">
    <div class="flex items-center gap-4">
      <a href="/" class="flex items-center gap-3 text-white shrink-0">
        <div class="size-8 flex items-center justify-center rounded bg-primary text-white">
          <span class="material-symbols-outlined text-[20px]">diamond</span>
        </div>
        <h2 class="text-white text-xl font-black leading-tight tracking-[-0.015em]">TT STORE</h2>
      </a>

      <form class="flex-1" on:submit={onSearchSubmit}>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#92a4c9]">
            search
          </span>
          <input
            bind:value={q}
            class="w-full rounded-lg border border-[#232f48] bg-[#121a2a] pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-[#92a4c9] focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Tìm kiếm sản phẩm..."
            type="text"
          />
        </div>
      </form>

      <a
        aria-label="Tài khoản / Đăng nhập"
        href="/auth/login"
        class="flex size-10 items-center justify-center rounded-lg bg-[#232f48] hover:bg-primary transition-colors text-white shrink-0"
      >
        <span class="material-symbols-outlined">account_circle</span>
      </a>
    </div>
  </div>
</header>

<!-- Row 2: CHỈ sticky menu này -->
<div
  class="sticky top-0 z-[99999] border-b border-[#232f48] bg-background-dark/95 backdrop-blur-md"
  on:keydown={onKeyDown}
>
  <div class="mx-auto w-full max-w-[1200px] px-4 md:px-10">
    <div class="flex items-center justify-between py-2">
      <!-- Menu -->
      <nav class="flex items-center gap-2 md:gap-4">
        {#each menu as item}
          <div
            class="relative"
            on:mouseenter={() => openMenu(item.key)}
            on:mouseleave={scheduleClose}
          >
            <a
              href={item.href}
              class="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white hover:text-primary transition-colors"
              class:text-primary={openKey === item.key}
            >
              <span class="material-symbols-outlined text-[18px] opacity-90">
                {item.key === "laptop"
                  ? "laptop_mac"
                  : item.key === "monitor"
                  ? "monitor"
                  : "devices_other"}
              </span>
              <span>{item.label}</span>
              <span class="material-symbols-outlined text-[18px] opacity-80">expand_more</span>
            </a>

            {#if openKey === item.key}
              <!-- Mega panel: đặt thẳng dưới menu, z-index cực cao -->
              <div
                class="absolute left-0 top-full z-[100000] w-[760px] max-w-[calc(100vw-2rem)]
                       rounded-xl border border-[#232f48] bg-[#2b3138] shadow-2xl overflow-hidden"
                on:mouseenter={() => openMenu(item.key)}
                on:mouseleave={scheduleClose}
              >
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
                  {#each item.mega as col}
                    <div>
                      <div class="text-sm font-semibold text-primary mb-3">{col.title}</div>
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
      </nav>

      <!-- Cart -->
      <a
        aria-label="Giỏ hàng"
        href="/cart"
        class="relative flex size-10 items-center justify-center rounded-lg bg-[#232f48] hover:bg-primary transition-colors text-white"
      >
        <span class="material-symbols-outlined">shopping_bag</span>
        {#if count > 0}
          <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-[11px] leading-[18px] text-white text-center">
            {count}
          </span>
        {/if}
      </a>
    </div>
  </div>

  <!-- Click-outside overlay: giúp đóng menu, và cũng đảm bảo dropdown nằm trên hero -->
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
