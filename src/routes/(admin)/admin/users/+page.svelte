<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  export let data: any;
  let t: any;

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('vi-VN');
    } catch {
      return iso;
    }
  };

  function buildUrl(
    patch: Record<string, string | null | undefined>,
    nextPage?: number
  ) {
    //clone URL hiện tại từ store (an toàn hơn window)
    const u = new URL($page.url);

    //patch filter
    for (const [k, v] of Object.entries(patch)) {
      if (!v) u.searchParams.delete(k);
      else u.searchParams.set(k, v);
    }

    //set page
    if (typeof nextPage === 'number')
      u.searchParams.set('page', String(nextPage));
    else u.searchParams.delete('page'); //khi đổi filter thì reset về trang 1

    return u.pathname + '?' + u.searchParams.toString();
  }

  $: totalPages = Math.max(
    1,
    Math.ceil((data.total ?? 0) / (data.pageSize ?? 12))
  );
  $: fromItem =
    (data.total ?? 0) === 0 ? 0 : (data.page - 1) * data.pageSize + 1;
  $: toItem = Math.min(data.total ?? 0, data.page * data.pageSize);

  function onSearchChange(e: Event) {
    const v = (e.currentTarget as HTMLInputElement).value;
    clearTimeout(t);
    t = setTimeout(() => {
      goto(buildUrl({ q: v || null }));
    }, 300); //đổi filter => reset page
  }

  function onRoleChange(e: Event) {
    const v = (e.currentTarget as HTMLSelectElement).value;
    goto(buildUrl({ role: v || null }));
  }

  function onStatusChange(e: Event) {
    const v = (e.currentTarget as HTMLSelectElement).value;
    goto(buildUrl({ status: v || null }));
  }

  function goPage(p: number) {
    if (p < 1 || p > totalPages) return;
    goto(buildUrl({}, p));
  }

  const enhanceToggle = (node: HTMLFormElement) =>
    enhance(node, () => {
      return async ({ update }) => {
        await update();
        await invalidateAll();
      };
    });
</script>

<svelte:head>
  <title>Admin - Users</title>
</svelte:head>

<div
  class="flex-1 p-4 overflow-y-auto bg-background-light dark:bg-background-dark md:p-8"
