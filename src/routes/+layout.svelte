<script lang="ts">
  import '../app.css';
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
    rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet" />
  <link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
    rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased">
  <slot />
</div>
