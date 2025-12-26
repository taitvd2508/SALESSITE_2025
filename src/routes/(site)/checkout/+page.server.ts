import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession?.();
  const user = session?.user ?? null;

  let prefill = {
    full_name: '',
    phone: '',
    email: '',
    address: '',
  };

  // nếu đã login → lấy profiles + user.email → trả về prefill.
  if (user) {
    // email lấy từ auth.users
    prefill.email = user.email ?? '';

    // thông tin còn lại lấy từ profiles
    const { data: profile } = await locals.supabase
      .from('profiles')
      .select('full_name, phone, address, email')
      .eq('id', user.id)
      .single();

    if (profile) {
      prefill.full_name = profile.full_name ?? '';
      prefill.phone = profile.phone ?? '';
      // ưu tiên email trong profile nếu có (còn không thì dùng auth email)
      prefill.email = profile.email ?? prefill.email;
      prefill.address = profile.address ?? '';
    }
  }

  return {
    user,
    prefill,
  };
};
