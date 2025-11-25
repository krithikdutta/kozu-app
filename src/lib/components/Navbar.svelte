<script lang="ts">
	import { onMount } from 'svelte';

	let mobileOpen = false;

	// Close mobile menu on resize to wide screens (optional helpful UX)
	onMount(() => {
		const onResize = () => {
			if (window.innerWidth >= 768 && mobileOpen) {
				mobileOpen = false;
			}
		};
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});
</script>

<nav class="relative">
	<!-- Large screen nav -->
	<div class="hidden md:flex items-center gap-3" aria-hidden={mobileOpen}>
		<a href="/" class="btn btn-ghost btn-sm">Home</a>
		<a href="/resources" class="btn btn-ghost btn-sm">Resources</a>
		<a href="/blog" class="btn btn-ghost btn-sm">Blog</a>
	</div>

	<!-- Mobile -->
	<div class="md:hidden flex items-center">
		<button
			type="button"
			class="btn btn-ghost btn-square"
			aria-label="Toggle menu"
			aria-expanded={mobileOpen}
			on:click={() => (mobileOpen = !mobileOpen)}
		>
			{#if !mobileOpen}
				<!-- hamburger icon -->
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			{:else}
				<!-- close icon -->
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			{/if}
		</button>
	</div>

	<!-- Mobile menu panel -->
	{#if mobileOpen}
		<div class="absolute right-0 mt-2 w-48 bg-base-200 border border-base-300 rounded-lg shadow-lg py-2 z-50 md:hidden" role="menu">
			<a href="/" class="block px-4 py-2 text-sm btn-ghost w-full text-left" role="menuitem" on:click={() => (mobileOpen = false)}>Home</a>
			<a href="/resources" class="block px-4 py-2 text-sm btn-ghost w-full text-left" role="menuitem" on:click={() => (mobileOpen = false)}>Resources</a>
			<a href="/blog" class="block px-4 py-2 text-sm btn-ghost w-full text-left" role="menuitem" on:click={() => (mobileOpen = false)}>Blog</a>
		</div>
	{/if}
</nav>