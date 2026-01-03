<script lang="ts">
  export let data: any;
  export let form: any;

  let name = '';
  let slug = '';
  let brand = '';
  let type = '';
  let price: any = '';
  let old_price: any = '';
  let quantity: any = 0;
  let description = '';

  // URL images (dán link)
  let images: string[] = [];
  let imageInput = '';

  // File upload
  let filePreviews: { url: string; name: string }[] = [];

  function addImageUrl() {
    const url = (imageInput ?? '').trim();
    if (!url) return;
    if (!images.includes(url)) images = [...images, url];
    imageInput = '';
  }

  function removeImageUrl(i: number) {
    images = images.filter((_, idx) => idx !== i);
  }

  function onPickFiles(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    // preview
    filePreviews = files.map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
  }

  function removePreview(i: number) {
    const keep = filePreviews.filter((_, idx) => idx !== i);
    filePreviews = keep;
    // NOTE: không thể “xóa 1 file” khỏi input.files một cách chuẩn trong browser.
    // Nếu cần xóa từng file thật sự: làm custom uploader (drag-drop) + submit bằng fetch.
  }
</script>

<div class="mx-auto w-full max-w-[1100px] px-4 md:px-10 py-8">
  <div class="flex items-center justify-between gap-3 mb-6">
    <div>
      <h1 class="text-2xl font-black text-white md:text-3xl">Thêm sản phẩm</h1>
      <p class="text-[#92a4c9] text-sm mt-1">
        Thêm mới sản phẩm (URL ảnh hoặc upload ảnh lên bucket).
      </p>
    </div>

    <a
      href="/admin/products"
      class="inline-flex items-center gap-2 px-4 h-11 rounded-xl border border-[#232f48] text-white hover:bg-[#232f48] transition-colors"
    >
      <span class="material-symbols-outlined text-[20px]">arrow_back</span>
      Quay lại
    </a>
  </div>

  {#if form?.message}
    <div
      class="px-4 py-3 mb-5 text-sm text-red-200 border rounded-xl border-red-500/40 bg-red-500/10"
    >
      {form.message}
    </div>
  {/if}

  <form
    method="POST"
    action="?/create"
    enctype="multipart/form-data"
    class="grid grid-cols-1 gap-6 lg:grid-cols-3"
  >
    <!-- LEFT -->
    <div
      class="lg:col-span-2 bg-[#111722] border border-[#232f48] rounded-2xl p-5"
    >
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Tên sản phẩm *</label>
          <input
            class="h-12 rounded-xl px-4 bg-[#0b0f16] border border-[#232f48] text-white outline-none focus:border-primary"
            name="name"
            bind:value={name}
            placeholder="VD: Bàn phím Logitech MX Keys"
            required
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white"
            >Slug (có thể để trống)</label
          >
          <input
            class="h-12 rounded-xl px-4 bg-[#0b0f16] border border-[#232f48] text-white outline-none focus:border-primary"
            name="slug"
            bind:value={slug}
            placeholder="VD: ban-phim-logitech-mx-keys"
          />
          <p class="text-xs text-[#92a4c9]">
            Nếu để trống, server sẽ dùng <b>name</b> để tạo slug (trigger sẽ tự unique).
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Thương hiệu *</label>
          <input
            class="h-12 rounded-xl px-4 bg-[#0b0f16] border border-[#232f48] text-white outline-none focus:border-primary"
            name="brand"
            bind:value={brand}
            placeholder="VD: Logitech"
            required
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white"
            >Danh mục / Type *</label
          >
          <input
            class="h-12 rounded-xl px-4 bg-[#0b0f16] border border-[#232f48] text-white outline-none focus:border-primary"
            name="type"
            bind:value={type}
            placeholder="VD: Bàn phím"
            required
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Giá bán *</label>
          <input
            class="h-12 rounded-xl px-4 bg-[#0b0f16] border border-[#232f48] text-white outline-none focus:border-primary"
            name="price"
            type="number"
            min="0"
            bind:value={price}
            required
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Giá cũ</label>
          <input
            class="h-12 rounded-xl px-4 bg-[#0b0f16] border border-[#232f48] text-white outline-none focus:border-primary"
            name="old_price"
            type="number"
            min="0"
            bind:value={old_price}
            placeholder="VD: 3490000"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-white">Tồn kho</label>
          <input
            class="h-12 rounded-xl px-4 bg-[#0b0f16] border border-[#232f48] text-white outline-none focus:border-primary"
            name="quantity"
            type="number"
            min="0"
            bind:value={quantity}
          />
        </div>
      </div>

      <div class="flex flex-col gap-2 mt-4">
        <label class="text-sm font-semibold text-white">Mô tả</label>
        <textarea
          class="min-h-[140px] rounded-xl px-4 py-3 bg-[#0b0f16] border border-[#232f48] text-white outline-none focus:border-primary"
          name="description"
          bind:value={description}
          placeholder="Mô tả sản phẩm..."
        />
      </div>
    </div>

    <!-- RIGHT -->
    <div
      class="bg-[#111722] border border-[#232f48] rounded-2xl p-5 flex flex-col gap-4"
    >
      <div>
        <div class="flex items-center justify-between gap-3">
          <h3 class="font-bold text-white">Ảnh (URL)</h3>
          <span class="text-xs text-[#92a4c9]">{images.length} link</span>
        </div>

        <div class="flex gap-2 mt-3">
          <input
            class="h-11 flex-1 rounded-xl px-4 bg-[#0b0f16] border border-[#232f48] text-white outline-none focus:border-primary"
            bind:value={imageInput}
            placeholder="Dán URL ảnh rồi bấm +"
          />
          <button
            type="button"
            on:click={addImageUrl}
            class="text-white transition h-11 w-11 rounded-xl bg-primary hover:bg-blue-600 active:scale-95"
            title="Thêm URL ảnh"
          >
            <span class="material-symbols-outlined">add</span>
          </button>
        </div>

        {#if images.length > 0}
          <div class="flex flex-col gap-2 mt-3">
            {#each images as url, i}
              <div
                class="flex items-center gap-2 bg-[#0b0f16] border border-[#232f48] rounded-xl p-2"
              >
                <div
                  class="size-12 rounded-lg overflow-hidden bg-black/20 border border-[#232f48] shrink-0"
                >
                  <img class="object-cover w-full h-full" alt="img" src={url} />
                </div>
                <div class="text-xs text-[#92a4c9] break-all flex-1">{url}</div>
                <button
                  type="button"
                  class="h-9 w-9 rounded-lg border border-[#232f48] text-white hover:bg-[#232f48]"
                  on:click={() => removeImageUrl(i)}
                >
                  <span class="material-symbols-outlined text-[20px]"
                    >close</span
                  >
                </button>
              </div>
            {/each}
          </div>
        {/if}

        <!-- hidden JSON for server -->
        <input type="hidden" name="images" value={JSON.stringify(images)} />
      </div>

      <div class="pt-4 border-t border-[#232f48]">
        <div class="flex items-center justify-between gap-3">
          <h3 class="font-bold text-white">Ảnh (Upload)</h3>
          <span class="text-xs text-[#92a4c9]">Bucket: products</span>
        </div>

        <div class="mt-3">
          <input
            class="block w-full text-sm text-[#92a4c9]
                   file:mr-4 file:py-2 file:px-4 file:rounded-xl
                   file:border-0 file:text-sm file:font-semibold
                   file:bg-[#232f48] file:text-white hover:file:bg-[#2c3a55]"
            type="file"
            name="image_files"
            accept="image/*"
            multiple
            on:change={onPickFiles}
          />
          <p class="mt-2 text-xs text-[#92a4c9]">
            Ảnh sẽ lưu theo: <b>products/&lt;type&gt;/&lt;slug&gt;-01.jpg</b>...
          </p>
        </div>

        {#if filePreviews.length > 0}
          <div class="grid grid-cols-3 gap-2 mt-3">
            {#each filePreviews as fp, i}
              <div
                class="relative rounded-xl overflow-hidden border border-[#232f48] bg-[#0b0f16] aspect-square"
              >
                <img
                  src={fp.url}
                  alt={fp.name}
                  class="object-cover w-full h-full"
                />
                <button
                  type="button"
                  class="absolute text-white rounded-lg top-2 right-2 size-8 bg-black/50 hover:bg-black/70"
                  title="Bỏ (preview)"
                  on:click={() => removePreview(i)}
                >
                  <span class="material-symbols-outlined text-[18px]"
                    >close</span
                  >
                </button>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <button
        type="submit"
        class="mt-2 h-12 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 active:scale-[0.99] transition shadow-lg shadow-blue-900/20"
      >
        Thêm sản phẩm
      </button>
    </div>
  </form>
</div>
