<svelte:head>
  <title>Admin - Chi tiết đơn hàng</title>
</svelte:head>

<div class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8">
<div class="max-w-[1200px] mx-auto flex flex-col gap-6">
<div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
<div>
<div class="flex items-center gap-3 mb-2">
<h1 class="text-3xl font-bold text-white tracking-tight">Đơn hàng #8892</h1>
<span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                            Chờ xác nhận
                        </span>
</div>
<p class="text-text-secondary text-sm">Đặt lúc: 10:30, 24/10/2023</p>
</div>
<div class="flex gap-3">
<button class="flex items-center gap-2 h-10 px-4 rounded-lg bg-surface-highlight border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">print</span>
                        In hóa đơn
                    </button>
<button class="flex items-center gap-2 h-10 px-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 text-sm font-medium hover:bg-red-500/20 transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">cancel</span>
                        Hủy đơn
                    </button>
<button class="flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-blue-600 transition-all">
<span class="material-symbols-outlined" style="font-size: 20px;">check</span>
                        Xác nhận đơn
                    </button>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div class="lg:col-span-2 flex flex-col gap-6">
<div class="bg-surface-dark border border-surface-highlight rounded-xl overflow-hidden shadow-sm">
<div class="p-4 border-b border-surface-highlight flex justify-between items-center">
<h3 class="text-white font-semibold">Danh sách sản phẩm</h3>
<span class="text-text-secondary text-sm">3 sản phẩm</span>
</div>
<div class="overflow-x-auto">
<table class="min-w-full divide-y divide-surface-highlight">
<thead class="bg-[#151c2a]">
<tr>
<th class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">Sản phẩm</th>
<th class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">Đơn giá</th>
<th class="px-6 py-3 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">Số lượng</th>
<th class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">Thành tiền</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-highlight bg-surface-dark">
<tr class="hover:bg-surface-highlight/10 transition-colors">
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center">
<div class="h-12 w-12 flex-shrink-0 bg-surface-highlight rounded-lg bg-cover bg-center border border-white/5" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZCtCKWkIyrjkb1ozvZqWSP2s4S6FV5t21QUco-QYUtUWtzlNa946xQpKUocq7esTpxuuAigH2t6tYQdqL7eTaPsXwmFqyuVAb-YhR0S9Mu7cIi6SuIJm6eThriygAr1xpyK4OA2zSmF6SQsRlcTGsdaMEmLvkzEPDbdJDbw_n5iWz76V9btzy2wL3TxUpsazz41hwuf12O9PfKMbcDWIsDRwmglJpVWoD2SWzm2oFaPmRNzYq8CQBmJRCI_We-a2xWwXXiTRG3A");'></div>
<div class="ml-4">
<div class="text-sm font-medium text-white">Tai nghe Bluetooth Sony WH-1000XM5</div>
<div class="text-xs text-text-secondary mt-1">Màu: Đen</div>
</div>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap text-right text-sm text-text-secondary">
                                            6.990.000 ₫
                                        </td>
<td class="px-6 py-4 whitespace-nowrap text-center text-sm text-white font-medium">
                                            1
                                        </td>
<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-white">
                                            6.990.000 ₫
                                        </td>
</tr>
<tr class="hover:bg-surface-highlight/10 transition-colors">
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center">
<div class="h-12 w-12 flex-shrink-0 bg-surface-highlight rounded-lg bg-cover bg-center border border-white/5" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbC9I_85Mix4Vf44Rrde-sCv8hCsxLWaiGk7o9Tu4psksN8PnqQ-m38vUGnqmULeqHkKgKY761dDW8vz_pVstrXh-e2viog94nMbzrX73fQDq6YeRtgomJGAlmXlfxhFpNYTpcnffQ39k5FakT28qCjr92_rfmT1VghjZNBxZjL12tpONAINiJkvWsZxPGzZ-OKydoG3SngJMo4eBYBre8R0XuPwCbb3uK7SSvFdNN3m21wcq4Xbu8r4FxOudpFKzndvBtmcVFjA");'></div>
<div class="ml-4">
<div class="text-sm font-medium text-white">Chuột Logitech MX Master 3S</div>
<div class="text-xs text-text-secondary mt-1">Màu: Xám</div>
</div>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap text-right text-sm text-text-secondary">
                                            2.190.000 ₫
                                        </td>
