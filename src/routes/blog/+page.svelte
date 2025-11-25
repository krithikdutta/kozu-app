<script lang="ts">
	interface PostWithSlug {
		title: string;
		date: string;
		author: string;
		slug: string;
	}
	
	interface PageData {
		posts: PostWithSlug[];
	}
	
	let { data }: { data: PageData } = $props();
</script>

<h1 class="text-3xl font-bold mb-6">Blog</h1>

<ul class="space-y-4">
	{#each data.posts as post}
		<li class="p-4 rounded-lg border border-base-300 hover:bg-base-200 transition">
			<a href={`/blog/${post.slug}`} class="block">
				<h2 class="text-xl font-semibold text-primary">{post.title}</h2>

				<time class="block text-sm opacity-75">{post.date.split('T')[0]}</time>

				{#if post.author}
					<span class="block text-sm mt-1 text-secondary">
						by {post.author}
					</span>
				{/if}
			</a>
		</li>
	{/each}
</ul>