<script lang="ts">
  import { supabase } from '$lib/supabase/client';
  import { goto } from '$app/navigation';
  import { invalidateAll } from '$app/navigation';

  export let data: { email: string };

  let currentPassword = '';
  let newPassword = '';
  let confirmPassword = '';

  let showCurrent = false;
  let showNew = false;
  let showConfirm = false;

  let loading = false;
  let okMsg = '';
  let errorMsg = '';

  function strengthLabel(pw: string) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 1) return { label: 'Yếu', w: 'w-1/5', cls: 'bg-red-500' };
    if (score === 2)
      return { label: 'Trung bình', w: 'w-3/5', cls: 'bg-yellow-500' };
    return { label: 'Mạnh', w: 'w-full', cls: 'bg-emerald-500' };
  }

  $: meter = strengthLabel(newPassword);

  $: reqMin8 = newPassword.length >= 8;
  $: reqUpper = /[A-Z]/.test(newPassword);
  $: reqSpecial = /[^A-Za-z0-9]/.test(newPassword);

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    okMsg = '';
    errorMsg = '';

    if (!currentPassword || !newPassword || !confirmPassword) {
      errorMsg = 'Vui lòng nhập đầy đủ thông tin.';
      return;
    }
    if (newPassword !== confirmPassword) {
      errorMsg = 'Mật khẩu mới và xác nhận mật khẩu không khớp.';
      return;
    }
    if (newPassword.length < 8) {
      errorMsg = 'Mật khẩu mới phải có ít nhất 8 ký tự.';
      return;
    }

    loading = true;
    try {
      //1) Verify current password bằng cách signIn lại
      const { error: reauthErr } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: currentPassword,
      });

      if (reauthErr) {
        errorMsg = 'Mật khẩu hiện tại không đúng.';
        return;
      }

      //2) Update password
      const { error: upErr } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (upErr) {
        errorMsg = upErr.message ?? 'Đổi mật khẩu thất bại.';
        return;
      }

      okMsg =
        'Đổi mật khẩu thành công. Bạn có thể cần đăng nhập lại trên các thiết bị khác.';
      currentPassword = '';
      newPassword = '';
      confirmPassword = '';

      await invalidateAll();
      //optional: đưa về /account
      //await goto('/account');
    } catch (err: any) {
      errorMsg = err?.message ?? 'Đổi mật khẩu thất bại.';
    } finally {
      loading = false;
    }
  }

  function cancel() {
    goto('/account');
  }
</script>

<svelte:head>
  <title>TT STORE - Đổi Mật Khẩu</title>
</svelte:head>

