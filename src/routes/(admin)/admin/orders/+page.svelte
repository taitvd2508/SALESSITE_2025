<svelte:head>
  <title>Admin - Đơn hàng TT STORE</title>
</svelte:head>

<div class="flex-1 overflow-y-auto p-4 md:p-8">
<div class="max-w-[1400px] mx-auto flex flex-col gap-6">
<!-- Filters & Controls -->
<div class="flex flex-col gap-4">
<!-- Top Row: Status Chips -->
<div class="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
<button class="whitespace-nowrap px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium transition-colors">
                                Tất cả
                            </button>
<button class="whitespace-nowrap px-4 py-2 rounded-lg bg-surface-dark border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 text-sm font-medium transition-all">
                                Chờ xử lý <span class="ml-1 bg-yellow-500/20 text-yellow-500 text-xs px-1.5 py-0.5 rounded">3</span>
</button>
<button class="whitespace-nowrap px-4 py-2 rounded-lg bg-surface-dark border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 text-sm font-medium transition-all">
                                Đang giao <span class="ml-1 bg-blue-500/20 text-blue-500 text-xs px-1.5 py-0.5 rounded">8</span>
</button>
<button class="whitespace-nowrap px-4 py-2 rounded-lg bg-surface-dark border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 text-sm font-medium transition-all">
                                Hoàn thành
                            </button>
<button class="whitespace-nowrap px-4 py-2 rounded-lg bg-surface-dark border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 text-sm font-medium transition-all">
                                Đã hủy
                            </button>
</div>
<!-- Second Row: Advanced Filters -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-surface-dark p-4 rounded-xl border border-gray-800">
<div class="md:col-span-5 lg:col-span-4 flex flex-col gap-1.5">
<label class="text-xs font-medium text-gray-400 ml-1">Tìm kiếm đơn hàng</label>
<div class="relative">
<span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined text-[20px]">search</span>
<input class="w-full bg-background-dark text-white text-sm rounded-lg pl-10 pr-4 py-2.5 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-600" placeholder="Nhập mã đơn, tên khách hàng..." type="text"/>
</div>
</div>
<div class="md:col-span-4 lg:col-span-3 flex flex-col gap-1.5">
<label class="text-xs font-medium text-gray-400 ml-1">Khoảng thời gian</label>
<div class="relative">
<span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined text-[20px]">date_range</span>
<input class="w-full bg-background-dark text-white text-sm rounded-lg pl-10 pr-4 py-2.5 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-600" placeholder="Chọn ngày..." type="text"/>
</div>
</div>
<div class="md:col-span-3 lg:col-span-5 flex justify-end gap-3">
<button class="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-background-dark border border-gray-700 text-white hover:bg-gray-800 transition-colors text-sm font-medium">
<span class="material-symbols-outlined text-[20px]">filter_list</span>
                                    Lọc
                                </button>
<button class="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20 transition-all text-sm font-medium">
<span class="material-symbols-outlined text-[20px]">download</span>
                                    Xuất Excel
                                </button>
</div>
</div>
</div>
<!-- Data Table -->
<div class="bg-surface-dark rounded-xl border border-gray-800 overflow-hidden shadow-xl shadow-black/20">
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-gray-800/50 border-b border-gray-700">
<th class="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[120px]">Mã đơn</th>
<th class="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider min-w-[200px]">Khách hàng</th>
<th class="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[150px]">Ngày tạo</th>
<th class="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[150px]">Thanh toán</th>
<th class="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right w-[150px]">Tổng tiền</th>
<th class="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center w-[160px]">Trạng thái</th>
<th class="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right w-[100px]">Hành động</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-800">
<!-- Row 1 -->
<tr class="group hover:bg-gray-800/40 transition-colors">
<td class="py-4 px-6">
<span class="text-sm font-medium text-primary cursor-pointer hover:underline">#ORD-7782</span>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-3">
<div class="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-gray-700 group-hover:ring-gray-600 transition-all" data-alt="Avatar Nguyen Van A" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxQFAidnH26fwrtOnJFp6WZ0Kp3xUpsQjQM0hvMOqcxCUOABPgBtvPvQTuXWOhZGRNXBUj2EOniugJsK8aCn0EKdyTD3C4aoOZSGcW40EYWL-SGKUmVn8Cp_6SSGsKPpvHpUIzZakawD02UaoxBt7cUyAK_oOylC0a3Tb7Kyh82b7vNprPGyZS885ZhveHndknBYqkCykxgi-5yGof01VmyAFVkrWi7lSrwPaIxTFBU8UzmIyyyYV_4w3MWrW7QBE77cOnjD0ojw');"></div>
<div class="flex flex-col">
<span class="text-sm font-medium text-white">Nguyễn Văn A</span>
<span class="text-xs text-gray-500">098***1234</span>
</div>
</div>
</td>
<td class="py-4 px-6">
<div class="flex flex-col">
<span class="text-sm text-gray-300">20/10/2023</span>
<span class="text-xs text-gray-600">14:30</span>
</div>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-green-500 text-[16px]">check_circle</span>
<span class="text-sm text-gray-300">Đã thanh toán</span>
</div>
<span class="text-xs text-gray-500 block mt-0.5">Momo</span>
</td>
<td class="py-4 px-6 text-right">
<span class="text-sm font-bold text-white">1,250,000 ₫</span>
</td>
<td class="py-4 px-6 text-center">
<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
<span class="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5"></span>
                                                Chờ xử lý
                                            </span>
