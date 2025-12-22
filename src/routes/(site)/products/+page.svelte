<svelte:head>
  <title>Sản phẩm TT STORE</title>
</svelte:head>

<main class="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<!-- Breadcrumbs & Heading -->
<div class="mb-8">
<nav aria-label="Breadcrumb" class="flex mb-4">
<ol class="inline-flex items-center space-x-1 md:space-x-3">
<li class="inline-flex items-center">
<a class="inline-flex items-center text-sm font-medium text-text-secondary hover:text-white" href="#">
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
<div class="text-sm text-text-secondary font-medium">Hiển thị 1-12 trong 86 sản phẩm</div>
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
<li>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="form-checkbox h-4 w-4 rounded border-gray-600 bg-[#101622] text-primary focus:ring-offset-background-dark focus:ring-primary" type="checkbox"/>
<span class="text-text-secondary group-hover:text-white transition-colors text-sm">Laptop cao cấp</span>
</label>
</li>
<li>
<label class="flex items-center gap-3 cursor-pointer group">
<input checked="" class="form-checkbox h-4 w-4 rounded border-gray-600 bg-[#101622] text-primary focus:ring-offset-background-dark focus:ring-primary" type="checkbox"/>
<span class="text-white font-medium text-sm">Phụ kiện &amp; Chuột</span>
</label>
</li>
<li>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="form-checkbox h-4 w-4 rounded border-gray-600 bg-[#101622] text-primary focus:ring-offset-background-dark focus:ring-primary" type="checkbox"/>
<span class="text-text-secondary group-hover:text-white transition-colors text-sm">Bàn phím cơ</span>
</label>
</li>
<li>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="form-checkbox h-4 w-4 rounded border-gray-600 bg-[#101622] text-primary focus:ring-offset-background-dark focus:ring-primary" type="checkbox"/>
<span class="text-text-secondary group-hover:text-white transition-colors text-sm">Màn hình đồ họa</span>
</label>
</li>
<li>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="form-checkbox h-4 w-4 rounded border-gray-600 bg-[#101622] text-primary focus:ring-offset-background-dark focus:ring-primary" type="checkbox"/>
<span class="text-text-secondary group-hover:text-white transition-colors text-sm">Tai nghe &amp; Audio</span>
</label>
</li>
</ul>
</div>
<!-- Price Range -->
<div class="bg-surface-dark rounded-xl p-5 border border-[#232f48]">
<h3 class="text-white font-bold text-lg mb-4">Khoảng giá</h3>
<div class="flex items-center gap-2 mb-4">
<div class="relative w-full">
<span class="absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary text-xs">₫</span>
<input class="w-full bg-[#101622] border border-[#232f48] rounded px-2 pl-4 py-1.5 text-xs text-white focus:border-primary focus:ring-0" type="number" value="0"/>
</div>
<span class="text-text-secondary">-</span>
<div class="relative w-full">
<span class="absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary text-xs">₫</span>
<input class="w-full bg-[#101622] border border-[#232f48] rounded px-2 pl-4 py-1.5 text-xs text-white focus:border-primary focus:ring-0" type="number" value="50000000"/>
</div>
</div>
<div class="relative h-1 bg-[#232f48] rounded-full mt-2">
<div class="absolute left-0 right-1/4 h-full bg-primary rounded-full"></div>
<div class="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow cursor-pointer hover:scale-110 transition-transform"></div>
<div class="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow cursor-pointer hover:scale-110 transition-transform"></div>
</div>
</div>
<!-- Brands -->
<div class="bg-surface-dark rounded-xl p-5 border border-[#232f48]">
<h3 class="text-white font-bold text-lg mb-4">Thương hiệu</h3>
<div class="flex flex-wrap gap-2">
<button class="px-3 py-1.5 rounded-lg border border-[#232f48] bg-[#101622] text-xs text-white hover:border-primary hover:text-primary transition-all">Apple</button>
<button class="px-3 py-1.5 rounded-lg border border-primary bg-primary/10 text-xs text-primary font-bold transition-all">Logitech</button>
<button class="px-3 py-1.5 rounded-lg border border-[#232f48] bg-[#101622] text-xs text-white hover:border-primary hover:text-primary transition-all">Dell</button>
<button class="px-3 py-1.5 rounded-lg border border-[#232f48] bg-[#101622] text-xs text-white hover:border-primary hover:text-primary transition-all">Keychron</button>
<button class="px-3 py-1.5 rounded-lg border border-[#232f48] bg-[#101622] text-xs text-white hover:border-primary hover:text-primary transition-all">Asus</button>
<button class="px-3 py-1.5 rounded-lg border border-[#232f48] bg-[#101622] text-xs text-white hover:border-primary hover:text-primary transition-all">Sony</button>
</div>
</div>
<!-- Rating -->
<div class="bg-surface-dark rounded-xl p-5 border border-[#232f48]">
<h3 class="text-white font-bold text-lg mb-4">Đánh giá</h3>
<div class="space-y-2">
<label class="flex items-center gap-2 cursor-pointer group">
<input class="form-radio h-4 w-4 border-gray-600 bg-[#101622] text-primary focus:ring-0" name="rating" type="radio"/>
<div class="flex text-yellow-500">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
</div>
</label>
<label class="flex items-center gap-2 cursor-pointer group">
<input class="form-radio h-4 w-4 border-gray-600 bg-[#101622] text-primary focus:ring-0" name="rating" type="radio"/>
<div class="flex text-yellow-500">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="material-symbols-outlined text-sm text-[#384358]" style="font-variation-settings: 'FILL' 1">star</span>
</div>
<span class="text-xs text-text-secondary ml-1">&amp; Up</span>
</label>
</div>
</div>
</aside>
<!-- Product Grid Area -->
<div class="flex-1">
<!-- Toolbar -->
<div class="bg-surface-dark rounded-xl p-4 mb-6 border border-[#232f48] flex flex-wrap items-center justify-between gap-4">
<div class="flex items-center gap-4 flex-1">
<!-- Mobile Sidebar Toggle -->
<button class="lg:hidden p-2 text-white hover:bg-[#232f48] rounded-lg">
<span class="material-symbols-outlined">filter_list</span>
</button>
<!-- Search in results -->
<div class="relative max-w-xs w-full hidden sm:block">
<span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
<span class="material-symbols-outlined text-lg">search</span>
</span>
<input class="block w-full pl-9 pr-3 py-2 border border-[#232f48] rounded-lg bg-[#101622] text-white text-sm focus:border-primary focus:ring-0 placeholder:text-text-secondary" placeholder="Tìm trong danh sách..." type="text"/>
</div>
</div>
<div class="flex items-center gap-3">
<div class="flex items-center gap-2 mr-2">
<span class="text-text-secondary text-sm hidden sm:inline">Sắp xếp:</span>
<select class="bg-[#101622] border border-[#232f48] text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2">
<option>Mới nhất</option>
<option>Bán chạy nhất</option>
<option>Giá: Thấp đến Cao</option>
<option>Giá: Cao đến Thấp</option>
</select>
</div>
<div class="flex bg-[#101622] rounded-lg p-1 border border-[#232f48]">
<button class="p-1.5 rounded bg-[#232f48] text-white shadow-sm">
<span class="material-symbols-outlined text-xl">grid_view</span>
</button>
<button class="p-1.5 rounded text-text-secondary hover:text-white transition-colors">
<span class="material-symbols-outlined text-xl">view_list</span>
</button>
</div>
</div>
</div>
<!-- Products -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
<!-- Product Card 1 -->
<div class="group bg-surface-dark rounded-2xl border border-[#232f48] overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full">
<div class="relative aspect-[4/3] bg-white overflow-hidden p-4">
<img alt="MacBook Pro" class="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500" data-alt="Silver MacBook laptop open on a clean desk showing screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfUqnYLL3o1_GXVQjoaKl_WC_e9DIVVFXxesNPdj96DE8atqMeOGvSWCbHWmjTC24laCoHT6JKP7wIIlSucbGxw2H6de_pxTnKUfOcQaoefz3lJswf-iMiMFU_iNrSHofu3ZzZYwLOJkWw_EjlezW4b0aBQbrtg6se3uvZhuQK2E97SugXGS3v3fxi9kabJnQWgkWpm3h-FZ3W7Kh0YG4xl2ibsKQmr3mxqPa9GGy3jSfp6QJxK0UThuo38PlDz5qEWBITBD-eCw"/>
<div class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                -15%
                            </div>
