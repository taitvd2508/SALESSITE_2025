import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser();

  let profile: any = null;
  let role: 'customer' | 'staff' | 'admin' | null = null;

  if (user) {
    const { data: p } = await locals.supabase
      .from('profiles')
      .select('id, full_name, phone, address, email')
      .eq('id', user.id)
      .single();
    profile = p ?? null;

    //lấy role
    const { data: r } = await locals.supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    role = (r?.role ?? null) as any;
  }

  return { user, profile, role };
};
