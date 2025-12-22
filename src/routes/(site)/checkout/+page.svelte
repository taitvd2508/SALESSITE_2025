<svelte:head>
  <title>Checkout - TT STORE</title>
</svelte:head>

<main class="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
<!-- Left Column: Forms -->
<div class="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
<!-- Shipping Info Section -->
<section>
<div class="flex items-center gap-3 mb-6">
<div class="flex items-center justify-center size-8 rounded-full bg-primary text-white text-sm font-bold">1</div>
<h2 class="text-xl sm:text-2xl font-bold tracking-tight">Thông tin giao hàng</h2>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
<!-- Full Name -->
<div class="flex flex-col gap-2">
<label class="text-sm font-medium text-slate-700 dark:text-[#92a4c9]" for="fullname">Họ và tên</label>
<input class="form-input w-full rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-[#5d6b82]" id="fullname" placeholder="Nguyễn Văn A" type="text"/>
</div>
<!-- Phone -->
<div class="flex flex-col gap-2">
<label class="text-sm font-medium text-slate-700 dark:text-[#92a4c9]" for="phone">Số điện thoại</label>
<input class="form-input w-full rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-[#5d6b82]" id="phone" placeholder="09xx xxx xxx" type="tel"/>
</div>
<!-- Email -->
<div class="col-span-1 sm:col-span-2 flex flex-col gap-2">
<label class="text-sm font-medium text-slate-700 dark:text-[#92a4c9]" for="email">Email</label>
<input class="form-input w-full rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-[#5d6b82]" id="email" placeholder="example@email.com" type="email"/>
</div>
<!-- Address -->
<div class="col-span-1 sm:col-span-2 flex flex-col gap-2">
<label class="text-sm font-medium text-slate-700 dark:text-[#92a4c9]" for="address">Địa chỉ nhận hàng</label>
<input class="form-input w-full rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-[#5d6b82]" id="address" placeholder="Số nhà, tên đường, phường/xã, quận/huyện..." type="text"/>
</div>
<!-- Note -->
<div class="col-span-1 sm:col-span-2 flex flex-col gap-2">
<label class="text-sm font-medium text-slate-700 dark:text-[#92a4c9]" for="note">Ghi chú đơn hàng (Tùy chọn)</label>
<textarea class="form-textarea w-full rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-900 dark:text-white px-4 py-3 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-[#5d6b82] resize-none" id="note" placeholder="Ví dụ: Giao hàng vào giờ hành chính" rows="3"></textarea>
</div>
</div>
</section>
<hr class="border-slate-200 dark:border-[#232f48]"/>
<!-- Payment Method Section -->
<section>
<div class="flex items-center gap-3 mb-6">
<div class="flex items-center justify-center size-8 rounded-full bg-primary text-white text-sm font-bold">2</div>
<h2 class="text-xl sm:text-2xl font-bold tracking-tight">Phương thức thanh toán</h2>
</div>
<div class="flex flex-col gap-3">
<!-- COD Option -->
<label class="relative cursor-pointer group">
<input checked="" class="peer sr-only radio-checked-bg radio-checked-icon" name="payment_method" type="radio" value="cod"/>
<div class="p-4 rounded-xl border border-slate-200 dark:border-[#324467] bg-white dark:bg-[#192233] hover:border-primary transition-all flex items-center gap-4">
<div class="size-10 rounded-full bg-slate-100 dark:bg-[#232f48] flex items-center justify-center text-primary">
<span class="material-symbols-outlined">payments</span>
</div>
<div class="flex-1">
<p class="font-bold text-slate-900 dark:text-white">Thanh toán khi nhận hàng (COD)</p>
<p class="text-sm text-slate-500 dark:text-[#92a4c9]">Thanh toán bằng tiền mặt khi shipper giao hàng đến.</p>
</div>
<div class="size-5 rounded-full border border-slate-300 dark:border-slate-500 flex items-center justify-center check-icon hidden peer-checked:border-primary peer-checked:bg-primary">
<span class="material-symbols-outlined text-[14px] text-white">check</span>
</div>
</div>
</label>
<!-- Bank Transfer Option -->
<label class="relative cursor-pointer group">
<input class="peer sr-only radio-checked-bg radio-checked-icon" name="payment_method" type="radio" value="bank"/>
<div class="p-4 rounded-xl border border-slate-200 dark:border-[#324467] bg-white dark:bg-[#192233] hover:border-primary transition-all flex items-center gap-4">
<div class="size-10 rounded-full bg-slate-100 dark:bg-[#232f48] flex items-center justify-center text-primary">
<span class="material-symbols-outlined">account_balance</span>
</div>
<div class="flex-1">
<p class="font-bold text-slate-900 dark:text-white">Chuyển khoản ngân hàng</p>
<p class="text-sm text-slate-500 dark:text-[#92a4c9]">Chuyển khoản qua QR Code hoặc Internet Banking.</p>
</div>
<div class="size-5 rounded-full border border-slate-300 dark:border-slate-500 flex items-center justify-center check-icon hidden peer-checked:border-primary peer-checked:bg-primary">
<span class="material-symbols-outlined text-[14px] text-white">check</span>
</div>
</div>
</label>
<!-- E-Wallet Option -->
<label class="relative cursor-pointer group">
<input class="peer sr-only radio-checked-bg radio-checked-icon" name="payment_method" type="radio" value="wallet"/>
<div class="p-4 rounded-xl border border-slate-200 dark:border-[#324467] bg-white dark:bg-[#192233] hover:border-primary transition-all flex items-center gap-4">
<div class="size-10 rounded-full bg-slate-100 dark:bg-[#232f48] flex items-center justify-center text-primary">
<span class="material-symbols-outlined">account_balance_wallet</span>
</div>
<div class="flex-1">
<p class="font-bold text-slate-900 dark:text-white">Ví điện tử (Momo / ZaloPay)</p>
<p class="text-sm text-slate-500 dark:text-[#92a4c9]">Quét mã thanh toán nhanh chóng, tiện lợi.</p>
</div>
<div class="size-5 rounded-full border border-slate-300 dark:border-slate-500 flex items-center justify-center check-icon hidden peer-checked:border-primary peer-checked:bg-primary">
<span class="material-symbols-outlined text-[14px] text-white">check</span>
</div>
</div>
</label>
</div>
</section>
</div>
<!-- Right Column: Order Summary (Sticky) -->
<div class="lg:col-span-5 xl:col-span-4">
<div class="sticky top-24 rounded-2xl border border-slate-200 dark:border-[#232f48] bg-white dark:bg-[#111722] p-6 shadow-sm">
<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">Đơn hàng của bạn (2)</h3>
<!-- Product List -->
<div class="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
<!-- Product 1 -->
<div class="flex gap-4">
<div class="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-[#192233] border border-slate-200 dark:border-[#232f48]">
<img alt="MacBook Pro" class="w-full h-full object-cover" data-alt="MacBook Pro laptop on a desk showing sleek silver design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8tpXqt2WLzhNFhAwqMTLqw2utYLtFDi8_z8T5sxoue8fZPAJXaFG_ZRByUAw8Ox1rSZB4PaiCAD2zOjZeAcu2gArOCUwGjrZN7CeQqP6M_0Z0qN4gmZWOTLlEMpv4nzhKeGK7VYqRdhHKqiLZunOiCQ9d6YmXkAGtfkgRG3SClfvqNd7-IvVl2L3PV_qNqPjQpOSxWXfwwfUPXegAzR2SWyGrxtCnRb5Gcay2_M0sVDU7qiBvsf2hh3-6RNzk6f1wicl6pAq-7Q"/>
</div>
<div class="flex-1 flex flex-col justify-between py-1">
<div>
<p class="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">MacBook Pro M3 Max - 16 inch - Space Black</p>
<p class="text-xs text-slate-500 dark:text-[#92a4c9] mt-1">Số lượng: 1</p>
</div>
<p class="text-sm font-bold text-primary">85.000.000₫</p>
</div>
</div>
<!-- Product 2 -->
<div class="flex gap-4">
<div class="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-[#192233] border border-slate-200 dark:border-[#232f48]">
<img alt="Magic Mouse" class="w-full h-full object-cover" data-alt="Modern wireless computer mouse on a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDysUq1Y32YV4tjyl1uOuq4ySv4J3V9hrZJwZhXkacs2FTEeZavri-Sq5DfNkLLf20VY2kcGoTuUJR7gVR5tsTCoTA2KL8vOSV682YC-Ti5HKcUAYqeJC8CzGyyU-qgw_Ts4EjQj_s_fbL14V3w87EmqvgUtYmmWJKyYt90GWriczbyS-uIslTTKAQyjPkgGHrabcHJnaCpaQ9u5eWg9Ln3vGNCfC1Op1iV0EbEzd21_xs7yJOBi4JluseK9cCw7zcmYgTQvYx79w"/>
</div>
<div class="flex-1 flex flex-col justify-between py-1">
<div>
<p class="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">Chuột Logitech MX Master 3S</p>
<p class="text-xs text-slate-500 dark:text-[#92a4c9] mt-1">Số lượng: 1</p>
</div>
<p class="text-sm font-bold text-primary">2.500.000₫</p>
</div>
</div>
</div>
<!-- Discount Code -->
<div class="mb-6">
<div class="flex gap-2">
<input class="flex-1 rounded-lg border-slate-300 dark:border-[#324467] bg-slate-50 dark:bg-[#192233] text-sm text-slate-900 dark:text-white px-3 py-2.5 focus:ring-primary focus:border-primary" placeholder="Mã giảm giá" type="text"/>
<button class="px-4 py-2.5 bg-slate-200 dark:bg-[#232f48] hover:bg-slate-300 dark:hover:bg-[#324467] text-slate-700 dark:text-white text-sm font-semibold rounded-lg transition-colors">Áp dụng</button>
</div>
</div>
<hr class="border-slate-200 dark:border-[#232f48] mb-6"/>
<!-- Calculations -->
<div class="flex flex-col gap-3 mb-6">
<div class="flex justify-between items-center text-sm text-slate-600 dark:text-[#92a4c9]">
<span>Tạm tính</span>
<span class="font-medium text-slate-900 dark:text-white">87.500.000₫</span>
</div>
<div class="flex justify-between items-center text-sm text-slate-600 dark:text-[#92a4c9]">
<span>Phí vận chuyển</span>
<span class="font-medium text-green-500">Miễn phí</span>
</div>
</div>
<div class="flex justify-between items-end mb-8 pt-4 border-t border-slate-200 dark:border-[#232f48]">
<span class="text-base font-bold text-slate-900 dark:text-white">Tổng cộng</span>
<div class="text-right">
<p class="text-2xl font-bold text-primary">87.500.000₫</p>
<p class="text-xs text-slate-500 dark:text-[#6a7a96] mt-1">(Đã bao gồm VAT)</p>
</div>
</div>
<!-- CTA Button -->
<button class="w-full bg-primary hover:bg-blue-700 text-white font-bold rounded-xl py-4 text-base transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]">
                        Đặt hàng ngay
                    </button>
<p class="text-xs text-center text-slate-500 dark:text-[#5d6b82] mt-4 px-4 leading-normal">
                        Bằng việc đặt hàng, bạn đồng ý với <a class="underline hover:text-slate-400" href="#">Điều khoản dịch vụ</a> và <a class="underline hover:text-slate-400" href="#">Chính sách bảo mật</a> của TT STORE.
                    </p>
</div>
</div>
</div>
</main>
