import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

type Role = 'customer' | 'staff' | 'admin';

async function requireAdmin(locals: App.Locals) {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser();
  if (!user) throw redirect(303, '/auth/login?next=/admin/users/new');

  const { data: roleRow } = await locals.supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  const role = (roleRow?.role ?? 'customer') as Role;
  if (role !== 'admin') throw redirect(303, '/admin/users');

  return true;
}

export const load: PageServerLoad = async ({ locals }) => {
  await requireAdmin(locals);
  return {};
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    await requireAdmin(locals);

    const fd = await request.formData();
    const email = String(fd.get('email') ?? '').trim();
    const password = String(fd.get('password') ?? '').trim();
    const full_name = String(fd.get('full_name') ?? '').trim();
    const phone = String(fd.get('phone') ?? '').trim();
    const address = String(fd.get('address') ?? '').trim();
    const birthday = String(fd.get('birthday') ?? '').trim();
    const gender = String(fd.get('gender') ?? '').trim();
    const role =
      (String(fd.get('role') ?? 'customer').trim() as Role) || 'customer';

    if (!email) return fail(400, { message: 'Email không được trống' });
    if (!password || password.length < 6)
      return fail(400, { message: 'Mật khẩu tối thiểu 6 ký tự' });

    //service role client (server only)
    const admin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    //create auth user (no email dependency)
    const { data: created, error: cErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        phone,
      },
    });

    if (cErr || !created?.user) {
      return fail(500, { message: cErr?.message ?? 'Tạo user thất bại' });
    }

    const uid = created.user.id;

    //Update profiles (trigger handle_new_user already inserted row)
    const { error: pErr } = await admin
      .from('profiles')
      .update({
        email,
        full_name: full_name || null,
        phone: phone || null,
        address: address || null,
        birthday: birthday || null,
        gender: gender || null,
      })
      .eq('id', uid);

    if (pErr) return fail(500, { message: pErr.message });

    //Set role
    const { error: rErr } = await admin
      .from('user_roles')
      .upsert({ user_id: uid, role });

    if (rErr) return fail(500, { message: rErr.message });

    //Done
    throw redirect(303, `/admin/users/${uid}`);
  },
};