</td>
<td class="py-4 px-6 text-right">
<button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="group hover:bg-gray-800/40 transition-colors">
<td class="py-4 px-6">
<span class="text-sm font-medium text-primary cursor-pointer hover:underline">#ORD-7781</span>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-3">
<div class="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-gray-700 group-hover:ring-gray-600 transition-all" data-alt="Avatar Tran Thi B" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjksGsJcLzwVwM8x2jX_YjOHM8IUXrh5jgNVpnUtU0-oHMxx6_sKDm5E5JjrF9gzGCRCe8xTpPe41oRBw7u-6kZ5WJd4dhPdvaazELjQc_86t9eRjHd6odw41_hDbwvun4_-95R1MULESBGZGg_yMKr1Gp7ymE1ABHbZo8vG9AkP3vZ3JInEZpUDJQZN4ekI4sVw14OgKp37-d7x0qgn0ch3aw9kQcqRshuknxonjmSLeIEiQOiVoiQ3LvadJGeChsvSGQZcJdHg');"></div>
<div class="flex flex-col">
<span class="text-sm font-medium text-white">Trần Thị B</span>
<span class="text-xs text-gray-500">091***5678</span>
</div>
</div>
</td>
<td class="py-4 px-6">
<div class="flex flex-col">
<span class="text-sm text-gray-300">19/10/2023</span>
<span class="text-xs text-gray-600">09:15</span>
</div>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-gray-500 text-[16px]">schedule</span>
<span class="text-sm text-gray-300">COD</span>
</div>
</td>
<td class="py-4 px-6 text-right">
<span class="text-sm font-bold text-white">560,000 ₫</span>
</td>
<td class="py-4 px-6 text-center">
<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
<span class="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse"></span>
                                                Đang giao
                                            </span>
</td>
<td class="py-4 px-6 text-right">
<button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="group hover:bg-gray-800/40 transition-colors">
<td class="py-4 px-6">
<span class="text-sm font-medium text-primary cursor-pointer hover:underline">#ORD-7780</span>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-3">
<div class="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-gray-700 group-hover:ring-gray-600 transition-all" data-alt="Avatar Le Van C" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvzWtgv6E9ju4mdReUhGjynOAg2v7l0BGJ-711lHcJ6mTmXFXrALyVQ_1JYz6K-J2CAkPEB2qeO9COlaJ-sMvaS9WkkHgyKafhL3pe08E8HeQk6O1x0nh9QCE2JDSSmccbusMtjVM7w4zfXpPJuNL7vmPZ0dlwBYTBsG_4GxRR1f-NBnxtybutgLPxOlsV4CXo_jdl7XGRx0qVEvv2pIudeZW21SwPqKtntdIbsHpbu9lsaB1BLVO5Q7CuCDpdqK108ZE9-l7I4w');"></div>
<div class="flex flex-col">
<span class="text-sm font-medium text-white">Lê Văn C</span>
<span class="text-xs text-gray-500">090***9999</span>
</div>
</div>
</td>
<td class="py-4 px-6">
<div class="flex flex-col">
<span class="text-sm text-gray-300">19/10/2023</span>
<span class="text-xs text-gray-600">08:45</span>
</div>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-green-500 text-[16px]">check_circle</span>
<span class="text-sm text-gray-300">Đã thanh toán</span>
</div>
<span class="text-xs text-gray-500 block mt-0.5">Banking</span>
</td>
<td class="py-4 px-6 text-right">
<span class="text-sm font-bold text-white">2,100,000 ₫</span>
</td>
<td class="py-4 px-6 text-center">
<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
<span class="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                                                Hoàn thành
                                            </span>
