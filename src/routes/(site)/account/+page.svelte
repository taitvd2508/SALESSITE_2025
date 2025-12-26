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
  <title>Thông tin cá nhân - TT STORE</title>
</svelte:head>

<main class="flex flex-col flex-1 gap-6">
  <div
    class="rounded-xl bg-white dark:bg-[#1b2333] border border-slate-200 dark:border-none shadow-sm p-6 md:p-8"
  >
    <div
      class="flex flex-col gap-2 pb-6 border-b border-slate-100 dark:border-[#232f48]"
    >
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
        Hồ sơ của tôi
      </h2>
      <p class="text-slate-500 dark:text-[#92a4c9] text-sm">
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </p>
    </div>

    {#if data.error}
      <div
        class="p-3 mt-6 text-sm text-red-300 border rounded-lg border-red-500/30 bg-red-500/10"
      >
        {data.error}
      </div>
    {/if}

    <div class="flex flex-col-reverse gap-10 mt-8 lg:flex-row">
      <!-- Form -->
      <form class="flex flex-col flex-1 gap-6" method="POST">
        <!-- Username -->
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <label
            for=""
            class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
            >Tài khoản</label
          >
          <div
            class="flex-1 text-base font-medium text-slate-900 dark:text-white"
          >
            {user?.email}
            <span
              class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            >
              Đã đăng nhập
            </span>
          </div>
        </div>

        <!-- Name -->
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <label
            for="full_name"
            class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
            >Tên</label
          >
          <input
            class="flex-1 form-input rounded-lg border-slate-200 dark:border-[#232f48] bg-slate-50 dark:bg-[#232f48] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm h-11 px-4 placeholder:text-slate-400"
            type="text"
            name="full_name"
            id="full_name"
            value={profile.full_name ?? ''}
            placeholder="Nhập họ tên"
          />
        </div>

        <!-- Email readonly -->
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <label
            for="email"
            class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
            >Email</label
          >
          <input
            class="flex-1 form-input rounded-lg border-none bg-slate-100 dark:bg-[#151b28] text-slate-500 dark:text-[#64748b] text-sm h-11 px-4 cursor-not-allowed"
            disabled
            name="email"
            id="email"
            type="text"
            value={email}
          />
        </div>

        <!-- Phone -->
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <label
            for="phone"
            class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
            >SĐT</label
          >
          <input
            class="flex-1 form-input rounded-lg border-slate-200 dark:border-[#232f48] bg-slate-50 dark:bg-[#232f48] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm h-11 px-4 placeholder:text-slate-400"
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
        <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-6">
          <label
            for="address"
            class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium mt-3"
            >Địa chỉ</label
          >
          <textarea
            class="flex-1 form-textarea rounded-lg border-slate-200 dark:border-[#232f48] bg-slate-50 dark:bg-[#232f48] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm p-4 placeholder:text-slate-400 resize-none"
            rows="2"
            name="address"
            id="address"
            placeholder="Nhập địa chỉ nhận hàng"
            >{profile.address ?? ''}</textarea
          >
        </div>

        <!-- Save -->
        <div
          class="flex flex-col gap-2 mt-4 sm:flex-row sm:items-center sm:gap-6"
        >
          <div class="w-full sm:w-32"></div>
          <button
            class="w-full px-8 py-3 font-bold text-white transition-all rounded-lg shadow-lg bg-primary hover:bg-primary/90 shadow-primary/30 active:scale-95 sm:w-auto"
            formaction="?/updateProfile"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  </div>
</main>
