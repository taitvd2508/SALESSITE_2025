<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import AiChatWidget from '$lib/components/AiChatWidget.svelte';
</script>

<SiteHeader />
<slot />
<AiChatWidget />
<SiteFooter />
