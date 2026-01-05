<!-- src/routes/(admin)/admin/orders/[id]/+page.svelte -->
<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  export let data: any;
  export let form: any;

  const formatVND = (n: any) =>
    new Intl.NumberFormat('vi-VN').format(Number(n ?? 0)) + ' ₫';

  const cover = (imgs: string[] | null | undefined) =>
    imgs?.[0] ?? '/images/placeholder-product.png';

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  const enhanceUpdate = (node: HTMLFormElement) =>
    enhance(node, () => {
      return async ({ result, update }) => {
        await update();
        await applyAction(result);
        await invalidateAll();
      };
    });

  function printInvoice() {
    //_blank: Mở tab / cửa sổ mới, _self: Mở trong tab hiện tại (mặc định)
    window.open(`/admin/orders/${data.order.id}/invoice`, '_blank'); //nếu muốn download thì thêm ?download=1, ko auto print thì ?print=0
  }
</script>

<svelte:head>
  <title>Admin - Order Details</title>
</svelte:head>

<div class="flex-1 p-4 overflow-y-auto md:p-8">
  <div class="max-w-[1100px] mx-auto flex flex-col gap-6">
    {#if data.error}
      <div
        class="px-4 py-3 text-sm text-red-200 border rounded-xl border-red-500/40 bg-red-500/10"
      >
        {data.error}
      </div>
    {:else}
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="text-2xl font-black text-white">
            Đơn hàng #{data.order.id}
          </div>
          <div class="text-[#92a4c9] text-sm mt-1">
            Tạo lúc {formatDate(data.order.created_at)}
          </div>
        </div>

        <a
          href="/admin/orders"
          class="px-4 py-2 rounded-lg bg-surface-dark border border-[#232f48] text-white hover:border-primary/60 transition-colors"
        >
          ← Danh sách
        </a>
      </div>

      {#if form?.message}
        <div
          class="px-4 py-3 text-sm border text-emerald-200 rounded-xl border-emerald-500/40 bg-emerald-500/10"
        >
          {form.message}
        </div>
      {/if}
      {#if form?.message && !form?.ok}
        <div
          class="px-4 py-3 text-sm text-red-200 border rounded-xl border-red-500/40 bg-red-500/10"
        >
          {form.message}
        </div>
      {/if}

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- left -->
        <div class="flex flex-col gap-4 lg:col-span-2">
          <div class="bg-surface-dark rounded-2xl border border-[#232f48] p-5">
            <div class="mb-3 font-bold text-white">Sản phẩm</div>

            <div class="flex flex-col gap-3">
              {#each data.items as it}
                <div
                  class="flex items-center gap-4 bg-[#111722] border border-[#232f48] rounded-xl p-3"
                >
                  <img
                    class="w-14 h-14 rounded-lg object-cover border border-[#232f48] bg-[#0b0f16]"
                    src={cover(it.product?.images)}
                    alt={it.product?.name}
                  />
                  <div class="flex-1">
                    <div class="font-semibold text-white line-clamp-1">
                      {it.product?.name ?? 'Sản phẩm'}
                    </div>
                    <div class="text-[#92a4c9] text-xs">x{it.quantity}</div>
                  </div>
                  <div class="font-bold text-white">{formatVND(it.price)}</div>
                </div>
              {/each}
            </div>

            <div
              class="flex items-center justify-between mt-4 pt-4 border-t border-[#232f48]"
            >
              <span class="text-[#92a4c9] text-sm">Tổng tiền</span>
              <span class="text-xl font-black text-white"
                >{formatVND(data.order.total_price)}</span
              >
            </div>
          </div>

          <div class="bg-surface-dark rounded-2xl border border-[#232f48] p-5">
            <div class="mb-3 font-bold text-white">Thông tin giao hàng</div>
            <div class="text-[#92a4c9] text-sm space-y-2">
              <div>
                <span class="text-white/90">Họ tên:</span>
                {data.order.full_name}
              </div>
              <div>
                <span class="text-white/90">SĐT:</span>
                {data.order.phone}
              </div>
              <div>
                <span class="text-white/90">Email:</span>
                {data.order.email ?? '—'}
              </div>
              <div>
                <span class="text-white/90">Địa chỉ:</span>
                {data.order.address}
              </div>
              {#if data.order.note}
                <div>
                  <span class="text-white/90">Ghi chú:</span>
                  {data.order.note}
                </div>
              {/if}
            </div>
          </div>
        </div>

        <!-- right -->
        <div class="flex flex-col gap-4 lg:col-span-1">
          <div class="bg-surface-dark rounded-2xl border border-[#232f48] p-5">
            <div class="mb-3 font-bold text-white">Trạng thái</div>

            <form
              method="POST"
              action="?/updateStatus"
              use:enhanceUpdate
              class="flex flex-col gap-3"
            >
              <input type="hidden" name="id" value={data.order.id} />
              <select
                class="w-full rounded-lg border border-[#324467] bg-[#192233] text-white h-11 px-3"
                name="status_id"
                value={data.order.status_id}
              >
                {#each data.statuses as s}
                  <option value={s.id}>{s.name}</option>
                {/each}
              </select>

              <button
                class="w-full font-bold text-white transition-colors rounded-lg h-11 bg-primary hover:bg-primary/90"
                type="submit"
              >
                Cập nhật
              </button>
            </form>

            <div
              class="mt-4 pt-4 border-t border-[#232f48] text-sm text-[#92a4c9]"
            >
              <div>
                Hiện tại: <span class="font-semibold text-white"
                  >{data.order.status?.name ?? '—'}</span
                >
              </div>
              <div class="mt-1">
                Thanh toán: <span class="font-semibold text-white"
                  >{data.order.method?.name ?? '—'}</span
                >
              </div>
            </div>
          </div>

          <!-- Optional: invoice later -->
          <div class="bg-surface-dark rounded-2xl border border-[#232f48] p-5">
            <div class="mb-2 font-bold text-white">Hóa đơn</div>
            <button
              class="flex items-center justify-center w-full gap-2 font-bold transition-colors rounded-lg h-11 bg-primary hover:bg-primary/90"
              on:click={printInvoice}
            >
              <span class="material-symbols-outlined"> print</span>
              In hóa đơn
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
