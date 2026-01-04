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

export const load: PageServerLoad = async ({ url, locals }) => {
  await requireStaff(locals);

  const q = (url.searchParams.get('q') ?? '').trim();
  const roleFilter = (url.searchParams.get('role') ?? '').trim(); //admin|staff|customer
  const status = (url.searchParams.get('status') ?? '').trim(); //active|inactive

  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
  const pageSize = 12;

  let query = locals.supabase
    .from('profiles')
    .select(
      'id, full_name, phone, address, email, birthday, gender, is_active, created_at',
      {
        count: 'exact',
      }
    );

  if (status === 'active') query = query.eq('is_active', true);
  if (status === 'inactive') query = query.eq('is_active', false);

  if (q) {
    //search basic: name/email/phone
    //Supabase supports OR via `.or()`
    query = query.or(
      `full_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`
    );
  }

  query = query.order('created_at', { ascending: false });

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: profiles, count, error } = await query.range(from, to);
  if (error) throw new Error(error.message);

  const ids = (profiles ?? []).map((p) => p.id);
  const { data: rolesData } = ids.length
    ? await locals.supabase
        .from('user_roles')
        .select('user_id, role')
        .in('user_id', ids)
    : { data: [] as any[] };

  const roleMap = new Map<string, Role>(
    (rolesData ?? []).map((r) => [r.user_id, (r.role ?? 'customer') as Role])
  );

  let users = (profiles ?? []).map((p) => ({
    ...p,
    role: roleMap.get(p.id) ?? ('customer' as Role),
  }));

  if (roleFilter) {
    users = users.filter((u) => u.role === roleFilter);
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    users,
    total,
    page,
    pageSize,
    totalPages,
    filters: { q, role: roleFilter, status },
  };
};

export const actions: Actions = {
  toggleActive: async ({ request, locals }) => {
    await requireAdmin(locals);

    const fd = await request.formData();
    const id = String(fd.get('id') ?? '');
    const nextActive = String(fd.get('active') ?? '') === 'true';

    if (!id) return fail(400, { message: 'Missing user id' });

    const { error } = await locals.supabase
      .from('profiles')
      .update({ is_active: nextActive })
      .eq('id', id);

    if (error) return fail(500, { message: error.message });

    return { ok: true, message: 'Đã cập nhật trạng thái.' };
  },
};
