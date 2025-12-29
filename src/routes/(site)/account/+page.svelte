<script lang="ts">
  export let data: any;

  const user = data.user;
  const profile = data.profile ?? {};

  // hiển thị tên ngắn cho greeting
  const shortName = (name: string) => {
    const s = (name ?? '').trim();
    if (!s) return 'bạn';
    const parts = s.split(/\s+/);
    return parts[parts.length - 1];
  };

  $: displayName = profile.full_name ?? user?.email?.split('@')?.[0] ?? 'bạn';
  $: email = profile.email ?? user?.email ?? '';
</script>

<svelte:head>
  <title>TT STORE - Thông Tin Tài Khoản</title>
</svelte:head>

<main class="flex flex-col flex-1">
  <div class="w-full max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
    <div
      class="p-4 border border-gray-100 shadow-sm rounded-2xl sm:p-6 lg:p-8 dark:bg-surface-dark dark:border-border-dark"
    >
      <div class="pb-6 mb-6 border-b border-gray-100 dark:border-border-dark">
        <div class="flex items-center gap-2 mb-2">
          <span class="material-symbols-outlined text-primary">person</span>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
            Hồ sơ của tôi
          </h2>
        </div>
        <p class="text-slate-500 dark:text-[#92a4c9] text-sm">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
      </div>

      {#if data?.error}
        <div
          class="p-4 mt-6 text-red-700 border border-red-200 rounded-lg bg-red-50"
        >
          {data.error}
        </div>
      {/if}

      <div class="flex flex-col-reverse gap-10 mt-8 lg:flex-row">
        <!-- Form -->
        <form class="flex flex-col flex-1 gap-6" method="POST">
          <!-- Username -->
          <div class="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
            <label
              for=""
              class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
              >Tài khoản</label
            >
            <div
              class="w-full min-w-0 text-base font-medium sm:flex-1 text-slate-900 dark:text-white"
            >
              {user?.email}
              <span
                class="inline-flex items-center px-2 py-1 ml-3 text-xs font-bold text-green-700 bg-green-100 rounded-md"
              >
                Đã đăng nhập
              </span>
            </div>
          </div>

          <!-- Full name -->
          <div class="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
            <label
              for="full_name"
              class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
              >Tên</label
            >
            <input
              class="w-full min-w-0 sm:flex-1 form-input rounded-lg border-slate-200 dark:border-[#2a3b5c] bg-white/80 dark:bg-[#0f172a] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm h-11 px-4 placeholder:text-slate-400"
              type="text"
              name="full_name"
              id="full_name"
              value={profile.full_name ?? ''}
              placeholder="Nhập họ tên"
              autocomplete="name"
            />
          </div>

          <!-- Email readonly -->
          <div class="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
            <label
              for="email"
              class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
              >Email</label
            >
            <input
              class="w-full min-w-0 sm:flex-1 form-input rounded-lg border-none bg-slate-100 dark:bg-[#0b1220] text-slate-500 dark:text-[#64748b] text-sm h-11 px-4 cursor-not-allowed"
              disabled
              name="email"
              id="email"
              value={email}
              autocomplete="email"
            />
          </div>

          <!-- Phone -->
          <div class="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
            <label
              for="phone"
              class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
              >SĐT</label
            >
            <input
              class="w-full min-w-0 sm:flex-1 form-input rounded-lg border-slate-200 dark:border-[#2a3b5c] bg-white/80 dark:bg-[#0f172a] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm h-11 px-4 placeholder:text-slate-400"
              type="text"
              name="phone"
              id="phone"
              value={profile.phone ?? ''}
              placeholder="VD: 0987654321"
              inputmode="tel"
              autocomplete="tel"
            />
          </div>

          <!-- Address -->
          <div class="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-start">
            <label
              for="address"
              class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium pt-2"
              >Địa chỉ</label
            >
            <textarea
              class="w-full min-w-0 sm:flex-1 form-textarea rounded-lg border-slate-200 dark:border-[#2a3b5c] bg-white/80 dark:bg-[#0f172a] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm p-4 placeholder:text-slate-400 resize-none"
              rows="4"
              name="address"
              id="address"
              placeholder="Nhập địa chỉ nhận hàng"
              autocomplete="street-address">{profile.address ?? ''}</textarea
            >
          </div>

          <!-- Save -->
          <div class="grid gap-2 mt-4 sm:grid-cols-[8rem_1fr] sm:items-center">
            <div class="hidden sm:block"></div>
            <button
              class="w-full px-8 py-3 font-bold text-white transition-all rounded-lg shadow-lg bg-primary hover:bg-primary/90 shadow-primary/30 active:scale-95 sm:w-auto sm:col-start-2"
              formaction="?/updateProfile"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>

        <!-- Right side (optional) -->
        <!-- Nếu bạn có phần bên phải (avatar / info), giữ nguyên hoặc thêm sau -->
      </div>
    </div>
  </div>
</main>
