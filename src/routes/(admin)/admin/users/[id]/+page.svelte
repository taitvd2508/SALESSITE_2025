<svelte:head>
  <title>Admin - Chi tiết người dùng</title>
</svelte:head>

<div class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8">
<div class="max-w-[1200px] mx-auto flex flex-col gap-6">
<div class="flex flex-col gap-4">
<a class="flex items-center gap-2 text-text-secondary hover:text-white transition-colors w-fit group" href="#">
<span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
<span class="text-sm font-medium">Quay lại danh sách</span>
</a>
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h1 class="text-3xl font-bold text-white tracking-tight mb-2">Nguyễn Văn A</h1>
<div class="flex items-center gap-3 text-sm text-text-secondary">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">mail</span> nguyenvana@gmail.com</span>
<span class="size-1 rounded-full bg-text-secondary/40"></span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">calendar_month</span> Tham gia: 20/10/2023</span>
</div>
</div>
<div class="flex flex-wrap gap-3">
<button class="flex items-center gap-2 h-10 px-4 rounded-lg bg-surface-highlight border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">edit</span>
                                Chỉnh sửa
                            </button>
<button class="flex items-center gap-2 h-10 px-4 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-sm font-medium hover:bg-red-500/20 transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">block</span>
                                Khóa tài khoản
                            </button>
<button class="flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-blue-600 transition-all">
<span class="material-symbols-outlined" style="font-size: 20px;">save</span>
                                Lưu thay đổi
                            </button>
</div>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div class="flex flex-col gap-6">
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-6 flex flex-col items-center text-center relative overflow-hidden shadow-sm">
<div class="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-surface-highlight/50 to-transparent"></div>
<div class="relative mt-4 mb-4">
<div class="size-28 rounded-full bg-cover bg-center border-4 border-surface-dark shadow-xl" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7FvOID_uZJIP8-hLKAPfbeJYA97HIIXMTZoQgqfhKa7SzJGLHQzNgFWBYwlY49R9_XGUGue4uIQCgqqV7jtT0lihVqOALh0EPfqwG8-ZLRITv4dA6yrXxKTKB3s36pGupVVmUmuNoe5TWRDr7ogFB0w2Iry5NBNp7V4U1Q29JcW6PqL8z0yZ8ha-IOk1g1sse4aMT94_3NoDRZvTzPZR5Xa_19Ql-wXoJLQheGz8WCOPKonrr3DIfA3EyWFk1mzwquD9VIghRMg");'></div>
<div class="absolute bottom-1 right-1 p-1 bg-surface-dark rounded-full">
<div class="size-4 rounded-full bg-emerald-500 border-2 border-surface-dark shadow-[0_0_8px_rgba(16,185,129,0.6)]" title="Đang hoạt động"></div>
</div>
</div>
<h2 class="text-xl font-bold text-white mb-1">Nguyễn Văn A</h2>
<p class="text-text-secondary text-sm mb-4">Mã KH: #USER-0089</p>
<div class="flex gap-2 mb-6">
<span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                     Khách hàng
                                 </span>
<span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                     Hoạt động
                                 </span>
