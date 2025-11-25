<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/Kozu.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Krithik Dutta</title>
</svelte:head>
  
<div class="min-h-screen bg-base-100 text-base-content antialiased">
<header class="sticky top-0 z-40 backdrop-blur-sm bg-base-200/60 border-b border-base-300">
	<div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
	<a href="/" class="flex items-center gap-3">
		<div class="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-content font-semibold">
			<img src={favicon} alt="Kozu mascot" class="w-8 h-8 object-contain" />
		</div>
		<div class="font-semibold">Krithik Dutta</div>
		<div class="text-xs text-base-content/70">Automation · Analytics · AI</div>
	</a>
	<Navbar />
	</div>
</header>

<main class="max-w-6xl mx-auto px-4 py-8">
	{@render children()}
</main>

<footer class="mt-16 border-t border-base-300">
	<div class="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-base-content/70">
	<div>© {new Date().getFullYear()} Krithik Dutta</div>
	<div class="flex items-center gap-3">
		<a class="link link-hover" href="https://github.com/krithikdutta" target="_blank" rel="noopener noreferrer">GitHub</a>
		<a class="link link-hover" href="https://linkedin.com/in/krithikdutta" target="_blank" rel="noopener noreferrer">LinkedIn</a>
		<a class="link link-hover" href="mailto:krithikdutta@gmail.com" target="_blank" rel="noopener noreferrer">Email</a>
	</div>
	</div>
</footer>
</div>
