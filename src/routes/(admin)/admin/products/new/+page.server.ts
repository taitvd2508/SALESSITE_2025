import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

function slugFolder(input: string) {
  return (
    (input ?? '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'misc'
  );
}

function extFromFile(f: File) {
  const name = (f.name ?? '').toLowerCase();
  const m = name.match(/\.(png|jpg|jpeg|webp|gif)$/i);
  if (m?.[1]) return m[1] === 'jpeg' ? 'jpg' : m[1];
  const type = (f.type ?? '').toLowerCase();
  if (type.includes('png')) return 'png';
  if (type.includes('webp')) return 'webp';
  if (type.includes('gif')) return 'gif';
  return 'jpg';
}

export const load: PageServerLoad = async () => {
  return { mode: 'create', product: null };
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const fd = await request.formData();

    const name = String(fd.get('name') ?? '').trim();
    const slugInput = String(fd.get('slug') ?? '').trim(); // có thể trống
    const brand = String(fd.get('brand') ?? '').trim();
    const type = String(fd.get('type') ?? '').trim();

    const price = Number(fd.get('price') ?? 0);
    const old_price_raw = String(fd.get('old_price') ?? '').trim();
    const old_price = old_price_raw ? Number(old_price_raw) : null;

    const quantity = Number(fd.get('quantity') ?? 0);
    const description = String(fd.get('description') ?? '').trim();

    // URL images (JSON string)
    const imagesRaw = String(fd.get('images') ?? '[]');
    let urlImages: string[] = [];
    try {
      urlImages = JSON.parse(imagesRaw);
      if (!Array.isArray(urlImages)) urlImages = [];
    } catch {
      urlImages = [];
    }

    // File images
    const files = fd
      .getAll('image_files')
      .filter((x) => x instanceof File && (x as File).size > 0) as File[];

    if (!name || !brand || !type) {
      return fail(400, { message: 'Vui lòng nhập đủ: tên, brand, type.' });
    }
    if (!Number.isFinite(price) || price <= 0) {
      return fail(400, { message: 'Giá bán không hợp lệ.' });
    }

    // ✅ slug bắt buộc not null -> nếu trống, dùng name làm seed để trigger tự slugify
    const slugSeed = slugInput || name;

    // 1) Insert trước để lấy slug thật (do trigger set_product_slug quyết định)
    const { data: created, error: insErr } = await locals.supabase
      .from('products')
      .insert({
        name,
        slug: slugSeed,
        brand,
        type,
        price,
        old_price,
        quantity: Number.isFinite(quantity) ? quantity : 0,
        description,
        images: urlImages,
        active: true,
      })
      .select('id, slug')
      .single();

    if (insErr || !created)
      return fail(500, { message: insErr?.message ?? 'Insert failed' });

    const productId = created.id as number;
    const finalSlug = created.slug as string;

    // 2) Upload file lên bucket (nếu có)
    if (files.length > 0) {
      const typeFolder = slugFolder(type); // laptop / ban-phim / tai-nghe /...
      const brandFolder = slugFolder(brand); // acer / asus /...
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const ext = extFromFile(f);
        const index = String(i + 1).padStart(2, '0');

        // /products/<type>/<brand>/<slug>-01.jpg
        const path = `products/${typeFolder}/${brandFolder}/${finalSlug}-${index}.${ext}`;

        const { error: upErr } = await locals.supabase.storage
          .from('products')
          .upload(path, f, {
            upsert: true,
            contentType: f.type || undefined,
          });

        if (upErr) {
          // rollback: xóa product vừa tạo để tránh rác
          await locals.supabase.from('products').delete().eq('id', productId);
          return fail(500, { message: `Upload ảnh lỗi: ${upErr.message}` });
        }

        const { data: pub } = locals.supabase.storage
          .from('products')
          .getPublicUrl(path);
        if (pub?.publicUrl) uploadedUrls.push(pub.publicUrl);
      }

      // 3) Update images[] = urlImages + uploadedUrls (unique)
      const merged = Array.from(
        new Set([...(urlImages ?? []), ...(uploadedUrls ?? [])])
      );

      const { error: up2Err } = await locals.supabase
        .from('products')
        .update({ images: merged })
        .eq('id', productId);

      if (up2Err) {
        // không rollback nữa, vì upload đã ok; admin có thể sửa lại sau
        return fail(500, { message: `Lưu images lỗi: ${up2Err.message}` });
      }
    }

    throw redirect(303, '/admin/products');
  },
};
