<!-- User đặt mật khẩu lần đầu (hoặc sau reset): -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { createClient } from '@supabase/supabase-js';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  let password = '';
  let confirm = '';
  let loading = false;
  let errorMsg = '';
  let okMsg = '';

  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      await goto('/auth/login');
    }
  });

  async function setPassword() {
    errorMsg = '';
    okMsg = '';

    if (password.length < 6) {
      errorMsg = 'Mật khẩu tối thiểu 6 ký tự.';
      return;
    }
    if (password !== confirm) {
      errorMsg = 'Mật khẩu nhập lại không khớp.';
      return;
    }

    loading = true;
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      okMsg = 'Đặt mật khẩu thành công!';
      // về account hoặc trang chủ
      await goto('/account');
    } catch (e: any) {
      errorMsg = e?.message ?? 'Có lỗi xảy ra';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Đặt Mật Khẩu - TT STORE</title>
</svelte:head>

<main class="max-w-md mx-auto px-4 py-12">
  <div class="bg-surface-dark border border-[#232f48] rounded-2xl p-6">
    <h1 class="text-white text-xl font-bold">Đặt mật khẩu</h1>
    <p class="text-[#92a4c9] text-sm mt-1">Thiết lập mật khẩu cho tài khoản của bạn.</p>

    <div class="mt-6 space-y-4">
      <div>
        <label class="text-sm text-[#92a4c9]">Mật khẩu mới</label>
        <input
          class="mt-1 w-full bg-[#101622] border border-[#232f48] text-white rounded-lg p-3 outline-none focus:border-primary"
          type="password"
          bind:value={password}
        />
      </div>

      <div>
        <label class="text-sm text-[#92a4c9]">Nhập lại mật khẩu</label>
        <input
          class="mt-1 w-full bg-[#101622] border border-[#232f48] text-white rounded-lg p-3 outline-none focus:border-primary"
          type="password"
          bind:value={confirm}
        />
      </div>

      <button
        class="w-full bg-primary hover:bg-blue-700 text-white font-bold rounded-xl py-3 disabled:opacity-60"
        on:click={setPassword}
        disabled={loading}
      >
        {loading ? 'Đang lưu...' : 'Lưu mật khẩu'}
      </button>

      {#if errorMsg}
        <p class="text-red-400 text-sm">{errorMsg}</p>
      {/if}
      {#if okMsg}
        <p class="text-green-400 text-sm">{okMsg}</p>
      {/if}
    </div>
  </div>
</main>