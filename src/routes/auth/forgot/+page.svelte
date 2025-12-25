<script lang="ts">
  import { createClient } from '@supabase/supabase-js';
  import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
  } from '$env/static/public';

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  let email = '';
  let loading = false;
  let errorMsg = '';
  let okMsg = '';

  async function sendReset(e: SubmitEvent) {
    e.preventDefault();
    errorMsg = '';
    okMsg = '';
    loading = true;

    try {
      console.log('BEFORE call reset');
      const redirectTo = `${window.location.origin}/auth/callback`;
      console.log('redirectTo =', redirectTo);
      const res = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });

      console.log('AFTER call reset', res);

      okMsg = 'Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư.';
    } catch (err: any) {
      errorMsg = err?.message ?? 'Gửi email thất bại';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Quên mật khẩu - TT STORE</title>
</svelte:head>

<main
  class="relative flex items-center justify-center flex-grow p-4 py-12 overflow-hidden"
>
  <div
    class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
  ></div>
  <div
    class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
  ></div>

  <div class="layout-content-container flex flex-col w-full max-w-[480px] z-10">
    <div
      class="p-8 overflow-hidden border shadow-2xl bg-surface-dark border-border-dark rounded-xl sm:p-10"
    >
      <div class="flex flex-col gap-4 mb-8 text-center">
        <div
          class="flex items-center justify-center w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 text-primary"
        >
          <span class="text-4xl material-symbols-outlined">lock_reset</span>
        </div>
        <h1
          class="text-white tracking-tight text-[32px] font-bold leading-tight"
        >
          Quên mật khẩu?
        </h1>
        <p class="text-[#92a4c9] text-base font-normal leading-relaxed">
          Đừng lo lắng. Vui lòng nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi
          hướng dẫn đặt lại mật khẩu cho bạn.
        </p>
      </div>

      <form class="flex flex-col gap-6" on:submit={sendReset}>
        <label class="flex flex-col gap-2">
          <span class="text-sm font-semibold leading-normal text-white"
            >Email</span
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#92a4c9]"
            >
              <span class="material-symbols-outlined text-[20px]">mail</span>
            </div>
            <input
              class="form-input flex w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary/50 focus:outline-none h-12 placeholder:text-[#586380] pl-11 pr-4 text-base font-normal leading-normal transition-all"
              placeholder="vidu@email.com"
              type="email"
              bind:value={email}
              required
            />
          </div>
        </label>

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
          class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-blue-600 active:scale-[0.98] transition-all text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/25 disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          <span class="truncate"
            >{loading ? 'Đang gửi...' : 'Gửi liên kết xác nhận'}</span
          >
        </button>

        <div class="flex justify-center mt-2">
          <a
            class="group flex items-center gap-2 text-[#92a4c9] hover:text-white transition-colors text-sm font-medium"
            href="/auth/login"
          >
            <span
              class="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform"
              >arrow_back</span
            >
            Quay lại Đăng nhập
          </a>
        </div>
      </form>
    </div>

    <div class="flex justify-center gap-6 mt-8 text-sm text-[#586380]">
      <a class="hover:text-[#92a4c9] transition-colors" href="#">Trợ giúp</a>
      <span class="w-px h-4 bg-[#324467]"></span>
      <a class="hover:text-[#92a4c9] transition-colors" href="#">Điều khoản</a>
    </div>
  </div>
</main>
