import type { Handle } from '@sveltejs/kit';
import { randomUUID } from 'crypto';

export const handle: Handle = async ({ event, resolve }) => {
  // cookie name để tracking hành vi
  const cookieName = 'tt_sid';

  // nếu chưa có cookie => tạo mới
  let sid = event.cookies.get(cookieName);
  if (!sid) {
    sid = randomUUID();
    event.cookies.set(cookieName, sid, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // dev local. Khi deploy HTTPS => đổi true
      maxAge: 60 * 60 * 24 * 30 // 30 ngày
    });
  }

  return resolve(event);
};

/* 
BƯỚC 2: Tạo session_id cookie cho mọi khách (để tracking hành vi + gợi ý)

Ý nghĩa:

Mọi người vào web (kể cả chưa login) đều có tt_sid

Sau này mình dùng tt_sid để ghi user_events*/