//src/routes/(site)/account/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
  //const session = await locals.getSession?.();
  //if (!session) {
  // throw redirect(303, `/auth/login?next=${encodeURIComponent(url.pathname)}`);
  //}

  //const user = session.user;
  const {
    data: { user },
    error,
  } = await locals.supabase.auth.getUser();
  if (error || !user) {
    throw redirect(303, `/auth/login?next=${encodeURIComponent(url.pathname)}`);
  }

  const { data: profile } = await locals.supabase
    .from('profiles')
    .select('id, full_name, phone, address, email, gender, birthday')
    .eq('id', user.id)
    .single();

  return { user, profile: profile ?? null };
};

export const actions: Actions = {
  updateProfile: async ({ locals, request }) => {
    const supabase = locals.supabase;

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return fail(401, { message: 'Bạn chưa đăng nhập' });

    const form = await request.formData();
    const full_name = String(form.get('full_name') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const address = String(form.get('address') ?? '').trim();
    const gender = String(form.get('gender') ?? 'unknown').trim();
    const birthday = String(form.get('birthday') ?? '').trim() || null;

    //validate gender
    if (!['male', 'female', 'unknown'].includes(gender)) {
      return fail(400, { message: 'Giới tính không hợp lệ' });
    }

    //validate birthday format (YYYY-MM-DD) and ensure it's not in the future
    if (birthday) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
        return fail(400, { message: 'Ngày sinh không hợp lệ' });
      }
      if (new Date(birthday) > new Date()) {
        return fail(400, { message: 'Ngày sinh không thể ở tương lai' });
      }
    }

    //validate phone
    if (phone && !/^\d{9,11}$/.test(phone)) {
      return fail(400, { message: 'Số điện thoại không hợp lệ' });
    }

    const { error: upErr } = await supabase
      .from('profiles')
      .update({
        full_name,
        phone,
        address,
        gender,
        birthday //Saving birthday from datepicker
      })
      .eq('id', user.id);

    if (upErr) return fail(500, { message: upErr.message });

    return { ok: true, message: 'Cập nhật hồ sơ thành công!' };
  },
};
