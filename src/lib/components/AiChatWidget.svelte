<script lang="ts">
  import { tick } from 'svelte';
  import { cart } from '$lib/stores/cart';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  type ResultItem = {
    id: number;
    name: string;
    slug?: string | null;
    price: number;
    image_url?: string | null;
    brand?: string | null;
    model?: string | null;
    type?: string | null;
    quantity?: number | null;
  };

  type Msg = {
    role: 'user' | 'assistant';
    content: string;
    results?: ResultItem[];
  };

  let open = false;
  let loading = false;
  let input = '';
  let messages: Msg[] = [
    {
      role: 'assistant',
      content: 'Chào bạn 👋 Mình là trợ lý mua sắm. Bạn đang cần mua gì?',
    },
  ];

  let listEl: HTMLDivElement | null = null;

  async function scrollToBottom() {
    await tick();
    listEl?.scrollTo({ top: listEl.scrollHeight, behavior: 'smooth' });
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const lower = text.toLowerCase().trim();

    // 1) XÓA TOÀN BỘ GIỎ
    if (/(xóa|xoá|clear)\s*(giỏ hàng|gio hang|cart)\b/.test(lower)) {
      cart.clear();

      messages = [
        ...messages,
        { role: 'user', content: text },
        {
          role: 'assistant',
          content: 'OK, mình đã xóa toàn bộ giỏ hàng cho bạn.',
        },
      ];
      input = '';
      await scrollToBottom();
      return;
    }

    // 2) XÓA THEO TỪ KHÓA: "xóa tai nghe khỏi giỏ hàng", "xoá bàn phím", "remove k380"
    const rmMatch = lower.match(
      /(?:xóa|xoá|remove)\s+(.+?)(?:\s+khỏi\s+(?:giỏ hàng|gio hang|cart))?$/i
    );

    if (rmMatch?.[1]) {
      const keyword = rmMatch[1]
        .replace(/(sản phẩm|sp|mặt hàng|món|cái|con)\b/g, '')
        .trim();

      if (keyword) {
        // @ts-ignore (nếu TS chưa nhận method mới ngay lập tức)
        cart.removeByKeyword(keyword);

        messages = [
          ...messages,
          { role: 'user', content: text },
          {
            role: 'assistant',
            content: `OK, mình đã xóa các món liên quan "${keyword}" khỏi giỏ hàng (nếu có).`,
          },
        ];
        input = '';
        await scrollToBottom();
        return;
      }
    }

    messages = [...messages, { role: 'user', content: text }];
    input = '';
    loading = true;
    await scrollToBottom();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      const out = await res.json();
      if (!res.ok || !out?.ok) throw new Error(out?.error || 'Chatbot lỗi');

      const reply = String(out?.message ?? '');
      const rawResults = Array.isArray(out?.results) ? out.results : [];
      const results: ResultItem[] = rawResults
        .map((p: any) => ({
          id: Number(p?.id ?? 0),
          name: String(p?.name ?? ''),
          slug: p?.slug ? String(p.slug) : null,
          price: Number(p?.price ?? 0),
          image_url: p?.image_url ?? null,

          brand: p?.brand ?? null,
          model: p?.model ?? null,
          type: p?.type ?? null,
          quantity: p?.quantity ?? null,
        }))
        .filter((p) => Number.isFinite(p.id) && p.id > 0 && !!p.name);

      if (reply) {
        messages = [
          ...messages,
          {
            role: 'assistant',
            content: String(out.message ?? ''),
            results,
          },
        ];
      }

      // If bot returns a cart action => add items to cart store
      if (out?.action?.type === 'cart' && out?.action?.cart?.items?.length) {
        // nếu server để mode replace, hoặc muốn mặc định replace mỗi lần "chốt"
        const mode = String(out?.action?.mode ?? 'replace');
        if (mode === 'replace') cart.clear();

        for (const it of out.action.cart.items) {
          const productId = Number(it.product_id ?? it.id);
          const qty = Number(it.quantity ?? it.qty ?? 1);
          if (!Number.isFinite(productId) || productId <= 0) continue;

          cart.add(
            {
              product_id: productId,
              slug: String(it.slug ?? ''),
              name: String(it.name ?? ''),
              price: Number(it.price ?? 0),
              old_price: it.old_price ?? null,
              image: it.image ?? it.image_url ?? null,
            },
            Number.isFinite(qty) && qty > 0 ? qty : 1
          );
        }

        const path = $page.url.pathname;
        if (!path.startsWith('/admin')) await goto('/checkout');
      }
    } catch (e: any) {
      messages = [
        ...messages,
        {
          role: 'assistant',
          content:
            'Xin lỗi, mình đang gặp lỗi khi trả lời. Bạn thử lại giúp mình nhé. (Nếu bạn chưa cấu hình GROQ_API_KEY / quota thì chatbot sẽ không chạy.)',
        },
      ];
    } finally {
      loading = false;
      await scrollToBottom();
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  $: if (open) scrollToBottom();
</script>

<!-- Floating button -->
<div class="fixed bottom-5 right-3 z-[60]">
  {#if !open}
    <button
      class="h-16 w-16 rounded-full bg-primary text-white shadow-lg border border-[#2a3a58] hover:opacity-95 flex items-center justify-center"
      on:click={() => (open = true)}
      aria-label="Mở chatbot"
      title="Chatbot AI"
    >
      <span class="material-symbols-outlined text-[22px]">smart_toy</span>
    </button>
  {:else}
    <div
      class="w-[340px] sm:w-[380px] h-[550px] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 overflow-hidden flex flex-col"
    >
      <div
        class="px-4 py-3 border-b border-[#232f48] flex items-center justify-between"
      >
        <div class="font-bold text-white">
          Chatbot AI - Hỗ trợ tư vấn & đặt hàng
        </div>
        <button
          class="text-gray-300 hover:text-white"
          on:click={() => (open = false)}
          aria-label="Đóng chatbot"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div bind:this={listEl} class="flex-1 p-3 space-y-2 overflow-y-auto">
        {#each messages as m}
          <div
            class={m.role === 'user'
              ? 'flex justify-end'
              : 'flex justify-start'}
          >
            <div
              class={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-[#0f1626] text-gray-100 border border-[#232f48]'
              }`}
            >
              <div class="whitespace-pre-line">
                {m.content}
              </div>
              {#if m.role !== 'user' && Array.isArray(m.results) && m.results.length}
                <div class="grid grid-cols-1 gap-2 mt-3">
                  {#each m.results as p}
                    <a
                      class="flex gap-3 p-2 rounded-xl border border-[#232f48] hover:border-primary transition"
                      href={p?.slug ? `/products/${p.slug}` : '#'}
                    >
                      <img
                        class="w-14 h-14 rounded-lg object-cover bg-[#0b1220]"
                        src={p.image_url ?? '/images/placeholder-product.png'}
                        alt={p.name}
                        loading="lazy"
                      />
                      <div class="min-w-0">
                        <div class="font-semibold text-white truncate">
                          {p.name}
                        </div>
                        <div class="text-xs text-gray-300">
                          {Number(p.price ?? 0).toLocaleString('vi-VN')} đ
                        </div>
                        <div class="text-[11px] text-gray-400 truncate">
                          {p.brand ?? ''}{p.model ? ` • ${p.model}` : ''}{p.type
                            ? ` • ${p.type}`
                            : ''}
                        </div>
                      </div>
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        {/each}

        {#if loading}
          <div class="flex justify-start">
            <div
              class="max-w-[85%] rounded-2xl px-3 py-2 text-sm bg-[#0f1626] text-gray-100 border border-[#232f48]"
            >
              Đang trả lời...
            </div>
          </div>
        {/if}
      </div>

      <div class="p-3 border-t border-[#232f48]">
        <div class="flex gap-2">
          <textarea
            class="flex-1 resize-none rounded-xl bg-[#0f1626] border border-[#232f48] text-white text-sm p-2 h-[42px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Nhập nhu cầu mua hàng…"
            bind:value={input}
            on:keydown={onKeydown}
          />
          <button
            class="h-[42px] px-3 rounded-xl bg-primary text-white font-semibold disabled:opacity-60"
            disabled={loading || !input.trim()}
            on:click={send}
          >
            <span class="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>

        <div class="mt-2 text-[12px] text-gray-400">
          Gợi ý: “tư vấn bàn phím dưới 1 triệu”, “gợi ý mẫu laptop văn phòng”,
          “chốt 1 cái &lt;tên model sản phẩm&gt;”.
        </div>
      </div>
    </div>
  {/if}
</div>
