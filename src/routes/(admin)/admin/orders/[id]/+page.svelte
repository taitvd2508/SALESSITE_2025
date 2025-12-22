<svelte:head>
  <title>Chi tiết đơn hàng TT STORE</title>
</svelte:head>

<main class="flex-grow">
<div class="layout-container flex h-full grow flex-col">
<div class="px-6 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
<div class="layout-content-container flex flex-col max-w-[1200px] flex-1">
<!-- Breadcrumbs -->
<div class="flex flex-wrap gap-2 py-4 text-sm">
<a class="text-[#92a4c9] hover:text-white transition-colors font-medium leading-normal" href="#">Trang chủ</a>
<span class="text-[#92a4c9] font-medium leading-normal">/</span>
<a class="text-[#92a4c9] hover:text-white transition-colors font-medium leading-normal" href="#">Tài khoản</a>
<span class="text-[#92a4c9] font-medium leading-normal">/</span>
<a class="text-[#92a4c9] hover:text-white transition-colors font-medium leading-normal" href="#">Lịch sử đơn hàng</a>
<span class="text-[#92a4c9] font-medium leading-normal">/</span>
<span class="text-white font-medium leading-normal">Chi tiết đơn hàng #TTS-8823</span>
</div>
<!-- Page Heading & Order Info -->
<div class="flex flex-wrap justify-between items-end gap-4 py-4 border-b border-[#232f48] mb-8">
<div class="flex min-w-72 flex-col gap-2">
<div class="flex items-center gap-3">
<h1 class="text-white text-3xl font-bold leading-tight">Đơn hàng #TTS-8823</h1>
<span class="bg-primary/20 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Đang giao hàng</span>
</div>
<p class="text-[#92a4c9] text-sm font-normal">Ngày đặt: 24/10/2023 - 14:30</p>
</div>
<div class="flex gap-3">
<button class="flex items-center justify-center rounded-lg h-10 px-4 bg-[#232f48] hover:bg-[#2d3b55] transition-colors text-white text-sm font-medium gap-2">
<span class="material-symbols-outlined text-[18px]">receipt</span>
<span class="truncate">In hóa đơn</span>
</button>
<button class="flex items-center justify-center rounded-lg h-10 px-4 bg-[#232f48] hover:bg-[#2d3b55] transition-colors text-white text-sm font-medium gap-2">
<span class="material-symbols-outlined text-[18px]">support_agent</span>
<span class="truncate">Liên hệ hỗ trợ</span>
</button>
</div>
</div>
<!-- Timeline -->
<div class="w-full bg-[#161b26] rounded-xl p-8 mb-8 border border-[#232f48]">
<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
<!-- Step 1: Completed -->
<div class="flex flex-col items-center gap-3 relative">
<div class="flex items-center justify-center w-full">
<div class="h-[2px] w-full bg-primary flex-1"></div> <!-- Left Line (Invisible/Active) -->
<div class="size-10 rounded-full bg-primary flex items-center justify-center text-white z-10 shrink-0">
<span class="material-symbols-outlined">check</span>
</div>
<div class="h-[2px] w-full bg-primary flex-1"></div> <!-- Right Line -->
</div>
<div class="text-center">
<p class="text-white text-sm font-bold">Đã đặt hàng</p>
<p class="text-[#92a4c9] text-xs">14:30 24/10</p>
</div>
</div>
<!-- Step 2: Completed -->
<div class="flex flex-col items-center gap-3 relative">
<div class="flex items-center justify-center w-full">
<div class="h-[2px] w-full bg-primary flex-1"></div>
<div class="size-10 rounded-full bg-primary flex items-center justify-center text-white z-10 shrink-0">
<span class="material-symbols-outlined">assignment_turned_in</span>
</div>
<div class="h-[2px] w-full bg-primary flex-1"></div>
</div>
<div class="text-center">
<p class="text-white text-sm font-bold">Đã xác nhận</p>
<p class="text-[#92a4c9] text-xs">15:45 24/10</p>
</div>
</div>
<!-- Step 3: Active (Shipping) -->
<div class="flex flex-col items-center gap-3 relative">
<div class="flex items-center justify-center w-full">
<div class="h-[2px] w-full bg-primary flex-1"></div>
<div class="size-12 rounded-full ring-4 ring-primary/20 bg-primary flex items-center justify-center text-white z-10 shrink-0 shadow-[0_0_15px_rgba(17,82,212,0.6)]">
<span class="material-symbols-outlined">local_shipping</span>
</div>
<div class="h-[2px] w-full bg-[#232f48] flex-1"></div>
</div>
<div class="text-center">
<p class="text-primary text-base font-bold">Đang giao hàng</p>
<p class="text-[#92a4c9] text-xs">Đang vận chuyển</p>
</div>
</div>
<!-- Step 4: Pending -->
<div class="flex flex-col items-center gap-3 relative">
<div class="flex items-center justify-center w-full">
<div class="h-[2px] w-full bg-[#232f48] flex-1"></div>
<div class="size-10 rounded-full bg-[#232f48] text-[#92a4c9] flex items-center justify-center z-10 shrink-0">
<span class="material-symbols-outlined">inventory_2</span>
</div>
<div class="h-[2px] w-full bg-[#232f48] flex-1"></div>
</div>
<div class="text-center">
<p class="text-[#92a4c9] text-sm font-medium">Giao hàng thành công</p>
<p class="text-[#92a4c9] text-xs opacity-0">Pending</p>
</div>
</div>
</div>
</div>
<!-- Customer & Order Info Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<!-- Address -->
<div class="bg-[#161b26] p-6 rounded-xl border border-[#232f48] flex flex-col gap-4">
<h3 class="text-white text-lg font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-primary">location_on</span>
                                Địa chỉ nhận hàng
                            </h3>
