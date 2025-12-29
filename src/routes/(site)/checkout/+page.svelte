<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { cart, cartTotals, vnd, type CartItem } from '$lib/stores/cart';

  export let data: {
    user: any | null;
    prefill: {
      full_name: string;
      phone: string;
      email: string;
      address: string;
    };
  };

  // ✅ default: nếu login -> có data.prefill, guest -> rỗng
  let full_name = data.prefill.full_name;
  let phone = data.prefill.phone;
  let email = data.prefill.email;
  let address = data.prefill.address;

  let note = '';
  let payment_method: 'cod' | 'bank' | 'wallet' = 'cod';

  let loading = false;
  let errorMsg = '';

  $: items = $cart.items as CartItem[];
  $: totals = cartTotals(items);

  function coverOf(x: CartItem) {
    return x.image ?? '/images/placeholder-product.png';
  }

  async function submitOrder() {
    errorMsg = '';
    if (!items.length) {
      errorMsg = 'Giỏ hàng trống.';
      return;
    }
    if (!full_name || !phone || !email || !address) {
      errorMsg = 'Vui lòng nhập đầy đủ họ tên, SĐT, email, địa chỉ.';
      return;
    }

    loading = true;
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name,
          phone,
          email,
          address,
          note,
          payment_method,
          items: items.map((x) => ({
            product_id: x.product_id,
            quantity: x.quantity,
            price: x.price, // server sẽ không tin giá này, chỉ gửi để debug
          })),
        }),
      });

      const out = await res.json();
      if (!res.ok || !out.ok)
        throw new Error(out.error || 'Đặt Hàng Thất Bại!');

      cart.clear();
      await goto(`/checkout/success?order=${out.order_id}`);
    } catch (e: any) {
      errorMsg = e?.message ?? 'Có lỗi xảy ra';
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    // nếu giỏ trống, đá về cart
    if (!$cart.items.length) goto('/cart');
  });
</script>

<svelte:head>
  <title>TT STORE - Thanh Toán</title>
</svelte:head>

<main
  class="flex-grow w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-12"
