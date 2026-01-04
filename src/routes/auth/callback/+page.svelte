<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { createClient } from '@supabase/supabase-js';
  import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
  } from '$env/static/public';

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  let msg = 'Đang xác thực...';

  onMount(async () => {
    try {
      const url = new URL(window.location.href);
      console.log('[callback] href:', window.location.href);
      console.log('[callback] search:', url.search);
      console.log('[callback] hash:', window.location.hash);

      const nextRaw = url.searchParams.get('next') ?? '/set-password';
      const next = nextRaw.startsWith('/') ? nextRaw : '/';
      console.log('[callback] next:', next);

      // (A) PKCE code flow
      const code = url.searchParams.get('code');
      if (code) {
        console.log('[callback] has code:', code);
        const { data, error } =
          await supabase.auth.exchangeCodeForSession(code);
        console.log('[callback] exchangeCodeForSession:', { data, error });
        if (error) throw error;

        msg = 'Xác thực xong (code). Đang chuyển trang...';
        await goto(next);
        return;
      }

      // (B) Implicit hash flow
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const access_token = hash.get('access_token');
      const refresh_token = hash.get('refresh_token');
      const type = hash.get('type');

      console.log('[callback] hash params:', {
        type,
        has_access: !!access_token,
        has_refresh: !!refresh_token,
        expires_in: hash.get('expires_in'),
        token_type: hash.get('token_type'),
      });

      if (access_token && refresh_token) {
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        console.log('[callback] setSession:', { data, error });
        if (error) throw error;

        msg = 'Xác thực xong (hash). Đang chuyển trang...';
        await goto(next);
        return;
      }

      // Không có code và cũng không có đủ hash token
      msg =
        'Thiếu token trong URL. Có thể link không hợp lệ hoặc đã được dùng.';
      console.error('[callback] missing tokens; cannot set session');
      // KHÔNG goto error vội để bạn nhìn log
    } catch (e: any) {
      console.error('[callback] ERROR:', e);
      msg = e?.message ?? 'Xác thực thất bại';
      // KHÔNG goto error vội để bạn nhìn log
    }
  });
</script>

<div class="p-6 text-sm text-gray-300">
  {msg}
</div>
