<svelte:head>
  <title>Quên mật khẩu - TT STORE</title>
</svelte:head>

<main class="flex-grow flex items-center justify-center p-4 py-12 relative overflow-hidden">
<!-- Abstract Background Elements -->
<div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
<div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
<div class="layout-content-container flex flex-col w-full max-w-[480px] z-10">
<!-- Auth Card -->
<div class="bg-surface-dark border border-border-dark rounded-xl shadow-2xl overflow-hidden p-8 sm:p-10">
<!-- Heading -->
<div class="flex flex-col gap-4 mb-8 text-center">
<div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary mb-2">
<span class="material-symbols-outlined text-4xl">lock_reset</span>
</div>
<h1 class="text-white tracking-tight text-[32px] font-bold leading-tight">Quên mật khẩu?</h1>
<p class="text-[#92a4c9] text-base font-normal leading-relaxed">
                        Đừng lo lắng. Vui lòng nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu cho bạn.
                    </p>
</div>
<!-- Form -->
<form action="#" class="flex flex-col gap-6" method="POST">
<!-- Email Input -->
<label class="flex flex-col gap-2">
<span class="text-white text-sm font-semibold leading-normal">Email</span>
<div class="relative">
<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#92a4c9]">
<span class="material-symbols-outlined text-[20px]">mail</span>
</div>
<input class="form-input flex w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary/50 focus:outline-none h-12 placeholder:text-[#586380] pl-11 pr-4 text-base font-normal leading-normal transition-all" placeholder="vidu@email.com" required="" type="email" value=""/>
</div>
</label>
<!-- Submit Button -->
<button class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-blue-600 active:scale-[0.98] transition-all text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/25" type="button">
<span class="truncate">Gửi liên kết xác nhận</span>
</button>
<!-- Back Link -->
<div class="flex justify-center mt-2">
<a class="group flex items-center gap-2 text-[#92a4c9] hover:text-white transition-colors text-sm font-medium" href="#">
<span class="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            Quay lại Đăng nhập
                        </a>
</div>
</form>
</div>
<!-- Quick Links below card -->
<div class="flex justify-center gap-6 mt-8 text-sm text-[#586380]">
<a class="hover:text-[#92a4c9] transition-colors" href="#">Trợ giúp</a>
<span class="w-px h-4 bg-[#324467]"></span>
<a class="hover:text-[#92a4c9] transition-colors" href="#">Điều khoản</a>
</div>
</div>
</main>
