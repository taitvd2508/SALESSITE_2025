<script lang="ts">
  import { page } from '$app/stores';

  $: path = $page.url.pathname;
  $: user = $page.data.user; // từ admin layout.server.ts
  $: role = $page.data.role; // từ admin layout.server.ts
  $: profile = $page.data.profile; // từ admin layout.server.ts

  const nav = [
    { href: '/admin', icon: 'dashboard', label: 'Tổng quan' },
    { href: '/admin/orders', icon: 'shopping_bag', label: 'Đơn hàng' },
    { href: '/admin/products', icon: 'inventory_2', label: 'Sản phẩm' },
    { href: '/admin/users', icon: 'group', label: 'Người dùng' },
    { href: '/admin/roles', icon: 'verified_user', label: 'Phân quyền' },
  ];

  $: title = (() => {
    if (path === '/admin') return 'Dashboard';
    if (path.startsWith('/admin/orders')) {
      if (path.endsWith('/manage')) return 'Quản lý đơn hàng';
      if (path.match(/^\/admin\/orders\/[^/]+$/)) return 'Chi tiết đơn hàng';
      return 'Đơn hàng';
    }
    if (path.startsWith('/admin/products')) {
      if (path.match(/^\/admin\/products\/[^/]+$/)) return 'Chi tiết sản phẩm';
      return 'Sản phẩm';
    }
    if (path.startsWith('/admin/users')) {
      if (path.match(/^\/admin\/users\/[^/]+$/)) return 'Chi tiết người dùng';
      return 'Người dùng';
    }
    if (path.startsWith('/admin/roles')) return 'Phân quyền';
    return 'Admin';
  })();

  function capitalize(s?: string | null) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
</script>

<div class="flex h-screen w-full flex-row overflow-hidden bg-[#111722]">
  <aside
    class="flex h-full w-64 flex-col border-r border-[#232f48] bg-[#111722] flex-shrink-0"
  >
    <div class="flex flex-col justify-between h-full p-4">
      <div class="flex flex-col gap-6">
        <a href="/admin" class="flex items-center gap-3 px-2">
          <div
            class="flex items-center justify-center text-white rounded-lg size-10 bg-primary"
          >
            <span class="material-symbols-outlined">shield</span>
          </div>
          <div class="flex flex-col">
            <h1 class="text-lg font-bold leading-tight text-white">TT STORE</h1>
            <p class="text-xs font-normal text-text-secondary">
              {capitalize(role)} Portal
            </p>
          </div>
        </a>

        <nav class="flex flex-col gap-2">
          {#each nav as item}
            <a
              href={item.href}
              class="flex items-center gap-3 px-3 py-3 transition-colors rounded-lg"
              class:bg-primary={path === item.href ||
                (item.href !== '/admin' && path.startsWith(item.href))}
              class:text-white={path === item.href ||
                (item.href !== '/admin' && path.startsWith(item.href))}
              class:text-text-secondary={!(
                path === item.href ||
                (item.href !== '/admin' && path.startsWith(item.href))
              )}
              class:hover:bg-[#232f48]={!(
                path === item.href ||
                (item.href !== '/admin' && path.startsWith(item.href))
              )}
              class:hover:text-white={!(
                path === item.href ||
                (item.href !== '/admin' && path.startsWith(item.href))
              )}
            >
              <span class="text-xl material-symbols-outlined">{item.icon}</span>
              <p class="text-sm font-medium">{item.label}</p>
            </a>
          {/each}
        </nav>
      </div>

      <div class="flex flex-col gap-2">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a
          href="#"
          class="flex items-center gap-3 px-3 py-3 rounded-lg text-text-secondary hover:bg-[#232f48] hover:text-white transition-colors"
        >
          <span class="text-xl material-symbols-outlined">home</span>
          <p class="text-sm font-medium"><a href="/">Về trang bán hàng</a></p>
        </a>
        <div
          class="flex items-center gap-3 px-3 py-3 mt-2 border-t border-[#232f48]"
        >
          <div
            class="rounded-full size-8 bg-[#232f48] flex items-center justify-center text-white"
          >
            <span class="material-symbols-outlined text-[18px]">person</span>
          </div>
          <div class="flex flex-col">
            <p class="text-sm font-medium text-white">
              {profile?.full_name}
            </p>
            <p class="text-xs text-text-secondary">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>

  <main
    class="flex-1 flex flex-col h-full min-w-0 bg-[#111722] overflow-hidden"
  >
    <div
      class="flex items-center justify-between whitespace-nowrap border-b border-[#232f48] px-8 py-4 bg-[#111722] z-10 shrink-0"
    >
      <div class="flex items-center gap-4">
        <h2 class="text-xl font-bold leading-tight tracking-tight text-white">
          {title}
        </h2>
      </div>

      <div class="flex items-center gap-3">
        <a
          href="/admin/settings"
          class="flex size-10 items-center justify-center rounded-lg bg-[#232f48] hover:bg-primary transition-colors text-white"
          aria-label="Cài đặt"
        >
          <span class="material-symbols-outlined">settings</span>
        </a>
        <button
          class="flex size-10 items-center justify-center rounded-lg bg-[#232f48] hover:bg-primary transition-colors text-white"
          aria-label="Thông báo"
        >
          <span class="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>
  </main>
</div>
