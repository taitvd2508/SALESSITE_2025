import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

const admin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export const POST: RequestHandler = async ({ cookies, locals }) => {
  // user must be logged in
  const { data: ures, error: uErr } = await locals.supabase.auth.getUser();
  const user = ures.user;
  if (uErr || !user)
    return json({ ok: false, error: 'Unauthorized' }, { status: 401 });

  const user_id = user.id;
  const authEmail = (user.email ?? '').trim().toLowerCase();

  // 1) Link orders theo email (KHÔNG phụ thuộc sid)
  if (authEmail) {
    const { error: ordErr } = await admin
      .from('orders')
      .update({ user_id })
      .ilike('email', authEmail)
      .is('user_id', null);

    if (ordErr)
      return json({ ok: false, error: ordErr.message }, { status: 500 });
  }

  // 2) Link user_events theo session_id nếu có cookie tt_sid
  const sid = cookies.get('tt_sid');
  if (sid) {
    const { error: evErr } = await admin
      .from('user_events')
      .update({ user_id })
      .eq('session_id', sid)
      .is('user_id', null);

    if (evErr)
      return json({ ok: false, error: evErr.message }, { status: 500 });
  }

  return json({ ok: true, linked_by: { email: !!authEmail, session: !!sid } });
};
