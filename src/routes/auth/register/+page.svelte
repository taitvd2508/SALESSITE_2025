<script lang="ts">
  import { createClient } from '@supabase/supabase-js';
  import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
  } from '$env/static/public';
  import { enhance } from '$app/forms';
  import { onDestroy } from 'svelte';
  import { goto, invalidateAll } from '$app/navigation';
  import type { ActionData } from './$types';

  export let form: ActionData;

  // Supabase client (client-side) - dùng để signUp/resend để có PKCE code_verifier
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  let loading = false;
  let resendLoading = false;
  let showPass = false;
  let validating = false;
  let signingUp = false;

  // nút dùng biến này
  $: loading = validating || signingUp;

  // Fields (giữ lại value khi server trả lỗi validation)
  $: email = (form?.values?.email ?? '').toString();
  $: full_name = (form?.values?.full_name ?? '').toString();
  $: phone = (form?.values?.phone ?? '').toString();

  // password/confirm/agree là state ở client (KHÔNG trả về từ server)
  let password = '';
  let confirm = '';
  let agree = false;

  // Client-side error (từ supabase.auth.signUp/resend)
  let clientError = '';

  // UI chờ verify email
  let verificationPending = false;
  let timer = 60;
  let timerInterval: any;
  let pollingInterval: any;

  // Chặn gọi signUp nhiều lần khi SvelteKit update form
  let didSignup = false;

  function startTimer() {
    timer = 60;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (timer > 0) timer--;
      else clearInterval(timerInterval);
    }, 1000);
  }

  // Poll session status (server đọc httpOnly cookie). Khi cookie có → header/site layout update → về trang chủ
  function startPolling() {
    if (pollingInterval) clearInterval(pollingInterval);
    pollingInterval = setInterval(async () => {
      try {
        const res = await fetch('/api/auth/status');
        const { user } = await res.json();
        if (user) {
          clearInterval(pollingInterval);
          await invalidateAll();
          await goto('/');
        }
      } catch (e) {
        console.error('Polling error', e);
      }
    }, 3000);
  }

  async function doClientSignUp() {
    clientError = '';
    signingUp = true;

    try {
      const redirect = new URL('/auth/callback', window.location.origin);
      redirect.searchParams.set('next', '/auth/login');

      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name, phone },
          emailRedirectTo: redirect.toString(),
        },
      });
      if (error) throw error;

      verificationPending = true;
      startTimer();
      startPolling();
    } catch (err: any) {
      didSignup = false;
      clientError = err?.message ?? 'Đăng ký thất bại';
    } finally {
      signingUp = false;
    }
  }

  // ✅ Khi server validate xong và trả success=true → gọi signUp ở client (để có PKCE verifier)
  $: if (form?.success && !didSignup) {
    didSignup = true;
    doClientSignUp();
  }

  async function handleResend() {
    if (timer > 0 || !email.trim()) return;

    resendLoading = true;
    clientError = '';
    try {
      const redirect = new URL('/auth/callback', window.location.origin);
      redirect.searchParams.set('next', '/');

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: { emailRedirectTo: redirect.toString() },
      });

      if (error) throw error;
      startTimer();
    } catch (err: any) {
      console.error('Resend error:', err);
      clientError = err?.message ?? 'Gửi lại email thất bại';
    } finally {
      resendLoading = false;
    }
  }

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
    if (pollingInterval) clearInterval(pollingInterval);
  });
</script>

