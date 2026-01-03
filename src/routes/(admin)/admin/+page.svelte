<svelte:head>
  <title>Admin Dashboard TT STORE</title>
</svelte:head>

<<<<<<< HEAD
<div class="flex-1 p-8 overflow-y-auto scroll-smooth">
  <div class="flex flex-col gap-8 max-w-[1400px] mx-auto">
    <!-- KPI STATS -->
    <section class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div
        class="flex flex-col gap-2 p-5 border shadow-sm rounded-xl bg-card-dark border-white/5"
      >
        <div class="flex items-start justify-between">
          <div class="p-2 rounded-lg bg-primary/20 text-primary">
=======
<div class="flex-1 overflow-y-auto p-8 scroll-smooth">
  <div class="flex flex-col gap-8 max-w-[1400px] mx-auto">
    <!-- KPI STATS -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        class="flex flex-col gap-2 rounded-xl p-5 bg-card-dark border border-white/5 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/20 rounded-lg text-primary">
>>>>>>> main
            <span class="material-symbols-outlined">payments</span>
          </div>
          <span
            class="flex items-center text-[#0bda5e] text-xs font-medium bg-[#0bda5e]/10 px-2 py-1 rounded-full"
            >+12%</span
          >
        </div>
        <div class="mt-2">
<<<<<<< HEAD
          <p class="text-sm font-medium text-text-secondary">Doanh thu</p>
          <p class="mt-1 text-2xl font-bold tracking-tight text-white">
=======
          <p class="text-text-secondary text-sm font-medium">Doanh thu</p>
          <p class="text-white text-2xl font-bold tracking-tight mt-1">
>>>>>>> main
            120.000.000 đ
          </p>
        </div>
      </div>
      <div
<<<<<<< HEAD
        class="flex flex-col gap-2 p-5 border shadow-sm rounded-xl bg-card-dark border-white/5"
      >
        <div class="flex items-start justify-between">
          <div class="p-2 rounded-lg bg-primary/20 text-primary">
=======
        class="flex flex-col gap-2 rounded-xl p-5 bg-card-dark border border-white/5 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/20 rounded-lg text-primary">
>>>>>>> main
            <span class="material-symbols-outlined">shopping_cart</span>
          </div>
          <span
            class="flex items-center text-[#0bda5e] text-xs font-medium bg-[#0bda5e]/10 px-2 py-1 rounded-full"
            >+5%</span
          >
        </div>
        <div class="mt-2">
<<<<<<< HEAD
          <p class="text-sm font-medium text-text-secondary">Tổng đơn hàng</p>
          <p class="mt-1 text-2xl font-bold tracking-tight text-white">1.240</p>
        </div>
      </div>
      <div
        class="flex flex-col gap-2 p-5 border shadow-sm rounded-xl bg-card-dark border-white/5"
      >
        <div class="flex items-start justify-between">
          <div class="p-2 rounded-lg bg-primary/20 text-primary">
=======
          <p class="text-text-secondary text-sm font-medium">Tổng đơn hàng</p>
          <p class="text-white text-2xl font-bold tracking-tight mt-1">1.240</p>
        </div>
      </div>
      <div
        class="flex flex-col gap-2 rounded-xl p-5 bg-card-dark border border-white/5 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/20 rounded-lg text-primary">
>>>>>>> main
            <span class="material-symbols-outlined">person_add</span>
          </div>
          <span
            class="flex items-center text-[#0bda5e] text-xs font-medium bg-[#0bda5e]/10 px-2 py-1 rounded-full"
            >+8%</span
          >
        </div>
        <div class="mt-2">
<<<<<<< HEAD
          <p class="text-sm font-medium text-text-secondary">Khách hàng mới</p>
          <p class="mt-1 text-2xl font-bold tracking-tight text-white">85</p>
        </div>
      </div>
      <div
        class="flex flex-col gap-2 p-5 border shadow-sm rounded-xl bg-card-dark border-white/5"
      >
        <div class="flex items-start justify-between">
          <div class="p-2 text-red-500 rounded-lg bg-red-500/20">
=======
          <p class="text-text-secondary text-sm font-medium">Khách hàng mới</p>
          <p class="text-white text-2xl font-bold tracking-tight mt-1">85</p>
        </div>
      </div>
      <div
        class="flex flex-col gap-2 rounded-xl p-5 bg-card-dark border border-white/5 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 bg-red-500/20 rounded-lg text-red-500">
