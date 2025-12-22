<svelte:head>
  <title>Admin - Người dùng TT STORE</title>
</svelte:head>

<div class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8">
<div class="max-w-[1200px] mx-auto flex flex-col gap-6">
<!-- Page Header & Stats -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h1 class="text-3xl font-bold text-white tracking-tight mb-2">Danh sách người dùng</h1>
<p class="text-text-secondary text-sm">Quản lý, phân quyền và theo dõi trạng thái tài khoản.</p>
</div>
<div class="flex gap-3">
<button class="flex items-center gap-2 h-10 px-4 rounded-lg bg-surface-highlight border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">download</span>
                            Xuất Excel
                        </button>
<button class="flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-blue-600 transition-all">
<span class="material-symbols-outlined" style="font-size: 20px;">add</span>
                            Thêm người dùng
                        </button>
</div>
</div>
<!-- Filters & Toolbar -->
<div class="bg-surface-dark border border-surface-highlight rounded-xl p-4 md:p-5 shadow-sm">
<div class="flex flex-col md:flex-row gap-4 items-center justify-between">
<!-- Search Bar Table Context -->
<div class="w-full md:max-w-md relative group">
<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-text-secondary group-focus-within:text-primary transition-colors">search</span>
</div>
<input class="block w-full pl-10 pr-3 py-2.5 border border-surface-highlight rounded-lg leading-5 bg-[#1a2332] text-white placeholder-text-secondary/70 focus:outline-none focus:bg-surface-highlight focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all" placeholder="Tìm theo tên, email hoặc SĐT..." type="text"/>
</div>
<!-- Dropdown Filters -->
<div class="flex w-full md:w-auto overflow-x-auto pb-2 md:pb-0 gap-3">
<div class="relative min-w-[140px]">
<select class="appearance-none w-full bg-[#1a2332] border border-surface-highlight text-white text-sm rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer">
<option>Tất cả vai trò</option>
<option>Admin</option>
<option>Nhân viên</option>
<option>Khách hàng</option>
</select>
<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
<span class="material-symbols-outlined" style="font-size: 20px;">expand_more</span>
</div>
</div>
<div class="relative min-w-[160px]">
<select class="appearance-none w-full bg-[#1a2332] border border-surface-highlight text-white text-sm rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer">
<option>Tất cả trạng thái</option>
<option>Đang hoạt động</option>
<option>Chờ xác thực</option>
<option>Đã khóa</option>
</select>
<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
<span class="material-symbols-outlined" style="font-size: 20px;">expand_more</span>
</div>
</div>
</div>
</div>
<!-- Active Chips (Example) -->
<div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-surface-highlight">
<span class="text-xs text-text-secondary uppercase font-bold tracking-wider py-1">Đang lọc:</span>
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/20">
                            Vai trò: Khách hàng
                            <button class="hover:text-white"><span class="material-symbols-outlined" style="font-size: 14px;">close</span></button>
