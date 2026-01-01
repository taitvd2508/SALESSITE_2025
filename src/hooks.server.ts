import type { Handle } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import { createServerClient } from "@supabase/ssr";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";

export const handle: Handle = async ({ event, resolve }) => {
  // 1) cookie name để tracking hành vi
  const cookieName = "tt_sid";

  // nếu chưa có cookie => tạo mới
  let sid = event.cookies.get(cookieName);
  if (!sid) {
    sid = randomUUID();
    event.cookies.set(cookieName, sid, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
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
        getAll() {
          return event.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            event.cookies.set(name, value, { path: "/", ...options })
          );
        },
      },
    }
  );

  // 3) nếu bạn muốn tiện dùng sid ở mọi nơi
  event.locals.tt_sid = sid;

  // Helper secure getSession
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();

    if (!session) return { session: null, user: null };

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
      return name === "content-range" || name === "x-supabase-api-version";
    },
  });
};
