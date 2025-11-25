interface PostMetadata {
	title: string;
	date: string;
	author: string;
	layout?: string;
}

interface Post {
	metadata: PostMetadata;
}

interface PostWithSlug extends PostMetadata {
	slug: string;
}

export async function load() {
	const posts = import.meta.glob<Post>('./**/+page.md', { eager: true });
	
	const postsList: PostWithSlug[] = Object.entries(posts).map(([path, post]) => {
		const slug = path.match(/\.\/(.+)\/\+page\.md$/)?.[1];
		return {
			slug: slug || '',
			...post.metadata
		};
	});
	
	return {
		posts: postsList.sort((a, b) => 
			new Date(b.date).getTime() - new Date(a.date).getTime()
		)
	};
}