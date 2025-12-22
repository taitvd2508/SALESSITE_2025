<svelte:head>
  <title>Admin - Chi tiết sản phẩm</title>
</svelte:head>

<div class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8">
<div class="max-w-[1200px] mx-auto flex flex-col gap-6">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div class="flex items-start gap-4">
<button class="mt-1 p-2 rounded-lg border border-surface-highlight bg-surface-dark text-text-secondary hover:text-white hover:bg-surface-highlight transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">arrow_back</span>
</button>
<div>
<div class="flex items-center gap-3 mb-1">
<h1 class="text-2xl md:text-3xl font-bold text-white tracking-tight">Sony WH-1000XM5</h1>
<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    Đang bán
                                </span>
</div>
<p class="text-text-secondary text-sm">Cập nhật lần cuối: 2 giờ trước bởi Admin TT</p>
</div>
</div>
<div class="flex gap-3">
<button class="flex items-center gap-2 h-10 px-4 rounded-lg bg-surface-dark border border-surface-highlight text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">delete</span>
                            Xóa sản phẩm
                        </button>
<button class="flex items-center gap-2 h-10 px-6 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-blue-600 transition-all">
<span class="material-symbols-outlined" style="font-size: 20px;">save</span>
                            Lưu thay đổi
                        </button>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div class="lg:col-span-2 flex flex-col gap-6">
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-5 shadow-sm">
<h3 class="text-lg font-bold text-white mb-4">Thông tin chung</h3>
<div class="space-y-4">
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Tên sản phẩm</label>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg text-white px-4 py-2.5 focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder-text-secondary/50 transition-all" type="text" value="Tai nghe chống ồn Sony WH-1000XM5"/>
</div>
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Mô tả sản phẩm</label>
<div class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg overflow-hidden">
<div class="flex items-center gap-1 p-2 border-b border-surface-highlight bg-surface-highlight/30">
<button class="p-1.5 text-text-secondary hover:text-white rounded hover:bg-white/5"><span class="material-symbols-outlined" style="font-size: 18px;">format_bold</span></button>
<button class="p-1.5 text-text-secondary hover:text-white rounded hover:bg-white/5"><span class="material-symbols-outlined" style="font-size: 18px;">format_italic</span></button>
<button class="p-1.5 text-text-secondary hover:text-white rounded hover:bg-white/5"><span class="material-symbols-outlined" style="font-size: 18px;">format_list_bulleted</span></button>
<button class="p-1.5 text-text-secondary hover:text-white rounded hover:bg-white/5"><span class="material-symbols-outlined" style="font-size: 18px;">link</span></button>
</div>
<textarea class="w-full bg-transparent border-none text-white px-4 py-3 focus:ring-0 min-h-[160px] text-sm leading-relaxed" placeholder="Nhập mô tả chi tiết...">Tai nghe Sony WH-1000XM5 là phiên bản kế nhiệm của dòng tai nghe chống ồn đình đám WH-1000XM4. Với thiết kế mới hiện đại, tinh tế cùng công nghệ chống ồn hàng đầu, WH-1000XM5 mang đến trải nghiệm âm thanh đỉnh cao.</textarea>
</div>
</div>
</div>
</div>
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-5 shadow-sm">
<div class="flex items-center justify-between mb-4">
<h3 class="text-lg font-bold text-white">Hình ảnh sản phẩm</h3>
<button class="text-sm text-primary hover:text-blue-400 font-medium">Tải ảnh lên</button>
</div>
<div class="aspect-video w-full bg-[#1a2332] rounded-lg border-2 border-dashed border-surface-highlight flex flex-col items-center justify-center relative group overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
<div class="w-48 h-48 bg-contain bg-center bg-no-repeat opacity-80 group-hover:scale-105 transition-transform duration-500" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsPgzU9StUWVd6wCxHu-1Yhst23Jw6Tk4QrWCQs5TI7hlDaJu_DrZhvglBLcjDk-jK32o2d50KpLz3tfOyZPj1TC2vWVSXvoiaPPmGnAb0IIbimi8uKa6rFxrLT7Y_kExqxEVe2DYCjGXfGeFvuWi42O6rRT5ql4YmthdyVK5gNZD21whmQQ0CoM0TAzXqKm4nd8jsykgXoBh6Zp6y6qRQo5efs1KTGGS01t78NgVZ5pJolU1qDo8m83knZu9v9-vKsiQfNIersA");'></div>
<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
<span class="material-symbols-outlined text-white text-4xl">edit</span>
</div>
</div>
<div class="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
<div class="aspect-square rounded-lg border border-primary ring-2 ring-primary/30 relative overflow-hidden bg-[#1a2332]">
<div class="w-full h-full bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsPgzU9StUWVd6wCxHu-1Yhst23Jw6Tk4QrWCQs5TI7hlDaJu_DrZhvglBLcjDk-jK32o2d50KpLz3tfOyZPj1TC2vWVSXvoiaPPmGnAb0IIbimi8uKa6rFxrLT7Y_kExqxEVe2DYCjGXfGeFvuWi42O6rRT5ql4YmthdyVK5gNZD21whmQQ0CoM0TAzXqKm4nd8jsykgXoBh6Zp6y6qRQo5efs1KTGGS01t78NgVZ5pJolU1qDo8m83knZu9v9-vKsiQfNIersA");'></div>
</div>
<div class="aspect-square rounded-lg border border-surface-highlight bg-[#1a2332] flex items-center justify-center cursor-pointer hover:border-text-secondary transition-colors relative group">
<span class="material-symbols-outlined text-text-secondary">headphones</span>
<button class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><span class="material-symbols-outlined" style="font-size: 12px;">close</span></button>
</div>
<div class="aspect-square rounded-lg border border-surface-highlight bg-[#1a2332] flex items-center justify-center cursor-pointer hover:border-text-secondary transition-colors relative group">
<span class="material-symbols-outlined text-text-secondary">cable</span>
</div>
<div class="aspect-square rounded-lg border border-dashed border-surface-highlight bg-transparent flex items-center justify-center cursor-pointer hover:bg-surface-highlight/30 hover:text-primary text-text-secondary transition-colors">
<span class="material-symbols-outlined text-2xl">add_photo_alternate</span>
</div>
</div>
</div>
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-5 shadow-sm">
<h3 class="text-lg font-bold text-white mb-4">Giá bán</h3>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Giá bán lẻ (VND)</label>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg text-white px-4 py-2.5 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-right font-medium" type="text" value="8.490.000"/>
</div>
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Giá so sánh (VND)</label>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg text-white px-4 py-2.5 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-right text-text-secondary" type="text" value="9.990.000"/>
</div>
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Giá vốn (VND)</label>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg text-white px-4 py-2.5 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-right" placeholder="Nhập giá nhập..." type="text"/>
<p class="text-xs text-text-secondary mt-1">Khách hàng sẽ không thấy giá này.</p>
</div>
<div class="flex items-center pt-6">
<label class="flex items-center gap-2 cursor-pointer">
<input checked="" class="rounded border-surface-highlight bg-[#1a2332] text-primary focus:ring-offset-surface-dark focus:ring-primary" type="checkbox"/>
<span class="text-sm text-white">Đã bao gồm thuế (VAT)</span>
</label>
</div>
</div>
</div>
</div>
<div class="flex flex-col gap-6">
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-5 shadow-sm">
<h3 class="text-base font-bold text-white mb-4">Trạng thái</h3>
<div class="relative">
<select class="appearance-none w-full bg-[#1a2332] border border-surface-highlight text-white text-sm rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer">
<option>Đang bán (Active)</option>
<option>Bản nháp (Draft)</option>
<option>Lưu trữ (Archived)</option>
</select>
<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
<span class="material-symbols-outlined" style="font-size: 20px;">expand_more</span>
</div>
</div>
<div class="mt-4 pt-4 border-t border-surface-highlight">
<p class="text-xs text-text-secondary mb-2">Lịch hiển thị</p>
<div class="flex items-center gap-2 text-sm text-white">
<span class="material-symbols-outlined text-green-500" style="font-size: 18px;">calendar_today</span>
<span>Hiển thị ngay lập tức</span>
</div>
<button class="text-xs text-primary hover:text-blue-400 font-medium mt-1 ml-6">Lên lịch lại</button>
</div>
</div>
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-5 shadow-sm">
<h3 class="text-base font-bold text-white mb-4">Phân loại</h3>
<div class="space-y-4">
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Danh mục</label>
<div class="relative">
<select class="appearance-none w-full bg-[#1a2332] border border-surface-highlight text-white text-sm rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer">
<option>Tai nghe &amp; Phụ kiện</option>
<option>Điện thoại</option>
<option>Laptop</option>
</select>
<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
<span class="material-symbols-outlined" style="font-size: 20px;">expand_more</span>
</div>
</div>
</div>
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Thương hiệu</label>
<div class="relative">
<select class="appearance-none w-full bg-[#1a2332] border border-surface-highlight text-white text-sm rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer">
<option>Sony</option>
<option>Apple</option>
<option>Samsung</option>
</select>
<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
<span class="material-symbols-outlined" style="font-size: 20px;">expand_more</span>
</div>
</div>
</div>
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Tags</label>
<div class="flex flex-wrap gap-2 mb-2">
<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-surface-highlight text-white">
                                            Chống ồn
                                            <button class="hover:text-red-400"><span class="material-symbols-outlined" style="font-size: 14px;">close</span></button>
