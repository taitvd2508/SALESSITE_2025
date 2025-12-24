<script lang="ts">
  import { page } from '$app/stores';
  $: orderId = $page.url.searchParams.get('order') ?? '';
</script>

<main class="max-w-3xl mx-auto px-4 py-12">
  <div class="bg-surface-dark border border-[#232f48] rounded-2xl p-8 text-center">
    <h1 class="text-2xl font-bold text-white">Đặt hàng thành công 🎉</h1>
    <p class="text-[#92a4c9] mt-2">Mã đơn hàng: <span class="text-white font-semibold">#{orderId}</span></p>
    <a class="inline-flex mt-6 px-5 py-3 rounded-lg bg-primary text-white font-bold" href="/products">
      Tiếp tục mua sắm
    </a>
  </div>
</main>
