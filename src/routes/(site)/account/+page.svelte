<svelte:head>
  <title>Thông tin cá nhân - TT STORE</title>
</svelte:head>

<main class="flex-1 flex flex-col gap-6">
<!-- Header Card -->
<div class="rounded-xl bg-white dark:bg-[#1b2333] border border-slate-200 dark:border-none shadow-sm p-6 md:p-8">
<div class="flex flex-col gap-2 pb-6 border-b border-slate-100 dark:border-[#232f48]">
<h2 class="text-slate-900 dark:text-white text-2xl font-bold">Hồ sơ của tôi</h2>
<p class="text-slate-500 dark:text-[#92a4c9] text-sm">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
</div>
<div class="flex flex-col-reverse lg:flex-row gap-10 mt-8">
<!-- Form Section -->
<div class="flex-1 flex flex-col gap-6">
<!-- Username (Readonly) -->
<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
<label class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium">Tên đăng nhập</label>
<div class="flex-1 text-slate-900 dark:text-white text-base font-medium">
                                    nguyenvana_ttstore
                                    <span class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Đã xác minh</span>
</div>
</div>
<!-- Name -->
<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
<label class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium">Tên</label>
<input class="flex-1 form-input rounded-lg border-slate-200 dark:border-[#232f48] bg-slate-50 dark:bg-[#232f48] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm h-11 px-4 placeholder:text-slate-400" type="text" value="Nguyễn Văn A"/>
</div>
<!-- Email (Readonly with mask) -->
<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
<label class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium">Email</label>
<div class="flex-1 flex items-center gap-2">
<input class="flex-1 form-input rounded-lg border-none bg-slate-100 dark:bg-[#151b28] text-slate-500 dark:text-[#64748b] text-sm h-11 px-4 cursor-not-allowed" disabled="" type="text" value="ng******@gmail.com"/>
<button class="text-primary text-sm font-medium hover:underline">Thay đổi</button>
</div>
</div>
<!-- Phone -->
<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
<label class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium">Số điện thoại</label>
<div class="flex-1 flex items-center gap-2">
<input class="flex-1 form-input rounded-lg border-slate-200 dark:border-[#232f48] bg-slate-50 dark:bg-[#232f48] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm h-11 px-4 placeholder:text-slate-400" type="text" value="0912345678"/>
<button class="text-primary text-sm font-medium hover:underline">Thay đổi</button>
</div>
</div>
<!-- Address -->
<div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
<label class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium mt-3">Địa chỉ</label>
<textarea class="flex-1 form-textarea rounded-lg border-slate-200 dark:border-[#232f48] bg-slate-50 dark:bg-[#232f48] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm p-4 placeholder:text-slate-400 resize-none" rows="2">Số 123, Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</textarea>
</div>
<!-- Gender -->
<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
<label class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium">Giới tính</label>
<div class="flex gap-6 items-center">
<label class="flex items-center gap-2 cursor-pointer">
<input checked="" class="form-radio text-primary focus:ring-primary bg-transparent border-slate-300 dark:border-slate-500" name="gender" type="radio"/>
<span class="text-slate-900 dark:text-white text-sm">Nam</span>
</label>
<label class="flex items-center gap-2 cursor-pointer">
<input class="form-radio text-primary focus:ring-primary bg-transparent border-slate-300 dark:border-slate-500" name="gender" type="radio"/>
<span class="text-slate-900 dark:text-white text-sm">Nữ</span>
</label>
<label class="flex items-center gap-2 cursor-pointer">
<input class="form-radio text-primary focus:ring-primary bg-transparent border-slate-300 dark:border-slate-500" name="gender" type="radio"/>
<span class="text-slate-900 dark:text-white text-sm">Khác</span>
</label>
</div>
</div>
<!-- Date of Birth -->
<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
<label class="w-full sm:w-32 text-slate-500 dark:text-[#92a4c9] text-sm font-medium">Ngày sinh</label>
<div class="flex gap-2 w-full max-w-sm">
<select class="form-select flex-1 rounded-lg border-slate-200 dark:border-[#232f48] bg-slate-50 dark:bg-[#232f48] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm h-11">
<option>01</option>
<option>02</option>
<option selected="">15</option>
</select>
<select class="form-select flex-1 rounded-lg border-slate-200 dark:border-[#232f48] bg-slate-50 dark:bg-[#232f48] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm h-11">
<option>Tháng 1</option>
<option>Tháng 2</option>
<option selected="">Tháng 8</option>
</select>
<select class="form-select flex-1 rounded-lg border-slate-200 dark:border-[#232f48] bg-slate-50 dark:bg-[#232f48] text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm h-11">
<option>1990</option>
<option>1991</option>
<option selected="">1995</option>
</select>
</div>
</div>
<!-- Save Button -->
<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-4">
<div class="w-full sm:w-32"></div> <!-- Spacer for alignment -->
<button class="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary/30 transition-all active:scale-95 w-full sm:w-auto">
                                    Lưu thay đổi
                                </button>
</div>
</div>
<!-- Avatar Section (Right side on large screens) -->
<div class="flex flex-col items-center gap-4 lg:w-72 lg:border-l border-slate-100 dark:border-[#232f48] lg:pl-10">
<div class="relative group cursor-pointer">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-32 h-32 border-4 border-slate-100 dark:border-[#232f48]" data-alt="Large editable user profile avatar" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3d1wZ5_jrXvZ2Dm7X0LbHZXF1NCstIcQHlaWC4o_aXYZidI5osYzyxA1SQJk_tVqV_hCXm3PDMc-ZNg2rwZZYywTXG8Eeosi2xrpQK2v7T2UN7FYrbwTkPiwuOeZoryl9mIivtqElRzCKjuBSpQdjNpri-XpppMtwlXUAeZu0KZ0y1p3vYBBdL04F5k_nvOdsm5jW4ZAhhVjHaDJO6lt5gcQ99Ddm2ev7r39KgesUVzl5Xr6ouppQszv3TcaV0OU7ol-VQVlT4Q");'></div>
<div class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-white text-[32px]">photo_camera</span>
</div>
</div>
<div class="flex flex-col items-center text-center gap-2">
<button class="px-4 py-2 bg-white dark:bg-[#232f48] border border-slate-200 dark:border-none rounded-lg text-sm font-medium text-slate-700 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-[#34425e] transition-colors">
                                    Chọn ảnh
                                </button>
<div class="text-xs text-slate-400 dark:text-[#64748b]">
<p>Dụng lượng file tối đa 1 MB</p>
<p>Định dạng: .JPEG, .PNG</p>
</div>
</div>
</div>
</div>
</div>
</main>
