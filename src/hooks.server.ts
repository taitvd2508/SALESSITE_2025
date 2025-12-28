import type { Handle } from '@sveltejs/kit';
import { randomUUID } from 'crypto';

import { createServerClient } from '@supabase/ssr';
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public';

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
      secure: false,
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  // 2) attach supabase client vào locals (anon key)
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) =>
          event.cookies.set(key, value, { path: '/', ...options }),
        remove: (key, options) =>
          event.cookies.delete(key, { path: '/', ...options }),
      },
    }
  );

  // 3) nếu bạn muốn tiện dùng sid ở mọi nơi
  event.locals.tt_sid = sid;

  // Optional: expose session getter for convenience
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    if (!session) {
      return { session: null, user: null };
    }

    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser();
    if (error) {
      // JWT validation failed
      return { session: null, user: null };
    }

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    },
  });
};

/* 
BƯỚC 2: Tạo session_id cookie cho mọi khách (để tracking hành vi + gợi ý)

Ý nghĩa:

Mọi người vào web (kể cả chưa login) đều có tt_sid

Sau này mình dùng tt_sid để ghi user_events*/