>>>>>>> main
            <span class="material-symbols-outlined">cancel</span>
          </div>
          <span
            class="flex items-center text-[#0bda5e] text-xs font-medium bg-[#0bda5e]/10 px-2 py-1 rounded-full"
            >-1.2%</span
          >
        </div>
        <div class="mt-2">
<<<<<<< HEAD
          <p class="text-sm font-medium text-text-secondary">Tỷ lệ hủy</p>
          <p class="mt-1 text-2xl font-bold tracking-tight text-white">2.4%</p>
=======
          <p class="text-text-secondary text-sm font-medium">Tỷ lệ hủy</p>
          <p class="text-white text-2xl font-bold tracking-tight mt-1">2.4%</p>
>>>>>>> main
        </div>
      </div>
    </section>
    <!-- CHARTS & TOP PRODUCTS -->
<<<<<<< HEAD
    <section class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Revenue Chart -->
      <div
        class="flex flex-col h-full p-6 border lg:col-span-2 bg-card-dark rounded-xl border-white/5"
      >
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-bold text-white">Biểu đồ doanh thu</h3>
            <p class="text-sm text-text-secondary">Thống kê theo tuần</p>
          </div>
          <div class="flex bg-[#111722] rounded-lg p-1">
            <button
              class="px-3 py-1 text-xs font-medium text-white rounded shadow-sm bg-card-dark"
              >Tuần</button
            >
            <button
              class="px-3 py-1 text-xs font-medium rounded text-text-secondary hover:text-white"
=======
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue Chart -->
      <div
        class="lg:col-span-2 bg-card-dark rounded-xl p-6 border border-white/5 flex flex-col h-full"
      >
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-white text-lg font-bold">Biểu đồ doanh thu</h3>
            <p class="text-text-secondary text-sm">Thống kê theo tuần</p>
          </div>
          <div class="flex bg-[#111722] rounded-lg p-1">
            <button
              class="px-3 py-1 rounded text-xs font-medium bg-card-dark text-white shadow-sm"
              >Tuần</button
            >
            <button
              class="px-3 py-1 rounded text-xs font-medium text-text-secondary hover:text-white"
>>>>>>> main
              >Tháng</button
            >
          </div>
        </div>
        <!-- Placeholder Chart Visualization -->
        <div class="relative h-[300px] w-full mt-auto">
          <svg
            class="w-full h-full"
            fill="none"
            preserveaspectratio="none"
            viewbox="0 0 800 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <lineargradient
                gradientunits="userSpaceOnUse"
                id="chartGradient"
                x1="400"
                x2="400"
                y1="0"
                y2="300"
              >
                <stop stop-color="#1152d4" stop-opacity="0.5"></stop>
                <stop offset="1" stop-color="#1152d4" stop-opacity="0"></stop>
              </lineargradient>
            </defs>
            <!-- Grid lines -->
            <line
              stroke="#334155"
              stroke-width="1"
              x1="0"
              x2="800"
              y1="299"
              y2="299"
            ></line>
            <line
              stroke="#334155"
              stroke-dasharray="4 4"
              stroke-width="1"
              x1="0"
              x2="800"
              y1="225"
              y2="225"
            ></line>
            <line
              stroke="#334155"
              stroke-dasharray="4 4"
              stroke-width="1"
              x1="0"
              x2="800"
              y1="150"
              y2="150"
            ></line>
            <line
              stroke="#334155"
              stroke-dasharray="4 4"
              stroke-width="1"
              x1="0"
              x2="800"
              y1="75"
              y2="75"
            ></line>
            <!-- Area Path -->
            <path
              d="M0 250 C 100 250, 100 120, 200 150 S 300 200, 400 100 S 500 180, 600 140 S 700 80, 800 50 V 300 H 0 Z"
              fill="url(#chartGradient)"
            ></path>
            <!-- Line Path -->
            <path
              d="M0 250 C 100 250, 100 120, 200 150 S 300 200, 400 100 S 500 180, 600 140 S 700 80, 800 50"
              stroke="#1152d4"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
            ></path>
            <!-- Dots -->
            <circle
              cx="200"
              cy="150"
              fill="#1152d4"
              r="4"
              stroke="#101622"
              stroke-width="2"
            ></circle>
            <circle
              cx="400"
              cy="100"
              fill="#1152d4"
              r="4"
              stroke="#101622"
              stroke-width="2"
            ></circle>
            <circle
              cx="600"
              cy="140"
              fill="#1152d4"
              r="4"
              stroke="#101622"
              stroke-width="2"
            ></circle>
            <circle
              cx="800"
              cy="50"
              fill="#1152d4"
              r="4"
              stroke="#101622"
              stroke-width="2"
            ></circle>
          </svg>
        </div>
        <div
