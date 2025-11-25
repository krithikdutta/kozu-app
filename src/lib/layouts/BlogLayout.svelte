<script lang="ts">
	import type { Snippet } from 'svelte';
	
	let { children }: { children: Snippet } = $props();
</script>

<article class="prose">
	{@render children()}
</article>

<style>
	.prose {
		max-width: 65ch;
		margin: 2rem auto;
		padding: 0 1rem;
	}
	
	.prose :global(h1) {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}
	
	.prose :global(p) {
		line-height: 1.7;
		margin-bottom: 1rem;
	}
</style>