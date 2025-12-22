<svelte:head>
  <title>Admin - Sản phẩm TT STORE</title>
</svelte:head>

<div class="flex-1 overflow-y-auto p-8 scroll-smooth">
<div class="max-w-[1400px] mx-auto flex flex-col gap-6">
<!-- Page Heading -->
<div class="flex flex-wrap justify-between items-end gap-4">
<div class="flex flex-col gap-1">
<h2 class="text-white text-3xl font-bold tracking-tight">Quản lý sản phẩm</h2>
<p class="text-[#92a4c9] text-sm">Danh sách tất cả sản phẩm hiện có trong kho hàng.</p>
</div>
<button class="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-primary/20">
<span class="material-symbols-outlined text-[20px]">add</span>
<span>Thêm sản phẩm</span>
</button>
</div>
<!-- Filters & Search Toolbar -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-[#1a2332] p-4 rounded-xl border border-[#232f48]">
<div class="lg:col-span-5 relative">
<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-[#92a4c9]">search</span>
</div>
<input class="block w-full pl-10 pr-3 py-2.5 border border-[#232f48] rounded-lg leading-5 bg-[#111722] text-white placeholder-[#92a4c9] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm" placeholder="Tìm kiếm theo tên sản phẩm, SKU..." type="text"/>
</div>
<div class="lg:col-span-3">
<select class="block w-full pl-3 pr-10 py-2.5 text-base border border-[#232f48] focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-[#111722] text-white">
<option>Tất cả danh mục</option>
<option>Điện thoại</option>
<option>Máy tính bảng</option>
<option>Phụ kiện</option>
<option>Âm thanh</option>
</select>
</div>
<div class="lg:col-span-3">
<select class="block w-full pl-3 pr-10 py-2.5 text-base border border-[#232f48] focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-[#111722] text-white">
<option>Tất cả trạng thái</option>
<option>Đang bán (Active)</option>
<option>Ngừng bán (Disable)</option>
<option>Hết hàng</option>
</select>
</div>
<div class="lg:col-span-1 flex justify-end">
<button class="w-full h-full flex items-center justify-center bg-[#232f48] hover:bg-[#2d3b55] text-white rounded-lg border border-[#374151] transition-colors" title="Bộ lọc nâng cao">
<span class="material-symbols-outlined">filter_list</span>
</button>
</div>
</div>
<!-- Product Table -->
<div class="bg-[#1a2332] border border-[#232f48] rounded-xl overflow-hidden shadow-sm">
<div class="overflow-x-auto">
<table class="w-full whitespace-nowrap text-left">
<thead class="bg-[#232f48] text-[#92a4c9] text-xs uppercase font-semibold tracking-wider">
<tr>
<th class="px-6 py-4">Sản phẩm</th>
<th class="px-6 py-4">SKU</th>
<th class="px-6 py-4">Danh mục</th>
<th class="px-6 py-4 text-right">Giá bán</th>
<th class="px-6 py-4 text-center">Tồn kho</th>
<th class="px-6 py-4 text-center">Trạng thái</th>
<th class="px-6 py-4">Ngày tạo</th>
<th class="px-6 py-4 text-right">Hành động</th>
</tr>
</thead>
<tbody class="divide-y divide-[#232f48]">
<!-- Row 1 -->
<tr class="hover:bg-[#232f48]/50 transition-colors group">
<td class="px-6 py-4">
<div class="flex items-center gap-4">
<div class="size-12 rounded-lg bg-white/5 flex-shrink-0 bg-center bg-cover border border-[#232f48]" data-alt="iPhone 15 Pro Max Titanium" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8ZaKl14SKFlkrNCbdXZkTpkr9ZbNxOmktUFtsBillv_dzC20fmVY7KROk1HiLfmAGIPGvH6z0G0PjvplguMlWhKObqKMd4THJJ54mzsKn7SkVFgHLZlgvnjTtbvQhcixcWWoUShTR3DQ55Wtj8-yA3bFMhELQixGqgN1sYKXRplRE2FfvvyLdLHAsZsKiDMG3paNaI2CLRxa47mhJexD0Vda5kNFpk550qX5JV3XBTSQ8_j2XQ32BMKx_F7wVBF_IJcn3bTQRBA");'></div>
<div>
<p class="text-white font-medium text-sm group-hover:text-primary transition-colors">iPhone 15 Pro Max</p>
<p class="text-[#92a4c9] text-xs">Titanium Nature 256GB</p>
</div>
</div>
</td>
<td class="px-6 py-4 text-sm text-[#92a4c9]">AP-15-PM</td>
<td class="px-6 py-4 text-sm text-white">Điện thoại</td>
<td class="px-6 py-4 text-sm text-white font-medium text-right">32.990.000₫</td>
<td class="px-6 py-4 text-sm text-white text-center">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                            150
                                        </span>
</td>
<td class="px-6 py-4 text-center">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
<span class="size-1.5 rounded-full bg-emerald-500"></span>
                                            Active
                                        </span>
</td>
<td class="px-6 py-4 text-sm text-[#92a4c9]">12/10/2023</td>
<td class="px-6 py-4 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-[#92a4c9] hover:text-white hover:bg-[#232f48] rounded transition-colors" title="Xem chi tiết">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button class="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors" title="Chỉnh sửa">
<span class="material-symbols-outlined text-[20px]">edit</span>
</button>
<button class="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Xóa">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-[#232f48]/50 transition-colors group">
<td class="px-6 py-4">
<div class="flex items-center gap-4">
<div class="size-12 rounded-lg bg-white/5 flex-shrink-0 bg-center bg-cover border border-[#232f48]" data-alt="Samsung Galaxy S24 Ultra Gray" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-ojkZdH7DwkBC8UYKg8wEHEhVQijgS7HelUxxH-XNmWpEQKvSh32vSJ67DfpTXhjP81s51CRvgtepnwJPKYre5e5kq131oPf2bmVMZpYnz97YVZCaGhJJGd5tuAUOiMGApx-oiDd-txBglYmxh1EA3rb3pLG8eeLq4ZRiEKZFpaO_A-uZTY2jaIVeSB25EnvxXeYzE8yhupL_KM6TgLB-OI2iD6edTJzvxOluodKZGYUvOt3tfXM02swKvrmINJGyfNqLMqkKSA");'></div>
<div>
<p class="text-white font-medium text-sm group-hover:text-primary transition-colors">Samsung Galaxy S24 Ultra</p>
<p class="text-[#92a4c9] text-xs">Titanium Gray 512GB</p>
</div>
</div>
</td>
<td class="px-6 py-4 text-sm text-[#92a4c9]">SS-S24-U</td>
<td class="px-6 py-4 text-sm text-white">Điện thoại</td>
<td class="px-6 py-4 text-sm text-white font-medium text-right">29.990.000₫</td>
<td class="px-6 py-4 text-sm text-white text-center">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                            45
                                        </span>
</td>
<td class="px-6 py-4 text-center">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
<span class="size-1.5 rounded-full bg-emerald-500"></span>
                                            Active
                                        </span>
</td>
<td class="px-6 py-4 text-sm text-[#92a4c9]">15/01/2024</td>
<td class="px-6 py-4 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-[#92a4c9] hover:text-white hover:bg-[#232f48] rounded transition-colors" title="Xem chi tiết">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button class="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors" title="Chỉnh sửa">
<span class="material-symbols-outlined text-[20px]">edit</span>
</button>
<button class="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Xóa">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-[#232f48]/50 transition-colors group">
<td class="px-6 py-4">
<div class="flex items-center gap-4">
<div class="size-12 rounded-lg bg-white/5 flex-shrink-0 bg-center bg-cover border border-[#232f48]" data-alt="Sony WH-1000XM5 Headphones" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWXodt5aRnryaq8uB3IWdFxwnQON8qOpp_6wdvY-NPNJe7i18Jaxa_yqYrvDuqb6Gmk5RXA3tvVAFneJ6hBoPzA131qXosPRGpjxQtkc8CUPS4Y053dRq_zuZHQsUdoaPh75OvAtxxZ9mOEECZnsKM7tjsuotTiNveHZweatajmpAjNS1lIrfI8d93MTdJLKEevqBIAxQANlWFoqGA6JAdj2_e2Hsycz5A6YW8b2334VeUTk6hjE7R8FsE-P871EN1owAFAqJv1A");'></div>
<div>
<p class="text-white font-medium text-sm group-hover:text-primary transition-colors">Sony WH-1000XM5</p>
<p class="text-[#92a4c9] text-xs">Black - Noise Canceling</p>
</div>
</div>
</td>
<td class="px-6 py-4 text-sm text-[#92a4c9]">SN-XM5</td>
<td class="px-6 py-4 text-sm text-white">Âm thanh</td>
<td class="px-6 py-4 text-sm text-white font-medium text-right">7.490.000₫</td>
<td class="px-6 py-4 text-sm text-white text-center">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                                            0
                                        </span>
</td>
<td class="px-6 py-4 text-center">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
<span class="size-1.5 rounded-full bg-gray-500"></span>
                                            Disable
                                        </span>
</td>
<td class="px-6 py-4 text-sm text-[#92a4c9]">20/09/2023</td>
<td class="px-6 py-4 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-[#92a4c9] hover:text-white hover:bg-[#232f48] rounded transition-colors" title="Xem chi tiết">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button class="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors" title="Chỉnh sửa">
<span class="material-symbols-outlined text-[20px]">edit</span>
</button>
<button class="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Xóa">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-[#232f48]/50 transition-colors group">
<td class="px-6 py-4">
<div class="flex items-center gap-4">
<div class="size-12 rounded-lg bg-white/5 flex-shrink-0 bg-center bg-cover border border-[#232f48]" data-alt="Macbook Air M2 Midnight" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBudXyeopisL4VG0ZOjwVO0FFM0LaEOMIy78wBJNnogpOl0Ax6w4l1PqEqqbCUOnLk1DFIV8Sk-6f4Wy_f1VgXq8tP4nFzH687M9or4LNayJFJDySNrfGc4g4_gGYljl660PYFR9DQ9Bmo8ucGlg6Y0Ft8tGiibnACqOpLecd1gXgN6JQJInXwiUCfQIb5PWgFR2zlHb6k2mBfknXVA57WL7HLglmd6J2EpXa35NqVROx7ydHRxQiRcyJ33ljx_7EBOaD7l9jJuOg");'></div>
<div>
<p class="text-white font-medium text-sm group-hover:text-primary transition-colors">MacBook Air M2</p>
<p class="text-[#92a4c9] text-xs">Midnight 8GB/256GB</p>
</div>
</div>
</td>
<td class="px-6 py-4 text-sm text-[#92a4c9]">AP-MBA-M2</td>
<td class="px-6 py-4 text-sm text-white">Laptop</td>
<td class="px-6 py-4 text-sm text-white font-medium text-right">24.590.000₫</td>
<td class="px-6 py-4 text-sm text-white text-center">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                            12
                                        </span>
</td>
<td class="px-6 py-4 text-center">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
<span class="size-1.5 rounded-full bg-emerald-500"></span>
                                            Active
                                        </span>
</td>
<td class="px-6 py-4 text-sm text-[#92a4c9]">01/02/2024</td>
<td class="px-6 py-4 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-[#92a4c9] hover:text-white hover:bg-[#232f48] rounded transition-colors" title="Xem chi tiết">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button class="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors" title="Chỉnh sửa">
<span class="material-symbols-outlined text-[20px]">edit</span>
</button>
<button class="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Xóa">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 5 -->
<tr class="hover:bg-[#232f48]/50 transition-colors group">
<td class="px-6 py-4">
<div class="flex items-center gap-4">
<div class="size-12 rounded-lg bg-white/5 flex-shrink-0 bg-center bg-cover border border-[#232f48]" data-alt="iPad Pro M2 12.9 inch" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1gfj0loVDu9PXQs6fKsCw281zIN948iotcK_20dF3ZFAbH689U6yB2CZJAyvB87OX5F1xsqFE4HV5JV3-XyYkP0Z2MmkUOVx0wY74B1qmcGIugTtlAEhDN5sN7J2hCGvkfGWotcb1_hf54KCMoSfswP9r_de4CVR7M2L7fO4veKy_uMkjxNpALteTcfxQm1G5HI8KS2kjukCuug6hF57it8sK2UyIHUwtObjFGnqOdR_T2cYFUYR-VNsWKvxBnKDqBWB0wlmCWg");'></div>
<div>
<p class="text-white font-medium text-sm group-hover:text-primary transition-colors">iPad Pro M2 12.9"</p>
<p class="text-[#92a4c9] text-xs">Wifi 128GB Space Gray</p>
</div>
</div>
</td>
<td class="px-6 py-4 text-sm text-[#92a4c9]">AP-IPP-M2</td>
<td class="px-6 py-4 text-sm text-white">Máy tính bảng</td>
<td class="px-6 py-4 text-sm text-white font-medium text-right">28.190.000₫</td>
<td class="px-6 py-4 text-sm text-white text-center">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                            8
                                        </span>
</td>
<td class="px-6 py-4 text-center">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
<span class="size-1.5 rounded-full bg-emerald-500"></span>
                                            Active
                                        </span>
</td>
<td class="px-6 py-4 text-sm text-[#92a4c9]">10/11/2023</td>
<td class="px-6 py-4 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-[#92a4c9] hover:text-white hover:bg-[#232f48] rounded transition-colors" title="Xem chi tiết">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button class="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors" title="Chỉnh sửa">
<span class="material-symbols-outlined text-[20px]">edit</span>
</button>
<button class="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Xóa">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination -->
<div class="flex items-center justify-between px-6 py-4 border-t border-[#232f48] bg-[#1a2332]">
<div class="text-sm text-[#92a4c9]">
                            Hiển thị <span class="font-medium text-white">1</span> đến <span class="font-medium text-white">5</span> trong số <span class="font-medium text-white">24</span> sản phẩm
                        </div>
<div class="flex gap-2">
<button class="px-3 py-1.5 rounded-lg border border-[#232f48] text-[#92a4c9] hover:text-white hover:bg-[#232f48] text-sm disabled:opacity-50 transition-colors" disabled="">
                                Trước
                            </button>
<button class="px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium border border-primary">
                                1
                            </button>
<button class="px-3 py-1.5 rounded-lg border border-[#232f48] text-[#92a4c9] hover:text-white hover:bg-[#232f48] text-sm transition-colors">
                                2
                            </button>
<button class="px-3 py-1.5 rounded-lg border border-[#232f48] text-[#92a4c9] hover:text-white hover:bg-[#232f48] text-sm transition-colors">
                                3
                            </button>
<span class="px-2 py-1.5 text-[#92a4c9] text-sm">...</span>
<button class="px-3 py-1.5 rounded-lg border border-[#232f48] text-[#92a4c9] hover:text-white hover:bg-[#232f48] text-sm transition-colors">
                                Sau
                            </button>
</div>
</div>
</div>
</div>
<!-- Footer Copyright -->
<footer class="mt-8 mb-4 text-center text-xs text-[#92a4c9]">
                © 2024 TT STORE. All rights reserved.
            </footer>
</div>
