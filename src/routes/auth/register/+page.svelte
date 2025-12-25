<script lang="ts">
  import { createClient } from '@supabase/supabase-js';
  import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
  } from '$env/static/public';
  import { goto } from '$app/navigation';

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  let full_name = '';
  let email = '';
  let password = '';
  let confirm = '';
  let agree = false;

  let showPass = false;
  let loading = false;
  let errorMsg = '';
  let okMsg = '';

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    errorMsg = '';
    okMsg = '';

    if (!agree) {
      errorMsg = 'Bạn cần đồng ý Điều khoản dịch vụ.';
      return;
    }
    if (password.length < 6) {
      errorMsg = 'Mật khẩu tối thiểu 6 ký tự.';
      return;
    }
    if (password !== confirm) {
      errorMsg = 'Xác nhận mật khẩu không khớp.';
      return;
    }

    loading = true;
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name },
        },
      });
      if (error) throw error;

      okMsg = 'Đăng ký thành công. Bạn có thể đăng nhập ngay.';
      await goto('/auth/login');
    } catch (err: any) {
      errorMsg = err?.message ?? 'Đăng ký thất bại';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Đăng ký tài khoản - TT STORE</title>
</svelte:head>

<main
  class="relative flex justify-center flex-grow overflow-hidden bg-background-dark"
>
  <div
    class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0"
  ></div>

  <div
    class="layout-container flex flex-col w-full max-w-[1200px] px-4 md:px-10 py-10 z-10"
  >
    <div class="flex flex-col items-start gap-12 lg:flex-row lg:gap-20">
      <div class="flex-1 w-full max-w-[640px] mx-auto lg:mx-0">
        <div class="mb-8">
          <h1
            class="text-white text-4xl md:text-5xl font-black tracking-[-0.033em] mb-3"
          >
            Đăng ký tài khoản
          </h1>
          <p class="text-[#92a4c9] text-lg font-normal">
            Trải nghiệm mua sắm phụ kiện công nghệ đỉnh cao cùng cộng đồng TT
            Store.
          </p>
        </div>

        <form class="flex flex-col gap-5" on:submit={onSubmit}>
          <div class="flex flex-col gap-5 md:flex-row">
            <label class="flex flex-col flex-1">
              <span class="pb-2 text-sm font-medium text-white">Họ và tên</span>
              <div class="relative">
                <input
                  class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-4 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                  placeholder="Nguyễn Văn A"
                  type="text"
                  bind:value={full_name}
                  required
                />
                <span
                  class="material-symbols-outlined absolute left-3.5 top-3 text-[#92a4c9]"
                  >person</span
                >
              </div>
            </label>

            <label class="flex flex-col flex-1">
              <span class="pb-2 text-sm font-medium text-white">Email</span>
              <div class="relative">
                <input
                  class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-4 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                  placeholder="example@email.com"
                  type="email"
                  bind:value={email}
                  required
                />
                <span
                  class="material-symbols-outlined absolute left-3.5 top-3 text-[#92a4c9]"
                  >mail</span
                >
              </div>
            </label>
          </div>

          <div class="flex flex-col gap-5 md:flex-row">
            <label class="flex flex-col flex-1">
              <span class="pb-2 text-sm font-medium text-white">Mật khẩu</span>
              <div class="relative">
                {#if showPass}
                  <input
                    class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-10 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                    placeholder="••••••••"
                    type="text"
                    bind:value={password}
                    required
                  />
                {:else}
                  <input
                    class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-10 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                    placeholder="••••••••"
                    type="password"
                    bind:value={password}
                    required
                  />
                {/if}
                <span
                  class="material-symbols-outlined absolute left-3.5 top-3 text-[#92a4c9]"
                  >lock</span
                >
                <button
                  class="absolute right-3 top-3 text-[#92a4c9] hover:text-white transition-colors"
                  type="button"
                  on:click={() => (showPass = !showPass)}
                >
                  <span class="material-symbols-outlined text-[20px]"
                    >{showPass ? 'visibility_off' : 'visibility'}</span
                  >
                </button>
              </div>
            </label>

            <label class="flex flex-col flex-1">
              <span class="pb-2 text-sm font-medium text-white"
                >Xác nhận mật khẩu</span
              >
              <div class="relative">
                {#if showPass}
                  <input
                    class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-10 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                    placeholder="••••••••"
                    type="text"
                    bind:value={confirm}
                    required
                  />
                {:else}
                  <input
                    class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-10 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                    placeholder="••••••••"
                    type="password"
                    bind:value={confirm}
                    required
                  />
                {/if}
                <span
                  class="material-symbols-outlined absolute left-3.5 top-3 text-[#92a4c9]"
                  >lock_reset</span
                >
              </div>
            </label>
          </div>

          <div class="py-2">
            <label class="flex items-start gap-3 cursor-pointer group">
              <div class="relative flex items-center mt-0.5">
                <input
                  class="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-[#324467] bg-transparent checked:border-primary checked:bg-primary transition-all hover:border-[#4b6699]"
                  type="checkbox"
                  bind:checked={agree}
                />
                <span
                  class="material-symbols-outlined pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  >check</span
                >
              </div>
              <span
                class="text-[#92a4c9] text-sm leading-tight group-hover:text-white transition-colors"
              >
                Tôi đã đọc và đồng ý với
                <a class="underline text-primary hover:text-blue-400" href="#"
                  >Điều khoản dịch vụ</a
                >
                và
                <a class="underline text-primary hover:text-blue-400" href="#"
                  >Chính sách bảo mật</a
                >
                của TT Store.
              </span>
            </label>
          </div>

          {#if errorMsg}
            <div
              class="px-4 py-3 text-sm text-red-200 border rounded-xl border-red-500/40 bg-red-500/10"
            >
              {errorMsg}
            </div>
          {/if}
          {#if okMsg}
            <div
              class="px-4 py-3 text-sm text-green-200 border rounded-xl border-green-500/40 bg-green-500/10"
            >
              {okMsg}
            </div>
          {/if}

          <button
            class="w-full bg-primary hover:bg-blue-600 text-white h-12 rounded-lg font-bold text-base tracking-wide transition-all shadow-[0_0_20px_rgba(17,82,212,0.3)] hover:shadow-[0_0_30px_rgba(17,82,212,0.5)] mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Đang tạo...' : 'Đăng ký tài khoản'}
          </button>

          <!-- Divider -->
          <div class="relative flex items-center py-2">
            <div class="flex-grow border-t border-[#324467]"></div>
            <span class="flex-shrink-0 mx-4 text-[#92a4c9] text-sm"
              >Hoặc đăng ký bằng</span
            >
            <div class="flex-grow border-t border-[#324467]"></div>
          </div>
          <!-- Social Login -->
          <div class="grid grid-cols-2 gap-4">
            <button
              class="flex items-center justify-center gap-2 h-12 rounded-lg bg-[#232f48] hover:bg-[#2d3b55] border border-[#324467] text-white transition-colors"
              type="button"
            >
              <img
                alt="Google Logo"
                class="w-5 h-5"
                data-alt="Google colorful logo icon"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCapaJ1Lk5mMKFR_ISQchzJSV-YHtRI9VbH6uRTM_gPGHq1-Mn3sp8xwcbkW6hVM0qvVFKebkeBWzt633AIqpohlnw9D2LnZE8e0dJnOaE_zDMRFBpX9lMm_TwGwMe39mExu3Bhd2SmhrmAwC_lGFh0bOkE7Rt1omgJJCKAHzmOL2dkw6OMlKnouY44icimepHEhaa0e6maCK8fdFOYAjn12SJjQagXjfkEox0ILpg2LgNZ-jRDD3xF7fV5Oo7FCoXMG_LWr-o5GA"
              />
              <span class="text-sm font-medium">Google</span>
            </button>
            <button
              class="flex items-center justify-center gap-2 h-12 rounded-lg bg-[#232f48] hover:bg-[#2d3b55] border border-[#324467] text-white transition-colors"
              type="button"
            >
              <img
                alt="Facebook Logo"
                class="w-5 h-5"
                data-alt="Facebook colorful logo icon"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmXGZ5TvHOpGqI5yozXy1yEUpGnoBF7LrqO_ap4QWkUA9smBgxgPaSxgArp0WuLyfUzeBgeC1ywcJQAbFD0JiYbOSViWNn_vOJ5lJ_pYlOlrDk8TYex3VnLVA1CBB8sJ66JZJOnp38ko99WVLCI3hp1H1qkcdcdJlMWJKr771REoZYC99k2GQyLmKYh67TdpiOirFnmq0SHk9OeEU_A3tJQOQXwZ55qPFOXUQw1HymIPrYg2ZjfA6GPgub8rXi75mPmf9kRjiU3g"
              />
              <span class="text-sm font-medium">Facebook</span>
            </button>
          </div>

          <!-- Sign In Link -->
          <p class="text-center text-[#92a4c9] mt-2">
            Bạn đã có tài khoản?
            <a
              class="font-bold transition-colors text-primary hover:text-blue-400"
              href="/auth/login">Đăng nhập ngay</a
            >
          </p>
        </form>
      </div>

      <!-- Right column -->
      <div class="flex-col flex-1 hidden gap-6 pt-10 lg:flex">
        <!-- Feature Card 1 -->
        <div
          class="group relative overflow-hidden rounded-2xl bg-[#192233] border border-[#232f48] p-6 hover:border-[#324467] transition-all"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-lg bg-primary/10 text-primary">
              <span class="material-symbols-outlined">workspace_premium</span>
            </div>
          </div>
          <h3 class="mb-2 text-lg font-bold text-white">Sản phẩm chính hãng</h3>
          <p class="text-[#92a4c9] text-sm leading-relaxed">
            Cam kết 100% sản phẩm chính hãng từ các thương hiệu công nghệ hàng
            đầu thế giới.
          </p>
          <div
            class="absolute w-32 h-32 transition-colors rounded-full -right-6 -bottom-6 bg-primary/5 blur-2xl group-hover:bg-primary/10"
          ></div>
        </div>
        <!-- Feature Card 2 -->
        <div
          class="group relative overflow-hidden rounded-2xl bg-[#192233] border border-[#232f48] p-6 hover:border-[#324467] transition-all"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 text-green-500 rounded-lg bg-green-500/10">
              <span class="material-symbols-outlined">local_shipping</span>
            </div>
          </div>
          <h3 class="mb-2 text-lg font-bold text-white">Giao hàng hỏa tốc</h3>
          <p class="text-[#92a4c9] text-sm leading-relaxed">
            Nhận hàng trong vòng 2 giờ tại nội thành Hà Nội và TP.HCM.
          </p>
          <div
            class="absolute w-32 h-32 transition-colors rounded-full -right-6 -bottom-6 bg-green-500/5 blur-2xl group-hover:bg-green-500/10"
          ></div>
        </div>
        <!-- Image Banner -->
        <div class="relative w-full h-64 mt-auto overflow-hidden rounded-2xl">
          <img
            alt="Tech setup with neon lights"
            class="object-cover w-full h-full transition-opacity duration-700 opacity-60 hover:opacity-80 hover:scale-105"
            data-alt="Futuristic gaming setup with pink and blue neon lighting"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG6r2LhoClkEHN-dF6t8kkFxvHM6rVHyGIQ4xnzjwaOpv1pgns4PR8oufOOFZR_Be4iZBtyUb9vMa0npq4ioaQn2aNlMJJth8_59qMVWUJgQOQV9M5GA97a6AmILJb4TdkxvzL7t0eKXER9p3zDVm9ouL2MBLcvRaSi9qs51VXquLIJABkYeulNu-1MPMGuYeg2xwCdrNRyVdCoN5d14hEJwoEqU2RJTtID4Zrb4RwW4WLg1B_EbQW93ydNNnITCvlNzdTZhUN3Q"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#101622] to-transparent"
          ></div>
          <div class="absolute bottom-6 left-6 right-6">
            <p class="text-sm font-medium text-white">
              "Nâng tầm không gian làm việc của bạn với TT Store"
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