>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
    <!-- Left Column: Forms -->
    <div class="flex flex-col gap-8 lg:col-span-7 xl:col-span-8">
      <!-- Shipping Info Section -->
      <section>
        <div class="flex items-center gap-3 mb-6">
          <div
            class="flex items-center justify-center text-sm font-bold text-white rounded-full size-8 bg-primary"
          >
            1
          </div>
          <h2 class="text-xl font-bold tracking-tight sm:text-2xl">
            Thông tin giao hàng
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <!-- Full Name -->
          <div class="flex flex-col gap-2">
            <label
              class="text-sm font-medium text-slate-700 dark:text-[#92a4c9]"
              for="fullname">Họ và tên</label
            >
            <input
              class="form-input w-full rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-[#5d6b82]"
              id="fullname"
              placeholder="Nguyễn Văn A"
              bind:value={full_name}
              type="text"
            />
          </div>
          <!-- Phone -->
          <div class="flex flex-col gap-2">
            <label
              class="text-sm font-medium text-slate-700 dark:text-[#92a4c9]"
              for="phone">Số điện thoại</label
            >
            <input
              class="form-input w-full rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-[#5d6b82]"
              id="phone"
              placeholder="0911.111.222"
              bind:value={phone}
              type="tel"
            />
          </div>
          <!-- Email -->
          <div class="flex flex-col col-span-1 gap-2 sm:col-span-2">
            <label
              class="text-sm font-medium text-slate-700 dark:text-[#92a4c9]"
              for="email">Email</label
            >
            <input
              class="form-input w-full rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-[#5d6b82]"
              id="email"
              placeholder="example@domain.com"
              bind:value={email}
              type="email"
            />
          </div>
          <!-- Address -->
          <div class="flex flex-col col-span-1 gap-2 sm:col-span-2">
            <label
              class="text-sm font-medium text-slate-700 dark:text-[#92a4c9]"
              for="address">Địa chỉ nhận hàng</label
            >
            <input
              class="form-input w-full rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-[#5d6b82]"
              id="address"
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
              bind:value={address}
              type="text"
            />
          </div>
          <!-- Note -->
          <div class="flex flex-col col-span-1 gap-2 sm:col-span-2">
            <label
              class="text-sm font-medium text-slate-700 dark:text-[#92a4c9]"
              for="note">Ghi chú đơn hàng (Tùy chọn)</label
            >
            <textarea
              class="form-textarea w-full rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-900 dark:text-white px-4 py-3 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-[#5d6b82] resize-none"
              id="note"
              placeholder="Ví dụ: Giao hàng vào giờ hành chính"
              bind:value={note}
              rows="3"
            ></textarea>
          </div>
        </div>
      </section>
      <hr class="border-slate-200 dark:border-[#232f48]" />
      <!-- Payment Method Section -->
      <section>
        <div class="flex items-center gap-3 mb-6">
          <div
            class="flex items-center justify-center text-sm font-bold text-white rounded-full size-8 bg-primary"
          >
            2
          </div>
          <h2 class="text-xl font-bold tracking-tight sm:text-2xl">
            Phương thức thanh toán
          </h2>
        </div>
        <div class="flex flex-col gap-3">
          <!-- COD Option -->
          <label class="relative cursor-pointer group">
            <input
              class="sr-only peer radio-checked-bg radio-checked-icon"
              name="payment_method"
              type="radio"
              value="cod"
              bind:group={payment_method}
            />
            <div
              class="p-4 rounded-xl border border-slate-200 dark:border-[#324467] bg-white dark:bg-[#192233] transition-all flex items-center gap-4 peer-checked:border-white peer-checked:bg-primary/60"
            >
              <div
                class="size-10 rounded-full bg-slate-100 dark:bg-[#232f48] flex items-center justify-center text-primary"
              >
                <span class="material-symbols-outlined">payments</span>
              </div>
              <div class="flex-1">
                <p class="font-bold text-slate-900 dark:text-white">
                  Thanh toán khi nhận hàng (COD)
                </p>
                <p class="text-sm text-slate-500 dark:text-[#92a4c9]">
                  Thanh toán bằng tiền mặt khi shipper giao hàng đến.
                </p>
              </div>
              <div
                class="items-center justify-center hidden border rounded-full size-5 border-slate-300 dark:border-slate-500 check-icon peer-checked:border-primary peer-checked:bg-primary"
              >
                <span class="material-symbols-outlined text-[14px] text-white"
                  >check</span
                >
              </div>
            </div>
          </label>
          <!-- Bank Transfer Option -->
          <label class="relative cursor-pointer group">
            <input
              class="sr-only peer radio-checked-bg radio-checked-icon"
              name="payment_method"
              type="radio"
              value="bank"
              bind:group={payment_method}
            />
            <div
              class="p-4 rounded-xl border border-slate-200 dark:border-[#324467] bg-white dark:bg-[#192233] hover:border-primary transition-all flex items-center gap-4 peer-checked:border-white peer-checked:bg-primary/60"
            >
              <div
                class="size-10 rounded-full bg-slate-100 dark:bg-[#232f48] flex items-center justify-center text-primary"
              >
                <span class="material-symbols-outlined">account_balance</span>
              </div>
              <div class="flex-1">
                <p class="font-bold text-slate-900 dark:text-white">
                  Chuyển khoản ngân hàng
                </p>
                <p class="text-sm text-slate-500 dark:text-[#92a4c9]">
                  Chuyển khoản qua QR Code hoặc Internet Banking.
                </p>
              </div>
              <div
                class="items-center justify-center hidden border rounded-full size-5 border-slate-300 dark:border-slate-500 check-icon peer-checked:border-primary peer-checked:bg-primary"
              >
                <span class="material-symbols-outlined text-[14px] text-white"
                  >check</span
                >
              </div>
            </div>
          </label>
          <!-- E-Wallet Option -->
          <label class="relative cursor-pointer group">
            <input
              class="sr-only peer radio-checked-bg radio-checked-icon"
              name="payment_method"
              type="radio"
              value="wallet"
              bind:group={payment_method}
            />
            <div
              class="p-4 rounded-xl border border-slate-200 dark:border-[#324467] bg-white dark:bg-[#192233] hover:border-primary transition-all flex items-center gap-4 peer-checked:border-white peer-checked:bg-primary/60"
            >
              <div
                class="size-10 rounded-full bg-slate-100 dark:bg-[#232f48] flex items-center justify-center text-primary"
              >
                <span class="material-symbols-outlined"
                  >account_balance_wallet</span
                >
              </div>
              <div class="flex-1">
                <p class="font-bold text-slate-900 dark:text-white">
                  Ví điện tử (Momo / ZaloPay)
                </p>
                <p class="text-sm text-slate-500 dark:text-[#92a4c9]">
                  Quét mã thanh toán nhanh chóng, tiện lợi.
                </p>
              </div>
              <div
                class="items-center justify-center hidden border rounded-full size-5 border-slate-300 dark:border-slate-500 check-icon peer-checked:border-primary peer-checked:bg-primary"
              >
                <span class="material-symbols-outlined text-[14px] text-white"
                  >check</span
                >
              </div>
            </div>
          </label>
        </div>
      </section>
    </div>
    <!-- Right Column: Order Summary (Sticky) -->
    <div class="lg:col-span-5 xl:col-span-4">
      <div
        class="sticky top-24 rounded-2xl border border-slate-200 dark:border-[#232f48] bg-white dark:bg-[#111722] p-6 shadow-sm"
      >
        <h3 class="mb-6 text-lg font-bold text-slate-900 dark:text-white">
          Đơn hàng của bạn ({totals.count})
        </h3>
        <!-- Product List -->
        <div
          class="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2"
        >
          <!-- Product -->
          {#each items as it (it.product_id)}
            <div class="flex gap-4">
              <div
                class="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-[#192233] border border-slate-200 dark:border-[#232f48]"
              >
                <img
                  alt={it.name}
                  data-alt="MacBook Pro laptop on a desk showing sleek silver design"
                  src={coverOf(it)}
                />
              </div>
              <div class="flex flex-col justify-between flex-1 py-1">
                <div>
                  <p
                    class="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2"
                  >
                    {it.name}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-[#92a4c9] mt-1">
                    Số lượng: {it.quantity}
                  </p>
                </div>
                <p class="text-sm font-bold text-primary">
                  {vnd(it.price * it.quantity)}
                </p>
              </div>
            </div>
          {/each}
        </div>
        <!-- Discount Code -->
        <div class="mb-6">
          <div class="flex gap-2">
            <input
              class="flex-1 rounded-lg border-slate-300 dark:border-[#324467] bg-slate-50 dark:bg-[#192233] text-sm text-slate-900 dark:text-white px-3 py-2.5 focus:ring-primary focus:border-primary"
              placeholder="Mã giảm giá"
              type="text"
            />
            <button
              class="px-4 py-2.5 bg-slate-200 dark:bg-[#232f48] hover:bg-slate-300 dark:hover:bg-[#324467] text-slate-700 dark:text-white text-sm font-semibold rounded-lg transition-colors"
              >Áp dụng</button
            >
          </div>
        </div>
        <hr class="border-slate-200 dark:border-[#232f48] mb-6" />
        <!-- Calculations -->
        <div class="flex flex-col gap-3 mb-6">
          <div
            class="flex justify-between items-center text-sm text-slate-600 dark:text-[#92a4c9]"
          >
            <span>Tạm tính</span>
            <span class="font-medium text-slate-900 dark:text-white"
              >{vnd(totals.subtotal)}</span
            >
          </div>
          <div
            class="flex justify-between items-center text-sm text-slate-600 dark:text-[#92a4c9]"
          >
            <span>Phí vận chuyển</span>
            <span class="font-medium text-green-500">Miễn phí</span>
          </div>
        </div>
        <div
          class="flex justify-between items-end mb-8 pt-4 border-t border-slate-200 dark:border-[#232f48]"
        >
          <span class="text-base font-bold text-slate-900 dark:text-white"
            >Tổng cộng</span
          >
          <div class="text-right">
            <p class="text-2xl font-bold text-primary">
              {vnd(totals.subtotal)}
            </p>
            <p class="text-xs text-slate-500 dark:text-[#6a7a96] mt-1">
              (Đã bao gồm VAT)
            </p>
          </div>
        </div>
        <!-- CTA Button -->
        <button
          class="w-full bg-primary hover:bg-blue-700 text-white font-bold rounded-xl py-4 text-base transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
          on:click={submitOrder}
          disabled={loading}
        >
          <!-- Nút “Đặt hàng ngay” gọi submit + disable khi loading -->
          {loading ? 'Đang xử lý...' : 'Đặt hàng ngay'}
        </button>
        <p
          class="text-xs text-center text-slate-500 dark:text-[#5d6b82] mt-4 px-4 leading-normal"
        >
          Bằng việc đặt hàng, bạn đồng ý với
          <a class="underline hover:text-slate-400" href="#"
            >Điều khoản dịch vụ</a
          >
          và
          <a class="underline hover:text-slate-400" href="#"
            >Chính sách bảo mật</a
          > của TT STORE.
        </p>
        {#if errorMsg}
          <p class="mt-3 text-sm text-red-400">{errorMsg}</p>
        {/if}
      </div>
    </div>
  </div>
</main>
