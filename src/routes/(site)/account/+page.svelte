<script lang="ts">
  export let data: any;
  export let form: any;

  const user = data.user;
  const profile = data.profile ?? {};

  // short name for greeting
  const shortName = (name: string) => {
    const s = (name ?? "").trim();
    if (!s) return "bạn";
    const parts = s.split(/\s+/);
    return parts[parts.length - 1];
  };

  $: displayName = profile.full_name ?? user?.email?.split("@")?.[0] ?? "bạn";
  $: email = profile.email ?? user?.email ?? "";

  // Use string directly for native date input (YYYY-MM-DD)
  let birthdayString = profile.birthday ?? "";
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

      {#if data?.error || (form && !form.ok)}
        <div class="flex justify-center mt-6 px-4 text-center">
          <div
            class="p-3 w-fit border border-red-200 rounded-lg bg-red-50 text-red-700 text-sm shadow-sm"
          >
            {data?.error || form?.message}
          </div>
        </div>
      {/if}

      {#if form?.ok && form?.message}
        <div class="flex justify-center mt-6 px-4 text-center">
          <div
            class="p-3 w-fit border border-green-200 rounded-lg bg-green-50 text-green-700 text-sm shadow-sm"
          >
            {form.message}
          </div>
        </div>
      {/if}

      <div class="flex flex-col-reverse gap-10 mt-8 lg:flex-row">
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
              class="w-full min-w-0 sm:flex-1 form-input rounded-lg
            border-slate-200 dark:border-[#2a3b5c] bg-white/80 dark:bg-[#0f172a]
            text-slate-900 dark:text-white focus:border-primary
            focus:ring-primary text-sm h-11 px-4 placeholder:text-slate-400"
              type="text"
              name="full_name"
              id="full_name"
              value={profile.full_name ?? ""}
              placeholder="Nhập họ tên"
              autocomplete="name"
            />
          </div>

          <!-- Gender -->
          <div class="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
            <label
              for=""
              class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
              >Giới tính</label
            >
            <div class="flex items-center gap-6">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={profile.gender === "male"}
                  class="w-4 h-4
                transition-colors border-gray-300 text-primary
                focus:ring-primary dark:border-border-dark dark:bg-surface-dark"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300"
                  >Nam</span
                >
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={profile.gender === "female"}
                  class="w-4 h-4
                transition-colors border-gray-300 text-primary
                focus:ring-primary dark:border-border-dark dark:bg-surface-dark"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300"
                  >Nữ</span
                >
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="gender"
                  value="unknown"
                  checked={profile.gender === "unknown" || !profile.gender}
                  class="w-4 h-4 transition-colors border-gray-300 text-primary
                focus:ring-primary dark:border-border-dark dark:bg-surface-dark"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300"
                  >Khác</span
                >
              </label>
            </div>
          </div>

          <!-- Birthday -->
          <div class="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
            <label
              for="birthday"
              class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
              >Ngày sinh</label
            >
            <div class="w-full sm:flex-1">
              <input
                type="date"
                name="birthday"
                id="birthday"
                bind:value={birthdayString}
                class="w-full max-w-[200px] min-w-0 form-input rounded-lg
                          border-slate-200 dark:border-[#2a3b5c] bg-white/80 dark:bg-[#0f172a]
                          text-slate-900 dark:text-white focus:border-primary
                          focus:ring-primary text-sm h-11 px-4 placeholder:text-slate-400"
              />
            </div>
          </div>
          <!-- Email readonly -->
          <div class="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
            <label
              for="email"
              class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
              >Email</label
            >
            <div class="flex items-center gap-3 w-full sm:flex-1">
              <div
                class="w-fit max-w-full truncate rounded-lg border-none bg-slate-100 dark:bg-[#0b1220] text-slate-500 dark:text-[#64748b] text-sm h-11 px-4 flex items-center cursor-not-allowed"
              >
                {email}
              </div>
              {#if user?.email_confirmed_at}
                <span
                  class="shrink-0 inline-flex items-center px-2 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-md"
                >
                  Đã xác thực
                </span>
              {:else}
                <span
                  class="shrink-0 inline-flex items-center px-2 py-1 text-xs font-bold text-amber-700 bg-amber-100 rounded-md"
                >
                  Chưa xác thực
                </span>
              {/if}
            </div>
          </div>

          <!-- Phone -->
          <div class="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
            <label
              for="phone"
              class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium"
              >SĐT</label
            >
            <input
              class="w-full min-w-0 sm:flex-1 form-input rounded-lg
            border-slate-200 dark:border-[#2a3b5c] bg-white/80 dark:bg-[#0f172a]
            text-slate-900 dark:text-white focus:border-primary
            focus:ring-primary text-sm h-11 px-4 placeholder:text-slate-400"
              type="text"
              name="phone"
              id="phone"
              value={profile.phone ?? ""}
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
              autocomplete="street-address">{profile.address ?? ""}</textarea
            >
          </div>

          <!-- Save -->
          <div class="flex justify-center mt-6">
            <button
              class="px-10 py-2.5 font-bold text-white transition-all rounded-lg shadow-lg bg-primary hover:bg-primary/90 shadow-primary/30 active:scale-95 text-sm"
              formaction="?/updateProfile"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>

<style>
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
</style>