<button class="absolute top-3 right-3 p-2 bg-white/80 rounded-full text-gray-700 hover:text-red-500 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 shadow-sm">
<span class="material-symbols-outlined text-lg">favorite</span>
</button>
</div>
<div class="p-5 flex flex-col flex-1">
<div class="mb-2 flex items-center gap-1">
<span class="material-symbols-outlined text-yellow-500 text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="text-white text-xs font-bold pt-0.5">4.9</span>
<span class="text-text-secondary text-xs pt-0.5">(128)</span>
</div>
<h3 class="text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">Apple MacBook Pro 14" M3 Max 2024</h3>
<div class="mt-auto pt-4 flex items-end justify-between">
<div>
<p class="text-text-secondary text-xs line-through mb-1">52.000.000₫</p>
<p class="text-white font-black text-xl">45.000.000₫</p>
</div>
<button class="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-900/20">
<span class="material-symbols-outlined">add_shopping_cart</span>
</button>
</div>
</div>
</div>
<!-- Product Card 2 -->
<div class="group bg-surface-dark rounded-2xl border border-[#232f48] overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full">
<div class="relative aspect-[4/3] bg-white overflow-hidden p-6">
<img alt="Logitech Mouse" class="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500" data-alt="Black wireless computer mouse on white surface, minimalist design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Vvl_VXVDnd2NZn56hPYT91YnhpmdDMyVHJr4zhALjkIMxRIqHpBXbkQDc1oTvFXrzFYuDTPTOEmOJPK9bsW1qlcw4Rmu1JAoVla9Mgj4eHwdNCuok9sEFEJ3AYDkiKzXh3kf2g65HDoRbf7LAcaDrlspSzAnufycrsiXEx6l7cxetW-Lqlu5SD55JAJrm5Q_HsoRoUJisIJjn3zopoM-VNFgTRBEYUfNo8aZv_Sshij1rxBdFoFMPzjJqN-LRoVVx95vlbOWlw"/>
</div>
<div class="p-5 flex flex-col flex-1">
<div class="mb-2 flex items-center gap-1">
<span class="material-symbols-outlined text-yellow-500 text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="text-white text-xs font-bold pt-0.5">4.8</span>
<span class="text-text-secondary text-xs pt-0.5">(856)</span>
</div>
<h3 class="text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">Chuột Logitech MX Master 3S Wireless</h3>
<div class="mt-auto pt-4 flex items-end justify-between">
<div>
<p class="text-text-secondary text-xs line-through mb-1">2.500.000₫</p>
<p class="text-white font-black text-xl">2.100.000₫</p>
</div>
<button class="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-900/20">
<span class="material-symbols-outlined">add_shopping_cart</span>
</button>
</div>
</div>
</div>
<!-- Product Card 3 -->
<div class="group bg-surface-dark rounded-2xl border border-[#232f48] overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full">
<div class="relative aspect-[4/3] bg-white overflow-hidden p-4">
<img alt="Keychron Keyboard" class="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500" data-alt="Mechanical keyboard with colorful backlighting in dark room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuMMZusXFvvxUO4kKeCC5VTEdrzw-Ik5ZLYoyla8GfytYNLMgkNgXaKET1L38_PrKDAPCMRNFL6DiMkTbEYXAeZ_QtYt1v5U4oGUMRHvEuxxDjGl5U4_FXCUpCH2EmLS4fJHuuj8zheDFWcV2ppnF_fqNlY0pg9eB9GDMwmetdtrKyMgDav68sjSiy6BcFIG33aor_Jy5j8BR7dcqR_K0RXlXK_6OAiqFLzzdqZtWy9siu4TjKgSLfbaUUQ5Q8doz3aaDLDq0K3g"/>
<div class="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                                New
                            </div>