<div class="flex flex-col gap-1 text-[#92a4c9] text-sm leading-relaxed">
<p class="text-white font-medium text-base">Nguyễn Văn A</p>
<p>(+84) 905 123 456</p>
<p>123 Đường Nguyễn Văn Linh, Phường Nam Dương, Quận Hải Châu, Đà Nẵng</p>
</div>
</div>
<!-- Payment -->
<div class="bg-[#161b26] p-6 rounded-xl border border-[#232f48] flex flex-col gap-4">
<h3 class="text-white text-lg font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-primary">credit_card</span>
                                Thanh toán
                            </h3>
<div class="flex flex-col gap-2 text-[#92a4c9] text-sm">
<p>Thanh toán qua thẻ tín dụng</p>
<div class="flex items-center gap-2 text-white">
<span class="material-symbols-outlined">payments</span>
<span>Visa **** 4242</span>
</div>
<p class="text-green-500 font-medium text-xs mt-1 bg-green-500/10 w-fit px-2 py-1 rounded">Đã thanh toán</p>
</div>
</div>
<!-- Delivery Method -->
<div class="bg-[#161b26] p-6 rounded-xl border border-[#232f48] flex flex-col gap-4">
<h3 class="text-white text-lg font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-primary">local_shipping</span>
                                Vận chuyển
                            </h3>
<div class="flex flex-col gap-2 text-[#92a4c9] text-sm">
<p>Giao hàng nhanh (GHN)</p>
<p>Mã vận đơn: <span class="text-white font-mono">GHN88239912</span></p>
<a class="text-primary hover:underline text-xs mt-1 inline-flex items-center gap-1" href="#">
                                    Xem hành trình
                                    <span class="material-symbols-outlined text-[14px]">open_in_new</span>
