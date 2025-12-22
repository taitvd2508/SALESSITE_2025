<svelte:head>
  <title>Đổi mật khẩu - TT STORE</title>
</svelte:head>

<!-- Outer page container: giúp nội dung không bị dính trái + không quá rộng -->
<div class="w-full">
  <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
    <main
      class="w-full dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-border-dark overflow-hidden"
    >
      <div class="p-6 md:p-8">
        <div class="border-b border-gray-100 dark:border-border-dark pb-6 mb-6">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-primary">encrypted</span>
            <h1 class="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
              Đổi mật khẩu
            </h1>
          </div>
          <p class="text-slate-500 dark:text-[#92a4c9] text-base">
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </p>
        </div>

        <!-- ✅ CHỖ SỬA QUAN TRỌNG: thêm mx-auto để form nằm giữa -->
        <form class="mx-auto w-full max-w-[500px] flex flex-col gap-6">
          <!-- Current Password -->
          <div class="flex flex-col gap-2">
            <label class="text-slate-700 dark:text-white text-sm font-medium leading-normal"
              >Mật khẩu hiện tại</label
            >
            <div class="relative flex items-center">
              <input
                class="flex-1 w-full rounded-lg border border-gray-300 dark:border-[#324467] bg-white dark:bg-[#192233] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-base"
                placeholder="Nhập mật khẩu hiện tại"
                type="password"
              />
              <button
                class="absolute right-4 text-slate-400 dark:text-[#92a4c9] hover:text-slate-600 dark:hover:text-white transition-colors"
                type="button"
              >
                <span class="material-symbols-outlined">visibility_off</span>
              </button>
            </div>
          </div>

          <!-- New Password -->
          <div class="flex flex-col gap-2">
            <label class="text-slate-700 dark:text-white text-sm font-medium leading-normal"
              >Mật khẩu mới</label
            >
            <div class="relative flex items-center">
              <input
                class="flex-1 w-full rounded-lg border border-gray-300 dark:border-[#324467] bg-white dark:bg-[#192233] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-base"
                placeholder="Nhập mật khẩu mới"
                type="password"
              />
              <button
                class="absolute right-4 text-slate-400 dark:text-[#92a4c9] hover:text-slate-600 dark:hover:text-white transition-colors"
                type="button"
              >
                <span class="material-symbols-outlined">visibility_off</span>
              </button>
            </div>

            <!-- Password Strength Meter -->
            <div class="mt-1">
              <div class="flex justify-between mb-1">
                <span class="text-xs text-slate-500 dark:text-[#92a4c9]">
                  Độ mạnh: <span class="text-yellow-500 font-medium">Trung bình</span>
                </span>
              </div>
              <div class="h-1.5 w-full bg-gray-200 dark:bg-[#232f48] rounded-full overflow-hidden">
                <div class="h-full bg-yellow-500 w-3/5 rounded-full"></div>
              </div>
            </div>

            <!-- Requirements -->
            <ul class="mt-2 space-y-1">
              <li class="flex items-center gap-2 text-xs text-green-500">
                <span class="material-symbols-outlined text-[14px]">check_circle</span>
                Tối thiểu 8 ký tự
              </li>
              <li class="flex items-center gap-2 text-xs text-slate-400 dark:text-gray-500">
                <span class="material-symbols-outlined text-[14px]"
                  >radio_button_unchecked</span
                >
                Chứa ít nhất 1 ký tự viết hoa
              </li>
              <li class="flex items-center gap-2 text-xs text-slate-400 dark:text-gray-500">
                <span class="material-symbols-outlined text-[14px]"
                  >radio_button_unchecked</span
                >
                Chứa ít nhất 1 ký tự đặc biệt (!@#$...)
              </li>
            </ul>
          </div>

          <!-- Confirm Password -->
          <div class="flex flex-col gap-2">
            <label class="text-slate-700 dark:text-white text-sm font-medium leading-normal"
              >Nhập lại mật khẩu mới</label
            >
            <div class="relative flex items-center">
              <input
                class="flex-1 w-full rounded-lg border border-gray-300 dark:border-[#324467] bg-white dark:bg-[#192233] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-base"
                placeholder="Xác nhận mật khẩu mới"
                type="password"
              />
              <button
                class="absolute right-4 text-slate-400 dark:text-[#92a4c9] hover:text-slate-600 dark:hover:text-white transition-colors"
                type="button"
              >
                <span class="material-symbols-outlined">visibility_off</span>
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-4 flex items-center gap-4">
            <button
              class="bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
              type="submit"
            >
              Cập nhật mật khẩu
            </button>
            <button
              class="text-slate-600 dark:text-[#92a4c9] hover:text-slate-900 dark:hover:text-white font-medium py-3 px-4 rounded-lg transition-colors"
              type="button"
            >
              Hủy bỏ
            </button>
          </div>

          <div
            class="mt-2 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg flex gap-3"
          >
            <span class="material-symbols-outlined text-primary text-sm mt-0.5">info</span>
            <p class="text-xs text-slate-600 dark:text-blue-200/80 leading-relaxed">
              Sau khi đổi mật khẩu, bạn sẽ cần đăng nhập lại trên tất cả các thiết bị khác.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</div>
