<script lang="ts">
    import ErrorPage from '$lib/components/ErrorPage.svelte';
    let { error } = $props();
  </script>
  
  <ErrorPage 
    status={error?.status} 
    message={error?.message}
  />