<<<<<<< HEAD
          class="flex justify-between px-2 mt-4 text-xs font-medium text-text-secondary"
=======
          class="flex justify-between mt-4 text-xs text-text-secondary font-medium px-2"
>>>>>>> main
        >
          <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span
            >T6</span
          ><span>T7</span><span>CN</span>
        </div>
      </div>
      <!-- Top Products -->
      <div
<<<<<<< HEAD
        class="flex flex-col h-full p-6 border bg-card-dark rounded-xl border-white/5"
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-white">Top sản phẩm</h3>
          <button class="text-sm font-medium text-primary hover:underline"
            >Xem tất cả</button
          >
        </div>
        <div class="flex flex-col gap-4 pr-1 overflow-y-auto">
=======
        class="bg-card-dark rounded-xl p-6 border border-white/5 flex flex-col h-full"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-white text-lg font-bold">Top sản phẩm</h3>
          <button class="text-primary text-sm font-medium hover:underline"
            >Xem tất cả</button
          >
        </div>
        <div class="flex flex-col gap-4 overflow-y-auto pr-1">
>>>>>>> main
          <!-- Product Item 1 -->
          <div
            class="flex items-center gap-4 p-2 rounded-lg hover:bg-[#111722] transition-colors group cursor-pointer"
          >
            <div
<<<<<<< HEAD
              class="bg-center bg-cover border rounded-lg size-12 shrink-0 border-white/10"
=======
              class="size-12 rounded-lg bg-cover bg-center shrink-0 border border-white/10"
>>>>>>> main
              data-alt="Dark mechanical keyboard with RGB lighting"
              style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCldmwC6P6fKZaN7j6manAueafoiKQ8uJEs-Esst_RaWhlyjH7TqNRYenSw77T-MaHFNVI6AXe005s8eCYhIHN2vVqzQJ0TDjomNWmEKFZFEx724J_X8ZRk-GvvZNEu-FToUcqdTRze5Ts7QjhtYNV9HSGRXAChjvEf21GW9TT0Zdkcbe408pBEmDUOpvt7t7iumq5AuVEy3DUmVFNo_UF4rwbpCU8iXU7u4r1PHHSWya1m5Ondu7huWNVgRo0IPXGEd7SD5a-E1Q');"
            ></div>
            <div class="flex-1 min-w-0">
              <p
<<<<<<< HEAD
                class="text-sm font-medium text-white truncate transition-colors group-hover:text-primary"
              >
                Bàn phím cơ Keychron K2
              </p>
              <p class="text-xs text-text-secondary">2.450.000 đ</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold text-white">128</p>
=======
                class="text-white text-sm font-medium truncate group-hover:text-primary transition-colors"
              >
                Bàn phím cơ Keychron K2
              </p>
              <p class="text-text-secondary text-xs">2.450.000 đ</p>
            </div>
            <div class="text-right">
              <p class="text-white text-sm font-bold">128</p>
>>>>>>> main
              <p class="text-text-secondary text-[10px]">Đã bán</p>
            </div>
          </div>
          <!-- Product Item 2 -->
          <div
            class="flex items-center gap-4 p-2 rounded-lg hover:bg-[#111722] transition-colors group cursor-pointer"
          >
            <div
<<<<<<< HEAD
              class="bg-center bg-cover border rounded-lg size-12 shrink-0 border-white/10"
=======
              class="size-12 rounded-lg bg-cover bg-center shrink-0 border border-white/10"