>
  <div class="max-w-[1200px] mx-auto flex flex-col gap-6">
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h1 class="mb-2 text-3xl font-bold tracking-tight text-white">
          Danh sách người dùng
        </h1>
        <p class="text-sm text-text-secondary">
          Quản lý, phân quyền và theo dõi trạng thái tài khoản.
        </p>
      </div>

      <div class="flex gap-3">
        <!-- bạn làm export sau -->
        <a
          class="flex items-center h-10 gap-2 px-4 text-sm font-bold text-white transition-all rounded-lg shadow-lg bg-primary shadow-primary/30 hover:bg-blue-600"
          href="/admin/users/new"
        >
          <span class="material-symbols-outlined" style="font-size: 20px;"
            >add</span
          >
          Thêm người dùng
        </a>
      </div>
    </div>

    <div
      class="p-4 border shadow-sm bg-surface-dark border-[#232f48] rounded-xl md:p-5"
    >
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div class="relative w-full md:max-w-md group">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <span
              class="transition-colors material-symbols-outlined text-text-secondary group-focus-within:text-primary"
              >search</span
            >
          </div>
          <input
            class="block w-full pl-10 pr-3 py-2.5 border border-[#232f48] rounded-lg leading-5 bg-[#1a2332] text-white placeholder-text-secondary/70 focus:outline-none focus:bg-surface-highlight focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all"
            placeholder="Tìm theo tên, email hoặc SĐT..."
            type="text"
            value={data.filters?.q ?? ''}
            on:input={onSearchChange}
          />
        </div>

        <div class="flex w-full gap-3 pb-2 overflow-x-auto md:w-auto md:pb-0">
          <div class="relative min-w-[160px]">
            <select
              class="appearance-none w-full bg-[#1a2332] border border-[#232f48] text-white text-sm rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
              on:change={onRoleChange}
              bind:value={data.filters.role}
            >
              <option value="">Tất cả vai trò</option>
              <option value="admin">Admin</option>
              <option value="staff">Nhân viên</option>
              <option value="customer">Khách hàng</option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center px-2 text-white pointer-events-none"
            >
              <span class="material-symbols-outlined" style="font-size: 20px;"
                >expand_more</span
              >
            </div>
          </div>

          <div class="relative min-w-[180px]">
            <select
              class="appearance-none w-full bg-[#1a2332] border border-[#232f48] text-white text-sm rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
              on:change={onStatusChange}
              bind:value={data.filters.status}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Đã khóa</option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center px-2 text-white pointer-events-none"
            >
              <span class="material-symbols-outlined" style="font-size: 20px;"
                >expand_more</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Card -->
    <div
      class="bg-[#111722] border border-[#232f48] rounded-2xl overflow-hidden"
    >
      <div class="flex items-center justify-between px-6 py-4">
        <div class="text-sm text-[#92a4c9]">
          Hiển thị <span class="font-bold text-white">{fromItem}-{toItem}</span>
          trong
          <span class="font-bold text-white">{data.total ?? 0}</span> người dùng
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-[#0b0f16] text-[#92a4c9]">
            <tr class="text-left border-b border-gray-700">
              <th class="px-6 py-4 text-xs tracking-wider uppercase"
                >Người dùng</th
              >
              <th class="px-6 py-4 text-xs tracking-wider uppercase">Vai trò</th
              >
              <th class="px-6 py-4 text-xs tracking-wider uppercase"
                >Trạng thái</th
              >
              <th class="px-6 py-4 text-xs tracking-wider uppercase"
                >Ngày tạo</th
              >
              <th class="px-6 py-4 text-xs tracking-wider uppercase"
                >Hành động</th
              >
            </tr>
          </thead>

          <tbody class="divide-y divide-[#232f48]">
            {#if (data.users?.length ?? 0) === 0}
              <tr>
                <td class="px-6 py-6 text-[#92a4c9]" colspan="5">
                  Không có người dùng phù hợp bộ lọc.
                </td>
              </tr>
            {:else}
              {#each data.users as u}
                <tr class="hover:bg-[#232f48]/50 transition-colors group">
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-white">
                      {u.full_name ?? '—'}
                    </div>
                    <div class="text-sm text-text-secondary">
                      {u.email ?? '—'}
                      {u.phone ? ` • ${u.phone}` : ''}
                    </div>
                  </td>

                  <td class="px-6 py-4">
                    <span
                      class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    >
                      {u.role}
                    </span>
                  </td>

                  <td class="px-6 py-4">
                    {#if u.is_active}
                      <div class="flex items-center gap-2">
                        <div
                          class="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                        ></div>
                        <span class="text-sm font-medium text-emerald-400"
                          >Hoạt động</span
                        >
                      </div>
                    {:else}
                      <div class="flex items-center gap-2">
                        <div
                          class="size-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.35)]"
                        ></div>
                        <span class="text-sm font-medium text-red-400"
                          >Đã khóa</span
                        >
                      </div>
                    {/if}
                  </td>

                  <td class="px-6 py-4 text-sm text-text-secondary"
                    >{formatDate(u.created_at)}</td
                  >

                  <td class="px-6 py-4 text-sm font-medium text-right">
                    <div class="flex justify-start gap-2 transition-opacity">
                      <a
                        class="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-surface-highlight transition-colors"
                        href={`/admin/users/${u.id}`}
                        title="Xem chi tiết"
                      >
                        <span class="material-symbols-outlined text-[20px]"
                          >visibility</span
                        >
                      </a>

                      <a
                        class="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-surface-highlight transition-colors"
                        href={`/admin/orders?user=${u.id}`}
                        title="Xem đơn hàng"
                      >
                        <span class="material-symbols-outlined text-[20px]"
                          >receipt_long</span
                        >
                      </a>

                      <!-- Toggle Active (admin only - server sẽ chặn nếu không phải admin) -->
                      <form
                        method="POST"
                        action="?/toggleActive"
                        use:enhanceToggle
                      >
                        <input type="hidden" name="id" value={u.id} />
                        <input
                          type="hidden"
                          name="active"
                          value={(!u.is_active).toString()}
                        />
                        <button
                          class="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-surface-highlight transition-colors"
                          title={u.is_active ? 'Khóa' : 'Mở khóa'}
                          type="submit"
                        >
                          <span class="material-symbols-outlined text-[20px]">
                            {u.is_active ? 'block' : 'verified_user'}
                          </span>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              {/each}
            {/if}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="5" class="px-6 py-4">
                <div class="flex items-center justify-between">
                  <!-- LEFT -->
                  <div class="text-sm text-[#92a4c9]">
                    Trang
                    <span class="font-medium text-white">{data.page}</span>
                    /
                    <span class="font-medium text-white">{totalPages}</span>
                  </div>

                  <!-- RIGHT -->
                  <div class="flex items-center gap-2">
                    <button
                      class="px-4 h-9 rounded-lg border border-[#232f48]
                   text-sm text-white
                   hover:bg-surface-highlight transition
                   disabled:opacity-40"
                      disabled={data.page <= 1}
                      on:click={() => goPage(data.page - 1)}
                    >
                      Trước
                    </button>

                    <button
                      class="px-4 h-9 rounded-lg border border-[#232f48]
                   text-sm text-white
                   hover:bg-surface-highlight transition
                   disabled:opacity-40"
                      disabled={data.page >= totalPages}
                      on:click={() => goPage(data.page + 1)}
                    >
                      Sau
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</div>
