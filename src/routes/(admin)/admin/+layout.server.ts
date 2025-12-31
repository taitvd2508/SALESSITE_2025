import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  // getUser() để tránh warning “insecure session”
  const {
    data: { user },
    error: userErr,
  } = await locals.supabase.auth.getUser();

  if (userErr) {
    // optional: nếu muốn debug
    console.error('getUser error:', userErr.message);
  }

  // chưa login -> đá về login (kèm next)
  if (!user) {
    throw redirect(303, `/auth/login?next=${encodeURIComponent(url.pathname)}`);
  }

  // lấy role (user_roles.user_id)
  const { data: roleRow, error: roleErr } = await locals.supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (roleErr) {
    // nếu RLS chặn SELECT sẽ rơi vào đây
    console.error('role select error:', roleErr.message);
  }

  const role = (roleRow?.role ?? 'customer') as 'customer' | 'staff' | 'admin';

  // không đủ quyền -> về trang chủ (hoặc 403)
  if (role !== 'admin' && role !== 'staff') {
    throw redirect(303, '/');
  }

  return { user, role };
};