</div>
<div class="w-full grid grid-cols-2 gap-4 border-t border-surface-highlight pt-6">
<div class="flex flex-col">
<span class="text-2xl font-bold text-white">12</span>
<span class="text-xs text-text-secondary uppercase tracking-wider font-medium">Đơn hàng</span>
</div>
<div class="flex flex-col border-l border-surface-highlight">
<span class="text-2xl font-bold text-white">15tr</span>
<span class="text-xs text-text-secondary uppercase tracking-wider font-medium">Chi tiêu</span>
</div>
</div>
</div>
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-6 shadow-sm">
<h3 class="text-white font-bold mb-4 text-base">Liên hệ &amp; Bảo mật</h3>
<div class="flex flex-col gap-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-lg bg-surface-highlight flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-text-secondary text-lg">phone</span>
</div>
<div class="overflow-hidden">
<p class="text-xs text-text-secondary uppercase">Điện thoại</p>
<p class="text-white text-sm font-medium truncate">0912 345 678</p>
</div>
</div>
<div class="flex items-center gap-3">
<div class="size-8 rounded-lg bg-surface-highlight flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-text-secondary text-lg">mail</span>
</div>
<div class="overflow-hidden">
<p class="text-xs text-text-secondary uppercase">Email</p>
<p class="text-white text-sm font-medium truncate">nguyenvana@gmail.com</p>
</div>
</div>
<hr class="border-surface-highlight my-2"/>
<button class="flex items-center justify-between w-full p-2.5 rounded-lg bg-[#1a2332] border border-transparent hover:border-surface-highlight hover:bg-surface-highlight transition-all group">
<span class="text-sm text-text-secondary group-hover:text-white font-medium">Đặt lại mật khẩu</span>
<span class="material-symbols-outlined text-text-secondary text-lg">lock_reset</span>
</button>
</div>
</div>
</div>
<div class="lg:col-span-2 flex flex-col gap-6">
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-6 shadow-sm">
<div class="flex items-center justify-between mb-6 border-b border-surface-highlight pb-4">
<h3 class="text-lg font-bold text-white">Thông tin cá nhân</h3>
<span class="text-xs text-text-secondary">* Các trường bắt buộc</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="space-y-2">
<label class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Họ và tên</label>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/50" type="text" value="Nguyễn Văn A"/>
</div>
<div class="space-y-2">
<label class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Số điện thoại</label>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/50" type="text" value="0912 345 678"/>
</div>
<div class="space-y-2">
<label class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Email</label>
<input class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/50" type="email" value="nguyenvana@gmail.com"/>
</div>
<div class="space-y-2">
<label class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Vai trò</label>
<div class="relative">
<select class="appearance-none w-full bg-[#1a2332] border border-surface-highlight text-white text-sm rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer">
<option selected="">Khách hàng</option>
<option>Nhân viên</option>
<option>Admin</option>
</select>
<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
<span class="material-symbols-outlined" style="font-size: 20px;">expand_more</span>
</div>
</div>
</div>
<div class="md:col-span-2 space-y-2">
<label class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Địa chỉ giao hàng mặc định</label>
<textarea class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-24 resize-none placeholder:text-text-secondary/50">Số 123, Đường ABC, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh</textarea>
</div>
</div>
</div>
<div class="bg-surface-dark border border-surface-highlight rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
<div class="px-6 py-4 border-b border-surface-highlight flex justify-between items-center bg-[#151c2a]">
<h3 class="text-base font-bold text-white">Đơn hàng gần đây</h3>
<a class="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1" href="#">
                                    Xem tất cả <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead class="bg-surface-dark text-text-secondary text-xs uppercase font-semibold tracking-wider">
<tr>
<th class="px-6 py-4">Mã đơn</th>
<th class="px-6 py-4">Ngày đặt</th>
<th class="px-6 py-4">Tổng tiền</th>
<th class="px-6 py-4">Trạng thái</th>
<th class="px-6 py-4 text-right">Thao tác</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-highlight text-sm">
<tr class="hover:bg-surface-highlight/30 transition-colors">
<td class="px-6 py-4 text-white font-medium">#ORD-7752</td>
<td class="px-6 py-4 text-text-secondary">24/10/2023</td>
<td class="px-6 py-4 text-white">2,500,000đ</td>
<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                                     Hoàn thành
                                                 </span>
</td>
<td class="px-6 py-4 text-right">
<button class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-highlight transition-colors" title="Xem chi tiết">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
</td>
</tr>
<tr class="hover:bg-surface-highlight/30 transition-colors">
<td class="px-6 py-4 text-white font-medium">#ORD-7721</td>
<td class="px-6 py-4 text-text-secondary">15/09/2023</td>
<td class="px-6 py-4 text-white">1,200,000đ</td>
<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                                     Đang giao
                                                 </span>
</td>
<td class="px-6 py-4 text-right">
<button class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-highlight transition-colors" title="Xem chi tiết">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
</td>
</tr>
<tr class="hover:bg-surface-highlight/30 transition-colors">
<td class="px-6 py-4 text-white font-medium">#ORD-6684</td>
<td class="px-6 py-4 text-text-secondary">02/08/2023</td>
<td class="px-6 py-4 text-white">550,000đ</td>
<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                                                     Đã hủy
                                                 </span>
</td>
<td class="px-6 py-4 text-right">
<button class="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-highlight transition-colors" title="Xem chi tiết">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</div>