>>>>>>> main
              data-alt="Wireless gaming mouse on desk"
              style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIKiOq-OBUkA2K-SiLorsa_IDKY8PCDqckb8QZ6E4IdGVvIun1l0yU-H_DCPs5lbaGUeN_w3VboPm7HyiY6csj-xkjsRjW2TjFCdAhUa6TXoN_Qmsj2Q3KXljbY8Ax2IMjxbi7x4ZKZbPn_ix0KL5Gx0dQ7dJa8woGELg7gzw4prsWlBskhuTrHbXjtax9qBs4aNcpQJDrvAyE3tjeUSjjpU1773dGVjeu03_4GQ_qdZShH09Nv8DtDCufWytjkGW3WFT76N3dCw');"
            ></div>
            <div class="flex-1 min-w-0">
              <p
<<<<<<< HEAD
                class="text-sm font-medium text-white truncate transition-colors group-hover:text-primary"
              >
                Logitech MX Master 3
              </p>
              <p class="text-xs text-text-secondary">2.190.000 đ</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold text-white">95</p>
=======
                class="text-white text-sm font-medium truncate group-hover:text-primary transition-colors"
              >
                Logitech MX Master 3
              </p>
              <p class="text-text-secondary text-xs">2.190.000 đ</p>
            </div>
            <div class="text-right">
              <p class="text-white text-sm font-bold">95</p>
>>>>>>> main
              <p class="text-text-secondary text-[10px]">Đã bán</p>
            </div>
          </div>
          <!-- Product Item 3 -->
          <div
            class="flex items-center gap-4 p-2 rounded-lg hover:bg-[#111722] transition-colors group cursor-pointer"
          >
            <div
<<<<<<< HEAD
              class="bg-center bg-cover border rounded-lg size-12 shrink-0 border-white/10"
=======
              class="size-12 rounded-lg bg-cover bg-center shrink-0 border border-white/10"
>>>>>>> main
              data-alt="Noise cancelling headphones"
              style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUxVM-n84oTR_KPoQgtfIX11qa4MS2UUbyO5p1QsrKPclqt03GyjQgf23dEq78gkNs3x9Lzb3YqGkS1X42H9Ubq9LYNjiR1Lgnp9J14RQIQzLpvHXv5E7_IsHAilRwiT7RusezZQX4m6OFm-JLTdiTroMQLHuAc1mYg_6U6msEaOfsskZwaCf2uE02PlksZWDSIgc60cfg1zmNzkgbv_pbc_n9uJ5g3X8xOnRzHIQwJ5gt4g60miWWmU1K1UxFSvAQ-VEefuG5Qw');"
            ></div>
            <div class="flex-1 min-w-0">
              <p
<<<<<<< HEAD
                class="text-sm font-medium text-white truncate transition-colors group-hover:text-primary"
              >
                Sony WH-1000XM4
              </p>
              <p class="text-xs text-text-secondary">6.490.000 đ</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold text-white">64</p>
=======
                class="text-white text-sm font-medium truncate group-hover:text-primary transition-colors"
              >
                Sony WH-1000XM4
              </p>
              <p class="text-text-secondary text-xs">6.490.000 đ</p>
            </div>
            <div class="text-right">
              <p class="text-white text-sm font-bold">64</p>
>>>>>>> main
              <p class="text-text-secondary text-[10px]">Đã bán</p>
            </div>
          </div>
          <!-- Product Item 4 -->
          <div
            class="flex items-center gap-4 p-2 rounded-lg hover:bg-[#111722] transition-colors group cursor-pointer"
          >
            <div
<<<<<<< HEAD
              class="bg-center bg-cover border rounded-lg size-12 shrink-0 border-white/10"
=======
              class="size-12 rounded-lg bg-cover bg-center shrink-0 border border-white/10"
>>>>>>> main
              data-alt="Minimalist wooden laptop stand"
              style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0Z0-lj7ocyMYMLMaV1xpQe9_Vd86LtuLaeMIlUDV6GUuq4rf41k61YVSjRMR9h4Oozwt6EEZNvTwuyqzdv3xDIfr8oKVM5CbG43YUnbqKSl5_17xxtmCXHXcTFFpE2jGbSVOTOomnUssBsEFmw4xLN3wZw_RpJBeTTEW8NuggM1E-joFuBoghJ1zuSJW14uBG32LgBVQjI9-XAqWBhD8uE2OrqAGX0eOV7AFrQ8Eubxz9JGgWVqjJu6nMBnGk7Qm-vU5FblU2jw');"
            ></div>
            <div class="flex-1 min-w-0">
              <p
