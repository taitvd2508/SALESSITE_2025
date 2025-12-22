<svelte:head>
  <title>Admin - Phân quyền TT STORE</title>
</svelte:head>

<div class="flex-1 overflow-y-auto p-8">
<div class="max-w-[1200px] mx-auto flex flex-col gap-6">
<!-- Breadcrumbs -->
<div class="flex items-center gap-2 text-sm text-text-secondary">
<a class="hover:text-white transition-colors" href="#">Trang chủ</a>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
<span class="text-white font-medium">Phân quyền</span>
</div>
<!-- Page Header -->
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h1 class="text-3xl font-bold text-white tracking-tight">Vai trò &amp; Quyền hạn</h1>
<p class="text-text-secondary mt-1">Quản lý các nhóm người dùng và thiết lập quyền truy cập chi tiết.</p>
</div>
<button class="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20 active:scale-95">
<span class="material-symbols-outlined text-[20px]">add</span>
<span>Thêm vai trò mới</span>
</button>
</div>
<!-- Main Layout: Grid -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
<!-- LEFT COLUMN: Role List -->
<div class="lg:col-span-4 flex flex-col gap-4">
<h3 class="text-sm uppercase font-bold text-text-secondary tracking-wider px-1">Danh sách vai trò</h3>
<!-- Role Item 1 (Super Admin) -->
<div class="bg-surface-dark border border-border-dark rounded-xl p-4 cursor-pointer hover:border-primary/50 transition-all group relative overflow-hidden">
<div class="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-primary/50 transition-all"></div>
<div class="flex justify-between items-start mb-2">
<h4 class="text-white font-bold text-lg">Super Admin</h4>
<span class="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded border border-green-500/20 font-medium">Active</span>
</div>
<p class="text-text-secondary text-sm mb-4 line-clamp-2">Quyền truy cập cao nhất, quản lý toàn bộ hệ thống.</p>
<div class="flex items-center justify-between pt-2 border-t border-white/5">
<div class="flex -space-x-2">
<div class="size-6 rounded-full border border-surface-dark bg-gray-600"></div>
<div class="size-6 rounded-full border border-surface-dark bg-gray-500"></div>
<div class="size-6 rounded-full border border-surface-dark flex items-center justify-center bg-gray-700 text-[10px] text-white">+2</div>
</div>
<span class="material-symbols-outlined text-text-secondary text-[20px]">lock</span>
</div>
</div>
<!-- Role Item 2 (Staff - ACTIVE) -->
<div class="bg-surface-dark border border-primary/60 ring-1 ring-primary/20 rounded-xl p-4 cursor-pointer transition-all relative overflow-hidden shadow-lg shadow-black/20">
<div class="absolute top-0 left-0 w-1 h-full bg-primary"></div>
<div class="flex justify-between items-start mb-2">
<h4 class="text-primary font-bold text-lg">Staff</h4>
<span class="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded border border-green-500/20 font-medium">Active</span>
</div>
<p class="text-text-secondary text-sm mb-4 line-clamp-2">Nhân viên quản lý cửa hàng, xử lý sản phẩm và đơn hàng.</p>
<div class="flex items-center justify-between pt-2 border-t border-white/5">
<div class="flex -space-x-2">
<div class="size-6 rounded-full border border-surface-dark bg-purple-500" data-alt="avatar"></div>
<div class="size-6 rounded-full border border-surface-dark bg-blue-500" data-alt="avatar"></div>
<div class="size-6 rounded-full border border-surface-dark bg-pink-500" data-alt="avatar"></div>
<div class="size-6 rounded-full border border-surface-dark flex items-center justify-center bg-gray-700 text-[10px] text-white">+15</div>
</div>
<div class="flex gap-1">
<button class="p-1.5 hover:bg-white/10 rounded text-text-secondary hover:text-white transition-colors">
<span class="material-symbols-outlined text-[18px]">edit</span>
</button>
<button class="p-1.5 hover:bg-red-500/10 rounded text-text-secondary hover:text-red-400 transition-colors">
<span class="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</div>
</div>
<!-- Role Item 3 (Shipper) -->
<div class="bg-surface-dark border border-border-dark rounded-xl p-4 cursor-pointer hover:border-primary/50 transition-all group relative overflow-hidden">
<div class="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-primary/50 transition-all"></div>
<div class="flex justify-between items-start mb-2">
<h4 class="text-white font-bold text-lg">Shipper</h4>
<span class="bg-gray-500/10 text-gray-400 text-xs px-2 py-1 rounded border border-gray-500/20 font-medium">Disabled</span>
</div>
<p class="text-text-secondary text-sm mb-4 line-clamp-2">Đối tác vận chuyển, chỉ xem thông tin giao nhận.</p>
<div class="flex items-center justify-between pt-2 border-t border-white/5">
<div class="flex -space-x-2">
<div class="size-6 rounded-full border border-surface-dark bg-orange-500" data-alt="avatar"></div>
</div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 hover:bg-white/10 rounded text-text-secondary hover:text-white transition-colors">
<span class="material-symbols-outlined text-[18px]">edit</span>
</button>
<button class="p-1.5 hover:bg-red-500/10 rounded text-text-secondary hover:text-red-400 transition-colors">
<span class="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</div>
</div>
</div>
<!-- RIGHT COLUMN: Permission Matrix -->
<div class="lg:col-span-8 flex flex-col gap-4">
<div class="flex items-center justify-between px-1">
<h3 class="text-sm uppercase font-bold text-text-secondary tracking-wider">Chi tiết phân quyền: <span class="text-white">Staff</span></h3>
<button class="text-xs text-primary hover:text-primary-hover font-medium underline">Đặt lại mặc định</button>
</div>
<div class="bg-surface-dark border border-border-dark rounded-xl shadow-lg overflow-hidden flex flex-col">
<!-- Matrix Header -->
<div class="grid grid-cols-12 gap-4 p-5 bg-[#1e2736] border-b border-border-dark text-xs font-bold text-text-secondary uppercase tracking-wider">
<div class="col-span-4">Module</div>
<div class="col-span-2 text-center">Xem</div>
<div class="col-span-2 text-center">Thêm</div>
<div class="col-span-2 text-center">Sửa</div>
<div class="col-span-2 text-center">Xóa</div>
</div>
<!-- Matrix Body -->
<div class="divide-y divide-border-dark">
<!-- Row 1: Dashboard -->
<div class="grid grid-cols-12 gap-4 p-5 items-center hover:bg-white/5 transition-colors">
<div class="col-span-4 flex items-center gap-3">
<span class="material-symbols-outlined text-text-secondary">dashboard</span>
<div class="flex flex-col">
<span class="text-white font-medium text-sm">Dashboard</span>
<span class="text-xs text-text-secondary">Tổng quan hệ thống</span>
</div>
</div>
<div class="col-span-2 flex justify-center"><input checked="" class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#181d27] text-gray-500 opacity-30 cursor-not-allowed size-5" disabled="" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#181d27] text-gray-500 opacity-30 cursor-not-allowed size-5" disabled="" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#181d27] text-gray-500 opacity-30 cursor-not-allowed size-5" disabled="" type="checkbox"/></div>
</div>
<!-- Row 2: Products -->
<div class="grid grid-cols-12 gap-4 p-5 items-center hover:bg-white/5 transition-colors bg-primary/5">
<div class="col-span-4 flex items-center gap-3">
<span class="material-symbols-outlined text-text-secondary">inventory_2</span>
<div class="flex flex-col">
<span class="text-white font-medium text-sm">Sản phẩm</span>
<span class="text-xs text-text-secondary">Quản lý kho hàng</span>
</div>
</div>
<div class="col-span-2 flex justify-center"><input checked="" class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input checked="" class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input checked="" class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
</div>
<!-- Row 3: Orders -->
<div class="grid grid-cols-12 gap-4 p-5 items-center hover:bg-white/5 transition-colors">
<div class="col-span-4 flex items-center gap-3">
<span class="material-symbols-outlined text-text-secondary">shopping_bag</span>
<div class="flex flex-col">
<span class="text-white font-medium text-sm">Đơn hàng</span>
<span class="text-xs text-text-secondary">Xử lý đơn hàng</span>
</div>
</div>
<div class="col-span-2 flex justify-center"><input checked="" class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input checked="" class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#181d27] text-gray-500 opacity-30 cursor-not-allowed size-5" disabled="" type="checkbox"/></div>
</div>
<!-- Row 4: Customers -->
<div class="grid grid-cols-12 gap-4 p-5 items-center hover:bg-white/5 transition-colors">
<div class="col-span-4 flex items-center gap-3">
<span class="material-symbols-outlined text-text-secondary">group</span>
<div class="flex flex-col">
<span class="text-white font-medium text-sm">Khách hàng</span>
<span class="text-xs text-text-secondary">Thông tin người dùng</span>
</div>
</div>
<div class="col-span-2 flex justify-center"><input checked="" class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
</div>
<!-- Row 5: Roles -->
<div class="grid grid-cols-12 gap-4 p-5 items-center hover:bg-white/5 transition-colors opacity-60">
<div class="col-span-4 flex items-center gap-3">
<span class="material-symbols-outlined text-text-secondary">verified_user</span>
<div class="flex flex-col">
<span class="text-white font-medium text-sm">Phân quyền</span>
<span class="text-xs text-text-secondary">Quản trị roles</span>
</div>
</div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
<div class="col-span-2 flex justify-center"><input class="rounded border-border-dark bg-[#2a3447] text-primary focus:ring-0 focus:ring-offset-0 size-5 cursor-pointer" type="checkbox"/></div>
</div>
</div>
<!-- Action Footer -->
<div class="p-4 bg-[#1e2736] border-t border-border-dark flex justify-end gap-3 sticky bottom-0">
<button class="px-5 py-2.5 rounded-lg border border-border-dark text-white text-sm font-medium hover:bg-white/5 transition-colors">
                                    Hủy bỏ
                                </button>
<button class="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-blue-900/50 hover:bg-primary-hover transition-colors">
                                    Lưu thay đổi
                                </button>
</div>
</div>
</div>
</div>
</div>
</div>
