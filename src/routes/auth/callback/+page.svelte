<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { createClient } from '@supabase/supabase-js';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  let msg = 'Đang xác thực...';

  onMount(async () => {
    // Supabase sẽ parse token trong URL (hash/query) và tạo session
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      // Sau invite/reset, cho user qua set-password
      await goto('/auth/set-password');
      return;
    }

    msg = 'Link không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.';
  });
</script>

<div class="min-h-[50vh] flex items-center justify-center text-white">
  {msg}
</div>