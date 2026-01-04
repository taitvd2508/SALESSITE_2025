<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  export let data: any;

  const formatDateTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  const formatVND = (n: any) =>
    new Intl.NumberFormat('vi-VN').format(Number(n ?? 0)) + ' đ';

  let toast = '';
  let toastTimer: any;

  function showToast(msg: string) {
    toast = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast = ''), 1600);
  }

  // form fields (bind from server data)
  let p = data?.profile;

  let full_name = p?.full_name ?? '';
  let email = p?.email ?? '';
  let phone = p?.phone ?? '';
  let address = p?.address ?? '';
  let birthday = p?.birthday ?? ''; // yyyy-mm-dd
  let gender = p?.gender ?? ''; // enum value
  let role = data?.role ?? 'customer';

  // Re-sync when navigating between users without full reload
  $: if (data?.profile) {
    p = data.profile;
    full_name = p?.full_name ?? '';
    email = p?.email ?? '';
    phone = p?.phone ?? '';
    address = p?.address ?? '';
    birthday = p?.birthday ?? '';
    gender = p?.gender ?? '';
    role = data?.role ?? 'customer';
  }

  const enhanceSave = (node: HTMLFormElement) =>
    enhance(node, () => {
      return async ({ result, update }) => {
        await update(); // cập nhật form state (nếu bạn return message)
        await applyAction(result);
        await invalidateAll(); // reload load()

        // show toast if action success
        const r: any = result;
        if (r?.type === 'success') {
          showToast(r?.data?.message ?? 'Đã lưu thay đổi.');
        } else if (r?.type === 'failure') {
          showToast(r?.data?.message ?? 'Lỗi lưu dữ liệu.');
        }
      };
    });

  const enhanceToggle = (node: HTMLFormElement) =>
    enhance(node, () => {
      return async ({ result, update }) => {
        await update();
        await applyAction(result);
        await invalidateAll();

        const r: any = result;
        if (r?.type === 'success') showToast(r?.data?.message ?? 'OK');
        else if (r?.type === 'failure')
          showToast(r?.data?.message ?? 'Lỗi thao tác.');
      };
    });
</script>

<svelte:head>
  <title>Admin - Chi tiết người dùng</title>
</svelte:head>

