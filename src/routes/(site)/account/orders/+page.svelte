<svelte:head>
  <title>Đơn hàng đã mua - TT STORE</title>
</svelte:head>

<main class="flex-grow layout-container flex flex-col items-center w-full py-8 md:py-12 px-4 md:px-10">
<!-- ============================================== -->
<!-- SCENARIO 1: GUEST VIEW (Not Logged In) -->
<!-- ============================================== -->
<div class="w-full max-w-[1024px] mb-20">
<div class="flex items-center gap-2 mb-8 opacity-50">
<span class="material-symbols-outlined">visibility</span>
<span class="text-xs font-mono uppercase tracking-widest">Trạng thái: Chưa đăng nhập (Guest)</span>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
<!-- Left: Login Prompt -->
<div class="lg:col-span-5 flex flex-col">
<div class="h-full flex flex-col items-center justify-center gap-6 rounded-2xl border border-dashed border-[#324467] bg-[#111722]/50 p-8 text-center">
<div class="size-16 rounded-full bg-[#232f48] flex items-center justify-center text-[#92a4c9]">
<span class="material-symbols-outlined text-[32px]">lock</span>
</div>
<div class="space-y-2">
<h3 class="text-white text-xl font-bold">Đăng nhập tài khoản</h3>
<p class="text-[#92a4c9] text-sm leading-relaxed">
                                Đăng nhập để xem lịch sử mua hàng chi tiết, tích điểm thành viên và nhận ưu đãi độc quyền từ TT Store.
                            </p>
</div>
<button class="w-full max-w-[200px] h-11 bg-[#232f48] hover:bg-[#324467] text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
<span>Đăng nhập ngay</span>
<span class="material-symbols-outlined text-[18px]">login</span>
</button>
</div>
</div>
<!-- Right: Order Lookup Form -->
<div class="lg:col-span-7">
<div class="bg-card-dark rounded-2xl p-6 md:p-8 border border-border-dark shadow-xl">
<div class="mb-6 border-b border-border-dark pb-4">
<h1 class="text-white text-2xl font-bold tracking-tight mb-2">Tra cứu đơn hàng</h1>
<p class="text-[#92a4c9] text-sm">Kiểm tra trạng thái đơn hàng nhanh chóng mà không cần đăng nhập.</p>
</div>
<form class="flex flex-col gap-5">
<label class="flex flex-col gap-2">
<span class="text-white text-sm font-medium">Mã đơn hàng <span class="text-red-500">*</span></span>
<div class="relative">
<div class="absolute left-4 top-1/2 -translate-y-1/2 text-[#92a4c9]">
<span class="material-symbols-outlined text-[20px]">receipt_long</span>
</div>
<input class="w-full bg-[#111722] border border-border-dark rounded-lg h-12 pl-11 pr-4 text-white placeholder:text-[#92a4c9]/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" placeholder="Ví dụ: #ORD-88291" type="text"/>
</div>
</label>
<label class="flex flex-col gap-2">
<span class="text-white text-sm font-medium">Số điện thoại hoặc Email <span class="text-red-500">*</span></span>
<div class="relative">
<div class="absolute left-4 top-1/2 -translate-y-1/2 text-[#92a4c9]">
<span class="material-symbols-outlined text-[20px]">contact_mail</span>
</div>
<input class="w-full bg-[#111722] border border-border-dark rounded-lg h-12 pl-11 pr-4 text-white placeholder:text-[#92a4c9]/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" placeholder="Nhập thông tin khi đặt hàng" type="text"/>
</div>
</label>
<div class="pt-2">
<button class="w-full h-12 bg-primary hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2" type="button">
<span class="material-symbols-outlined text-[20px]">search</span>
                                    Tra cứu
                                </button>
