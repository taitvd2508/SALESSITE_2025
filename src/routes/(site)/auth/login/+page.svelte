<svelte:head>
  <title>Đăng nhập TT STORE</title>
</svelte:head>

<main class="flex flex-1 w-full justify-center">
<div class="layout-content-container flex flex-col md:flex-row w-full max-w-7xl flex-1 overflow-hidden">
<!-- Left Side: Image/Branding (Hidden on mobile) -->
<div class="hidden md:flex md:w-1/2 lg:w-3/5 relative bg-slate-900 items-center justify-center p-8 overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-background-dark to-background-dark z-10"></div>
<!-- Background Image -->
<div class="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay" data-alt="futuristic technology setup with neon lights" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDX783tOa9vcL_Y4f7pxdJPNkmasFPWNIezoEl7x1RcoZ77Q5oBwx2GM_DiJsQh3rE6qVg1PpDGFGhTXFVN6uYs-vg-Sqd1vjK6dtif3Gv20PDROtoeEEGZaVoR2a7XYldFKmBQsXHaOQjm3o9_gIqYXDePSGZPtmLVeTJlH_cw-iq2LVUe2jSoFOuLfCukmrqfjLjNBF6mxLAASb6QXlQJ4BULq2kYc79hXCrfPRH7IMl3rMY01TXrkHdkm6TWc0KKpsqh2mdv3Q");'>
</div>
<div class="relative z-20 max-w-lg text-center md:text-left px-6">
<div class="mb-6 flex justify-center md:justify-start">
<span class="material-symbols-outlined text-primary text-6xl">token</span>
</div>
<h1 class="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                        Trải nghiệm công nghệ đỉnh cao
                    </h1>
<p class="text-slate-300 text-lg leading-relaxed">
                        Khám phá bộ sưu tập phụ kiện premium dành cho người đam mê công nghệ.
                    </p>
</div>
</div>
<!-- Right Side: Login Form -->
<div class="flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-12 lg:px-24 bg-background-light dark:bg-background-dark w-full">
<div class="w-full max-w-[420px] flex flex-col">
<div class="mb-8 text-center md:text-left">
<h2 class="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">Chào mừng trở lại</h2>
<p class="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Nhập thông tin của bạn để truy cập tài khoản.</p>
</div>
<form action="#" class="flex flex-col gap-5">
<!-- Email Input -->
<div class="flex flex-col gap-2">
<label class="text-slate-900 dark:text-white text-sm font-medium leading-normal" for="email">Địa chỉ Email</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
<input class="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a202c] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-normal leading-normal transition-all" id="email" name="email" placeholder="nhapemail@example.com" required="" type="email"/>
</div>
</div>
<!-- Password Input -->
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between">
<label class="text-slate-900 dark:text-white text-sm font-medium leading-normal" for="password">Mật khẩu</label>
<a class="text-primary hover:text-primary/80 text-xs font-medium transition-colors" href="#">Quên mật khẩu?</a>
</div>
<div class="relative group/pass">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
<input class="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a202c] focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-12 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-normal leading-normal transition-all" id="password" name="password" placeholder="••••••••" required="" type="password"/>
<button class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none" type="button">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>
<!-- Submit Button -->
<button class="mt-2 w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold leading-normal tracking-wide transition-all shadow-lg shadow-primary/25 active:scale-[0.98] flex items-center justify-center gap-2" type="submit">
<span>Đăng nhập</span>
<span class="material-symbols-outlined text-sm">login</span>
</button>
</form>
<!-- Divider -->
<div class="relative my-8">
<div aria-hidden="true" class="absolute inset-0 flex items-center">
<div class="w-full border-t border-slate-200 dark:border-slate-800"></div>
</div>
<div class="relative flex justify-center">
<span class="bg-background-light dark:bg-background-dark px-3 text-xs text-slate-500 uppercase tracking-widest">Hoặc tiếp tục với</span>
</div>
</div>
<!-- Social Login -->
<div class="grid grid-cols-2 gap-4">
<button class="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a202c] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-white text-sm font-medium" type="button">
<svg aria-hidden="true" class="h-5 w-5" viewbox="0 0 24 24">
<path d="M12.0003 20.45c-4.6667 0-8.4503-3.7836-8.4503-8.45s3.7836-8.45 8.4503-8.45c2.2818 0 4.3485.8364 5.9636 2.2145l-1.92 1.92c-.9981-.96-2.3781-1.5545-3.9054-1.5545-3.3218 0-6.0218 2.7-6.0218 6.0218s2.7 6.0218 6.0218 6.0218c2.8254 0 5.2909-1.8982 5.8636-4.6255h-5.8636v-2.4272h8.3345c.1255.6163.1855 1.2545.1855 1.92 0 4.7073-3.1582 8.45-8.6582 8.45z" fill="currentColor"></path>
</svg>
<span>Google</span>
</button>
<button class="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a202c] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-white text-sm font-medium" type="button">
<svg aria-hidden="true" class="h-5 w-5 text-[#1877F2]" fill="currentColor" viewbox="0 0 24 24">
<path clip-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill-rule="evenodd"></path>
</svg>
<span>Facebook</span>
</button>
</div>
<!-- Register Link -->
<div class="mt-8 text-center">
<p class="text-sm text-slate-500 dark:text-slate-400">
                            Chưa có tài khoản?
                            <a class="font-bold text-primary hover:text-primary/80 transition-colors" href="#">Đăng ký ngay</a>
</p>
</div>
</div>
</div>
</div>
</main>