<td class="px-6 py-4 whitespace-nowrap text-center text-sm text-white font-medium">
                                            1
                                        </td>
<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-white">
                                            2.190.000 ₫
                                        </td>
</tr>
<tr class="hover:bg-surface-highlight/10 transition-colors">
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center">
<div class="h-12 w-12 flex-shrink-0 bg-surface-highlight rounded-lg bg-cover bg-center border border-white/5" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7FvOID_uZJIP8-hLKAPfbeJYA97HIIXMTZoQgqfhKa7SzJGLHQzNgFWBYwlY49R9_XGUGue4uIQCgqqV7jtT0lihVqOALh0EPfqwG8-ZLRITv4dA6yrXxKTKB3s36pGupVVmUmuNoe5TWRDr7ogFB0w2Iry5NBNp7V4U1Q29JcW6PqL8z0yZ8ha-IOk1g1sse4aMT94_3NoDRZvTzPZR5Xa_19Ql-wXoJLQheGz8WCOPKonrr3DIfA3EyWFk1mzwquD9VIghRMg");'></div>
<div class="ml-4">
<div class="text-sm font-medium text-white">Lót chuột Gaming XL</div>
<div class="text-xs text-text-secondary mt-1">Size: 90x40cm</div>
</div>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap text-right text-sm text-text-secondary">
                                            350.000 ₫
                                        </td>
<td class="px-6 py-4 whitespace-nowrap text-center text-sm text-white font-medium">
                                            2
                                        </td>
<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-white">
                                            700.000 ₫
                                        </td>
</tr>
</tbody>
</table>
</div>
<div class="bg-surface-dark border-t border-surface-highlight p-4 sm:p-6">
<div class="flex flex-col gap-3 ml-auto max-w-xs">
<div class="flex justify-between text-sm text-text-secondary">
<span>Tạm tính:</span>
<span class="font-medium text-white">9.880.000 ₫</span>
</div>
<div class="flex justify-between text-sm text-text-secondary">
<span>Phí vận chuyển:</span>
<span class="font-medium text-white">30.000 ₫</span>
</div>
<div class="flex justify-between text-sm text-text-secondary">
<span>Giảm giá:</span>
<span class="font-medium text-green-400">- 100.000 ₫</span>
</div>
<div class="border-t border-surface-highlight my-1"></div>
<div class="flex justify-between text-base font-bold text-white">
<span>Tổng cộng:</span>
<span class="text-xl text-primary">9.810.000 ₫</span>
</div>
</div>
</div>
</div>
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-4 sm:p-6 shadow-sm">
<h3 class="text-white font-semibold mb-6">Trạng thái đơn hàng</h3>
<div class="relative pl-4 border-l-2 border-surface-highlight space-y-8">
<div class="relative">
<div class="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-surface-dark"></div>
<div class="flex flex-col sm:flex-row sm:items-center justify-between">
<div>
<p class="text-sm font-medium text-white">Đơn hàng mới</p>
<p class="text-xs text-text-secondary mt-0.5">Khách hàng đã đặt hàng thành công</p>
</div>
<span class="text-xs text-text-secondary mt-1 sm:mt-0">10:30, 24/10/2023</span>
</div>
</div>
<div class="relative">
<div class="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-yellow-500 ring-4 ring-surface-dark animate-pulse"></div>
<div class="flex flex-col sm:flex-row sm:items-center justify-between">
<div>
<p class="text-sm font-medium text-yellow-500">Đang chờ xác nhận</p>
<p class="text-xs text-text-secondary mt-0.5">Shop đang kiểm tra kho hàng</p>
</div>
<span class="text-xs text-text-secondary mt-1 sm:mt-0">Hiện tại</span>
</div>
</div>
<div class="relative opacity-50">
<div class="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-surface-highlight ring-4 ring-surface-dark"></div>
<div class="flex flex-col sm:flex-row sm:items-center justify-between">
<div>
<p class="text-sm font-medium text-white">Đang giao hàng</p>
</div>
</div>
</div>
<div class="relative opacity-50">
<div class="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-surface-highlight ring-4 ring-surface-dark"></div>
<div class="flex flex-col sm:flex-row sm:items-center justify-between">
<div>
<p class="text-sm font-medium text-white">Giao hàng thành công</p>
</div>
</div>
</div>
</div>
<div class="mt-8 pt-6 border-t border-surface-highlight">
<label class="block text-sm font-medium text-text-secondary mb-2">Cập nhật trạng thái nhanh</label>
<div class="flex gap-3">
<select class="bg-[#1a2332] border border-surface-highlight text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
<option selected="">Chờ xác nhận</option>
<option>Đang giao hàng</option>
<option>Đã giao hàng</option>
<option>Đã hủy</option>
</select>
<button class="px-4 py-2 bg-primary hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
                                    Lưu thay đổi
                                </button>
