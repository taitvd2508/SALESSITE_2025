import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

type Role = 'customer' | 'staff' | 'admin';

async function requireStaff(locals: App.Locals) {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser();
  if (!user) throw redirect(303, '/auth/login?next=/admin/users');

  const { data: roleRow } = await locals.supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  const role = (roleRow?.role ?? 'customer') as Role;
  if (role !== 'admin' && role !== 'staff') throw redirect(303, '/');

  return { user, role };
}

async function requireAdmin(locals: App.Locals) {
  const { role } = await requireStaff(locals);
  if (role !== 'admin') throw redirect(303, '/admin/users');
  return true;
}

export const load: PageServerLoad = async ({ params, locals }) => {
  await requireStaff(locals);

  const id = params.id;

  const { data: profile, error } = await locals.supabase
    .from('profiles')
    .select(
      'id, full_name, phone, address, email, birthday, gender, is_active, created_at, updated_at'
    )
    .eq('id', id)
    .single();

  if (error || !profile) {
    return {
      profile: null,
      role: 'customer',
      orders: [],
      stats: { count: 0, total: 0 },
    };
  }

  const { data: roleRow } = await locals.supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', id)
    .single();

  const role = (roleRow?.role ?? 'customer') as Role;

  const { data: orders } = await locals.supabase
    .from('orders')
    .select('id, total_price, created_at, status_id, method_id')
    .eq('user_id', id)
    .order('created_at', { ascending: false })
    .limit(10);

  const count = (orders ?? []).length;
  const total = (orders ?? []).reduce(
    (s, o) => s + Number(o.total_price ?? 0),
    0
  );

  return { profile, role, orders: orders ?? [], stats: { count, total } };
};

export const actions: Actions = {
  save: async ({ request, locals, params }) => {
    await requireAdmin(locals);

    const id = params.id;
    const fd = await request.formData();

    const full_name = String(fd.get('full_name') ?? '').trim();
    const phone = String(fd.get('phone') ?? '').trim();
    const address = String(fd.get('address') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const birthday = String(fd.get('birthday') ?? '').trim(); // yyyy-mm-dd
    const gender = String(fd.get('gender') ?? '').trim(); // enum
    const role = String(fd.get('role') ?? 'customer').trim() as Role;

    const { error } = await locals.supabase
      .from('profiles')
      .update({
        full_name: full_name || null,
        phone: phone || null,
        address: address || null,
        email: email || null,
        birthday: birthday || null,
        gender: gender || null,
      })
      .eq('id', id);

    if (error) return fail(500, { message: error.message });

    // update role
    const { error: roleErr } = await locals.supabase
      .from('user_roles')
      .upsert({ user_id: id, role });

    if (roleErr) return fail(500, { message: roleErr.message });

    return { ok: true, message: 'Đã lưu thay đổi.' };
  },

  toggleActive: async ({ request, locals, params }) => {
    await requireAdmin(locals);

    const id = params.id;
    const fd = await request.formData();
    const active = String(fd.get('active') ?? '') === 'true';

    const { error } = await locals.supabase
      .from('profiles')
      .update({ is_active: active })
      .eq('id', id);

    if (error) return fail(500, { message: error.message });

    return { ok: true, message: 'Đã cập nhật trạng thái.' };
  },
};
