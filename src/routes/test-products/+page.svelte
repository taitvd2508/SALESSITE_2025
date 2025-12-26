<script lang="ts">
  export let data;
</script>

<h1>Test Products</h1>

<pre>{JSON.stringify(data, null, 2)}</pre>

{#if data.products.length === 0}
  <p>Chưa có sản phẩm nào trong database</p>
{/if}