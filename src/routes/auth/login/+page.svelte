<script lang="ts">
  import { supabase } from "$lib/supabase/client";
  import { goto } from "$app/navigation";
  import { invalidateAll } from "$app/navigation";

  let email = "";
  let password = "";
  let showPass = false;

  let loading = false;
  let errorMsg = "";

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    errorMsg = "";
    loading = true;

    try {
      console.log("submit login");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error || !data.session) {
        const AUTH_ERROR_MAP: Record<string, string> = {
          "Invalid login credentials": "Email hoặc mật khẩu không đúng",
          "Email not confirmed": "Email chưa được xác nhận",
        };
        errorMsg = error
          ? (AUTH_ERROR_MAP[error.message] ?? "Đăng nhập thất bại") // nếu có error thì
          : "Không tạo được phiên đăng nhập"; // còn ko thì
        return;
      }

      // redirect sau khi login success
      const next =
        new URLSearchParams(window.location.search).get("next") ?? "/account";
      await invalidateAll(); //SSR reload theo cookie mới // để header/layout refresh ngay.
      await goto(next);
    } catch (err: any) {
      errorMsg = err?.message ?? "Đăng nhập thất bại";
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>TT STORE - Đăng Nhập</title>
</svelte:head>

<main class="flex justify-center flex-1 w-full">
  <div
    class="flex flex-col flex-1 w-full overflow-hidden layout-content-container md:flex-row max-w-7xl"
  >
    <!-- Left Side: Image/Branding (Hidden on mobile) -->
    <div
      class="relative items-center justify-center hidden p-8 overflow-hidden md:flex md:w-1/2 lg:w-3/5 bg-slate-900"
    >
      <div
        class="absolute inset-0 z-10 bg-gradient-to-br from-primary/20 via-background-dark to-background-dark"
      ></div>
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-center bg-cover opacity-60 mix-blend-overlay"
        data-alt="futuristic technology setup with neon lights"
        style="background-image: url('https://elabcalarempslfrkwbx.supabase.co/storage/v1/object/public/products/login/login_page.png');"
      ></div>

      <div class="relative z-20 max-w-lg px-6 text-center md:text-left">
        <div class="flex justify-center mb-6 md:justify-start">
          <span class="text-6xl material-symbols-outlined text-primary"
            >token</span
          >
        </div>
        <h1
          class="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white lg:text-5xl"
        >
          Trải nghiệm công nghệ đỉnh cao
        </h1>
        <p class="text-lg leading-relaxed text-slate-300">
          Khám phá bộ sưu tập phụ kiện premium dành cho người đam mê công nghệ.
        </p>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div
      class="flex flex-col items-center justify-center flex-1 w-full px-4 py-12 md:px-12 lg:px-24 bg-background-light dark:bg-background-dark"
    >
      <div class="w-full max-w-[420px] flex flex-col">
        <div class="mb-8 text-center md:text-left">
          <h2
            class="mb-2 text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white"
          >
            Chào mừng trở lại
          </h2>
          <p
            class="text-base font-normal leading-normal text-slate-500 dark:text-slate-400"
          >
            Nhập thông tin của bạn để truy cập tài khoản.
          </p>
        </div>

        <form class="flex flex-col gap-5" on:submit|preventDefault={onSubmit}>
          <!-- Email Input -->
          <div class="flex flex-col gap-2">
            <label
              class="text-sm font-medium leading-normal text-slate-900 dark:text-white"
              for="email"
            >
              Địa chỉ Email
            </label>
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]"
                >mail</span
              >
              <input
                class="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a202c] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-normal leading-normal transition-all"
                id="email"
                name="email"
                placeholder="nhapemail@example.com"
                type="email"
                bind:value={email}
                required
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <label
                class="text-sm font-medium leading-normal text-slate-900 dark:text-white"
                for="password">Mật khẩu</label
              >
              <a
                class="text-xs font-medium transition-colors text-primary hover:text-primary/80"
                href="/auth/forgot"
              >
                Quên mật khẩu?
              </a>
            </div>

            <div class="relative group/pass">
              <span
                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]"
                >lock</span
              >
              {#if showPass}
                <input
                  class="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a202c] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-12 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-normal leading-normal transition-all"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="text"
                  bind:value={password}
                  required
                />
              {:else}
                <input
                  class="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a202c] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-12 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-normal leading-normal transition-all"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  bind:value={password}
                  required
                />
              {/if}
              <button
                class="absolute transition-colors -translate-y-1/2 right-4 top-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
                type="button"
                on:click={() => (showPass = !showPass)}
              >
                <span class="material-symbols-outlined text-[20px]"
                  >{showPass ? "visibility_off" : "visibility"}</span
                >
              </button>
            </div>
          </div>

          {#if errorMsg}
            <div
              class="px-4 py-3 text-sm text-red-200 border rounded-xl border-red-500/40 bg-red-500/10"
            >
              {errorMsg}
            </div>
          {/if}

          <!-- Submit Button -->
          <button
            class="mt-2 w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold leading-normal tracking-wide transition-all shadow-lg shadow-primary/25 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            <span>{loading ? "Đang đăng nhập..." : "Đăng nhập"}</span>
            <span class="text-sm material-symbols-outlined">login</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-8">
          <div aria-hidden="true" class="absolute inset-0 flex items-center">
            <div
              class="w-full border-t border-slate-200 dark:border-slate-800"
            ></div>
          </div>
          <div class="relative flex justify-center">
            <span
              class="px-3 text-xs tracking-widest uppercase bg-background-light dark:bg-background-dark text-slate-500"
              >Hoặc tiếp tục với</span
            >
          </div>
        </div>
        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-4">
          <button
            class="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a202c] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-white text-sm font-medium"
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
            <span>Google</span>
          </button>
          <button
            class="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a202c] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-white text-sm font-medium"
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
            <span>Facebook</span>
          </button>
        </div>

        <!-- Register Link -->
        <div class="mt-8 text-center">
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Chưa có tài khoản?
            <a
              class="font-bold transition-colors text-primary hover:text-primary/80"
              href="/auth/register">Đăng ký ngay</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</main>
