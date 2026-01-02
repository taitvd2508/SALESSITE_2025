<!-- User đặt mật khẩu lần đầu (hoặc sau reset): -->
<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { createClient } from "@supabase/supabase-js";
  import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
  } from "$env/static/public";

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  let password = "";
  let confirm = "";
  let loading = false;
  let errorMsg = "";
  let okMsg = "";

  onMount(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      await goto("/auth/login");
    }
  });

  async function setPassword() {
    errorMsg = "";
    okMsg = "";

    if (password.length < 6) {
      errorMsg = "Mật khẩu tối thiểu 6 ký tự.";
      return;
    }
    if (password !== confirm) {
      errorMsg = "Mật khẩu nhập lại không khớp.";
      return;
    }

    loading = true;
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      okMsg = "Đặt mật khẩu thành công!";
      // về account hoặc trang chủ
      await goto("/account");
    } catch (e: any) {
      errorMsg = e?.message ?? "Có lỗi xảy ra";
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>TT STORE - Đặt Mật Khẩu</title>
</svelte:head>

<main class="max-w-md px-4 py-12 mx-auto">
  <div class="bg-surface-dark border border-[#232f48] rounded-2xl p-6">
    <h1 class="text-xl font-bold text-white">Đặt mật khẩu</h1>
    <p class="text-[#92a4c9] text-sm mt-1">
      Thiết lập mật khẩu cho tài khoản của bạn.
    </p>

    <div class="mt-6 space-y-4">
      <div>
        <label class="text-sm text-[#92a4c9]" for="newPassword"
          >Mật khẩu mới</label
        >
        <input
          class="mt-1 w-full bg-[#101622] border border-[#232f48] text-white rounded-lg p-3 outline-none focus:border-primary"
          type="password"
          id="newPassword"
          bind:value={password}
        />
      </div>

      <div>
        <label class="text-sm text-[#92a4c9]" for="confirmPassword"
          >Nhập lại mật khẩu</label
        >
        <input
          class="mt-1 w-full bg-[#101622] border border-[#232f48] text-white rounded-lg p-3 outline-none focus:border-primary"
          type="password"
          id="confirmPassword"
          bind:value={confirm}
        />
      </div>

      <button
        class="w-full py-3 font-bold text-white bg-primary hover:bg-blue-700 rounded-xl disabled:opacity-60"
        on:click={setPassword}
        disabled={loading}
      >
        {loading ? "Đang lưu..." : "Lưu mật khẩu"}
      </button>

      {#if errorMsg}
        <p class="text-sm text-red-400">{errorMsg}</p>
      {/if}
      {#if okMsg}
        <p class="text-sm text-green-400">{okMsg}</p>
      {/if}
    </div>
  </div>
</main>