</span>
<button class="text-xs text-text-secondary hover:text-white underline decoration-dashed underline-offset-2 ml-2">Xóa bộ lọc</button>
</div>
</div>
<!-- Data Table -->
<div class="bg-surface-dark border border-surface-highlight rounded-xl overflow-hidden shadow-sm flex flex-col">
<div class="overflow-x-auto">
<table class="min-w-full divide-y divide-surface-highlight">
<thead class="bg-[#151c2a]">
<tr>
<th class="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-12" scope="col">
<input class="rounded border-gray-600 bg-[#1a2332] text-primary focus:ring-offset-surface-dark focus:ring-primary" type="checkbox"/>
</th>
<th class="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">Người dùng</th>
<th class="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">Vai trò</th>
<th class="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">Trạng thái</th>
<th class="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">Ngày tạo</th>
<th class="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">Hành động</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-highlight bg-surface-dark">
<!-- Row 1 -->
<tr class="hover:bg-surface-highlight/30 transition-colors group">
<td class="px-6 py-4 whitespace-nowrap">
<input class="rounded border-gray-600 bg-[#1a2332] text-primary focus:ring-offset-surface-dark focus:ring-primary" type="checkbox"/>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center">
<div class="h-10 w-10 flex-shrink-0">
<div class="h-10 w-10 rounded-full bg-cover bg-center" data-alt="Avatar of Nguyen Van A" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7FvOID_uZJIP8-hLKAPfbeJYA97HIIXMTZoQgqfhKa7SzJGLHQzNgFWBYwlY49R9_XGUGue4uIQCgqqV7jtT0lihVqOALh0EPfqwG8-ZLRITv4dA6yrXxKTKB3s36pGupVVmUmuNoe5TWRDr7ogFB0w2Iry5NBNp7V4U1Q29JcW6PqL8z0yZ8ha-IOk1g1sse4aMT94_3NoDRZvTzPZR5Xa_19Ql-wXoJLQheGz8WCOPKonrr3DIfA3EyWFk1mzwquD9VIghRMg");'></div>
</div>
<div class="ml-4">
<div class="text-sm font-medium text-white">Nguyễn Văn A</div>
<div class="text-sm text-text-secondary">nguyenvana@gmail.com</div>
</div>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                            Khách hàng
                                        </span>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center gap-2">
<div class="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
<span class="text-sm text-emerald-400 font-medium">Hoạt động</span>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                        20/10/2023
                                    </td>
<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
<div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-surface-highlight transition-colors" title="Chỉnh sửa">
<span class="material-symbols-outlined" style="font-size: 20px;">edit</span>
</button>
<button class="p-1.5 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Khóa tài khoản">
<span class="material-symbols-outlined" style="font-size: 20px;">block</span>
</button>
</div>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-highlight/30 transition-colors group">
<td class="px-6 py-4 whitespace-nowrap">
<input class="rounded border-gray-600 bg-[#1a2332] text-primary focus:ring-offset-surface-dark focus:ring-primary" type="checkbox"/>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center">
<div class="h-10 w-10 flex-shrink-0">
<div class="h-10 w-10 rounded-full bg-cover bg-center" data-alt="Avatar of Tran Thi B" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbC9I_85Mix4Vf44Rrde-sCv8hCsxLWaiGk7o9Tu4psksN8PnqQ-m38vUGnqmULeqHkKgKY761dDW8vz_pVstrXh-e2viog94nMbzrX73fQDq6YeRtgomJGAlmXlfxhFpNYTpcnffQ39k5FakT28qCjr92_rfmT1VghjZNBxZjL12tpONAINiJkvWsZxPGzZ-OKydoG3SngJMo4eBYBre8R0XuPwCbb3uK7SSvFdNN3m21wcq4Xbu8r4FxOudpFKzndvBtmcVFjA");'></div>
</div>
<div class="ml-4">
<div class="text-sm font-medium text-white">Trần Thị B</div>
<div class="text-sm text-text-secondary">tranthib@ttstore.vn</div>
</div>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                            Admin
                                        </span>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center gap-2">
<div class="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
<span class="text-sm text-emerald-400 font-medium">Hoạt động</span>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                        15/09/2023
                                    </td>
<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
<div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-surface-highlight transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">edit</span>
</button>
<button class="p-1.5 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">block</span>
</button>
</div>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-highlight/30 transition-colors group">
<td class="px-6 py-4 whitespace-nowrap">
<input class="rounded border-gray-600 bg-[#1a2332] text-primary focus:ring-offset-surface-dark focus:ring-primary" type="checkbox"/>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center">
<div class="h-10 w-10 flex-shrink-0 flex items-center justify-center bg-surface-highlight rounded-full text-text-secondary font-bold text-sm">
                                                LC
                                            </div>
<div class="ml-4">
<div class="text-sm font-medium text-white">Lê Văn C</div>
<div class="text-sm text-text-secondary">levanc@yahoo.com</div>
</div>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                            Khách hàng
                                        </span>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center gap-2">
