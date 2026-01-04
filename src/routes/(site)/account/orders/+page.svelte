<script lang="ts">
  import { enhance } from '$app/forms';

  export let form: any;

  export let data: {
    user: any | null;
    orders: any[];
    guestOrder: any | null;

    // thêm các field bạn đang dùng ở template (nếu có)
    lookupError?: string | null;
  };

  let tab: 'all' | 'pending' | 'shipping' | 'done' | 'cancelled' | 'paid' =
    'all';

  function formatVND(n: any) {
    const x = Number(n ?? 0);
    return x.toLocaleString('vi-VN') + ' đ';
  }

  function formatDate(d: string) {
    const dt = new Date(d);
    return dt.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  function cover(images: string[] | null | undefined) {
    return images?.[0] ?? '/images/placeholder-product.png';
  }

  // thay cho (data as any).lookupError trong template
  $: lookupError = data?.lookupError ?? null;

  $: filteredOrders =
    tab === 'all'
      ? (data.orders ?? [])
      : (data.orders ?? []).filter((o) => (o.status?.code ?? '') === tab);

  $: totalSpend = (data.orders ?? []).reduce(
    (s, o) => s + Number(o.total_price ?? 0),
    0
  );
  $: successCount = (data.orders ?? []).filter(
    (o) => (o.status?.code ?? '') === 'done'
  ).length;
</script>

<svelte:head>
  <title>TT STORE - Đơn hàng đã mua</title>
</svelte:head>

<main
  class="flex flex-col items-center flex-grow w-full px-4 py-8 layout-container md:py-12 md:px-10"
>
  {#if !data.user}
    <!-- ============================================== -->
    <!-- GUEST VIEW -->
    <!-- ============================================== -->
    <div class="w-full max-w-[1024px] mb-10">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <!-- Left: Login Prompt -->
        <div class="flex flex-col lg:col-span-5">
          <div
            class="h-full flex flex-col items-center justify-center gap-6 rounded-2xl border border-dashed border-[#324467] bg-[#111722]/50 p-8 text-center"
          >
            <div
              class="size-16 rounded-full bg-[#232f48] flex items-center justify-center text-[#92a4c9]"
            >
              <span class="material-symbols-outlined text-[32px]">lock</span>
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-white">Đăng nhập tài khoản</h3>
              <p class="text-[#92a4c9] text-sm leading-relaxed">
                Đăng nhập để xem lịch sử mua hàng chi tiết, tích điểm thành viên
                và nhận ưu đãi độc quyền từ TT Store.
              </p>
            </div>
            <a
              href="/auth/login?next=%2Faccount%2Forders"
              class="w-full max-w-[200px] h-11 bg-[#232f48] hover:bg-[#324467] text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Đăng nhập ngay</span>
              <span class="material-symbols-outlined text-[18px]">login</span>
            </a>
          </div>
        </div>

        <!-- Right: Order Lookup Form -->
        <div class="lg:col-span-7">
          <div
            class="p-6 border shadow-xl bg-card-dark rounded-2xl md:p-8 border-border-dark"
          >
            <div class="pb-4 mb-6 border-b border-border-dark">
              <h1 class="mb-2 text-2xl font-bold tracking-tight text-white">
                Tra cứu đơn hàng
              </h1>
              <p class="text-[#92a4c9] text-sm">
                Kiểm tra trạng thái đơn hàng nhanh chóng mà không cần đăng nhập.
              </p>
            </div>

            <form
              method="POST"
              use:enhance
              action="?/lookup"
              class="flex flex-col gap-5"
            >
              <label class="flex flex-col gap-2">
                <span class="text-sm font-medium text-white"
                  >Mã đơn hàng <span class="text-red-500">*</span></span
                >
                <div class="relative">
                  <div
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-[#92a4c9]"
                  >
                    <span class="material-symbols-outlined text-[20px]"
                      >receipt_long</span
                    >
                  </div>
                  <input
                    name="order_code"
                    class="w-full bg-[#111722] border border-border-dark rounded-lg h-12 pl-11 pr-4 text-white placeholder:text-[#92a4c9]/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                    placeholder="Ví dụ: #ORD-88291 hoặc 88291"
                    type="text"
                    required
                  />
                </div>
              </label>

              <label class="flex flex-col gap-2">
                <span class="text-sm font-medium text-white"
                  >Số điện thoại hoặc Email <span class="text-red-500">*</span
                  ></span
                >
                <div class="relative">
                  <div
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-[#92a4c9]"
                  >
                    <span class="material-symbols-outlined text-[20px]"
                      >contact_mail</span
                    >
                  </div>
                  <input
                    name="contact"
                    class="w-full bg-[#111722] border border-border-dark rounded-lg h-12 pl-11 pr-4 text-white placeholder:text-[#92a4c9]/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                    placeholder="Nhập email hoặc số điện thoại khi đặt hàng"
                    type="text"
                    required
                  />
                </div>
              </label>

              {#if form?.lookupError}
                <div
                  class="px-4 py-3 text-sm text-red-200 border rounded-xl border-red-500/40 bg-red-500/10"
                >
                  {form.lookupError}
                </div>
              {/if}

              <div class="pt-2">
                <button
                  class="flex items-center justify-center w-full h-12 gap-2 text-sm font-bold text-white transition-colors rounded-lg shadow-lg bg-primary hover:bg-blue-700 shadow-blue-900/20"
                  type="submit"
                >
                  <span class="material-symbols-outlined text-[20px]"
                    >search</span
                  >
                  Tra cứu
                </button>
              </div>
            </form>

            {#if form?.guestOrder}
              <div class="pt-6 mt-8 border-t border-border-dark">
                <div class="flex items-center justify-between gap-3">
                  <div class="font-bold text-white">
                    Đơn #{form.guestOrder.id}
                    <span class="text-[#92a4c9] text-sm font-medium ml-2">
                      {formatDate(form.guestOrder.created_at)}
                    </span>
                  </div>
                  <div
                    class="text-xs font-bold px-3 py-1 rounded-full border border-border-dark text-[#92a4c9]"
                  >
                    {form.guestOrder.status?.name ?? '—'}
                  </div>
                </div>

                <div class="flex flex-col gap-3 mt-4">
                  {#each (form.guestOrder.order_details ?? []).slice(0, 2) as it}
                    <div
                      class="flex items-center gap-4 bg-[#111722] border border-border-dark rounded-xl p-3"
                    >
                      <div
                        class="size-14 rounded-lg overflow-hidden border border-border-dark bg-[#0b0f16]"
                      >
                        <img
                          class="object-cover w-full h-full"
                          src={cover(it.product?.images)}
                          alt={it.product?.name}
                        />
                      </div>
                      <div class="flex-1">
                        <div class="font-semibold text-white line-clamp-1">
                          {it.product?.name ?? 'Sản phẩm'}
                        </div>
                        <div class="text-[#92a4c9] text-xs">x{it.quantity}</div>
                      </div>
                      <div class="font-bold text-white">
                        {formatVND(it.price ?? it.product?.price)}
                      </div>
                    </div>
                  {/each}
                </div>

                <div class="flex items-center justify-between mt-4">
                  <span class="text-[#92a4c9] text-sm">Tổng tiền</span>
                  <span class="text-lg font-bold text-white">
                    {formatVND(form.guestOrder.total_price)}
                  </span>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- ============================================== -->
    <!-- LOGGED IN VIEW -->
    <!-- ============================================== -->
    <div class="w-full max-w-[1024px]">
      <div
        class="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-end"
      >
        <div>
          <h1
            class="mb-2 text-3xl font-black tracking-tight text-white md:text-4xl"
          >
            Đơn hàng của tôi
          </h1>
          <p class="text-[#92a4c9]">
            Quản lý và theo dõi tiến độ giao hàng của bạn.
          </p>
        </div>
        <div class="flex gap-4">
          <div
            class="px-4 py-2 border rounded-lg bg-card-dark border-border-dark"
          >
            <span class="block text-xs text-[#92a4c9]">Tổng chi tiêu</span>
            <span class="block font-bold text-white"
              >{formatVND(totalSpend)}</span
            >
          </div>
          <div
            class="px-4 py-2 border rounded-lg bg-card-dark border-border-dark"
          >
            <span class="block text-xs text-[#92a4c9]">Đơn thành công</span>
            <span class="block font-bold text-white">{successCount}</span>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="pb-2 mb-6 overflow-x-auto">
        <div class="flex items-center gap-2 min-w-max">
          <button
            on:click={() => (tab = 'all')}
            class={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${tab === 'all' ? 'bg-primary text-white shadow-lg shadow-blue-900/20' : 'bg-card-dark text-[#92a4c9] hover:text-white border border-transparent hover:border-border-dark'}`}
            >Tất cả</button
          >
          <button
            on:click={() => (tab = 'pending')}
            class={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${tab === 'pending' ? 'bg-primary text-white' : 'bg-card-dark text-[#92a4c9] hover:text-white border border-transparent hover:border-border-dark'}`}
            >Chờ xác nhận</button
          >
          <button
            on:click={() => (tab = 'shipping')}
            class={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${tab === 'shipping' ? 'bg-primary text-white' : 'bg-card-dark text-[#92a4c9] hover:text-white border border-transparent hover:border-border-dark'}`}
            >Đang giao</button
          >
          <button
            on:click={() => (tab = 'done')}
            class={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${tab === 'done' ? 'bg-primary text-white' : 'bg-card-dark text-[#92a4c9] hover:text-white border border-transparent hover:border-border-dark'}`}
            >Hoàn tất</button
          >
          <button
            on:click={() => (tab = 'cancelled')}
            class={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${tab === 'cancelled' ? 'bg-primary text-white' : 'bg-card-dark text-[#92a4c9] hover:text-white border border-transparent hover:border-border-dark'}`}
            >Đã hủy</button
          >
        </div>
      </div>

      {#if filteredOrders.length === 0}
        <div
          class="p-10 text-center border bg-card-dark border-border-dark rounded-2xl"
        >
          <div
            class="mx-auto size-14 rounded-full bg-[#232f48] flex items-center justify-center text-[#92a4c9] mb-3"
          >
            <span class="material-symbols-outlined">receipt_long</span>
          </div>
          <div class="mb-1 text-lg font-bold text-white">Chưa có đơn hàng</div>
          <div class="text-[#92a4c9] text-sm">
            Bạn chưa có đơn hàng nào trong mục này.
          </div>
        </div>
      {:else}
        <div class="flex flex-col gap-6">
          {#each filteredOrders as o}
            <div
              class="overflow-hidden transition-colors border group bg-card-dark border-border-dark rounded-xl hover:border-primary/50"
            >
              <div
                class="px-6 py-4 border-b border-border-dark bg-[#232f48]/30 flex flex-wrap justify-between items-center gap-4"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="bg-[#111722] px-3 py-1 rounded border border-border-dark"
                  >
                    <span class="text-[#92a4c9] text-xs font-mono">#{o.id}</span
                    >
                  </div>
                  <span class="text-[#92a4c9] text-sm"
                    >{formatDate(o.created_at)}</span
                  >
                </div>
                <div
                  class="text-xs font-bold px-3 py-1 rounded-full border border-border-dark text-[#92a4c9]"
                >
                  {o.status?.name ?? '—'}
                </div>
              </div>

              <div class="p-6">
                {#if (o.order_details ?? []).length > 0}
                  {#each (o.order_details ?? []).slice(0, 1) as it}
                    <div class="flex gap-4 md:gap-6">
                      <div
                        class="shrink-0 size-24 md:size-32 bg-[#111722] rounded-lg border border-border-dark overflow-hidden flex items-center justify-center p-2"
                      >
                        <img
                          class="object-contain w-full h-full mix-blend-screen"
                          src={cover(it.product?.images)}
                          alt={it.product?.name}
                        />
                      </div>
                      <div
                        class="flex flex-col justify-between flex-1 md:flex-row"
                      >
                        <div>
                          <h3
                            class="mb-1 text-lg font-bold text-white transition-colors group-hover:text-primary"
                          >
                            {it.product?.name ?? 'Sản phẩm'}
                          </h3>
                          <p class="text-[#92a4c9] text-sm mb-2">
                            {it.product?.brand ?? ''}{it.product?.type
                              ? ` • ${it.product.type}`
                              : ''}
                          </p>
                          <p class="text-sm font-medium text-white">
                            x{it.quantity}
                          </p>
                        </div>
                        <div class="mt-4 text-right md:mt-0">
                          <p class="text-xl font-bold text-primary">
                            {formatVND(it.price ?? it.product?.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  {/each}

                  {#if (o.order_details ?? []).length > 1}
                    <div
                      class="my-4 pt-4 border-t border-dashed border-[#324467] flex items-center justify-between text-xs text-[#92a4c9]"
                    >
                      <span
                        >Và {(o.order_details ?? []).length - 1} sản phẩm khác</span
                      >
                      <a
                        class="underline hover:text-white"
                        href={`/account/orders/${o.id}`}>Xem tất cả</a
                      >
                    </div>
                  {/if}
                {/if}
              </div>

              <div
                class="px-6 py-4 bg-[#232f48]/30 border-t border-border-dark flex flex-wrap justify-between items-center gap-4"
              >
                <div class="flex flex-col">
                  <span class="text-[#92a4c9] text-xs">Tổng tiền đơn hàng</span>
                  <span class="text-lg font-bold text-white"
                    >{formatVND(o.total_price)}</span
                  >
                </div>
                <div class="flex gap-3">
                  <a
                    class="px-4 py-2 rounded-lg border border-border-dark text-white text-sm font-medium hover:bg-[#324467] transition-colors"
                    href={`/products`}
                  >
                    Mua lại
                  </a>
                  <a
                    class="px-4 py-2 text-sm font-bold text-white transition-colors rounded-lg shadow-lg bg-primary hover:bg-blue-600 shadow-blue-900/20"
                    href={`/account/orders/${o.id}`}
                  >
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</main>
