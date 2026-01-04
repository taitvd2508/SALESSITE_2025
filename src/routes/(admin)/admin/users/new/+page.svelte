<script lang="ts">
  export let data: any;

  let full_name = '';
  let email = '';
  let password = '';
  let phone = '';
  let address = '';
  let birthday = '';
  let gender = '';
  let role: 'customer' | 'staff' | 'admin' = 'customer';
</script>

<svelte:head>
  <title>Admin - Thêm người dùng</title>
</svelte:head>

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

      <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 class="mb-2 text-3xl font-bold tracking-tight text-white">
            Thêm người dùng
          </h1>
          <div class="text-sm text-text-secondary">
            Chỉ Admin mới tạo được tài khoản mới.
          </div>
        </div>
      </div>
    </div>

    <div
      class="p-6 border shadow-sm bg-surface-dark border-surface-highlight rounded-xl"
    >
      <form
        method="POST"
        action="?/create"
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
            required
            placeholder="email@example.com"
          />
        </div>

        <div class="md:col-span-6 flex flex-col gap-1.5">
          <label class="ml-1 text-xs font-medium text-text-secondary"
            >Mật khẩu</label
          >
          <input
            name="password"
            type="password"
            class="w-full bg-[#101622] border border-surface-highlight text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
            bind:value={password}
            required
            placeholder="Tối thiểu 6 ký tự"
          />
        </div>

        <div class="md:col-span-6 flex flex-col gap-1.5">
          <label class="ml-1 text-xs font-medium text-text-secondary">SĐT</label
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
        </div>

        <div class="md:col-span-12 flex flex-col gap-1.5">
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

        <div class="flex items-center justify-end gap-3 pt-2 md:col-span-12">
          <button
            type="submit"
            class="px-5 font-bold text-white transition-colors shadow-lg h-11 rounded-xl bg-primary hover:bg-blue-600 shadow-blue-900/20"
          >
            Tạo người dùng
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
