<script lang="ts">
  import { page } from '$app/stores';
  $: orderId = $page.url.searchParams.get('order') ?? '';
</script>

<svelte:head>
  <title>TT STORE - Thanh Toán Thành Công</title>
</svelte:head>

<main class="max-w-3xl px-4 py-12 mx-auto">
  <div
    class="bg-surface-dark border border-[#232f48] rounded-2xl p-8 text-center"
  >
    <h1 class="text-2xl font-bold text-white">Đặt hàng thành công 🎉</h1>
    <p class="text-[#92a4c9] mt-2">
      Mã đơn hàng: <span class="font-semibold text-white">#{orderId}</span>
    </p>
    <a
      class="inline-flex px-5 py-3 mt-6 font-bold text-white rounded-lg bg-primary"
      href="/products"
    >
      Tiếp tục mua sắm
    </a>
  </div>
</main>
