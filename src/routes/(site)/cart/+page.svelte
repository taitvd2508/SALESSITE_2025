<svelte:head>
  <title>Giỏ hàng TT STORE</title>
</svelte:head>

<main class="flex-grow w-full px-4 lg:px-10 py-8 lg:py-12">
<div class="mx-auto max-w-7xl">
<!-- Page Heading -->
<div class="flex flex-col gap-2 mb-8">
<h1 class="text-white text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">Giỏ hàng của bạn</h1>
<p class="text-text-secondary text-base font-normal">(3 sản phẩm)</p>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
<!-- Left Column: Product List -->
<div class="lg:col-span-8 flex flex-col gap-4">
<!-- Header Row (Optional for visual structure) -->
<div class="hidden md:grid grid-cols-12 gap-4 px-4 pb-2 border-b border-[#232f48] text-text-secondary text-sm font-medium">
<div class="col-span-6">Sản phẩm</div>
<div class="col-span-3 text-center">Số lượng</div>
<div class="col-span-3 text-right">Tổng tiền</div>
</div>
<!-- Item 1 -->
<div class="group relative flex flex-col md:grid md:grid-cols-12 gap-4 bg-surface-dark/40 hover:bg-surface-dark/60 border border-[#232f48] rounded-xl p-4 transition-all">
<!-- Product Info -->
<div class="md:col-span-6 flex gap-4">
<div class="shrink-0 size-[80px] md:size-[90px] rounded-lg bg-[#232f48] overflow-hidden">
<img alt="Sleek silver laptop on dark background" class="w-full h-full object-cover" data-alt="MacBook Pro laptop displayed on a dark table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXf2_FyKFgCxChS1fmrUPo2ifty5PSDv4NNKf0FvqdmLKyKz7SQO5waz0b2NJZEs7C1bbwEHCiA7lE3cvzWMKpr6I0y9uCGtQ4Ho7d7zw9aBh3vrRtvokXnoKNMeo37P1Mc9Z1hPqZJkH0R8Ds2zs387WURE4ZG71LorOBo9m-FOo5ugis-9KXaOzL_CKpoHNST8KEYre91wql33EGTFEF8DmVlU7101-2jvMcZscNprGzTiVVdeGT-femx8UaFaB_tPpUZoeV-g"/>
</div>
<div class="flex flex-col justify-center">
<a class="text-white text-base font-bold leading-normal hover:text-primary transition-colors" href="#">MacBook Pro 14 M3</a>
<p class="text-text-secondary text-sm font-normal mt-1">Space Gray | 16GB | 512GB</p>
<p class="text-white text-sm font-medium mt-1 md:hidden">45.000.000đ</p>
</div>
</div>
<!-- Quantity Control -->
<div class="md:col-span-3 flex items-center justify-between md:justify-center">
<div class="flex items-center gap-1 bg-[#111722] rounded-lg p-1 border border-[#232f48]">
<button class="size-8 flex items-center justify-center rounded hover:bg-[#232f48] text-white transition-colors">
<span class="material-symbols-outlined text-[18px]">remove</span>
</button>
<input class="w-8 bg-transparent text-center text-white text-sm font-medium border-none p-0 focus:ring-0 appearance-none [-moz-appearance:_textfield] [&amp;::-webkit-inner-spin-button]:m-0 [&amp;::-webkit-inner-spin-button]:appearance-none" min="1" type="number" value="1"/>
<button class="size-8 flex items-center justify-center rounded hover:bg-[#232f48] text-white transition-colors">
<span class="material-symbols-outlined text-[18px]">add</span>
</button>
</div>
</div>
<!-- Price & Remove -->
<div class="md:col-span-3 flex items-center justify-between md:justify-end gap-4">
<p class="hidden md:block text-white text-base font-bold">45.000.000đ</p>
<button aria-label="Xóa sản phẩm" class="text-text-secondary hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</div>
<!-- Item 2 -->
<div class="group relative flex flex-col md:grid md:grid-cols-12 gap-4 bg-surface-dark/40 hover:bg-surface-dark/60 border border-[#232f48] rounded-xl p-4 transition-all">
<div class="md:col-span-6 flex gap-4">
<div class="shrink-0 size-[80px] md:size-[90px] rounded-lg bg-[#232f48] overflow-hidden">
<img alt="White mechanical keyboard with RGB lighting" class="w-full h-full object-cover" data-alt="Mechanical keyboard top view on a desk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxPBJvtYvEGQ_eKlKo2vmZdNc-sHLJ1kYL2OEantQ4WZ7q89jluOZqY0RqmlJnNvunS1CnY9Sn-Luy4fcWERBoMjUrpbUc-M_h4J3gYmilB5_8crpHbQ3bNUTin6We93i2SXy_oE-zCcb1REqP3zH2Vqud7IWloDgiDBcKqSNG302F3NdTo0zky784o_YQwcnqsbnDAbthFqcl7hERXZiHttPyRKG3QxZhJ9aAQhhfk20y10M1E6oW0u6qEg-dVHBZ0j3MqY4drQ"/>
</div>
<div class="flex flex-col justify-center">
<a class="text-white text-base font-bold leading-normal hover:text-primary transition-colors" href="#">Keychron Q1 Pro</a>
<p class="text-text-secondary text-sm font-normal mt-1">White | Brown Switch</p>
<p class="text-white text-sm font-medium mt-1 md:hidden">4.200.000đ</p>
</div>
</div>
<div class="md:col-span-3 flex items-center justify-between md:justify-center">
<div class="flex items-center gap-1 bg-[#111722] rounded-lg p-1 border border-[#232f48]">
<button class="size-8 flex items-center justify-center rounded hover:bg-[#232f48] text-white transition-colors">
<span class="material-symbols-outlined text-[18px]">remove</span>
</button>
<input class="w-8 bg-transparent text-center text-white text-sm font-medium border-none p-0 focus:ring-0 appearance-none [-moz-appearance:_textfield] [&amp;::-webkit-inner-spin-button]:m-0 [&amp;::-webkit-inner-spin-button]:appearance-none" min="1" type="number" value="1"/>
<button class="size-8 flex items-center justify-center rounded hover:bg-[#232f48] text-white transition-colors">
<span class="material-symbols-outlined text-[18px]">add</span>
</button>
</div>
</div>
<div class="md:col-span-3 flex items-center justify-between md:justify-end gap-4">
<p class="hidden md:block text-white text-base font-bold">4.200.000đ</p>
<button aria-label="Xóa sản phẩm" class="text-text-secondary hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</div>
<!-- Item 3 -->
<div class="group relative flex flex-col md:grid md:grid-cols-12 gap-4 bg-surface-dark/40 hover:bg-surface-dark/60 border border-[#232f48] rounded-xl p-4 transition-all">
<div class="md:col-span-6 flex gap-4">
<div class="shrink-0 size-[80px] md:size-[90px] rounded-lg bg-[#232f48] overflow-hidden">
<img alt="Ergonomic black mouse on dark pad" class="w-full h-full object-cover" data-alt="Logitech mouse on a black surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-ktA87Vlx6o30cwhe2Mjv7SBRO1TBLnV8j_UdoBF7fN3Su1qjndKB7_WDveVPE-D0ehCSksl6j_vzTtUusM6MYDamqFNiL5quMwYBRuJ6QK6VATExSX7Yu2LopL_oamx4xK37NsReG0yuYmglQ5K0J4-sSGNJbjPE8EWQMnH7P7t5qeVWlzv8vTR0JlIjnRRzubHpBJhclZDhxMlWz0Ha6iK9EK7Ym49J6FZcFa1GPfoelJ2yqfbhnA2SEzG_ruv9oRQvQlOJ6g"/>
</div>
<div class="flex flex-col justify-center">
<a class="text-white text-base font-bold leading-normal hover:text-primary transition-colors" href="#">Logitech MX Master 3S</a>
<p class="text-text-secondary text-sm font-normal mt-1">Graphite</p>
<p class="text-white text-sm font-medium mt-1 md:hidden">2.500.000đ</p>
</div>
</div>
<div class="md:col-span-3 flex items-center justify-between md:justify-center">
<div class="flex items-center gap-1 bg-[#111722] rounded-lg p-1 border border-[#232f48]">
<button class="size-8 flex items-center justify-center rounded hover:bg-[#232f48] text-white transition-colors">
<span class="material-symbols-outlined text-[18px]">remove</span>
</button>
<input class="w-8 bg-transparent text-center text-white text-sm font-medium border-none p-0 focus:ring-0 appearance-none [-moz-appearance:_textfield] [&amp;::-webkit-inner-spin-button]:m-0 [&amp;::-webkit-inner-spin-button]:appearance-none" min="1" type="number" value="1"/>
<button class="size-8 flex items-center justify-center rounded hover:bg-[#232f48] text-white transition-colors">
<span class="material-symbols-outlined text-[18px]">add</span>
</button>
</div>
</div>
<div class="md:col-span-3 flex items-center justify-between md:justify-end gap-4">
<p class="hidden md:block text-white text-base font-bold">2.500.000đ</p>
<button aria-label="Xóa sản phẩm" class="text-text-secondary hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</div>
<!-- Continue Shopping Link (Mobile) -->
<div class="lg:hidden mt-4">
<a class="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm font-medium" href="#">
<span class="material-symbols-outlined text-[18px]">arrow_back</span>
                            Tiếp tục mua sắm
                        </a>