</div>
</form>
</div>
</div>
</div>
</div>
<!-- DIVIDER FOR DEMO PURPOSES -->
<div class="w-full max-w-[1024px] my-12 border-t border-dashed border-[#324467] relative">
<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111722] px-4 text-[#92a4c9] text-xs font-mono uppercase tracking-widest">
                Trạng thái: Đã đăng nhập (Logged In)
            </span>
</div>
<!-- ============================================== -->
<!-- SCENARIO 2: LOGGED IN VIEW (User Dashboard) -->
<!-- ============================================== -->
<div class="w-full max-w-[1024px]">
<!-- Page Header -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
<div>
<h1 class="text-white text-3xl md:text-4xl font-black tracking-tight mb-2">Đơn hàng của tôi</h1>
<p class="text-[#92a4c9]">Quản lý và theo dõi tiến độ giao hàng của bạn.</p>
</div>
<!-- Stat Summary (Optional Enhancement) -->
<div class="flex gap-4">
<div class="bg-card-dark px-4 py-2 rounded-lg border border-border-dark">
<span class="block text-xs text-[#92a4c9]">Tổng chi tiêu</span>
<span class="block text-white font-bold">128.500.000 đ</span>
</div>
<div class="bg-card-dark px-4 py-2 rounded-lg border border-border-dark">
<span class="block text-xs text-[#92a4c9]">Đơn thành công</span>
<span class="block text-white font-bold">12</span>
</div>
</div>
</div>
<!-- Filters / Tabs -->
<div class="mb-6 overflow-x-auto pb-2">
<div class="flex items-center gap-2 min-w-max">
<button class="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-blue-900/20">Tất cả</button>
<button class="px-5 py-2.5 rounded-full bg-card-dark border border-transparent hover:border-border-dark text-[#92a4c9] hover:text-white text-sm font-medium transition-all">Chờ xác nhận</button>
<button class="px-5 py-2.5 rounded-full bg-card-dark border border-transparent hover:border-border-dark text-[#92a4c9] hover:text-white text-sm font-medium transition-all">Đang giao</button>
<button class="px-5 py-2.5 rounded-full bg-card-dark border border-transparent hover:border-border-dark text-[#92a4c9] hover:text-white text-sm font-medium transition-all">Hoàn tất</button>
<button class="px-5 py-2.5 rounded-full bg-card-dark border border-transparent hover:border-border-dark text-[#92a4c9] hover:text-white text-sm font-medium transition-all">Đã hủy</button>
</div>
</div>
<!-- Orders List -->
<div class="flex flex-col gap-6">
<!-- Order Card 1: Processing -->
<div class="group bg-card-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
<!-- Card Header -->
<div class="px-6 py-4 border-b border-border-dark bg-[#232f48]/30 flex flex-wrap justify-between items-center gap-4">
<div class="flex items-center gap-4">
<div class="bg-[#111722] px-3 py-1 rounded border border-border-dark">
<span class="text-[#92a4c9] text-xs font-mono">#ORD-2023-8992</span>
</div>
<span class="text-[#92a4c9] text-sm">20 Tháng 10, 2023</span>
</div>
<div class="flex items-center gap-2 text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full border border-orange-400/20">
<span class="material-symbols-outlined text-[16px]">local_shipping</span>
<span class="text-xs font-bold uppercase">Đang giao hàng</span>
</div>
</div>
<!-- Card Body -->
<div class="p-6">
<div class="flex gap-4 md:gap-6">
<!-- Product Image -->
<div class="shrink-0 size-24 md:size-32 bg-[#111722] rounded-lg border border-border-dark overflow-hidden flex items-center justify-center p-2">
<img alt="Laptop Gaming" class="w-full h-full object-contain mix-blend-screen" data-alt="Modern high-end laptop with screen display" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdEBkJ0p5xVQGG9OGZ18mCAZWQelMsYpPrVZnq447T1ZSBjQONJaH_GgYGrPoV9GUApK0V7dC1BRqJpHMW8DkJZyfATjj9-4JlJMqQDNNodXCNbuYRkN-QbWYFwnIqfvKsmPj6nKXeIJAxojhenOz5qaqqe49LEQiHRXcFe-95OorKjydaiNQ4LAJfDx1mHmSeJua6pLdzpCT4fY1YSGNKNKoKZK8S4y17hERLNGa25ktE1rO0kuEbUtiHSE1dXP2sefza81bW2g"/>
</div>
<!-- Product Info -->
<div class="flex-1 flex flex-col md:flex-row justify-between">
<div>
<h3 class="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">MacBook Pro 14 inch M2 Max</h3>
<p class="text-[#92a4c9] text-sm mb-2">Space Grey • 32GB RAM • 1TB SSD</p>
<p class="text-white text-sm font-medium">x1</p>
</div>
<div class="mt-4 md:mt-0 text-right">
<p class="text-[#92a4c9] text-sm line-through">52.000.000 đ</p>
<p class="text-primary text-xl font-bold">49.990.000 đ</p>
</div>
</div>
</div>
<!-- Divider if multiple items -->
<div class="my-4 pt-4 border-t border-dashed border-[#324467] flex items-center justify-between text-xs text-[#92a4c9]">
<span>Và 2 sản phẩm phụ kiện khác</span>
<a class="hover:text-white underline" href="#">Xem tất cả</a>
</div>
</div>
<!-- Card Footer -->
<div class="px-6 py-4 bg-[#232f48]/30 border-t border-border-dark flex flex-wrap justify-between items-center gap-4">
<div class="flex flex-col">
<span class="text-[#92a4c9] text-xs">Tổng tiền đơn hàng</span>
<span class="text-white text-lg font-bold">54.200.000 đ</span>
</div>
<div class="flex gap-3">
<button class="px-4 py-2 rounded-lg border border-border-dark text-white text-sm font-medium hover:bg-[#324467] transition-colors">
                                Mua lại
                            </button>
<button class="px-4 py-2 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-900/20">
                                Xem chi tiết
                            </button>
</div>
</div>
</div>
<!-- Order Card 2: Completed -->
<div class="group bg-card-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
<!-- Card Header -->
<div class="px-6 py-4 border-b border-border-dark bg-[#232f48]/30 flex flex-wrap justify-between items-center gap-4">
<div class="flex items-center gap-4">
<div class="bg-[#111722] px-3 py-1 rounded border border-border-dark">
<span class="text-[#92a4c9] text-xs font-mono">#ORD-2023-1120</span>
</div>
<span class="text-[#92a4c9] text-sm">15 Tháng 09, 2023</span>
</div>
<div class="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span class="text-xs font-bold uppercase">Hoàn tất</span>
</div>
</div>
<!-- Card Body -->
<div class="p-6">
<div class="flex gap-4 md:gap-6">
<!-- Product Image -->
<div class="shrink-0 size-24 md:size-32 bg-[#111722] rounded-lg border border-border-dark overflow-hidden flex items-center justify-center p-2">
<img alt="Màn hình LG" class="w-full h-full object-contain mix-blend-screen" data-alt="High resolution gaming monitor stand on dark desk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTuvT0lPhbHuPKCbX9ZPsO9iQJqiyNMow31e9P8GScA9_EgQGwhfqKyxncfzb7xjRZzuMXkdDPysEWrfcF3NC7yOKXdd-vBx-f7QC9mGJvC33H7lylfa7XJgwZXbVynHZxYZSMhXORNC9nnlE8jpww2FtDvC-8amG87SCs2pAk53qxJeXwUxC_mysPIYXa8sg2k3YjbEaEOs213Ix2WYnFnBnwLc7AJ0IKbpUdX2rdWc1kvE42bcd5EIlx4awLBy8XBvq5qjNTwA"/>
</div>
<!-- Product Info -->
<div class="flex-1 flex flex-col md:flex-row justify-between">
<div>
<h3 class="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">Màn hình LG UltraGear 27" 4K</h3>
<p class="text-[#92a4c9] text-sm mb-2">Nano IPS • 144Hz • HDMI 2.1</p>
<p class="text-white text-sm font-medium">x1</p>
</div>
<div class="mt-4 md:mt-0 text-right">
<p class="text-primary text-xl font-bold">15.500.000 đ</p>
</div>
</div>
</div>
</div>
<!-- Card Footer -->
<div class="px-6 py-4 bg-[#232f48]/30 border-t border-border-dark flex flex-wrap justify-between items-center gap-4">
<div class="flex flex-col">
<span class="text-[#92a4c9] text-xs">Tổng tiền đơn hàng</span>
<span class="text-white text-lg font-bold">15.500.000 đ</span>
</div>
<div class="flex gap-3">
<button class="px-4 py-2 rounded-lg border border-border-dark text-white text-sm font-medium hover:bg-[#324467] transition-colors">
                                Đánh giá
                            </button>
<button class="px-4 py-2 rounded-lg bg-[#232f48] border border-border-dark hover:bg-[#324467] text-white text-sm font-bold transition-colors">
                                Xem chi tiết
                            </button>
</div>
</div>
</div>
<!-- Order Card 3: Cancelled -->
<div class="group bg-card-dark/50 border border-border-dark rounded-xl overflow-hidden hover:border-border-dark transition-colors opacity-75 hover:opacity-100">
<!-- Card Header -->
<div class="px-6 py-4 border-b border-border-dark bg-[#232f48]/10 flex flex-wrap justify-between items-center gap-4">
<div class="flex items-center gap-4">
<div class="bg-[#111722] px-3 py-1 rounded border border-border-dark">
<span class="text-[#92a4c9] text-xs font-mono">#ORD-2023-0012</span>
</div>
<span class="text-[#92a4c9] text-sm">01 Tháng 08, 2023</span>
</div>
<div class="flex items-center gap-2 text-red-400 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
<span class="material-symbols-outlined text-[16px]">cancel</span>
<span class="text-xs font-bold uppercase">Đã hủy</span>
</div>
</div>
<!-- Card Body -->
<div class="p-6">
<div class="flex gap-4 md:gap-6">
<!-- Product Image -->
<div class="shrink-0 size-24 md:size-32 bg-[#111722] rounded-lg border border-border-dark overflow-hidden flex items-center justify-center p-2 grayscale">
<img alt="Tai nghe Sony" class="w-full h-full object-contain mix-blend-screen" data-alt="Wireless headphones on a solid background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3sDFzJ70iHrvlkmfqQf7Ok80q5_ZNVfDdShJAmuluSzWCInDVLIAbS5ETp2RvhHYSb2I69DLUayoX0UzprICj6LMYP6qKjXkQucGGLoNMPLtTzr0o_8tZ_RKz9_7pEithjM72Ps_epHSALnFB0bjiKJNvRl4nQeTXtxLO7BN4GUoN624FBsLeA-2Q_xLfmwTQWYSnNCQS1p9Ukf8-3GIeTqiFdW3xNwSGU8ZyLzrNOWnE4EuQoXeZUIgWomyTYEgEpx1f7ECsrA"/>
</div>
<!-- Product Info -->
<div class="flex-1 flex flex-col md:flex-row justify-between">
<div>
<h3 class="text-white font-bold text-lg mb-1">Tai nghe Sony WH-1000XM5</h3>
<p class="text-[#92a4c9] text-sm mb-2">Black • Noise Cancelling</p>
<p class="text-white text-sm font-medium">x1</p>
</div>
<div class="mt-4 md:mt-0 text-right">
<p class="text-[#92a4c9] text-xl font-bold">8.490.000 đ</p>
</div>
</div>
</div>
</div>
<!-- Card Footer -->
<div class="px-6 py-4 bg-[#232f48]/10 border-t border-border-dark flex flex-wrap justify-between items-center gap-4">
<div class="flex flex-col">
<span class="text-[#92a4c9] text-xs">Tổng tiền đơn hàng</span>
<span class="text-white text-lg font-bold">8.490.000 đ</span>
</div>
<div class="flex gap-3">
<button class="px-4 py-2 rounded-lg border border-border-dark text-white text-sm font-medium hover:bg-[#324467] transition-colors">
                                Mua lại
                            </button>
</div>
</div>
</div>
</div>
</div>
</main>
