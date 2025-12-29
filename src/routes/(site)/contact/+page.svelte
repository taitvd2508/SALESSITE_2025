<svelte:head>
  <title>TT STORE - Liên Hệ</title>
</svelte:head>

<main
  class="flex flex-col items-center flex-grow w-full px-4 py-8 md:py-12 md:px-10"
>
  <div class="w-full max-w-[1120px] flex flex-col gap-10">
    <!-- Page Heading -->
    <div
      class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200 dark:border-[#232f48]"
    >
      <div class="max-w-2xl">
        <h1
          class="mb-4 text-3xl font-black tracking-tight md:text-5xl text-slate-900 dark:text-white"
        >
          Liên hệ TT STORE
        </h1>
        <p
          class="text-slate-500 dark:text-[#92a4c9] text-base md:text-lg leading-relaxed"
        >
          Chúng tôi luôn sẵn sàng lắng nghe bạn. Hãy để lại tin nhắn hoặc ghé
          thăm showroom để trải nghiệm sản phẩm công nghệ đỉnh cao.
        </p>
      </div>
      <div class="hidden md:block">
        <span
          class="text-6xl material-symbols-outlined text-primary opacity-20 rotate-12"
          >support_agent</span
        >
      </div>
    </div>
    <!-- Content Grid -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
      <!-- Left Column: Contact Info -->
      <div class="flex flex-col gap-8 lg:col-span-5">
        <div
          class="bg-white dark:bg-[#151c2b] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-[#232f48] shadow-sm"
        >
          <h3
            class="flex items-center gap-2 mb-6 text-xl font-bold text-slate-900 dark:text-white"
          >
            <span class="material-symbols-outlined text-primary">store</span>
            Thông tin liên hệ
          </h3>
          <div class="flex flex-col gap-6">
            <div class="flex gap-4">
              <div
                class="flex items-center justify-center rounded-full shrink-0 size-10 bg-primary/10 text-primary"
              >
                <span class="text-xl material-symbols-outlined"
                  >location_on</span
                >
              </div>
              <div>
                <p
                  class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#92a4c9] mb-1"
                >
                  Địa chỉ
                </p>
                <p class="font-medium text-slate-800 dark:text-white">
                  123 Đường Công Nghệ, Quận 1, TP. HCM
                </p>
              </div>
            </div>
            <div class="flex gap-4">
              <div
                class="flex items-center justify-center rounded-full shrink-0 size-10 bg-primary/10 text-primary"
              >
                <span class="text-xl material-symbols-outlined">call</span>
              </div>
              <div>
                <p
                  class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#92a4c9] mb-1"
                >
                  Hotline
                </p>
                <a
                  class="font-medium transition-colors text-slate-800 dark:text-white hover:text-primary"
                  href="tel:19001234">1900 1234</a
                >
              </div>
            </div>
            <div class="flex gap-4">
              <div
                class="flex items-center justify-center rounded-full shrink-0 size-10 bg-primary/10 text-primary"
              >
                <span class="text-xl material-symbols-outlined">mail</span>
              </div>
              <div>
                <p
                  class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#92a4c9] mb-1"
                >
                  Email
                </p>
                <a
                  class="font-medium transition-colors text-slate-800 dark:text-white hover:text-primary"
                  href="mailto:support@ttstore.vn">support@ttstore.vn</a
                >
              </div>
            </div>
            <div class="flex gap-4">
              <div
                class="flex items-center justify-center rounded-full shrink-0 size-10 bg-primary/10 text-primary"
              >
                <span class="text-xl material-symbols-outlined">schedule</span>
              </div>
              <div>
                <p
                  class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#92a4c9] mb-1"
                >
                  Giờ mở cửa
                </p>
                <p class="font-medium text-slate-800 dark:text-white">
                  09:00 - 21:00 (Hàng ngày)
                </p>
              </div>
            </div>
          </div>
          <!-- Divider -->
          <div class="h-px w-full bg-gray-100 dark:bg-[#232f48] my-8"></div>
          <!-- Social Media -->
          <div>
            <p class="mb-4 text-sm font-medium text-slate-900 dark:text-white">
              Theo dõi chúng tôi
            </p>
            <div class="flex gap-3">
              <a
                class="size-10 rounded-lg bg-gray-50 dark:bg-[#232f48] flex items-center justify-center text-slate-600 dark:text-white hover:bg-primary hover:text-white transition-all duration-300"
                href="#"
              >
                <!-- Replace specific icon with generic social icon for flexibility -->
                <span class="material-symbols-outlined">public</span>
              </a>
              <a
                class="size-10 rounded-lg bg-gray-50 dark:bg-[#232f48] flex items-center justify-center text-slate-600 dark:text-white hover:bg-primary hover:text-white transition-all duration-300"
                href="#"
              >
                <span class="material-symbols-outlined">play_circle</span>
              </a>
              <a
                class="size-10 rounded-lg bg-gray-50 dark:bg-[#232f48] flex items-center justify-center text-slate-600 dark:text-white hover:bg-primary hover:text-white transition-all duration-300"
                href="#"
              >
                <span class="material-symbols-outlined">thumb_up</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Right Column: Contact Form -->
      <div class="lg:col-span-7">
        <form
          class="bg-white dark:bg-[#151c2b] p-6 md:p-10 rounded-2xl border border-gray-100 dark:border-[#232f48] shadow-lg shadow-gray-200/50 dark:shadow-none flex flex-col gap-6"
        >
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
            Gửi tin nhắn
          </h3>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label class="flex flex-col gap-2">
              <span
                class="text-sm font-medium text-slate-700 dark:text-gray-300"
                >Họ và tên</span
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <span
                    class="material-symbols-outlined text-gray-400 text-[20px]"
                    >person</span
                  >
                </div>
                <input
                  class="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-[#192233] border border-gray-200 dark:border-[#324467] text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-[#92a4c9] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Nhập họ tên của bạn"
                  type="text"
                />
              </div>
            </label>
            <label class="flex flex-col gap-2">
              <span
                class="text-sm font-medium text-slate-700 dark:text-gray-300"
                >Email</span
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <span
                    class="material-symbols-outlined text-gray-400 text-[20px]"
                    >email</span
                  >
                </div>
                <input
                  class="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-[#192233] border border-gray-200 dark:border-[#324467] text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-[#92a4c9] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="example@email.com"
                  type="email"
                />
              </div>
            </label>
          </div>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label class="flex flex-col gap-2">
              <span
                class="text-sm font-medium text-slate-700 dark:text-gray-300"
                >Số điện thoại</span
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <span
                    class="material-symbols-outlined text-gray-400 text-[20px]"
                    >smartphone</span
                  >
                </div>
                <input
                  class="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-[#192233] border border-gray-200 dark:border-[#324467] text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-[#92a4c9] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="09xxxxxxxxx"
                  type="tel"
                />
              </div>
            </label>
            <label class="flex flex-col gap-2">
              <span
                class="text-sm font-medium text-slate-700 dark:text-gray-300"
                >Vấn đề cần hỗ trợ</span
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <span
                    class="material-symbols-outlined text-gray-400 text-[20px]"
                    >help</span
                  >
                </div>
                <select
                  class="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-[#192233] border border-gray-200 dark:border-[#324467] text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                >
                  <option>Tư vấn sản phẩm</option>
                  <option>Bảo hành &amp; Sửa chữa</option>
                  <option>Góp ý &amp; Khiếu nại</option>
                  <option>Khác</option>
                </select>
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                >
                  <span
                    class="material-symbols-outlined text-gray-400 text-[20px]"
                    >expand_more</span
                  >
                </div>
              </div>
            </label>
          </div>
          <label class="flex flex-col gap-2">
            <span class="text-sm font-medium text-slate-700 dark:text-gray-300"
              >Nội dung tin nhắn</span
            >
            <textarea
              class="w-full p-4 rounded-lg bg-gray-50 dark:bg-[#192233] border border-gray-200 dark:border-[#324467] text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-[#92a4c9] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              placeholder="Nhập nội dung bạn cần hỗ trợ..."
              rows="4"
            ></textarea>
          </label>
          <button
            class="flex items-center self-start justify-center w-full gap-2 px-8 py-3 mt-2 font-bold text-white transition-all duration-300 rounded-lg shadow-lg md:w-auto bg-primary hover:bg-blue-700 shadow-blue-500/20"
            type="button"
          >
            <span class="material-symbols-outlined text-[20px]">send</span>
            Gửi tin nhắn
          </button>
        </form>
      </div>
    </div>
    <!-- Map Section -->
    <div
      class="w-full h-80 md:h-96 rounded-2xl overflow-hidden relative group border border-gray-200 dark:border-[#232f48]"
    >
      <!-- Placeholder Map Image with Overlay -->
      <img
        alt="Dark themed map of Ho Chi Minh City showing the location of TT Store in District 1"
        class="object-cover w-full h-full transition-opacity duration-700 map-grayscale opacity-80 group-hover:opacity-100"
        data-alt="Dark map visualization of city streets"
        data-location="Ho Chi Minh City"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ39FkF8NZJBkIaacHbR0GY9KCXvgXei8oHW9Lz9he8W5MBwTz_ZuyhaUMZNyL-xjnOQUzfcazqrh8jHX2P3mbk3JhDVZzFuU1HW0vEJYRHbNDc9Qziw10FR8wA-qLzJQi6CcEj-zjnVJJEnb3ppL-YWM-9gAHsnskikT0vDMSdkVF3jIiY7pJZ5feqYBF99qbuWuCcwlwCUunFP4Ix1vuzf0B3DD2dmHl0Vkse9_KfHX6zpnAXkY0Nla5Zx45-KWB0HbyIk295g"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#101622] via-transparent to-transparent opacity-60 pointer-events-none"
      ></div>
      <!-- Map Marker Overlay -->
      <div
        class="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      >
        <div class="relative">
          <span
            class="text-5xl material-symbols-outlined text-primary animate-bounce drop-shadow-lg"
            >location_on</span
          >
          <div
            class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/50 blur-sm rounded-[100%]"
          ></div>
        </div>
        <div
          class="mt-2 bg-white dark:bg-[#151c2b] px-4 py-2 rounded-lg shadow-lg border border-gray-100 dark:border-[#324467]"
        >
          <p
            class="text-xs font-bold text-slate-900 dark:text-white whitespace-nowrap"
          >
            TT STORE Showroom
          </p>
        </div>
      </div>
    </div>
  </div>
</main>
