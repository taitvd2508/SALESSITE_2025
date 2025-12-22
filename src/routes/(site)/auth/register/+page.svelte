<svelte:head>
  <title>Đăng ký tài khoản - TT STORE</title>
</svelte:head>

<main class="flex-grow flex justify-center bg-background-dark relative overflow-hidden">
<!-- Background Decor -->
<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
<div class="layout-container flex flex-col w-full max-w-[1200px] px-4 md:px-10 py-10 z-10">
<div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
<!-- Left Column: Form -->
<div class="flex-1 w-full max-w-[640px] mx-auto lg:mx-0">
<!-- Page Heading -->
<div class="mb-8">
<h1 class="text-white text-4xl md:text-5xl font-black tracking-[-0.033em] mb-3">Đăng ký tài khoản</h1>
<p class="text-[#92a4c9] text-lg font-normal">Trải nghiệm mua sắm phụ kiện công nghệ đỉnh cao cùng cộng đồng TT Store.</p>
</div>
<!-- Form -->
<form class="flex flex-col gap-5">
<!-- Name & Email Row -->
<div class="flex flex-col md:flex-row gap-5">
<label class="flex flex-col flex-1">
<span class="text-white text-sm font-medium pb-2">Họ và tên</span>
<div class="relative">
<input class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-4 text-base placeholder:text-[#92a4c9]/50 transition-colors" placeholder="Nguyễn Văn A" type="text"/>
<span class="material-symbols-outlined absolute left-3.5 top-3 text-[#92a4c9]">person</span>
</div>
</label>
<label class="flex flex-col flex-1">
<span class="text-white text-sm font-medium pb-2">Email</span>
<div class="relative">
<input class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-4 text-base placeholder:text-[#92a4c9]/50 transition-colors" placeholder="example@email.com" type="email"/>
<span class="material-symbols-outlined absolute left-3.5 top-3 text-[#92a4c9]">mail</span>
</div>
</label>
</div>
<!-- Password Row -->
<div class="flex flex-col md:flex-row gap-5">
<label class="flex flex-col flex-1">
<span class="text-white text-sm font-medium pb-2">Mật khẩu</span>
<div class="relative">
<input class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-10 text-base placeholder:text-[#92a4c9]/50 transition-colors" placeholder="••••••••" type="password"/>
<span class="material-symbols-outlined absolute left-3.5 top-3 text-[#92a4c9]">lock</span>
<button class="absolute right-3 top-3 text-[#92a4c9] hover:text-white transition-colors" type="button">
<span class="material-symbols-outlined text-[20px]">visibility_off</span>
</button>
</div>
</label>
<label class="flex flex-col flex-1">
<span class="text-white text-sm font-medium pb-2">Xác nhận mật khẩu</span>
<div class="relative">
<input class="w-full rounded-lg text-white border border-[#324467] bg-[#192233] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-10 text-base placeholder:text-[#92a4c9]/50 transition-colors" placeholder="••••••••" type="password"/>
<span class="material-symbols-outlined absolute left-3.5 top-3 text-[#92a4c9]">lock_reset</span>
</div>
</label>
</div>
<!-- Terms Checkbox -->
<div class="py-2">
<label class="flex gap-3 items-start cursor-pointer group">
<div class="relative flex items-center mt-0.5">
<input class="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-[#324467] bg-transparent checked:border-primary checked:bg-primary transition-all hover:border-[#4b6699]" type="checkbox"/>
<span class="material-symbols-outlined pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] text-white opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
</div>
<span class="text-[#92a4c9] text-sm leading-tight group-hover:text-white transition-colors">
                                    Tôi đã đọc và đồng ý với <a class="text-primary hover:text-blue-400 underline" href="#">Điều khoản dịch vụ</a> và <a class="text-primary hover:text-blue-400 underline" href="#">Chính sách bảo mật</a> của TT Store.
                                </span>
</label>
</div>
<!-- Submit Button -->
<button class="w-full bg-primary hover:bg-blue-600 text-white h-12 rounded-lg font-bold text-base tracking-wide transition-all shadow-[0_0_20px_rgba(17,82,212,0.3)] hover:shadow-[0_0_30px_rgba(17,82,212,0.5)] mt-2">
                            Đăng ký tài khoản
                        </button>
<!-- Divider -->
<div class="relative flex items-center py-2">
<div class="flex-grow border-t border-[#324467]"></div>
<span class="flex-shrink-0 mx-4 text-[#92a4c9] text-sm">Hoặc đăng ký bằng</span>
<div class="flex-grow border-t border-[#324467]"></div>
</div>
<!-- Social Login -->
<div class="grid grid-cols-2 gap-4">
<button class="flex items-center justify-center gap-2 h-12 rounded-lg bg-[#232f48] hover:bg-[#2d3b55] border border-[#324467] text-white transition-colors" type="button">
<img alt="Google Logo" class="w-5 h-5" data-alt="Google colorful logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCapaJ1Lk5mMKFR_ISQchzJSV-YHtRI9VbH6uRTM_gPGHq1-Mn3sp8xwcbkW6hVM0qvVFKebkeBWzt633AIqpohlnw9D2LnZE8e0dJnOaE_zDMRFBpX9lMm_TwGwMe39mExu3Bhd2SmhrmAwC_lGFh0bOkE7Rt1omgJJCKAHzmOL2dkw6OMlKnouY44icimepHEhaa0e6maCK8fdFOYAjn12SJjQagXjfkEox0ILpg2LgNZ-jRDD3xF7fV5Oo7FCoXMG_LWr-o5GA"/>
<span class="text-sm font-medium">Google</span>
</button>
<button class="flex items-center justify-center gap-2 h-12 rounded-lg bg-[#232f48] hover:bg-[#2d3b55] border border-[#324467] text-white transition-colors" type="button">
<img alt="Facebook Logo" class="w-5 h-5" data-alt="Facebook colorful logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmXGZ5TvHOpGqI5yozXy1yEUpGnoBF7LrqO_ap4QWkUA9smBgxgPaSxgArp0WuLyfUzeBgeC1ywcJQAbFD0JiYbOSViWNn_vOJ5lJ_pYlOlrDk8TYex3VnLVA1CBB8sJ66JZJOnp38ko99WVLCI3hp1H1qkcdcdJlMWJKr771REoZYC99k2GQyLmKYh67TdpiOirFnmq0SHk9OeEU_A3tJQOQXwZ55qPFOXUQw1HymIPrYg2ZjfA6GPgub8rXi75mPmf9kRjiU3g"/>
<span class="text-sm font-medium">Facebook</span>
</button>
</div>
<!-- Sign In Link -->
<p class="text-center text-[#92a4c9] mt-2">
                            Bạn đã có tài khoản? <a class="text-primary font-bold hover:text-blue-400 transition-colors" href="#">Đăng nhập ngay</a>
</p>
</form>
</div>
<!-- Right Column: Visual / Benefits -->
<div class="hidden lg:flex flex-1 flex-col gap-6 pt-10">
<!-- Feature Card 1 -->
<div class="group relative overflow-hidden rounded-2xl bg-[#192233] border border-[#232f48] p-6 hover:border-[#324467] transition-all">
<div class="flex items-start justify-between mb-4">
<div class="p-3 bg-primary/10 rounded-lg text-primary">
<span class="material-symbols-outlined">workspace_premium</span>
</div>
</div>
<h3 class="text-white text-lg font-bold mb-2">Sản phẩm chính hãng</h3>
<p class="text-[#92a4c9] text-sm leading-relaxed">Cam kết 100% sản phẩm chính hãng từ các thương hiệu công nghệ hàng đầu thế giới.</p>
<div class="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
</div>
<!-- Feature Card 2 -->
<div class="group relative overflow-hidden rounded-2xl bg-[#192233] border border-[#232f48] p-6 hover:border-[#324467] transition-all">
<div class="flex items-start justify-between mb-4">
<div class="p-3 bg-green-500/10 rounded-lg text-green-500">
<span class="material-symbols-outlined">local_shipping</span>
</div>
</div>
<h3 class="text-white text-lg font-bold mb-2">Giao hàng hỏa tốc</h3>
<p class="text-[#92a4c9] text-sm leading-relaxed">Nhận hàng trong vòng 2 giờ tại nội thành Hà Nội và TP.HCM.</p>
<div class="absolute -right-6 -bottom-6 w-32 h-32 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors"></div>
</div>
<!-- Image Banner -->
<div class="relative h-64 w-full rounded-2xl overflow-hidden mt-auto">
<img alt="Tech setup with neon lights" class="object-cover w-full h-full opacity-60 hover:opacity-80 transition-opacity hover:scale-105 duration-700" data-alt="Futuristic gaming setup with pink and blue neon lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG6r2LhoClkEHN-dF6t8kkFxvHM6rVHyGIQ4xnzjwaOpv1pgns4PR8oufOOFZR_Be4iZBtyUb9vMa0npq4ioaQn2aNlMJJth8_59qMVWUJgQOQV9M5GA97a6AmILJb4TdkxvzL7t0eKXER9p3zDVm9ouL2MBLcvRaSi9qs51VXquLIJABkYeulNu-1MPMGuYeg2xwCdrNRyVdCoN5d14hEJwoEqU2RJTtID4Zrb4RwW4WLg1B_EbQW93ydNNnITCvlNzdTZhUN3Q"/>
<div class="absolute inset-0 bg-gradient-to-t from-[#101622] to-transparent"></div>
<div class="absolute bottom-6 left-6 right-6">
<p class="text-white font-medium text-sm">"Nâng tầm không gian làm việc của bạn với TT Store"</p>
</div>
</div>
</div>
</div>
</div>
</main>