{#if toast}
  <div class="fixed top-4 right-4 z-[9999]">
    <div
      class="px-4 py-3 text-sm font-bold text-white shadow-lg rounded-xl bg-primary/90 shadow-blue-900/30"
    >
      {toast}
    </div>
  </div>
{/if}

<div
  class="flex-1 p-4 overflow-y-auto bg-background-light dark:bg-background-dark md:p-8"
>
  <div class="max-w-[1200px] mx-auto flex flex-col gap-6">
    <div class="flex flex-col gap-4">
      <a
        class="flex items-center gap-2 transition-colors text-text-secondary hover:text-white w-fit group"
        href="/admin/users"
      >
        <span
          class="text-sm transition-transform material-symbols-outlined group-hover:-translate-x-1"
          >arrow_back</span
        >
        <span class="text-sm font-medium">Quay lại danh sách</span>
      </a>

      {#if !data?.profile}
        <div
          class="p-6 text-red-200 border border-red-500/30 bg-red-500/10 rounded-xl"
        >
          Không tìm thấy người dùng.
        </div>
      {:else}
        <div
          class="flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <h1 class="mb-2 text-3xl font-bold tracking-tight text-white">
              {data.profile.full_name ?? '—'}
            </h1>

            <div
              class="flex flex-wrap items-center gap-3 text-sm text-text-secondary"
            >
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">mail</span>
                {data.profile.email ?? '—'}
              </span>

              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">call</span>
                {data.profile.phone ?? '—'}
              </span>

              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">badge</span>
                Role: <b class="text-white">{data.role}</b>
              </span>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <a
              class="flex items-center gap-2 px-4 text-white transition-colors border h-11 rounded-xl border-surface-highlight hover:bg-surface-highlight"
              href={`/admin/orders?user=${encodeURIComponent(data.profile.id)}`}
              title="Xem toàn bộ đơn hàng của user"
            >
              <span class="material-symbols-outlined text-[20px]"
                >receipt_long</span
              >
              Xem đơn hàng
            </a>

            <!-- Toggle active (server sẽ chặn nếu không phải admin) -->
            <form method="POST" action="?/toggleActive" use:enhanceToggle>
              <input
                type="hidden"
                name="active"
                value={data.profile.is_active ? 'false' : 'true'}
              />
              <button
                type="submit"
                class="flex items-center gap-2 px-4 text-white transition-colors shadow-lg h-11 rounded-xl bg-primary hover:bg-blue-600 shadow-blue-900/20"
              >
                <span class="material-symbols-outlined text-[20px]">
                  {data.profile.is_active ? 'block' : 'verified_user'}
                </span>
                {data.profile.is_active ? 'Khoá tài khoản' : 'Mở khoá'}
              </button>
            </form>
          </div>
        </div>
      {/if}
    </div>

    {#if data?.profile}
      <!-- Stats -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div
          class="p-5 border rounded-xl border-surface-highlight bg-surface-dark"
        >
          <div class="text-sm text-text-secondary">Số đơn gần đây</div>
          <div class="mt-1 text-2xl font-black text-white">
            {data.stats?.count ?? 0}
          </div>
        </div>
        <div
          class="p-5 border rounded-xl border-surface-highlight bg-surface-dark"
        >
          <div class="text-sm text-text-secondary">
            Tổng tiền (10 đơn gần nhất)
          </div>
          <div class="mt-1 text-2xl font-black text-white">
            {formatVND(data.stats?.total ?? 0)}
          </div>
        </div>
        <div
          class="p-5 border rounded-xl border-surface-highlight bg-surface-dark"
        >
          <div class="text-sm text-text-secondary">Trạng thái</div>
          {#if data.profile.is_active}
            <div
              class="inline-flex items-center gap-2 px-3 py-1 mt-2 text-sm font-bold border rounded-full border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
            >
              <span class="rounded-full size-2 bg-emerald-400"></span>
              Active
            </div>
          {:else}
            <div
              class="inline-flex items-center gap-2 px-3 py-1 mt-2 text-sm font-bold text-red-200 border rounded-full border-red-500/30 bg-red-500/10"
            >
              <span class="bg-red-400 rounded-full size-2"></span>
              Locked
            </div>
          {/if}
        </div>
      </div>

      <!-- Profile form -->
      <div
        class="p-6 border shadow-sm bg-surface-dark border-surface-highlight rounded-xl"
      >
        <div class="flex items-center justify-between gap-3 mb-5">
          <div class="text-lg font-bold text-white">Thông tin người dùng</div>
          <div class="text-xs text-text-secondary">
            Tạo lúc: {formatDateTime(data.profile.created_at)}
          </div>
        </div>

        <form
          method="POST"
          action="?/save"
          use:enhanceSave
          class="grid grid-cols-1 gap-4 md:grid-cols-12"
        >
          <div class="md:col-span-6 flex flex-col gap-1.5">
            <label class="ml-1 text-xs font-medium text-text-secondary"
              >Họ tên</label
            >
            <input
              name="full_name"
              class="w-full bg-[#101622] border border-surface-highlight text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
              bind:value={full_name}
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div class="md:col-span-6 flex flex-col gap-1.5">
            <label class="ml-1 text-xs font-medium text-text-secondary"
              >Email</label
            >
            <input
              name="email"
              type="email"
              class="w-full bg-[#101622] border border-surface-highlight text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
              bind:value={email}
              placeholder="email@example.com"
            />
          </div>

          <div class="md:col-span-4 flex flex-col gap-1.5">
            <label class="ml-1 text-xs font-medium text-text-secondary"
              >SĐT</label
            >
            <input
              name="phone"
              class="w-full bg-[#101622] border border-surface-highlight text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
              bind:value={phone}
              placeholder="09xxxxxxxx"
            />
          </div>

          <div class="md:col-span-4 flex flex-col gap-1.5">
            <label class="ml-1 text-xs font-medium text-text-secondary"
              >Ngày sinh</label
            >
            <input
              name="birthday"
              type="date"
              class="w-full bg-[#101622] border border-surface-highlight text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
              bind:value={birthday}
            />
          </div>

          <div class="md:col-span-4 flex flex-col gap-1.5">
            <label class="ml-1 text-xs font-medium text-text-secondary"
              >Giới tính</label
            >
            <select
              name="gender"
              class="w-full bg-[#101622] border border-surface-highlight text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
              bind:value={gender}
            >
              <option value="">—</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div class="md:col-span-8 flex flex-col gap-1.5">
            <label class="ml-1 text-xs font-medium text-text-secondary"
              >Địa chỉ</label
            >
            <input
              name="address"
              class="w-full bg-[#101622] border border-surface-highlight text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
              bind:value={address}
              placeholder="Số nhà, đường, phường/xã..."
            />
          </div>

          <div class="md:col-span-4 flex flex-col gap-1.5">
            <label class="ml-1 text-xs font-medium text-text-secondary"
              >Role</label
            >
            <select
              name="role"
              class="w-full bg-[#101622] border border-surface-highlight text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
              bind:value={role}
            >
              <option value="customer">customer</option>
              <option value="staff">staff</option>
              <option value="admin">admin</option>
            </select>
            <div class="mt-1 text-xs text-text-secondary">
              * Chỉ Admin lưu được thay đổi role.
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2 md:col-span-12">
            <button
              type="submit"
              class="px-5 font-bold text-white transition-colors shadow-lg h-11 rounded-xl bg-primary hover:bg-blue-600 shadow-blue-900/20"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>

      <!-- Orders preview -->
      <div
        class="p-6 border shadow-sm bg-surface-dark border-surface-highlight rounded-xl"
      >
        <div class="flex items-center justify-between gap-3 mb-4">
          <div class="text-lg font-bold text-white">10 đơn gần nhất</div>
          <a
            class="text-sm font-bold transition-colors text-primary hover:text-primary/80"
            href={`/admin/orders?user=${encodeURIComponent(data.profile.id)}`}
          >
            Xem tất cả →
          </a>
        </div>

        {#if (data.orders?.length ?? 0) === 0}
          <div class="text-text-secondary">Chưa có đơn hàng.</div>
        {:else}
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-surface-highlight">
              <thead class="bg-[#151c2a]">
                <tr>
                  <th
                    class="px-4 py-3 text-xs font-semibold tracking-wider text-left uppercase text-text-secondary"
                    >Mã đơn</th
                  >
                  <th
                    class="px-4 py-3 text-xs font-semibold tracking-wider text-left uppercase text-text-secondary"
                    >Tổng tiền</th
                  >
                  <th
                    class="px-4 py-3 text-xs font-semibold tracking-wider text-left uppercase text-text-secondary"
                    >Ngày tạo</th
                  >
                  <th
                    class="px-4 py-3 text-xs font-semibold tracking-wider text-right uppercase text-text-secondary"
                    >Chi tiết</th
                  >
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-highlight bg-surface-dark">
                {#each data.orders as o}
                  <tr class="hover:bg-surface-highlight/30">
                    <td class="px-4 py-3 font-bold text-white">#{o.id}</td>
                    <td class="px-4 py-3 text-white"
                      >{formatVND(o.total_price)}</td
                    >
                    <td class="px-4 py-3 text-text-secondary"
                      >{formatDateTime(o.created_at)}</td
                    >
                    <td class="px-4 py-3 text-right">
                      <a
                        class="inline-flex items-center gap-2 px-3 py-2 text-white transition-colors border rounded-lg border-surface-highlight hover:bg-surface-highlight"
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
              </tbody>
            </table>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