<<<<<<< HEAD
                class="text-sm font-medium text-white truncate transition-colors group-hover:text-primary"
              >
                Giá đỡ Laptop Nhôm
              </p>
              <p class="text-xs text-text-secondary">450.000 đ</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold text-white">210</p>
=======
                class="text-white text-sm font-medium truncate group-hover:text-primary transition-colors"
              >
                Giá đỡ Laptop Nhôm
              </p>
              <p class="text-text-secondary text-xs">450.000 đ</p>
            </div>
            <div class="text-right">
              <p class="text-white text-sm font-bold">210</p>
>>>>>>> main
              <p class="text-text-secondary text-[10px]">Đã bán</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- RECENT ORDERS TABLE -->
    <section
<<<<<<< HEAD
      class="overflow-hidden border bg-card-dark rounded-xl border-white/5"
=======
      class="bg-card-dark rounded-xl border border-white/5 overflow-hidden"
>>>>>>> main
    >
      <div
        class="p-6 border-b border-[#232f48] flex justify-between items-center"
      >
<<<<<<< HEAD
        <h3 class="text-lg font-bold text-white">Đơn hàng gần đây</h3>
        <button
          class="px-4 py-2 text-sm font-bold text-white transition-colors rounded-lg bg-primary hover:bg-blue-700"
=======
        <h3 class="text-white text-lg font-bold">Đơn hàng gần đây</h3>
        <button
          class="bg-primary hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
>>>>>>> main
        >
          Xuất báo cáo
        </button>
      </div>
      <div class="overflow-x-auto">
<<<<<<< HEAD
        <table class="w-full text-sm text-left whitespace-nowrap">
=======
        <table class="w-full text-left text-sm whitespace-nowrap">
>>>>>>> main
          <thead
            class="bg-[#1a2336] text-text-secondary uppercase text-xs font-semibold"
          >
            <tr>
              <th class="px-6 py-4">Mã đơn hàng</th>
              <th class="px-6 py-4">Khách hàng</th>
              <th class="px-6 py-4">Ngày đặt</th>
              <th class="px-6 py-4">Tổng tiền</th>
              <th class="px-6 py-4">Trạng thái</th>
              <th class="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#232f48]">
            <tr class="hover:bg-[#1a2336] transition-colors">
<<<<<<< HEAD
              <td class="px-6 py-4 font-medium text-white">#ORD-7829</td>
              <td class="px-6 py-4 text-text-secondary">
                <div class="flex items-center gap-3">
                  <div
                    class="flex items-center justify-center text-xs font-bold text-white rounded-full size-8 bg-slate-700"
=======
              <td class="px-6 py-4 text-white font-medium">#ORD-7829</td>
              <td class="px-6 py-4 text-text-secondary">
                <div class="flex items-center gap-3">
                  <div
                    class="size-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-bold"
>>>>>>> main
                  >
                    NH
                  </div>
                  <span>Nguyễn Văn Hùng</span>
                </div>
              </td>
              <td class="px-6 py-4 text-text-secondary">24/05/2023</td>
<<<<<<< HEAD
              <td class="px-6 py-4 font-medium text-white">2.450.000 đ</td>
=======
              <td class="px-6 py-4 text-white font-medium">2.450.000 đ</td>
>>>>>>> main
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500"
                >
                  <span class="size-1.5 rounded-full bg-emerald-500"></span>
                  Hoàn thành
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button
<<<<<<< HEAD
                  class="transition-colors text-text-secondary hover:text-white"
                >
                  <span class="text-lg material-symbols-outlined"
=======
                  class="text-text-secondary hover:text-white transition-colors"
                >
                  <span class="material-symbols-outlined text-lg"
>>>>>>> main
                    >more_vert</span
                  >
                </button>
              </td>
            </tr>
            <tr class="hover:bg-[#1a2336] transition-colors">
<<<<<<< HEAD
              <td class="px-6 py-4 font-medium text-white">#ORD-7830</td>
              <td class="px-6 py-4 text-text-secondary">
                <div class="flex items-center gap-3">
                  <div
                    class="flex items-center justify-center text-xs font-bold text-white bg-purple-700 rounded-full size-8"