</div>
</div>
<!-- Right Column: Order Summary -->
<div class="lg:col-span-4 lg:sticky lg:top-28">
<div class="bg-surface-dark border border-[#344155] rounded-xl p-6 flex flex-col gap-5 shadow-2xl">
<h3 class="text-white text-xl font-bold">Tóm tắt đơn hàng</h3>
<!-- Breakdown -->
<div class="flex flex-col gap-3">
<div class="flex justify-between text-[#92a4c9] text-sm">
<span>Tạm tính</span>
<span class="text-white font-medium">51.700.000đ</span>
</div>
<div class="flex justify-between text-[#92a4c9] text-sm">
<span>Giảm giá</span>
<span class="text-white font-medium">0đ</span>
</div>
</div>
<div class="h-px bg-[#344155]"></div>
<!-- Voucher -->
<div class="flex flex-col gap-2">
<label class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Mã giảm giá</label>
<div class="flex gap-2">
<input class="flex-1 bg-[#111722] border border-[#344155] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary placeholder:text-[#586885]" placeholder="Nhập mã voucher" type="text"/>
<button class="bg-primary/20 hover:bg-primary/30 text-primary font-bold px-4 rounded-lg text-sm transition-colors border border-primary/30">
                                    Áp dụng
                                </button>
</div>
</div>
<div class="h-px bg-[#344155]"></div>
<!-- Total -->
<div class="flex justify-between items-end">
<span class="text-white font-bold text-lg">Tổng cộng</span>
<div class="text-right">
<span class="text-primary text-2xl font-black block leading-none">51.700.000đ</span>
<span class="text-[10px] text-text-secondary mt-1 block">(Đã bao gồm VAT)</span>
</div>
</div>
<!-- Checkout Button -->
<button class="group w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-lg transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 mt-2">
<span>Tiến hành thanh toán</span>
<span class="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<div class="flex items-start gap-2 text-xs text-[#92a4c9] bg-[#111722]/50 p-3 rounded-lg border border-[#344155]/50">
<span class="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">local_shipping</span>
<p>Phí vận chuyển sẽ được tính tại trang thanh toán.</p>
</div>
</div>
<!-- Continue Shopping Link (Desktop) -->
<div class="hidden lg:block mt-6 text-center">
<a class="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm font-medium hover:underline decoration-text-secondary/50 underline-offset-4" href="#">
<span class="material-symbols-outlined text-[18px]">arrow_back</span>
                            Tiếp tục mua sắm
                        </a>
</div>
</div>
</div>
</div>
</main>
