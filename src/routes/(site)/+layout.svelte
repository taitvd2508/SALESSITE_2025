<script lang="ts">
  import { onMount } from 'svelte';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import { userPreferences } from '$lib/stores/userPreferences';

  export let data: any;

  // Load preferences from server for returning logged-in users
  onMount(async () => {
    if (data?.user) {
      await userPreferences.loadFromServer();
    }
  });
</script>

<SiteHeader />
<slot />
<SiteFooter />
