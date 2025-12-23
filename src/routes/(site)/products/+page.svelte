<script lang="ts">
	import { goto } from '$app/navigation';

	export let data: {
		products: Array<{
			id: string;
			slug: string;
			name: string;
			brand: string;
			type: string;
			price: number;
			quantity: number;
			images: string[] | null;
			created_at: string;
		}>;
		total: number;
		page: number;
		pageSize: number;
		filters: { q: string; type: string; brand: string; min: string; max: string; sort: string };
		facets: { types: string[]; brands: string[] };
	};

	// local states (sync từ server)
	let q = data.filters.q ?? '';
	let selectedType = data.filters.type ?? '';
	let selectedBrand = data.filters.brand ?? '';
	let min = data.filters.min || '0';
	let max = data.filters.max || '50000000';
	let sort = data.filters.sort || 'newest';

	$: totalPages = Math.max(1, Math.ceil((data.total ?? 0) / (data.pageSize ?? 12)));
	$: pageNumbers = buildPageNumbers(data.page, totalPages);

	function formatVND(n: number) {
		return new Intl.NumberFormat('vi-VN').format(n) + '₫';
	}

	function cover(images: string[] | null) {
		return images?.[0] ?? '/images/placeholder-product.png';
	}

	function buildUrl(overrides: Partial<{ q: string; type: string; brand: string; min: string; max: string; sort: string; page: number }>) {
		const params = new URLSearchParams();

		const _q = overrides.q ?? q;
		const _type = overrides.type ?? selectedType;
		const _brand = overrides.brand ?? selectedBrand;
		const _min = overrides.min ?? min;
		const _max = overrides.max ?? max;
		const _sort = overrides.sort ?? sort;
		const _page = overrides.page ?? 1;

		if (_q) params.set('q', _q);
		if (_type) params.set('type', _type);
		if (_brand) params.set('brand', _brand);
		if (_min) params.set('min', _min);
		if (_max) params.set('max', _max);
		if (_sort) params.set('sort', _sort);
		params.set('page', String(_page));

		return `/products?${params.toString()}`;
	}

	function applyFilters() {
		goto(buildUrl({ page: 1 }));
	}

	function toggleType(t: string) {
		selectedType = selectedType === t ? '' : t;
		goto(buildUrl({ type: selectedType, page: 1 }));
	}

	function toggleBrand(b: string) {
		selectedBrand = selectedBrand === b ? '' : b;
		goto(buildUrl({ brand: selectedBrand, page: 1 }));
	}

	function onSortChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value;
		sort = value;
		goto(buildUrl({ sort, page: 1 }));
	}

	function onSearchEnter(e: KeyboardEvent) {
		if (e.key === 'Enter') goto(buildUrl({ q, page: 1 }));
	}

	function goPage(p: number) {
		goto(buildUrl({ page: p }));
	}

	function buildPageNumbers(current: number, total: number) {
		// hiển thị tối đa 5 trang
		const maxButtons = 5;
		const half = Math.floor(maxButtons / 2);

		let start = Math.max(1, current - half);
		let end = Math.min(total, start + maxButtons - 1);

		// cân lại start nếu end chạm trần
		start = Math.max(1, end - maxButtons + 1);

		const arr: number[] = [];
		for (let i = start; i <= end; i++) arr.push(i);
		return arr;
	}
</script>

<svelte:head>
	<title>Sản phẩm TT STORE</title>
</svelte:head>

