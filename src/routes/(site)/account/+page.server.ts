// src/routes/(site)/account/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
  // const session = await locals.getSession?.();
  // if (!session) {
  //   throw redirect(303, `/auth/login?next=${encodeURIComponent(url.pathname)}`);
  // }

  // const user = session.user;
  const {
    data: { user },
    error,
  } = await locals.supabase.auth.getUser();
  if (error || !user) {
    throw redirect(303, `/auth/login?next=${encodeURIComponent(url.pathname)}`);
  }

  const { data: profile } = await locals.supabase
    .from('profiles')
    .select('id, full_name, phone, address, email')
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

    // validate phone
    if (phone && !/^\d{9,11}$/.test(phone)) {
      return fail(400, { message: 'Số điện thoại không hợp lệ' });
    }

    const { error: upErr } = await supabase
      .from('profiles')
      .update({ full_name, phone, address })
      .eq('id', user.id);

    if (upErr) return fail(500, { message: upErr.message });

    return { ok: true };
  },
};
