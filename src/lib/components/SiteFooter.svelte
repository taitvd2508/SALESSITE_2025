<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="w-full border-t border-[#232f48] bg-background-dark">
  <div class="mx-auto w-full max-w-[1200px] px-4 md:px-10 py-10">
    <div class="flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
      <div class="flex items-center gap-3">
        <div class="size-8 flex items-center justify-center rounded bg-primary text-white">
          <span class="material-symbols-outlined text-[20px]">diamond</span>
        </div>
        <div>
          <p class="text-white font-bold">TT STORE</p>
          <p class="text-text-secondary text-sm">Phụ kiện công nghệ cao cấp</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-4 text-sm">
        <a class="text-text-secondary hover:text-white" href="/about">Về chúng tôi</a>
        <a class="text-text-secondary hover:text-white" href="/contact">Liên hệ</a>
        <a class="text-text-secondary hover:text-white" href="/products">Sản phẩm</a>
      </div>
    </div>

    <div class="mt-8 text-xs text-text-secondary">© {year} TT STORE. All rights reserved.</div>
  </div>
</footer>
