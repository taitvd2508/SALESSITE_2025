import type { Handle } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
  // 1) cookie name để tracking hành vi
  const cookieName = 'tt_sid';

  // nếu chưa có cookie => tạo mới
  let sid = event.cookies.get(cookieName);
  if (!sid) {
    sid = randomUUID();
    event.cookies.set(cookieName, sid, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // deploy https => true
      maxAge: 60 * 60 * 24 * 30
    });
  }

  // 2) attach supabase client vào locals (anon key)
  event.locals.supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,  // server-side: không lưu session
      autoRefreshToken: false
    }
  });

  // 3) nếu bạn muốn tiện dùng sid ở mọi nơi
  event.locals.tt_sid = sid;

  return resolve(event);
};

/* 
BƯỚC 2: Tạo session_id cookie cho mọi khách (để tracking hành vi + gợi ý)

Ý nghĩa:

Mọi người vào web (kể cả chưa login) đều có tt_sid

Sau này mình dùng tt_sid để ghi user_events*/