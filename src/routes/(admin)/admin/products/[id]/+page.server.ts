import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

//lấy dữ liệu sản phẩm để đổ vào form --- (load() lấy id từ URL → query Supabase lấy product.)
export const load: PageServerLoad = async ({ params, locals }) => {
  const id = Number(params.id);
  if (!Number.isFinite(id)) throw redirect(303, '/admin/products');

  const { data: product, error } = await locals.supabase
    .from('products')
    .select(
      'id, name, slug, brand, type, price, old_price, quantity, description, images, active, created_at, updated_at'
    )
    .eq('id', id)
    .single();

  if (error || !product) throw redirect(303, '/admin/products');

  return { mode: 'edit', product };
};

//xử lý khi bấm “Lưu thay đổi” (Cập nhật)
export const actions: Actions = {
  //Khi form POST tới ?/update, server chạy action update. - Server đọc FormData từ request, parse từng field.
  update: async ({ request, locals, params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) return fail(400, { message: 'Invalid id' });

    const fd = await request.formData();

    const name = String(fd.get('name') ?? '').trim();
    const slug = String(fd.get('slug') ?? '').trim();
    const brand = String(fd.get('brand') ?? '').trim();
    const type = String(fd.get('type') ?? '').trim();

    const priceRaw = String(fd.get('price') ?? '').trim();
    const price = priceRaw ? Number(priceRaw) : NaN;

    const oldPriceRaw = String(fd.get('old_price') ?? '').trim();
    const old_price = oldPriceRaw ? Number(oldPriceRaw) : null;

    const qtyRaw = String(fd.get('quantity') ?? '').trim();
    const quantity = qtyRaw ? Number(qtyRaw) : 0;

    const description = String(fd.get('description') ?? '').trim();

    // nhận active từ form (hidden input)
    const activeStr = String(fd.get('active') ?? '').trim();
    const active =
      activeStr === 'true' ? true : activeStr === 'false' ? false : null;

    // parse images text[]
    const imagesRaw = String(fd.get('images') ?? '[]');
    let images: string[] = [];
    try {
      const parsed = JSON.parse(imagesRaw);
      images = Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [];
    } catch {
      images = [];
    }

    //validate
    if (!name || !slug || !brand || !type) {
      return fail(400, {
        message: 'Vui lòng nhập đủ: tên, slug, brand, type.',
      });
    }
    if (!Number.isFinite(price) || price <= 0) {
      return fail(400, { message: 'Giá bán không hợp lệ.' });
    }
    if (!Number.isFinite(quantity) || quantity < 0) {
      return fail(400, { message: 'Số lượng không hợp lệ.' });
    }
    if (old_price !== null && (!Number.isFinite(old_price) || old_price <= 0)) {
      return fail(400, { message: 'Giá cũ không hợp lệ.' });
    }

    const payload: any = {
      name,
      slug,
      brand,
      type,
      price,
      old_price,
      quantity,
      description,
      images,
    };

    if (active !== null) payload.active = active;

    //Update Supabase và trả kết quả cho client
    const { error } = await locals.supabase
      .from('products')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Cập nhật sản phẩm thất bại:', error);
      return fail(500, { message: error.message });
    }

    return { ok: true, message: 'Cập nhật sản phẩm thành công.' };
  },

  //toggleActive POST bên page.svelte
  toggleActive: async ({ locals, params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) return fail(400, { message: 'Invalid id' });

    const { data: row, error: getErr } = await locals.supabase
      .from('products')
      .select('active')
      .eq('id', id)
      .single();

    if (getErr || !row)
      return fail(404, { message: 'Không tìm thấy sản phẩm.' });

    const { error } = await locals.supabase
      .from('products')
      .update({ active: !row.active })
      .eq('id', id);

    //if (error) return fail(500, { message: error.message });
    if (error) {
      let msg = 'Cập nhật thất bại';

      if (error.message.includes('row-level security')) {
        msg = 'Bạn không có quyền thực hiện thao tác này';
      }

      return fail(500, { message: msg });
    } else {
      return { ok: true, message: 'Cập nhật sản phẩm thành công' };
    }
  },
};