</td>
<td class="py-4 px-6 text-right">
<button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<!-- Row 4 -->
<tr class="group hover:bg-gray-800/40 transition-colors">
<td class="py-4 px-6">
<span class="text-sm font-medium text-primary cursor-pointer hover:underline">#ORD-7779</span>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-3">
<div class="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-gray-700 group-hover:ring-gray-600 transition-all" data-alt="Avatar Pham Minh D" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyMEqKq9Hj7i6HJK2q5ABQJ_g-i6KBwjkMvqk3StaPKole0xiPHIGCOs_fH72-BFwbCfZN150EoDO2tsU2yIB3xA7yF_i8LAK5ynSbOnyrtsxvuR2DM85v-ADQ5E9vKumVuWBjNfKzMzqw8Qn6lZn78cl1nuQSHv12LMj-iaCWvZwb856tLpTUy95olenSxUgC-2e5KBHthNxM3w4tb2RYqgGi-UaCqlHgOLWRTnTSTFXgTMMZuoe2fc5pDMiHbHqQoU84nQmqTg');"></div>
<div class="flex flex-col">
<span class="text-sm font-medium text-white">Phạm Minh D</span>
<span class="text-xs text-gray-500">093***2222</span>
</div>
</div>
</td>
<td class="py-4 px-6">
<div class="flex flex-col">
<span class="text-sm text-gray-300">18/10/2023</span>
<span class="text-xs text-gray-600">16:20</span>
</div>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-red-500 text-[16px]">cancel</span>
<span class="text-sm text-gray-300">Chưa thanh toán</span>
</div>
</td>
<td class="py-4 px-6 text-right">
<span class="text-sm font-bold text-white">890,000 ₫</span>
</td>
<td class="py-4 px-6 text-center">
<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
<span class="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
                                                Đã hủy
                                            </span>
</td>
<td class="py-4 px-6 text-right">
<button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<!-- Row 5 -->
<tr class="group hover:bg-gray-800/40 transition-colors">
<td class="py-4 px-6">
<span class="text-sm font-medium text-primary cursor-pointer hover:underline">#ORD-7778</span>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-3">
<div class="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-gray-700 group-hover:ring-gray-600 transition-all" data-alt="Avatar Hoang Anh E" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcKq4AGzov9JhelQnVLFhjdUMHT9EXDsbZZdkVMdhykJ9BajP0Ec1XuUv8Ieln7nQRdXsFAD1VOdCsrycdWOMg8Mxyb5_4cEF5o3YlJLdEFN5nBKjcwmTnR4Nn_z-aFpvD0S6r1wU_zPlvTBulPnBDz-zeKlYHGDKlyiSIqodskr6j1q2lzVkNa0peYLgJzbVJVucCs3JS02WUaM0fiIamHfD-zTWhnfMV6pCSjmm3fAY404il3zDF7le8ZGQfPRPSJByETwjXiA');"></div>
<div class="flex flex-col">
<span class="text-sm font-medium text-white">Hoàng Anh E</span>
<span class="text-xs text-gray-500">097***8888</span>
</div>
</div>
</td>
<td class="py-4 px-6">
<div class="flex flex-col">
<span class="text-sm text-gray-300">18/10/2023</span>
<span class="text-xs text-gray-600">10:05</span>
</div>
</td>
<td class="py-4 px-6">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-green-500 text-[16px]">check_circle</span>
<span class="text-sm text-gray-300">Đã thanh toán</span>
</div>
<span class="text-xs text-gray-500 block mt-0.5">VISA</span>
</td>
<td class="py-4 px-6 text-right">
<span class="text-sm font-bold text-white">3,450,000 ₫</span>
</td>
<td class="py-4 px-6 text-center">
<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
<span class="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                                                Hoàn thành
                                            </span>
</td>
<td class="py-4 px-6 text-right">
<button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination -->
<div class="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
<span class="text-sm text-gray-400">
                                Hiển thị <span class="font-medium text-white">1</span> đến <span class="font-medium text-white">5</span> của <span class="font-medium text-white">128</span> kết quả
                            </span>
<div class="flex items-center gap-2">
<button class="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-50">
<span class="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<button class="h-8 w-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium">1</button>
<button class="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-sm">2</button>
<button class="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-sm">3</button>
<span class="text-gray-500">...</span>
<button class="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-sm">25</button>
<button class="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
<span class="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</div>