<main class="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<!-- Breadcrumbs & Heading -->
	<div class="mb-8">
		<nav aria-label="Breadcrumb" class="flex mb-4">
			<ol class="inline-flex items-center space-x-1 md:space-x-3">
				<li class="inline-flex items-center">
					<a class="inline-flex items-center text-sm font-medium text-text-secondary hover:text-white" href="/">
						<span class="material-symbols-outlined text-lg mr-1">home</span>
						Trang chủ
					</a>
				</li>
				<li>
					<div class="flex items-center">
						<span class="material-symbols-outlined text-text-secondary mx-1">chevron_right</span>
						<span class="text-sm font-medium text-white">Sản phẩm</span>
					</div>
				</li>
			</ol>
		</nav>

		<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
			<div>
				<h1 class="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Danh sách sản phẩm</h1>
				<p class="text-text-secondary text-base">Khám phá bộ sưu tập thiết bị công nghệ cao cấp chính hãng.</p>
			</div>
			<div class="text-sm text-text-secondary font-medium">
				{#if data.total > 0}
					Hiển thị {(data.page - 1) * data.pageSize + 1}-{Math.min(data.page * data.pageSize, data.total)} trong {data.total} sản phẩm
				{:else}
					0 sản phẩm
				{/if}
			</div>
		</div>
	</div>

	<div class="flex flex-col lg:flex-row gap-8">
		<!-- Sidebar Filters -->
		<aside class="w-full lg:w-64 flex-shrink-0 space-y-8">
			<!-- Categories -->
			<div class="bg-surface-dark rounded-xl p-5 border border-[#232f48]">
				<h3 class="text-white font-bold text-lg mb-4 flex items-center justify-between">
					Danh mục
					<span class="material-symbols-outlined text-text-secondary text-sm">expand_less</span>
				</h3>

				<ul class="space-y-3">
					{#if data.facets.types?.length}
						{#each data.facets.types as t}
							<li>
								<label class="flex items-center gap-3 cursor-pointer group">
									<input
										class="form-checkbox h-4 w-4 rounded border-gray-600 bg-[#101622] text-primary focus:ring-offset-background-dark focus:ring-primary"
										type="checkbox"
										checked={selectedType === t}
										on:change={() => toggleType(t)}
									/>
									<span class={selectedType === t ? 'text-white font-medium text-sm' : 'text-text-secondary group-hover:text-white transition-colors text-sm'}>
										{t}
									</span>
								</label>
							</li>
						{/each}
					{:else}
						<li class="text-text-secondary text-sm">Chưa có danh mục.</li>
					{/if}
				</ul>
			</div>

			<!-- Price Range -->
			<div class="bg-surface-dark rounded-xl p-5 border border-[#232f48]">
				<h3 class="text-white font-bold text-lg mb-4">Khoảng giá</h3>
				<div class="flex items-center gap-2 mb-4">
					<div class="relative w-full">
						<span class="absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary text-xs">₫</span>
						<input
							class="w-full bg-[#101622] border border-[#232f48] rounded px-2 pl-4 py-1.5 text-xs text-white focus:border-primary focus:ring-0"
							type="number"
							bind:value={min}
							on:change={applyFilters}
						/>
					</div>
					<span class="text-text-secondary">-</span>
					<div class="relative w-full">
						<span class="absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary text-xs">₫</span>
						<input
							class="w-full bg-[#101622] border border-[#232f48] rounded px-2 pl-4 py-1.5 text-xs text-white focus:border-primary focus:ring-0"
							type="number"
							bind:value={max}
							on:change={applyFilters}
						/>
					</div>
				</div>
			</div>

			<!-- Brands -->
			<div class="bg-surface-dark rounded-xl p-5 border border-[#232f48]">
				<h3 class="text-white font-bold text-lg mb-4">Thương hiệu</h3>
				<div class="flex flex-wrap gap-2">
					{#if data.facets.brands?.length}
						{#each data.facets.brands as b}
							<button
								type="button"
								on:click={() => toggleBrand(b)}
								class={selectedBrand === b
									? 'px-3 py-1.5 rounded-lg border border-primary bg-primary/10 text-xs text-primary font-bold transition-all'
									: 'px-3 py-1.5 rounded-lg border border-[#232f48] bg-[#101622] text-xs text-white hover:border-primary hover:text-primary transition-all'}
							>
								{b}
							</button>
						{/each}
					{:else}
						<span class="text-text-secondary text-sm">Chưa có thương hiệu.</span>
					{/if}
				</div>
			</div>
		</aside>

		<!-- Product Grid Area -->
		<div class="flex-1">
			<!-- Toolbar -->
			<div class="bg-surface-dark rounded-xl p-4 mb-6 border border-[#232f48] flex flex-wrap items-center justify-between gap-4">
				<div class="flex items-center gap-4 flex-1">
					<div class="relative max-w-xs w-full hidden sm:block">
						<span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
							<span class="material-symbols-outlined text-lg">search</span>
						</span>
						<input
							class="block w-full pl-9 pr-3 py-2 border border-[#232f48] rounded-lg bg-[#101622] text-white text-sm focus:border-primary focus:ring-0 placeholder:text-text-secondary"
							placeholder="Tìm trong danh sách..."
							type="text"
							bind:value={q}
							on:keydown={onSearchEnter}
						/>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<div class="flex items-center gap-2 mr-2">
						<span class="text-text-secondary text-sm hidden sm:inline">Sắp xếp:</span>
						<select
							class="bg-[#101622] border border-[#232f48] text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2"
							bind:value={sort}
							on:change={onSortChange}
						>
							<option value="newest">Mới nhất</option>
							<option value="price_asc">Giá: Thấp đến Cao</option>
							<option value="price_desc">Giá: Cao đến Thấp</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Products -->
			{#if data.products.length === 0}
				<div class="bg-surface-dark rounded-xl p-8 border border-[#232f48] text-text-secondary">
					Không tìm thấy sản phẩm phù hợp.
				</div>
			{:else}
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
					{#each data.products as p}
						<a
							href={`/products/${p.slug}`}
							class="group bg-surface-dark rounded-2xl border border-[#232f48] overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full"
						>
							<div class="relative aspect-[4/3] bg-white overflow-hidden p-4">
								<img
									alt={p.name}
									class="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
									src={cover(p.images)}
								/>
							</div>

							<div class="p-5 flex flex-col flex-1">
								<div class="mb-2 flex items-center justify-between">
									<span class="text-xs text-text-secondary">{p.brand} • {p.type}</span>
									<span class="text-xs text-text-secondary">Kho: {p.quantity}</span>
								</div>

								<h3 class="text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
									{p.name}
								</h3>

								<div class="mt-auto pt-4 flex items-end justify-between">
									<p class="text-white font-black text-xl">{formatVND(p.price)}</p>
									<button
										type="button"
										on:click|preventDefault={() => {
											// TODO: add to cart
										}}
										class="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-900/20"
									>
										<span class="material-symbols-outlined">add_shopping_cart</span>
									</button>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}

			<!-- Pagination -->
			{#if totalPages > 1}
				<div class="mt-12 flex justify-center">
					<nav class="flex items-center gap-2">
						<button
							class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#232f48] bg-[#101622] text-text-secondary hover:text-white hover:border-primary transition-colors disabled:opacity-40"
							disabled={data.page <= 1}
							on:click={() => goPage(data.page - 1)}
						>
							<span class="material-symbols-outlined">chevron_left</span>
						</button>

						{#each pageNumbers as p}
							<button
								class={p === data.page
									? 'w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/25'
									: 'w-10 h-10 flex items-center justify-center rounded-lg border border-[#232f48] bg-[#101622] text-text-secondary hover:text-white hover:border-primary transition-colors'}
								on:click={() => goPage(p)}
							>
								{p}
							</button>
						{/each}

						<button
							class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#232f48] bg-[#101622] text-text-secondary hover:text-white hover:border-primary transition-colors disabled:opacity-40"
							disabled={data.page >= totalPages}
							on:click={() => goPage(data.page + 1)}
						>
							<span class="material-symbols-outlined">chevron_right</span>
						</button>
					</nav>
				</div>
			{/if}
		</div>
	</div>
</main>
