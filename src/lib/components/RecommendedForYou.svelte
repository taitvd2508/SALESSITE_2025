<script lang="ts">
  import { onMount } from 'svelte';
  import { userPreferences } from '$lib/stores/userPreferences';
  import { supabase } from '$lib/supabase/client';
  import type { ProductCard } from '$lib/types';

  // Props
  export let limit: number = 4;
  export let excludeProductId: number | null = null;
  export let title: string = 'Dành riêng cho bạn';
  export let subtitle: string = 'Dựa trên sở thích của bạn';

  // State
  let products: ProductCard[] = [];
  let loading = true;
  let error: string | null = null;
  let topTag: string | null = null;

  // Reactive subscription to preferences
  $: scores = $userPreferences.scores;
  $: {
    // Recalculate top tag when scores change
    const entries = Object.entries(scores);
    if (entries.length > 0) {
      let maxTag: string | null = null;
      let maxScore = 0;
      for (const [tag, score] of entries) {
        if (score > maxScore) {
          maxScore = score;
          maxTag = tag;
        }
      }
      topTag = maxTag;
    } else {
      topTag = null;
    }
  }

  // Fetch products when topTag changes
  $: if (topTag) {
    fetchRecommendations(topTag);
  }

  async function fetchRecommendations(tag: string) {
    loading = true;
    error = null;

    try {
      let query = supabase
        .from('products')
        .select('id, slug, name, brand, type, price, old_price, images, tags')
        .eq('active', true)
        .overlaps('tags', [tag])
        .limit(limit + 1); // Fetch one extra in case we need to exclude current product

      const { data, error: fetchError } = await query;

      if (fetchError) {
        error = fetchError.message;
        products = [];
      } else {
        // Filter out current product if specified and limit results
        products = (data ?? [])
          .filter((p) => excludeProductId === null || Number(p.id) !== excludeProductId)
          .slice(0, limit) as ProductCard[];
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Đã xảy ra lỗi';
      products = [];
    } finally {
      loading = false;
    }
  }

  // Fallback: fetch latest products if no preferences
  async function fetchLatestProducts() {
    loading = true;
    error = null;

    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('id, slug, name, brand, type, price, old_price, images, tags')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (fetchError) {
        error = fetchError.message;
        products = [];
      } else {
        products = (data ?? []) as ProductCard[];
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Đã xảy ra lỗi';
      products = [];
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    if (!topTag) {
      fetchLatestProducts();
    }
  });

  function vnd(n: number): string {
    return new Intl.NumberFormat('vi-VN').format(n) + ' ₫';
  }

  function coverOf(p: ProductCard): string {
    return p?.images?.[0] ?? '/images/placeholder-product.png';
  }
</script>

<section class="w-full max-w-[1200px] px-4 md:px-10 py-10">
  <div class="flex justify-between items-end mb-6">
    <div>
      <h2 class="text-white text-2xl font-bold leading-tight tracking-[-0.015em] flex items-center gap-2">
        <span class="material-symbols-outlined text-yellow-500">for_you</span>
        {title}
      </h2>
      <p class="text-text-secondary text-sm mt-1">
        {#if topTag}
          {subtitle} • <span class="text-primary font-medium">#{topTag}</span>
        {:else}
          Sản phẩm mới nhất
        {/if}
      </p>
    </div>
    <a class="text-primary text-sm font-bold hover:underline" href="/products">
      Xem tất cả
    </a>
  </div>

  {#if loading}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each Array(limit) as _}
        <div class="bg-card-dark rounded-xl p-4 animate-pulse">
          <div class="w-full aspect-[4/3] rounded-lg bg-white/5 mb-4"></div>
          <div class="h-4 bg-white/5 rounded mb-2 w-3/4"></div>
          <div class="h-4 bg-white/5 rounded w-1/2"></div>
        </div>
      {/each}
    </div>
  {:else if error}
    <div class="bg-card-dark rounded-xl p-6 border border-red-500/30 text-red-400">
      {error}
    </div>
  {:else if products.length === 0}
    <div class="bg-card-dark rounded-xl p-6 border border-white/5 text-text-secondary">
      {#if topTag}
        Không tìm thấy sản phẩm phù hợp với sở thích của bạn.
      {:else}
        Hãy xem vài sản phẩm để hệ thống gợi ý phù hợp với bạn.
      {/if}
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each products as p (p.id)}
        <a
          href={`/products/${p.slug}`}
          class="group flex flex-col gap-4 bg-card-dark rounded-xl p-4 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
        >
          <div class="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-white/5">
            <div
              class="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
              style="background-image: url('{coverOf(p)}');"
            ></div>
            {#if p.old_price && p.old_price > p.price}
              <div class="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                -{Math.round(((p.old_price - p.price) / p.old_price) * 100)}%
              </div>
            {/if}
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-text-secondary text-xs font-bold uppercase tracking-wide">
              {p.type ?? p.brand ?? 'Sản phẩm'}
            </p>
            <h3 class="text-white text-base font-medium line-clamp-2 h-12">
              {p.name}
            </h3>
            <div class="flex justify-between items-center mt-2">
              <div>
                {#if p.old_price && p.old_price > p.price}
                  <p class="text-gray-500 text-xs line-through">{vnd(p.old_price)}</p>
                {/if}
                <p class="text-primary text-lg font-bold">{vnd(p.price)}</p>
              </div>
              <button
                type="button"
                class="flex items-center justify-center size-10 rounded-full bg-white/10 text-white hover:bg-primary transition-colors"
                on:click|preventDefault|stopPropagation
              >
                <span class="material-symbols-outlined text-xl">add_shopping_cart</span>
              </button>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>
