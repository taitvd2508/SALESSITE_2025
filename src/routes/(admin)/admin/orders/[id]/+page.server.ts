// src/routes/(admin)/admin/orders/[id]/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    return {
      order: null,
      items: [],
      statuses: [],
      methods: [],
      error: 'Invalid id',
    };
  }

  const supabase = locals.supabase;

  const [{ data: statuses }, { data: methods }] = await Promise.all([
    supabase.from('order_status').select('id, code, name').order('id'),
    supabase.from('order_method').select('id, code, name').order('id'),
  ]);

  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .select(
      `
      id, created_at, full_name, phone, email, address, note, total_price, status_id, method_id,
      status:order_status(id, code, name),
      method:order_method(id, code, name)
    `
    )
    .eq('id', id)
    .single();

  if (orderErr || !order) {
    return {
      order: null,
      items: [],
      statuses: statuses ?? [],
      methods: methods ?? [],
      error: orderErr?.message ?? 'Not found',
    };
  }

  // order items (join product để show tên/ảnh)
  const { data: items } = await supabase
    .from('order_details')
    .select(
      `
      id, order_id, product_id, quantity, price,
      product:products(id, name, slug, images)
    `
    )
    .eq('order_id', id)
    .order('id');

  return {
    order,
    items: items ?? [],
    statuses: statuses ?? [],
    methods: methods ?? [],
    error: null,
  };
};

export const actions: Actions = {
  updateStatus: async ({ request, locals, params }) => {
    const id = Number(params.id);
    const fd = await request.formData();
    const status_id = Number(fd.get('status_id'));

    if (!Number.isFinite(id) || !Number.isFinite(status_id)) {
      return fail(400, { message: 'Invalid payload' });
    }

    const { error } = await locals.supabase
      .from('orders')
      .update({ status_id })
      .eq('id', id);

    if (error) return fail(500, { message: error.message });

    return { ok: true, message: 'Đã cập nhật trạng thái.' };
  },
};