<div class="w-full">
  <div class="w-full max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
    <main
      class="w-full overflow-hidden border border-gray-100 shadow-sm dark:bg-surface-dark rounded-xl dark:border-border-dark"
    >
      <div class="p-6 md:p-8">
        <div class="pb-6 mb-6 border-b border-gray-100 dark:border-border-dark">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-primary">encrypted</span
            >
            <h1
              class="text-2xl font-bold leading-tight text-slate-900 dark:text-white"
            >
              Đổi mật khẩu
            </h1>
          </div>
          <p class="text-slate-500 dark:text-[#92a4c9] text-base">
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </p>
        </div>

        <form
          class="mx-auto w-full max-w-[500px] flex flex-col gap-6"
          on:submit={onSubmit}
        >
          {#if okMsg}
            <div
              class="px-4 py-3 text-sm border text-emerald-200 rounded-xl border-emerald-500/40 bg-emerald-500/10"
            >
              {okMsg}
            </div>
          {/if}
          {#if errorMsg}
            <div
              class="px-4 py-3 text-sm text-red-200 border rounded-xl border-red-500/40 bg-red-500/10"
            >
              {errorMsg}
            </div>
          {/if}

          <!-- Current Password -->
          <div class="flex flex-col gap-2">
            <label
              for=""
              class="text-sm font-medium leading-normal text-slate-700 dark:text-white"
              >Mật khẩu hiện tại</label
            >
            <div class="relative flex items-center">
              {#if showCurrent}
                <input
                  type="text"
                  bind:value={currentPassword}
                  placeholder="Nhập mật khẩu hiện tại"
                  class="flex-1 w-full rounded-lg border border-gray-300 dark:border-[#324467] bg-white dark:bg-[#192233] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-base"
                />
              {:else}
                <input
                  type="password"
                  bind:value={currentPassword}
                  placeholder="Nhập mật khẩu hiện tại"
                  class="flex-1 w-full rounded-lg border border-gray-300 dark:border-[#324467] bg-white dark:bg-[#192233] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-base"
                />
              {/if}
              <button
                class="absolute right-4 text-slate-400 dark:text-[#92a4c9] hover:text-slate-600 dark:hover:text-white transition-colors"
                type="button"
                on:click={() => (showCurrent = !showCurrent)}
              >
                <span class="material-symbols-outlined"
                  >{showCurrent ? 'visibility' : 'visibility_off'}</span
                >
              </button>
            </div>
          </div>

          <!-- New Password -->
          <div class="flex flex-col gap-2">
            <label
              for=""
              class="text-sm font-medium leading-normal text-slate-700 dark:text-white"
              >Mật khẩu mới</label
            >
            <div class="relative flex items-center">
              {#if showNew}
                <input
                  type="text"
                  bind:value={newPassword}
                  placeholder="Nhập mật khẩu mới"
                  class="flex-1 w-full rounded-lg border border-gray-300 dark:border-[#324467] bg-white dark:bg-[#192233] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-base"
                  required
                />
              {:else}
                <input
                  type="password"
                  bind:value={newPassword}
                  placeholder="Nhập mật khẩu mới"
                  class="flex-1 w-full rounded-lg border border-gray-300 dark:border-[#324467] bg-white dark:bg-[#192233] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-base"
                  required
                />
              {/if}
              <button
                class="absolute right-4 text-slate-400 dark:text-[#92a4c9] hover:text-slate-600 dark:hover:text-white transition-colors"
                type="button"
                on:click={() => (showNew = !showNew)}
              >
                <span class="material-symbols-outlined"
                  >{showNew ? 'visibility' : 'visibility_off'}</span
                >
              </button>
            </div>

            <!-- Strength -->
            <div class="mt-1">
              <div class="flex justify-between mb-1">
                <span class="text-xs text-slate-500 dark:text-[#92a4c9]">
                  Độ mạnh: <span
                    class="font-medium"
                    class:text-red-400={meter.label === 'Yếu'}
                    class:text-yellow-400={meter.label === 'Trung bình'}
                    class:text-emerald-400={meter.label === 'Mạnh'}
                    >{meter.label}</span
                  >
                </span>
              </div>
              <div
                class="h-1.5 w-full bg-gray-200 dark:bg-[#232f48] rounded-full overflow-hidden"
              >
                <div
                  class={`h-full ${meter.cls} ${meter.w} rounded-full`}
                ></div>
              </div>
            </div>

            <!-- Requirements -->
            <ul class="mt-2 space-y-1">
              <li
                class={`flex items-center gap-2 text-xs ${reqMin8 ? 'text-emerald-500' : 'text-slate-400 dark:text-gray-500'}`}
              >
                <span class="material-symbols-outlined text-[14px]"
                  >{reqMin8 ? 'check_circle' : 'radio_button_unchecked'}</span
                >
                Tối thiểu 8 ký tự
              </li>
              <li
                class={`flex items-center gap-2 text-xs ${reqUpper ? 'text-emerald-500' : 'text-slate-400 dark:text-gray-500'}`}
              >
                <span class="material-symbols-outlined text-[14px]"
                  >{reqUpper ? 'check_circle' : 'radio_button_unchecked'}</span
                >
                Chứa ít nhất 1 ký tự viết hoa
              </li>
              <li
                class={`flex items-center gap-2 text-xs ${reqSpecial ? 'text-emerald-500' : 'text-slate-400 dark:text-gray-500'}`}
              >
                <span class="material-symbols-outlined text-[14px]"
                  >{reqSpecial
                    ? 'check_circle'
                    : 'radio_button_unchecked'}</span
                >
                Chứa ít nhất 1 ký tự đặc biệt (!@#$...)
              </li>
            </ul>
          </div>

          <!-- Confirm Password -->
          <div class="flex flex-col gap-2">
            <label
              for=""
              class="text-sm font-medium leading-normal text-slate-700 dark:text-white"
              >Nhập lại mật khẩu mới</label
            >
            <div class="relative flex items-center">
              {#if showConfirm}
                <input
                  type="text"
                  bind:value={confirmPassword}
                  placeholder="Xác nhận mật khẩu mới"
                  class="flex-1 w-full rounded-lg border border-gray-300 dark:border-[#324467] bg-white dark:bg-[#192233] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-base"
                  required
                />
              {:else}
                <input
                  type="password"
                  bind:value={confirmPassword}
                  placeholder="Xác nhận mật khẩu mới"
                  class="flex-1 w-full rounded-lg border border-gray-300 dark:border-[#324467] bg-white dark:bg-[#192233] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-base"
                  required
                />
              {/if}
              <button
                class="absolute right-4 text-slate-400 dark:text-[#92a4c9] hover:text-slate-600 dark:hover:text-white transition-colors"
                type="button"
                on:click={() => (showConfirm = !showConfirm)}
              >
                <span class="material-symbols-outlined"
                  >{showConfirm ? 'visibility' : 'visibility_off'}</span
                >
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-4 pt-4">
            <button
              class="px-6 py-3 font-medium text-white transition-colors rounded-lg shadow-lg bg-primary hover:bg-blue-700 shadow-blue-900/20 disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
            </button>
            <button
              class="text-slate-600 dark:text-[#92a4c9] hover:text-slate-900 dark:hover:text-white font-medium py-3 px-4 rounded-lg transition-colors"
              type="button"
              on:click={cancel}
            >
              Hủy bỏ
            </button>
          </div>

          <div
            class="flex gap-3 p-3 mt-2 border border-blue-100 rounded-lg bg-blue-50 dark:bg-blue-900/10 dark:border-blue-900/30"
          >
            <span class="material-symbols-outlined text-primary text-sm mt-0.5"
              >info</span
            >
            <p
              class="text-xs leading-relaxed text-slate-600 dark:text-blue-200/80"
            >
              Sau khi đổi mật khẩu, bạn sẽ cần đăng nhập lại trên tất cả các
              thiết bị khác.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</div>