=======
              <td class="px-6 py-4 text-white font-medium">#ORD-7830</td>
              <td class="px-6 py-4 text-text-secondary">
                <div class="flex items-center gap-3">
                  <div
                    class="size-8 rounded-full bg-purple-700 flex items-center justify-center text-xs text-white font-bold"
>>>>>>> main
                  >
                    TM
                  </div>
                  <span>Trần Thị Mai</span>
                </div>
              </td>
              <td class="px-6 py-4 text-text-secondary">24/05/2023</td>
<<<<<<< HEAD
              <td class="px-6 py-4 font-medium text-white">4.500.000 đ</td>
=======
              <td class="px-6 py-4 text-white font-medium">4.500.000 đ</td>
>>>>>>> main
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500"
                >
                  <span class="size-1.5 rounded-full bg-amber-500"></span>
                  Vận chuyển
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button
<<<<<<< HEAD
                  class="transition-colors text-text-secondary hover:text-white"
                >
                  <span class="text-lg material-symbols-outlined"
=======
                  class="text-text-secondary hover:text-white transition-colors"
                >
                  <span class="material-symbols-outlined text-lg"
>>>>>>> main
                    >more_vert</span
                  >
                </button>
              </td>
            </tr>
            <tr class="hover:bg-[#1a2336] transition-colors">
<<<<<<< HEAD
              <td class="px-6 py-4 font-medium text-white">#ORD-7831</td>
              <td class="px-6 py-4 text-text-secondary">
                <div class="flex items-center gap-3">
                  <div
                    class="flex items-center justify-center text-xs font-bold text-white bg-blue-700 rounded-full size-8"
=======
              <td class="px-6 py-4 text-white font-medium">#ORD-7831</td>
              <td class="px-6 py-4 text-text-secondary">
                <div class="flex items-center gap-3">
                  <div
                    class="size-8 rounded-full bg-blue-700 flex items-center justify-center text-xs text-white font-bold"
>>>>>>> main
                  >
                    LH
                  </div>
                  <span>Lê Hoàng</span>
                </div>
              </td>
              <td class="px-6 py-4 text-text-secondary">23/05/2023</td>
<<<<<<< HEAD
              <td class="px-6 py-4 font-medium text-white">890.000 đ</td>
=======
              <td class="px-6 py-4 text-white font-medium">890.000 đ</td>
>>>>>>> main
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500"
                >
                  <span class="size-1.5 rounded-full bg-blue-500"></span>
                  Mới
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button
<<<<<<< HEAD
                  class="transition-colors text-text-secondary hover:text-white"
                >
                  <span class="text-lg material-symbols-outlined"
=======
                  class="text-text-secondary hover:text-white transition-colors"
                >
                  <span class="material-symbols-outlined text-lg"
>>>>>>> main
                    >more_vert</span
                  >
                </button>
              </td>
            </tr>
            <tr class="hover:bg-[#1a2336] transition-colors">
<<<<<<< HEAD
              <td class="px-6 py-4 font-medium text-white">#ORD-7832</td>
              <td class="px-6 py-4 text-text-secondary">
                <div class="flex items-center gap-3">
                  <div
                    class="flex items-center justify-center text-xs font-bold text-white bg-pink-700 rounded-full size-8"
=======
              <td class="px-6 py-4 text-white font-medium">#ORD-7832</td>
              <td class="px-6 py-4 text-text-secondary">
                <div class="flex items-center gap-3">
                  <div
                    class="size-8 rounded-full bg-pink-700 flex items-center justify-center text-xs text-white font-bold"
>>>>>>> main
                  >
                    PA
                  </div>
                  <span>Phạm Anh</span>
                </div>
              </td>
              <td class="px-6 py-4 text-text-secondary">22/05/2023</td>
<<<<<<< HEAD
              <td class="px-6 py-4 font-medium text-white">12.000.000 đ</td>
=======
              <td class="px-6 py-4 text-white font-medium">12.000.000 đ</td>
>>>>>>> main
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500"
                >
                  <span class="size-1.5 rounded-full bg-red-500"></span>
                  Đã hủy
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button
<<<<<<< HEAD
                  class="transition-colors text-text-secondary hover:text-white"
                >
                  <span class="text-lg material-symbols-outlined"
=======
                  class="text-text-secondary hover:text-white transition-colors"
                >
                  <span class="material-symbols-outlined text-lg"
>>>>>>> main
                    >more_vert</span
                  >
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</div>
