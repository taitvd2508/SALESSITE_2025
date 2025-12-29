<script lang="ts">
  import { cart, cartTotals, vnd, type CartItem } from '$lib/stores/cart';

  $: items = $cart.items as CartItem[];
  $: totals = cartTotals(items);

  function coverOf(x: CartItem) {
    return x.image ?? '/images/placeholder-product.png';
  }

  function clampQty(n: unknown) {
    const v = Number(n);
    if (Number.isNaN(v) || v < 1) return 1;
    return Math.floor(v);
  }
</script>

<svelte:head>
  <title>TT STORE - Giỏ Hàng</title>
</svelte:head>

<main class="max-w-[1280px] mx-auto px-4 lg:px-10 py-8">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold text-white">Giỏ hàng</h1>
    {#if items.length > 0}
      <button
        class="text-sm text-[#92a4c9] hover:text-white"
        on:click={() => cart.clear()}
      >
        Xoá tất cả
      </button>
    {/if}
  </div>

  {#if items.length === 0}
    <div
      class="bg-surface-dark border border-[#232f48] rounded-xl p-6 text-[#92a4c9]"
    >
      Giỏ hàng đang trống. Hãy thêm vài sản phẩm nhé.
    </div>
  {:else}
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div class="space-y-4 lg:col-span-8">
        {#each items as it (it.product_id)}
          <div
            class="bg-surface-dark border border-[#232f48] rounded-xl p-4 flex gap-4"
          >
            <a
              class="w-24 h-24 rounded-lg bg-[#101622] border border-[#232f48] overflow-hidden flex-shrink-0"
              href={`/products/${it.slug}`}
            >
              <img
                class="object-cover w-full h-full"
                src={coverOf(it)}
                alt={it.name}
              />
            </a>

            <div class="flex-1 min-w-0">
              <a
                href={`/products/${it.slug}`}
                class="font-semibold text-white hover:text-primary line-clamp-2"
              >
                {it.name}
              </a>

              <div class="flex items-end gap-2 mt-2">
                <div class="font-bold text-white">{vnd(it.price)}</div>
                {#if it.old_price && it.old_price > it.price}
                  <div class="text-xs text-[#92a4c9] line-through">
                    {vnd(it.old_price)}
                  </div>
                {/if}
              </div>

              <div class="flex items-center justify-between mt-4">
                <div
                  class="flex items-center rounded-lg bg-[#101622] border border-[#232f48] h-10"
                >
                  <button
                    class="w-10 h-full text-white hover:bg-[#232f48] rounded-l-lg"
                    on:click={() => cart.dec(it.product_id)}
                  >
                    -
                  </button>
                  <input
                    class="h-full font-bold text-center text-white bg-transparent outline-none w-14"
                    value={it.quantity}
                    on:change={() =>
                      cart.setQty(it.product_id, clampQty(it.quantity))}
                  />
                  <button
                    class="w-10 h-full text-white hover:bg-[#232f48] rounded-r-lg"
                    on:click={() => cart.inc(it.product_id)}
                  >
                    +
                  </button>
                </div>

                <div class="flex items-center gap-3">
                  <div class="font-bold text-white">
                    {vnd(it.price * it.quantity)}
                  </div>
                  <button
                    class="text-[#92a4c9] hover:text-red-400"
                    on:click={() => cart.remove(it.product_id)}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <aside class="lg:col-span-4">
        <div class="bg-surface-dark border border-[#232f48] rounded-xl p-6">
          <h2 class="mb-4 font-bold text-white">Tóm tắt</h2>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-[#92a4c9]">Số lượng</span>
              <span class="font-semibold text-white">{totals.count}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#92a4c9]">Tạm tính</span>
              <span class="font-semibold text-white"
                >{vnd(totals.subtotal)}</span
              >
            </div>
          </div>

          <a
            href="/checkout"
            class="flex items-center justify-center block w-full h-12 mt-6 font-bold text-white transition-colors rounded-lg bg-primary hover:bg-blue-600"
          >
            Tiến hành thanh toán
          </a>
        </div>
      </aside>
    </div>
  {/if}
</main>