</a>
</div>
</div>
</div>
<!-- Product List -->
<div class="bg-[#161b26] rounded-xl border border-[#232f48] overflow-hidden mb-8">
<div class="px-6 py-4 border-b border-[#232f48]">
<h3 class="text-white text-lg font-bold">Sản phẩm trong đơn hàng</h3>
</div>
<!-- Table Header (Desktop) -->
<div class="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-[#111722] text-[#92a4c9] text-sm font-medium">
<div class="col-span-6">Sản phẩm</div>
<div class="col-span-2 text-center">Đơn giá</div>
<div class="col-span-2 text-center">Số lượng</div>
<div class="col-span-2 text-right">Tạm tính</div>
</div>
<!-- Item 1 -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-6 border-b border-[#232f48] items-center hover:bg-[#1c222e] transition-colors">
<div class="col-span-12 md:col-span-6 flex gap-4">
<div class="w-20 h-20 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden p-2">
<img class="object-cover h-full w-full" data-alt="Macbook Pro on a wooden desk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3OM5qHMKYdaE8Y0dOhW3Ib0vAuAuqwGaYRjbJriyIAm3OYZ87botZGVvTMc_jaJ3NITtbboaPxjfuTpHC9MCMBvWE4U01G3ixIo2c3y0idd9LPN8eA0Xk9bFAbf7kgMRVUY3Iy6x3Qsd-LsoxnsnFIRQozJcCbIJYo4knFvHahvAZXd_mpxkoA3or8u45y7rYYYE8Nmi4H9Y8eLW14dIvIAsgRfqlsfngN-nrEajhd1fVEworakWI2FTqHslvMyD8bkRtudOtvw"/>
</div>
<div class="flex flex-col justify-center">
<h4 class="text-white font-bold text-base">MacBook Pro 16 inch M3 Max</h4>
<p class="text-[#92a4c9] text-sm">Space Black | 36GB RAM | 1TB SSD</p>
<p class="text-[#92a4c9] text-xs mt-1">Bảo hành 12 tháng chính hãng</p>
</div>
</div>
<div class="col-span-4 md:col-span-2 flex md:justify-center items-center">
<span class="text-[#92a4c9] md:hidden mr-2">Đơn giá:</span>
<span class="text-white font-medium">89.990.000₫</span>
</div>
<div class="col-span-4 md:col-span-2 flex md:justify-center items-center">
<span class="text-[#92a4c9] md:hidden mr-2">Số lượng:</span>
<span class="text-white">x1</span>
</div>
<div class="col-span-4 md:col-span-2 flex justify-end items-center">
<span class="text-[#92a4c9] md:hidden mr-2">Tạm tính:</span>
<span class="text-white font-bold">89.990.000₫</span>
</div>
</div>
<!-- Item 2 -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-6 border-b border-[#232f48] items-center hover:bg-[#1c222e] transition-colors">
<div class="col-span-12 md:col-span-6 flex gap-4">
<div class="w-20 h-20 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden p-2">
<img class="object-cover h-full w-full" data-alt="Mechanical gaming mouse with RGB lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABJVNOxQcVJcYGvUYrNX3kglqAxqg3YoTWeaV9h_X_L1QpZLTeA-0JFgzIN8AsyvyUS5FqUICR06FKNbjEqtTj4DFAT6gN5SBAWMKsxZYF4XaP4f92uXvfo_ejXh9UTPvME1sW1Gvewgl4pwYEOJ1a3toH0d7FclosQ_oG-xjjFb6vPEVKGLjWfDxmi-YJVqFJO-s_DEMwydUaIdEojwso0cMhbzOtko3LFTzO1wK32mLrP-5Jc4XiqFjWYfueHmie2kWYVsy3tg"/>
</div>
<div class="flex flex-col justify-center">
<h4 class="text-white font-bold text-base">Chuột Gaming Logitech G Pro X</h4>
<p class="text-[#92a4c9] text-sm">Superlight 2 | White</p>
</div>
</div>
<div class="col-span-4 md:col-span-2 flex md:justify-center items-center">
<span class="text-[#92a4c9] md:hidden mr-2">Đơn giá:</span>
<span class="text-white font-medium">3.290.000₫</span>
</div>
<div class="col-span-4 md:col-span-2 flex md:justify-center items-center">
<span class="text-[#92a4c9] md:hidden mr-2">Số lượng:</span>
<span class="text-white">x1</span>
</div>
<div class="col-span-4 md:col-span-2 flex justify-end items-center">
<span class="text-[#92a4c9] md:hidden mr-2">Tạm tính:</span>
<span class="text-white font-bold">3.290.000₫</span>
</div>
</div>
</div>
<!-- Summary & Actions -->
<div class="flex flex-col md:flex-row justify-end gap-8 mb-12">
<!-- Summary Card -->
<div class="w-full md:w-1/3 bg-[#161b26] rounded-xl border border-[#232f48] p-6 flex flex-col gap-3">
<div class="flex justify-between items-center text-[#92a4c9] text-sm">
<span>Tổng tiền hàng</span>
<span class="text-white">93.280.000₫</span>
</div>
<div class="flex justify-between items-center text-[#92a4c9] text-sm">
<span>Phí vận chuyển</span>
<span class="text-white">50.000₫</span>
</div>
<div class="flex justify-between items-center text-[#92a4c9] text-sm">
<span>Giảm giá vận chuyển</span>
<span class="text-green-500">-50.000₫</span>
</div>
<div class="flex justify-between items-center text-[#92a4c9] text-sm">
<span>Voucher giảm giá</span>
<span class="text-green-500">-1.000.000₫</span>
</div>
<div class="h-[1px] bg-[#232f48] my-2"></div>
<div class="flex justify-between items-center">
<span class="text-white font-bold text-lg">Tổng thanh toán</span>
<span class="text-primary font-bold text-2xl">92.280.000₫</span>
</div>
<p class="text-right text-[#92a4c9] text-xs italic">(Đã bao gồm VAT)</p>
<button class="w-full mt-4 bg-primary hover:bg-blue-600 transition-all text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
<span class="material-symbols-outlined">refresh</span>
                                Mua lại đơn hàng
                            </button>
</div>
</div>
</div>
</div>
</div>
</main>