<div class="size-2 rounded-full bg-amber-500"></div>
<span class="text-sm text-amber-400 font-medium">Chờ xác thực</span>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                        01/11/2023
                                    </td>
<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
<div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-surface-highlight transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">edit</span>
</button>
<button class="p-1.5 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">block</span>
</button>
</div>
</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-surface-highlight/30 transition-colors group">
<td class="px-6 py-4 whitespace-nowrap">
<input class="rounded border-gray-600 bg-[#1a2332] text-primary focus:ring-offset-surface-dark focus:ring-primary" type="checkbox"/>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center">
<div class="h-10 w-10 flex-shrink-0">
<div class="h-10 w-10 rounded-full bg-cover bg-center" data-alt="Avatar of Pham Van D" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZCtCKWkIyrjkb1ozvZqWSP2s4S6FV5t21QUco-QYUtUWtzlNa946xQpKUocq7esTpxuuAigH2t6tYQdqL7eTaPsXwmFqyuVAb-YhR0S9Mu7cIi6SuIJm6eThriygAr1xpyK4OA2zSmF6SQsRlcTGsdaMEmLvkzEPDbdJDbw_n5iWz76V9btzy2wL3TxUpsazz41hwuf12O9PfKMbcDWIsDRwmglJpVWoD2SWzm2oFaPmRNzYq8CQBmJRCI_We-a2xWwXXiTRG3A");'></div>
</div>
<div class="ml-4">
<div class="text-sm font-medium text-white">Phạm Văn D</div>
<div class="text-sm text-text-secondary">phamvand@gmail.com</div>
</div>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                            Khách hàng
                                        </span>
</td>
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center gap-2">
<div class="size-2 rounded-full bg-red-500"></div>
<span class="text-sm text-red-400 font-medium">Đã khóa</span>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                        12/08/2023
                                    </td>
<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
<div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-surface-highlight transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">edit</span>
</button>
<button class="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-green-500/10 transition-colors" title="Mở khóa">
<span class="material-symbols-outlined text-green-500" style="font-size: 20px;">check_circle</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination -->
<div class="bg-surface-dark px-4 py-3 flex items-center justify-between border-t border-surface-highlight sm:px-6">
<div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
<div>
<p class="text-sm text-text-secondary">
                                    Hiển thị <span class="font-medium text-white">1</span> đến <span class="font-medium text-white">4</span> trong tổng số <span class="font-medium text-white">97</span> người dùng
                                </p>
</div>
<div>
<nav aria-label="Pagination" class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
<a class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-surface-highlight bg-[#1a2332] text-sm font-medium text-text-secondary hover:bg-surface-highlight" href="#">
<span class="sr-only">Previous</span>
<span class="material-symbols-outlined" style="font-size: 20px;">chevron_left</span>
</a>
<a aria-current="page" class="z-10 bg-primary border-primary text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">
                                        1
                                    </a>
<a class="bg-[#1a2332] border-surface-highlight text-text-secondary hover:bg-surface-highlight relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">
                                        2
                                    </a>
<a class="bg-[#1a2332] border-surface-highlight text-text-secondary hover:bg-surface-highlight relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">
                                        3
                                    </a>
<span class="relative inline-flex items-center px-4 py-2 border border-surface-highlight bg-[#1a2332] text-sm font-medium text-text-secondary">
                                        ...
                                    </span>
<a class="bg-[#1a2332] border-surface-highlight text-text-secondary hover:bg-surface-highlight relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">
                                        10
                                    </a>
<a class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-surface-highlight bg-[#1a2332] text-sm font-medium text-text-secondary hover:bg-surface-highlight" href="#">
<span class="sr-only">Next</span>
<span class="material-symbols-outlined" style="font-size: 20px;">chevron_right</span>
</a>
</nav>
</div>
</div>
</div>
</div>
</div>
</div>