<svelte:head>
  <title>TT STORE - Đăng Ký Tài Khoản</title>
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

        {#if verificationPending}
          <!-- Verification UI -->
          <div
            class="flex flex-col gap-6 p-6 rounded-2xl bg-[#192233] border border-[#324467] shadow-xl"
          >
            <div class="flex flex-col items-center gap-4 text-center">
              <div class="p-4 mb-2 rounded-full bg-primary/10 text-primary">
                <span class="text-4xl material-symbols-outlined"
                  >mark_email_unread</span
                >
              </div>
              <h2 class="text-2xl font-bold text-white">
                Kiểm tra email của bạn
              </h2>
              <p class="text-[#92a4c9] text-base leading-relaxed max-w-md">
                Một email chứa liên kết xác minh đã được gửi tới <strong
                  >{form?.values?.email}</strong
                >. Vui lòng sử dụng liên kết này để đăng nhập.
              </p>
            </div>

            <div
              class="p-4 rounded-lg bg-[#232f48]/50 border border-[#324467]/50"
            >
              <p class="text-sm text-[#92a4c9] text-center">
                Chưa nhận được email? Hãy kiểm tra hộp thư rác (Spam) hoặc gửi
                lại sau {timer} giây.
              </p>
            </div>

            <button
              class="flex items-center justify-center w-full h-12 gap-2 text-base font-bold tracking-wide transition-all border rounded-lg border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-primary disabled:cursor-not-allowed"
              on:click={handleResend}
              disabled={resendLoading || timer > 0}
            >
              {#if resendLoading}
                <span
                  class="w-4 h-4 border-2 border-current rounded-full border-t-transparent animate-spin"
                ></span>
                Đang gửi...
              {:else if timer > 0}
                Gửi lại sau {timer} giây
              {:else}
                <span class="material-symbols-outlined text-[20px]"
                  >refresh</span
                >
                Gửi lại email
              {/if}
            </button>

            <div class="flex items-center justify-center pt-2">
              <a
                href="/auth/login"
                class="text-sm font-medium text-[#92a4c9] hover:text-white transition-colors flex items-center gap-1"
              >
                <span class="material-symbols-outlined text-[16px]"
                  >arrow_back</span
                >
                Quay lại trang đăng nhập
              </a>
            </div>
          </div>
        {:else}
          <!-- Registration Form -->
          <form
            class="flex flex-col gap-5"
            method="POST"
            use:enhance={() => {
              validating = true;
              clientError = '';
              didSignup = false;
              verificationPending = false;

              return async ({ update }) => {
                await update({ reset: false }); // validate server
                validating = false; // chỉ tắt validating, KHÔNG đụng signingUp
              };
            }}
          >
            <div class="flex flex-col gap-5 md:flex-row">
              <label class="flex flex-col flex-1">
                <span class="pb-2 text-sm font-medium text-white">Email</span>
                <div class="relative">
                  <input
                    class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-4 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                    placeholder="example@email.com"
                    type="email"
                    name="email"
                    value={email}
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
                <span class="pb-2 text-sm font-medium text-white"
                  >Họ và tên</span
                >
                <div class="relative">
                  <input
                    class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-4 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                    placeholder="Nguyễn Văn A"
                    type="text"
                    name="full_name"
                    value={full_name}
                    required
                  />
                  <span
                    class="material-symbols-outlined absolute left-3.5 top-3 text-[#92a4c9]"
                    >person</span
                  >
                </div>
              </label>

              <label class="flex flex-col flex-1">
                <span class="pb-2 text-sm font-medium text-white"
                  >Số điện thoại</span
                >
                <div class="relative">
                  <input
                    class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-4 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                    placeholder="0911.111.222"
                    type="tel"
                    name="phone"
                    value={phone}
                    required
                  />
                  <span
                    class="material-symbols-outlined absolute left-3.5 top-3 text-[#92a4c9]"
                    >phone</span
                  >
                </div>
              </label>
            </div>

            <div class="flex flex-col gap-5 md:flex-row">
              <label class="flex flex-col flex-1">
                <span class="pb-2 text-sm font-medium text-white">Mật khẩu</span
                >
                <div class="relative">
                  {#if showPass}
                    <input
                      class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-10 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                      placeholder="••••••••"
                      type="text"
                      name="password"
                      bind:value={password}
                      required
                    />
                  {:else}
                    <input
                      class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-10 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                      placeholder="••••••••"
                      type="password"
                      name="password"
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
                      name="confirm"
                      bind:value={confirm}
                      required
                    />
                  {:else}
                    <input
                      class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-10 text-base placeholder:text-[#92a4c9]/50 transition-colors"
                      placeholder="••••••••"
                      type="password"
                      name="confirm"
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
                    name="agree"
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
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a class="underline text-primary hover:text-blue-400" href="#"
                    >Điều khoản dịch vụ</a
                  >
                  và
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a class="underline text-primary hover:text-blue-400" href="#"
                    >Chính sách bảo mật</a
                  >
                  của TT Store.
                </span>
              </label>
            </div>

            {#if clientError}
              <div
                class="px-4 py-3 text-sm text-red-200 border rounded-xl border-red-500/40 bg-red-500/10"
              >
                {clientError}
              </div>
            {/if}

            {#if form?.error}
              <div
                class="px-4 py-3 text-sm text-red-200 border rounded-xl border-red-500/40 bg-red-500/10"
              >
                {form.error}
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
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.0003 20.45c-4.6667 0-8.4503-3.7836-8.4503-8.45s3.7836-8.45 8.4503-8.45c2.2818 0 4.3485.8364 5.9636 2.2145l-1.92 1.92c-.9981-.96-2.3781-1.5545-3.9054-1.5545-3.3218 0-6.0218 2.7-6.0218 6.0218s2.7 6.0218 6.0218 6.0218c2.8254 0 5.2909-1.8982 5.8636-4.6255h-5.8636v-2.4272h8.3345c.1255.6163.1855 1.2545.1855 1.92 0 4.7073-3.1582 8.45-8.6582 8.45z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span class="text-sm font-medium">Google</span>
              </button>
              <button
                class="flex items-center justify-center gap-2 h-12 rounded-lg bg-[#232f48] hover:bg-[#2d3b55] border border-[#324467] text-white transition-colors"
                type="button"
              >
                <svg
                  aria-hidden="true"
                  class="h-5 w-5 text-[#1877F2]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  ></path>
                </svg>
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
        {/if}
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
