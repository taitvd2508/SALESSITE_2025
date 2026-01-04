<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase/client';

  export let data: any;
  export let form: any;

  const BUCKET = 'products';

  let product = data?.product;
  let localPreviews: string[] = [];

  //form fields
  let name = product?.name ?? '';
  let slug = product?.slug ?? '';
  let brand = product?.brand ?? '';
  let type = product?.type ?? '';
  let price: any = product?.price ?? '';
  let old_price: any = product?.old_price ?? '';
  let quantity: any = product?.quantity ?? 0;
  let description = product?.description ?? '';
  let active: boolean = product?.active ?? true;

  let images: string[] = Array.isArray(product?.images)
    ? [...product.images]
    : [];
  let newImageUrl = '';

  //upload state
  let files: FileList | null = null;
  let uploading = false;
  let uploadError = '';
  let uploadOk = '';

  const slugify = (input: string, maxLen = 80) => {
    const s = (input ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') //\u0300 – \u036f: Unicode Combining Diacritical Marks: các ký tự dấu: sắc, huyền, hỏi, ngã, nặng...
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    return s.length > maxLen ? s.slice(0, maxLen).replace(/-+$/g, '') : s;
  };

  const typeFolder = () => slugify(type || 'other', 40) || 'other';
  const brandFolder = () => slugify(brand || 'other', 40) || 'other';

  const getExt = (f: File) => {
    const byName = f.name.split('.').pop()?.toLowerCase();
    if (byName && byName.length <= 5) return byName;
    const map: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
    };
    return map[f.type] ?? 'png';
  };

  const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  function addImageUrl() {
    const url = (newImageUrl ?? '').trim();
    if (!url) return;
    images = [...images, url];
    newImageUrl = '';
  }

  function removeImage(idx: number) {
    images = images.filter((_, i) => i !== idx);
  }

  async function uploadSelectedFiles() {
    uploadError = '';
    uploadOk = '';
    if (!files || files.length === 0) {
      uploadError = 'Bạn chưa chọn file ảnh.';
      return;
    }
    if (!type || !slug) {
      uploadError =
        'Vui lòng nhập Type và Slug trước khi upload (để đặt đúng tên file).';
      return;
    }

    uploading = true;
    try {
      const prefix = `${slug}-`;
      const existingCount = images.filter((u) => u.includes(prefix)).length;

      let added: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const f = files.item(i);
        if (!f) continue;
        if (!f.type.startsWith('image/')) continue;

        const ext = getExt(f);
        const idx = existingCount + i + 1;
        const fileName = `${slug}-${pad2(idx)}.${ext}`;

        const objectKey = `products/${typeFolder()}/${brandFolder()}/${fileName}`;

        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(objectKey, f, {
            upsert: true,
            contentType: f.type,
            cacheControl: '3600',
          });

        if (upErr) throw upErr;

        const { data: pub } = supabase.storage
          .from(BUCKET)
          .getPublicUrl(objectKey);
        if (pub?.publicUrl) {
          added.push(`${pub.publicUrl}?v=${Date.now()}`);
        }
      }

      if (added.length === 0) {
        uploadError = 'Không có ảnh hợp lệ để upload.';
      } else {
        images = [...images, ...added];
        localPreviews.forEach((u) => URL.revokeObjectURL(u));
        localPreviews = [];
        files = null;

        //reset luôn input để lần sau chọn lại cùng file vẫn trigger change
        const el = document.getElementById(
          'fileInputEdit'
        ) as HTMLInputElement | null;
        if (el) el.value = '';

        uploadOk = `Đã upload ${added.length} ảnh.`;
      }

      files = null;
      const el = document.getElementById(
        'fileInputEdit'
      ) as HTMLInputElement | null;
      if (el) el.value = '';
    } catch (e: any) {
      uploadError = e?.message ?? 'Upload thất bại';
    } finally {
      uploading = false;
    }
  }

  //enhance() – biến form submit thành “AJAX submit”
  //Luồng thật khi bấm submit với use:enhance:
  //1. SvelteKit chặn reload trang (không refresh full page).
  //2. Nó gửi POST lên actions.update trong +page.server.ts.
  //3. Server trả response (success/fail).
  //4. Client nhận response đó dưới tên result.
  //- applyAction(result) làm nhiệm vụ:
  //1. Lấy data server trả về (ví dụ { ok: true, message: ... } hoặc { message: ... })
  //2. “áp” nó vào prop form của trang (cái đang dùng ở UI: form?.message, form.ok)
  //Tóm gọn: server trả { ok, message } → client nhận result → applyAction(result) cập nhật form → UI hiện message
  const enhanceUpdate = (node: HTMLFormElement) =>
    enhance(node, () => {
      return async ({ result, update }) => {
        //applyAction để cập nhật form.message / form errors
        await applyAction(result);
        //Không reset form + đừng invalidateAll mặc định
        await update({ reset: false, invalidateAll: false });
      };
    });

  //Này sẽ bị reset form sau khi submit bởi vì:
  //1. update() (mặc định) thường sẽ reset form HTML sau submit
  //- Form reset => input quay về “default value” của DOM
  //- Vì input của không có default value attribute đúng, nên nó về rỗng → thấy bị xóa
  //2. invalidateAll() làm rerun load hàng loạt → trang refetch lại → dễ làm “mất trạng thái đang nhập” (vì  đang dùng biến local)
  const enhanceToggle = (node: HTMLFormElement) =>
    enhance(node, () => {
      //return async ({ result, update }) => {
      //  await update(); //cập nhật biến form (để hiện message ok/error)
      //  await applyAction(result);
      //  await invalidateAll();
      //};
      return async ({ result, update }) => {
        await applyAction(result);
        await update({ reset: false, invalidateAll: false });
      };
    });

  function onFileChange(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    files = input.files;

    //clear preview cũ để tránh leak
    localPreviews.forEach((u) => URL.revokeObjectURL(u));
    localPreviews = [];

    if (files?.length) {
      localPreviews = Array.from(files).map((f) => URL.createObjectURL(f));
    }
  }
