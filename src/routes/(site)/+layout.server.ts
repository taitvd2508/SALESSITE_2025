import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser();

  let profile: any = null;
  if (user) {
    const { data } = await locals.supabase
      .from('profiles')
      .select('id, full_name, phone, address, email')
      .eq('id', user.id)
      .single();
    profile = data ?? null;
  }

  return { user, profile };
};
