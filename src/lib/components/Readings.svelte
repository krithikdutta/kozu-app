<script lang="ts">
	
	// Props (single book)
	let { book }: {
		book: {
			title: string;
			author: string;
			cover: string;
			link: string;
			summary: string;
		};
	} = $props();
</script>

<section class="rounded-box p-6 bg-base-200 border border-base-300 shadow-md space-y-6">
	<h2 class="text-2xl font-semibold">Currently Reading</h2>

	<div class="flex flex-col md:flex-row items-start gap-6">
		<!-- 3D hover book cover -->
		<a
			href={book.link}
			target="_blank"
			rel="noopener noreferrer"
			class="w-48 h-64 rounded-xl overflow-hidden bg-base-300 border border-base-100 
				   cursor-pointer transition-transform duration-300 
				   hover:transform-[rotateX(8deg)_rotateY(-8deg)_scale(1.03)] origin-center shadow-md"
		>
			<img
				src={book.cover}
				alt={book.title}
				class="object-cover w-full h-full"
			/>
		</a>

		<!-- Book details -->
		<div class="flex-1 space-y-3">
			<div class="font-bold text-xl">{book.title}</div>
			<div class="text-base-content/70">{book.author}</div>

			<p class="text-sm leading-relaxed text-base-content/80">
				{book.summary}
			</p>

			<a
				href={book.link}
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-outline btn-sm mt-2"
			>
				View Book
			</a>
		</div>
	</div>
</section>