</script>

<div class="mx-auto w-full max-w-[1100px] px-4 md:px-10 py-10">
  <div class="flex items-center justify-between gap-3 mb-6">
    <div>
      <h1 class="text-2xl font-black text-white md:text-3xl">Sửa sản phẩm</h1>
      <p class="text-[#92a4c9] text-sm mt-1">
        ID: #{product?.id} • Cập nhật thông tin & ảnh.
      </p>
    </div>

    <div class="flex items-center gap-2">
      <button
        type="button"
        class="h-10 px-4 rounded-lg border border-[#232f48] text-white hover:bg-[#232f48] transition-colors"
        on:click={() => goto('/admin/products')}
      >
        Quay lại
      </button>

      <form method="POST" action="?/toggleActive" use:enhanceToggle>
        <button
          class="h-10 px-4 rounded-lg border border-[#232f48] text-white hover:bg-[#232f48] transition-colors"
          type="submit"
        >
          {active ? 'Ẩn sản phẩm' : 'Kích hoạt'}
        </button>
      </form>
    </div>
  </div>

  {#if form?.message}
    <div
      class="px-4 py-3 text-sm border text-emerald-200 rounded-xl border-emerald-500/40 bg-emerald-500/10"
    >
      {form.message}
    </div>
  {/if}

  {#if form?.error}
    <div
      class="px-4 py-3 text-sm text-red-200 border rounded-xl border-red-500/40 bg-red-500/10"
    >
      {form.error}
    </div>
  {/if}

  <form
    method="POST"
    action="?/update"
    use:enhanceUpdate
    class="grid grid-cols-1 gap-6 lg:grid-cols-3"
  >
    <!-- LEFT -->
    <div
      class="lg:col-span-2 bg-[#0f1623] border border-[#232f48] rounded-2xl p-6"
    >
      <input type="hidden" name="active" value={String(active)} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Tên sản phẩm</label>
          <input
            class="h-12 rounded-xl bg-[#111a2a] border border-[#232f48] text-white px-4 outline-none focus:border-primary"
            name="name"
            bind:value={name}
            required
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Slug</label>
          <input
            class="h-12 rounded-xl bg-[#111a2a] border border-[#232f48] text-white px-4 outline-none focus:border-primary"
            name="slug"
            bind:value={slug}
            required
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Brand</label>
          <input
            class="h-12 rounded-xl bg-[#111a2a] border border-[#232f48] text-white px-4 outline-none focus:border-primary"
            name="brand"
            bind:value={brand}
            required
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Type</label>
          <input
            class="h-12 rounded-xl bg-[#111a2a] border border-[#232f48] text-white px-4 outline-none focus:border-primary"
            name="type"
            bind:value={type}
            required
          />
          <p class="text-xs text-[#92a4c9]">
            Folder upload: <b>products/{typeFolder()}</b>
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Giá bán</label>
          <input
            class="h-12 rounded-xl bg-[#111a2a] border border-[#232f48] text-white px-4 outline-none focus:border-primary"
            name="price"
            type="number"
            bind:value={price}
            required
            min="0"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Giá cũ</label>
          <input
            class="h-12 rounded-xl bg-[#111a2a] border border-[#232f48] text-white px-4 outline-none focus:border-primary"
            name="old_price"
            type="number"
            bind:value={old_price}
            min="0"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Số lượng</label>
          <input
            class="h-12 rounded-xl bg-[#111a2a] border border-[#232f48] text-white px-4 outline-none focus:border-primary"
            name="quantity"
            type="number"
            bind:value={quantity}
            min="0"
          />
        </div>

        <div class="flex items-center gap-3 mt-2">
          <button
            type="button"
            class="h-10 px-4 rounded-lg border border-[#232f48] text-white hover:bg-[#232f48] transition-colors"
            on:click={() => (active = !active)}
          >
            Trạng thái: {active ? 'Active' : 'Inactive'}
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-2 mt-6">
        <label class="text-sm font-semibold text-white">Mô tả</label>
        <textarea
          class="min-h-[140px] rounded-xl bg-[#111a2a] border border-[#232f48] text-white px-4 py-3 outline-none focus:border-primary"
          name="description"
          bind:value={description}
        />
      </div>

      <div class="flex items-center gap-3 mt-6">
        <button
          class="h-12 px-6 font-bold text-white transition-colors rounded-xl bg-primary hover:bg-blue-700"
          type="submit"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>

    <!-- RIGHT: IMAGES -->
    <div class="bg-[#0f1623] border border-[#232f48] rounded-2xl p-6">
      <h3 class="text-lg font-black text-white">Ảnh sản phẩm</h3>

      <!-- add URL -->
      <div class="flex gap-2 mt-4">
        <input
          class="h-11 flex-1 rounded-xl bg-[#111a2a] border border-[#232f48] text-white px-4 outline-none focus:border-primary"
          placeholder="Dán URL ảnh..."
          bind:value={newImageUrl}
        />
        <button
          type="button"
          class="h-11 rounded-xl bg-[#232f48] text-white hover:bg-[#2c3a55] transition-colors"
          on:click={addImageUrl}
        >
          <span class="material-symbols-outlined">add</span>
        </button>
      </div>

      <!-- upload files -->
      <div class="mt-4">
        <input
          id="fileInputEdit"
          type="file"
          accept="image/*"
          multiple
          class="block w-full text-sm text-[#92a4c9] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#232f48] file:text-white hover:file:bg-[#2c3a55]"
          on:change={onFileChange}
        />

        <button
          type="button"
          class="w-full mt-3 font-bold text-white transition-colors h-11 rounded-xl bg-primary/90 hover:bg-primary disabled:opacity-60"
          disabled={uploading}
          on:click={uploadSelectedFiles}
        >
          {uploading ? 'Đang upload...' : 'Upload ảnh từ máy'}
        </button>

        {#if uploadError}
          <div
            class="px-4 py-3 mt-3 text-sm text-red-200 border rounded-xl border-red-500/40 bg-red-500/10"
          >
            {uploadError}
          </div>
        {/if}
        {#if uploadOk}
          <div
            class="px-4 py-3 mt-3 text-sm text-green-200 border rounded-xl border-green-500/30 bg-green-500/10"
          >
            {uploadOk}
          </div>
        {/if}
      </div>

      <!-- list -->
      <div class="grid grid-cols-2 gap-3 mt-5">
        <!-- Ảnh vừa chọn từ máy (chưa upload) -->
        {#each localPreviews as p, i}
          <div
            class="relative rounded-xl overflow-hidden border border-[#232f48] bg-[#0b0f16] opacity-80"
            title="Ảnh preview (chưa upload)"
          >
            <img
              src={p}
              alt="preview"
              class="object-cover w-full aspect-square"
            />

            <!-- nút bỏ preview -->
            <button
              type="button"
              class="absolute z-10 flex items-center justify-center text-white transition-colors rounded-lg top-2 right-2 size-8 bg-black/60 hover:bg-red-600"
              on:click|stopPropagation={() => {
                //xoá 1 preview
                URL.revokeObjectURL(localPreviews[i]);
                localPreviews = localPreviews.filter((_, k) => k !== i);

                //nếu muốn xoá luôn file tương ứng thì phải rebuild FileList (khó),
                //nên thường chỉ xoá preview thôi, file vẫn nằm trong input cho tới khi bạn chọn lại.
              }}
              aria-label="Bỏ ảnh preview"
            >
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div
              class="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs text-white bg-black/60"
            >
              Chưa upload
            </div>
          </div>
        {/each}

        <!-- Ảnh đã có URL (đã lưu DB / đã upload) -->
        {#each images as img, idx}
          <div
            class="relative rounded-xl overflow-hidden border border-[#232f48] bg-[#0b0f16]"
          >
            <img
              src={img}
              alt="product"
              class="object-cover w-full aspect-square"
            />
            <button
              type="button"
              class="absolute z-10 flex items-center justify-center text-white transition-colors rounded-lg top-2 right-2 size-8 bg-black/60 hover:bg-red-600"
              on:click|stopPropagation={() => removeImage(idx)}
              aria-label="Xoá ảnh"
            >
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        {/each}
      </div>

      {#if images.length === 0 && localPreviews.length === 0}
        <div class="mt-4 text-[#92a4c9] text-sm">Chưa có ảnh nào.</div>
      {/if}
    </div>
  </form>
</div>