</div>
<div class="p-5 flex flex-col flex-1">
<div class="mb-2 flex items-center gap-1">
<span class="material-symbols-outlined text-yellow-500 text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="text-white text-xs font-bold pt-0.5">5.0</span>
<span class="text-text-secondary text-xs pt-0.5">(42)</span>
</div>
<h3 class="text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">Bàn phím cơ Keychron Q1 Pro - Custom Aluminum</h3>
<div class="mt-auto pt-4 flex items-end justify-between">
<div>
<p class="text-text-secondary text-xs line-through mb-1 opacity-0">0₫</p>
<p class="text-white font-black text-xl">4.290.000₫</p>
</div>
<button class="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-900/20">
<span class="material-symbols-outlined">add_shopping_cart</span>
</button>
</div>
</div>
</div>
<!-- Product Card 4 -->
<div class="group bg-surface-dark rounded-2xl border border-[#232f48] overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full">
<div class="relative aspect-[4/3] bg-white overflow-hidden p-4">
<img alt="Sony Headphones" class="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500" data-alt="Premium over-ear headphones silver and tan color" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe6Vi7QBGR4Fux5rpno__CcgiF6g0RJKB9GDoMo33VhupmHnHylocmiPQrb0AXnMrZPK7ptXo3si65bsNKqmbgeiWU-VQsrC4yX9QJpnOH_D4kZDYhJ_nm9Vj7ob4z0hd7koS-PczzpUb2uphOkJxXVfoSaUQFM16jgyCFBVsFYxdvL-S1X4dAaFAtB2VwpLrls-uyMp5eay94GmnWlxSo0A2pKRX_3YfH9ayyUGD4nbXNJGlAtFzN9ZKKJSeA3OHRm8Aa8EnKqg"/>
<div class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                -10%
                            </div>