</span>
<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-surface-highlight text-white">
                                            Bluetooth
                                            <button class="hover:text-red-400"><span class="material-symbols-outlined" style="font-size: 14px;">close</span></button>
</span>
</div>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg text-white px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Thêm tag..." type="text"/>
</div>
</div>
</div>
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-5 shadow-sm">
<h3 class="text-base font-bold text-white mb-4">Kho hàng</h3>
<div class="space-y-4">
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Mã SKU</label>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg text-white px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none font-mono" type="text" value="SN-WH1000XM5-BLK"/>
</div>
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Mã vạch (Barcode/GTIN)</label>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg text-white px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none font-mono" type="text" value="4548736132566"/>
</div>
<div class="grid grid-cols-2 gap-4">
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Số lượng</label>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg text-white px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" type="number" value="125"/>
</div>
<div>
<label class="block text-sm font-medium text-text-secondary mb-1.5">Cảnh báo khi &lt;</label>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg text-white px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" type="number" value="10"/>
</div>
</div>
</div>
</div>
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-5 shadow-sm">
<h3 class="text-base font-bold text-white mb-4">Lịch sử chỉnh sửa</h3>
<div class="relative pl-4 border-l border-surface-highlight space-y-6">
<div class="relative">
<span class="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-surface-dark"></span>
<p class="text-sm text-white">Cập nhật thông tin</p>
<p class="text-xs text-text-secondary mt-0.5">2 giờ trước bởi <strong>Admin TT</strong></p>
</div>
<div class="relative">
<span class="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-surface-highlight ring-4 ring-surface-dark"></span>
<p class="text-sm text-white">Điều chỉnh giá bán</p>
<p class="text-xs text-text-secondary mt-0.5">1 ngày trước bởi <strong>Admin TT</strong></p>
<div class="mt-1 text-xs bg-surface-highlight/30 p-1.5 rounded text-text-secondary">
<span class="line-through opacity-60">8.990.000đ</span> -&gt; <span class="text-green-400">8.490.000đ</span>
</div>
</div>
<div class="relative">
<span class="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-surface-highlight ring-4 ring-surface-dark"></span>
<p class="text-sm text-white">Đã tạo sản phẩm</p>
<p class="text-xs text-text-secondary mt-0.5">15/10/2023 bởi <strong>Admin TT</strong></p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