</div>
</div>
</div>
</div>
<div class="flex flex-col gap-6">
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-4 sm:p-6 shadow-sm">
<h3 class="text-white font-semibold mb-4">Thông tin khách hàng</h3>
<div class="flex items-center gap-4 mb-6">
<div class="size-12 rounded-full bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7FvOID_uZJIP8-hLKAPfbeJYA97HIIXMTZoQgqfhKa7SzJGLHQzNgFWBYwlY49R9_XGUGue4uIQCgqqV7jtT0lihVqOALh0EPfqwG8-ZLRITv4dA6yrXxKTKB3s36pGupVVmUmuNoe5TWRDr7ogFB0w2Iry5NBNp7V4U1Q29JcW6PqL8z0yZ8ha-IOk1g1sse4aMT94_3NoDRZvTzPZR5Xa_19Ql-wXoJLQheGz8WCOPKonrr3DIfA3EyWFk1mzwquD9VIghRMg");'></div>
<div>
<h4 class="text-white font-medium text-sm">Nguyễn Văn A</h4>
<p class="text-primary text-xs hover:underline cursor-pointer">Xem hồ sơ</p>
</div>
</div>
<div class="space-y-4">
<div class="flex gap-3">
<span class="material-symbols-outlined text-text-secondary shrink-0" style="font-size: 20px;">mail</span>
<p class="text-sm text-white break-all">nguyenvana@gmail.com</p>
</div>
<div class="flex gap-3">
<span class="material-symbols-outlined text-text-secondary shrink-0" style="font-size: 20px;">call</span>
<p class="text-sm text-white">0987 654 321</p>
</div>
</div>
</div>
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-4 sm:p-6 shadow-sm">
<div class="flex justify-between items-center mb-4">
<h3 class="text-white font-semibold">Địa chỉ giao hàng</h3>
<button class="text-xs text-primary hover:text-white font-medium">Chỉnh sửa</button>
</div>
<p class="text-sm text-white leading-relaxed">
                            Số 123, Đường Lê Lợi, Phường Bến Thành<br/>
                            Quận 1, TP. Hồ Chí Minh<br/>
                            Việt Nam
                        </p>
<div class="mt-6 pt-4 border-t border-surface-highlight">
<h4 class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Phương thức thanh toán</h4>
<div class="flex items-center gap-2">
<div class="bg-white/10 p-1.5 rounded">
<span class="material-symbols-outlined text-white" style="font-size: 18px;">credit_card</span>
</div>
<p class="text-sm text-white">Thanh toán qua thẻ tín dụng</p>
</div>
<p class="text-xs text-emerald-400 mt-1 ml-9">Đã thanh toán</p>
</div>
</div>
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-4 sm:p-6 shadow-sm">
<h3 class="text-white font-semibold mb-4">Ghi chú nội bộ</h3>
<textarea class="w-full bg-[#1a2332] border border-surface-highlight rounded-lg text-sm text-white placeholder-text-secondary/60 p-3 min-h-[100px] focus:ring-1 focus:ring-primary focus:border-primary resize-none" placeholder="Nhập ghi chú cho nhân viên..."></textarea>
<button class="mt-3 w-full py-2 bg-surface-highlight hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors border border-white/5">
                            Lưu ghi chú
                        </button>
</div>
</div>
</div>
</div>
</div>
