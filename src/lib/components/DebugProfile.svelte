<script lang="ts">
  import { userPreferences } from '$lib/stores/userPreferences';

  export let visible: boolean = true;

  $: scores = $userPreferences.scores;
  $: entries = Object.entries(scores).sort(([, a], [, b]) => b - a);
  $: topTag = entries.length > 0 ? entries[0][0] : null;

  function clearPreferences() {
    userPreferences.clear();
  }
</script>

{#if visible}
  <div class="fixed bottom-4 right-4 z-[9999] font-mono text-xs">
    <div class="bg-card-dark/95 backdrop-blur-sm border border-primary/30 rounded-lg shadow-2xl min-w-44">
      <!-- Header -->
      <div class="bg-primary/20 px-3 py-2 border-b border-primary/30 flex items-center justify-between">
        <span class="text-primary font-bold uppercase">🔍 Debug Profile</span>
        {#if entries.length > 0}
          <button
            type="button"
            class="text-red-400 hover:text-red-300 text-[10px] underline"
            on:click={clearPreferences}
          >
            Clear
          </button>
        {/if}
      </div>

      <!-- Content -->
      <div class="p-3">
        {#if entries.length === 0}
          <p class="text-text-secondary text-[10px]">Chưa có dữ liệu...</p>
        {:else}
          <div class="text-[11px] mb-2">
            <span class="text-text-secondary">Top Tag:</span>
            <span class="text-primary font-bold ml-1">#{topTag}</span>
          </div>
          {#each entries as [tag, score]}
            <div class="text-[11px] text-white">#{tag} {score}</div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}