</div>
<div class="p-5 flex flex-col flex-1">
<div class="mb-2 flex items-center gap-1">
<span class="material-symbols-outlined text-yellow-500 text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="text-white text-xs font-bold pt-0.5">4.7</span>
<span class="text-text-secondary text-xs pt-0.5">(315)</span>
</div>
<h3 class="text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">Tai nghe Sony WH-1000XM5 Noise Canceling</h3>
<div class="mt-auto pt-4 flex items-end justify-between">
<div>
<p class="text-text-secondary text-xs line-through mb-1">8.500.000₫</p>
<p class="text-white font-black text-xl">7.650.000₫</p>
</div>
<button class="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-900/20">
<span class="material-symbols-outlined">add_shopping_cart</span>
</button>
</div>
</div>
</div>
<!-- Product Card 5 -->
<div class="group bg-surface-dark rounded-2xl border border-[#232f48] overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full">
<div class="relative aspect-[4/3] bg-white overflow-hidden p-8">
<img alt="iPad Pro" class="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500" data-alt="iPad Pro tablet showing colorful abstract wallpaper" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH82a4hMZ2h8h0R1Igadqa1IkiBDFBk6tCcE0qSwnuFJ93M7Oi0dk8sJkiP0JDshrljv1P0biPDX2FF35Ath5QKs9Zmy60MTo_9S_bgcunrNSrGu9SM_yXh56YMi--6ZASlWew2UehMzM8daUlGkh4KC6_BqZSh0O1c1UCc6zOjE5Zmc5v8InSGjXKOrEsz0Qo1yQ9zskbKZDZ_koUtH8Nn55Kgqqz_RZ46nrNW6ah1tRf4Bx7CNQ1q3cnAU4kf16I7WEqmV5YXQ"/>
</div>
<div class="p-5 flex flex-col flex-1">
<div class="mb-2 flex items-center gap-1">
<span class="material-symbols-outlined text-yellow-500 text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="text-white text-xs font-bold pt-0.5">4.9</span>
<span class="text-text-secondary text-xs pt-0.5">(88)</span>
</div>
<h3 class="text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">iPad Pro 12.9" M2 Wi-Fi 256GB Space Gray</h3>
<div class="mt-auto pt-4 flex items-end justify-between">
<div>
<p class="text-text-secondary text-xs line-through mb-1 opacity-0">0₫</p>
<p class="text-white font-black text-xl">28.990.000₫</p>
</div>
<button class="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-900/20">
<span class="material-symbols-outlined">add_shopping_cart</span>
</button>
</div>
</div>
</div>
<!-- Product Card 6 -->
<div class="group bg-surface-dark rounded-2xl border border-[#232f48] overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full">
<div class="relative aspect-[4/3] bg-white overflow-hidden p-6">
<img alt="Dell XPS" class="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500" data-alt="Sleek silver laptop closed side view" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXDsca-_ixfswomeD0eIMcGpYqG-6tVLxacnUpzJA6SHbxUdY7fAtCe1dQDyQPD7RngLAnTYKn06NIYp-LBAlRnCoj6vCGCQIRcLYc1fYpHZcnImcrODg2ZoOyPvdpL219KvoXMF3bt88KJqkSg1yQBs9qJm4OOWUk-dh5knNBIUJp6MjLg2lofLh1VOciGBmXtIOLwcsTa8QGoLmuaSV_sKCAaGnbxJN4zItEn45vpbDUFVm4DHiyFW7bk-1uWJN-UU2IgMqOEg"/>
<div class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                -20%
                            </div>
</div>
<div class="p-5 flex flex-col flex-1">
<div class="mb-2 flex items-center gap-1">
<span class="material-symbols-outlined text-yellow-500 text-sm" style="font-variation-settings: 'FILL' 1">star</span>
<span class="text-white text-xs font-bold pt-0.5">4.6</span>
<span class="text-text-secondary text-xs pt-0.5">(55)</span>
</div>
<h3 class="text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">Dell XPS 15 9530 OLED - i9 13900H</h3>
<div class="mt-auto pt-4 flex items-end justify-between">
<div>
<p class="text-text-secondary text-xs line-through mb-1">65.000.000₫</p>
<p class="text-white font-black text-xl">52.000.000₫</p>
</div>
<button class="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-900/20">
<span class="material-symbols-outlined">add_shopping_cart</span>
</button>
</div>
</div>
</div>
</div>
<!-- Pagination -->
<div class="mt-12 flex justify-center">
<nav class="flex items-center gap-2">
<button class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#232f48] bg-[#101622] text-text-secondary hover:text-white hover:border-primary transition-colors">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<button class="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/25">1</button>
<button class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#232f48] bg-[#101622] text-text-secondary hover:text-white hover:border-primary transition-colors">2</button>
<button class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#232f48] bg-[#101622] text-text-secondary hover:text-white hover:border-primary transition-colors">3</button>
<span class="text-text-secondary px-2">...</span>
<button class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#232f48] bg-[#101622] text-text-secondary hover:text-white hover:border-primary transition-colors">8</button>
<button class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#232f48] bg-[#101622] text-text-secondary hover:text-white hover:border-primary transition-colors">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</nav>
</div>
</div>
</div>
</main>
