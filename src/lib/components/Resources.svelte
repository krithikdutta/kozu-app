<script lang="ts">
  // 1. Import the data directly
  import rawResources from '$lib/data/resources.yaml'; // Adjust path as needed

  // Explicit resource type to avoid implicit 'any'
  type Resource = {
    name: string;
    section: string;
    desc?: string;
    href?: string;
    [key: string]: any;
  };

  // Cast imported YAML to the typed array
  const resources: Resource[] = rawResources as any as Resource[];

  // 2. Get unique sections and sort them alphabetically
  const sections: string[] = [...new Set(resources.map((r: Resource) => r.section))].sort();

  // 3. Create a structured array where items are grouped by section and sorted by name
  const groupedResources = sections.map((section: string) => {
    return {
      title: section,
      items: resources
        .filter((r: Resource) => r.section === section)
        .sort((a: Resource, b: Resource) => a.name.localeCompare(b.name))
    };
  });
</script>

<div class="space-y-8">
  {#each groupedResources as group}
    <div>
      <h3 class="text-xl font-bold mb-4 text-base-content border-b border-base-300 pb-2">
        {group.title}
      </h3>

      <div class="grid sm:grid-cols-2 md:grid-cols-2 gap-4">
        {#each group.items as resource}
          <a class="block rounded-lg p-4 bg-base-200 border border-base-300 hover:scale-[1.01] transition-transform" href={resource.href} target="_blank" rel="noopener noreferrer">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h4 class="text-base font-semibold">{resource.name}</h4>
                <p class="text-sm text-base-content/70 mt-1">{resource.desc}</p>
              </div>
              <div class="hidden sm:flex items-center">
                {#if group.title == "Tools"}
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>   
                {:else if group.title == "Papers"}
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>  
                {:else if group.title == "Videos"}
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                </svg>
                {:else}
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>                
                {/if}         
              </div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/each}
</div>