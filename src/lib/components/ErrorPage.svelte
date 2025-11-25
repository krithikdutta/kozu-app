<script lang="ts">
	const { status = 404, message = "Page not found", description = "The page you're looking for doesn't exist or has been moved." } = $props();

	const errorDetails: Record<number, { title: string; desc: string }> = {
		404: {
			title: "Page not found",
			desc: "The page you're looking for doesn't exist or has been moved."
		},
		500: {
			title: "Server error",
			desc: "Something went wrong on our end. We're working to fix it."
		},
		403: {
			title: "Access denied",
			desc: "You don't have permission to access this resource."
		},
		503: {
			title: "Service unavailable",
			desc: "The service is temporarily unavailable. Please try again later."
		}
	};

	// derived value (replaces `$:`)
	const error = $derived(errorDetails[status] ?? { title: message, desc: description });
</script>

  
  <section class="min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-2xl">
      <div class="rounded-box p-8 md:p-12 bg-base-200 border border-base-300 shadow-md text-center">
        <!-- Error Code -->
        <div class="text-7xl md:text-8xl font-extrabold text-primary/20 mb-2">{status}</div>
        
        <!-- Error Message -->
        <h1 class="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
          {error.title}
        </h1>
        <p class="text-base-content/80 max-w-md mx-auto mb-8">
          {error.desc}
        </p>
        
        <!-- Quick Stats (reusing your design) -->
        <div class="rounded-xl p-4 bg-base-300 border border-base-200 mb-8 max-w-md mx-auto">
          <div class="text-sm text-base-content/80 mb-3">Helpful links</div>
          <div class="grid grid-cols-3 gap-3">

            <a
              href="/"
              class="rounded-lg p-3 bg-neutral/10 hover:bg-neutral/20 transition-colors
                     flex flex-col items-center justify-center text-center gap-1"
            >
              <div class="text-xs">Home</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </a>
          
            <a
              href="/blog"
              class="rounded-lg p-3 bg-neutral/10 hover:bg-neutral/20 transition-colors
                     flex flex-col items-center justify-center text-center gap-1"
            >
              <div class="text-xs">Blog</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </a>
          
            <a
              href="/resources"
              class="rounded-lg p-3 bg-neutral/10 hover:bg-neutral/20 transition-colors
                     flex flex-col items-center justify-center text-center gap-1"
            >
              <div class="text-xs">Resources</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4.867 19.125h.008v.008h-.008v-.008Z" />
              </svg>
            </a>
          
          </div>
        </div>         
      </div>
    </div>
  </section>