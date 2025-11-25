<script lang="ts">
import Chatbot from '$lib/components/Chatbot.svelte';
import Readings from '$lib/components/Readings.svelte';
import type { Message } from '$lib/components/Chatbot.svelte';

function handleMessage({ message, allMessages }: { message: Message; allMessages: Message[] }) {
    console.log('New message from child:', message.text);
    console.log('Total messages now:', allMessages.length);
}

const API_URL = "/api/chat";
</script>

<section class="grid gap-8 container mx-auto px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-4xl mx-auto">
    <div class="flex justify-center mb-6">
      <img
        src="/images/kozu/headshot.jpeg"
        alt="Krithik Dutta headshot"
        loading="lazy"
        decoding="async"
        class="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-2 border-primary"
      />
    </div>
    <section class="rounded-box p-6 bg-base-200 border border-base-300 shadow-md">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="flex-1 text-center">
            <h1 class="text-2xl md:text-4xl font-extrabold leading-tight">Building Robust Analytics for Agile Teams</h1>
            <p class="mt-3 text-base-content/80 max-w-2xl mx-auto">
              I transform legacy decision support systems into AI-powered agents. I architect clean, reliable and automated systems so your team can move on to the next big thing!
            </p>

            <div class="mt-5 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
              <a href="/resume.pdf" download="Krithik-Dutta-Resume.pdf" class="btn btn-primary w-full sm:w-auto text-center">Download resume</a>
              <a href="#chat" class="btn btn-outline w-full sm:w-auto text-center">Talk to kozu</a>
            </div>
          </div>
        </div>
      </section>
  </div>

  <div class="w-full max-w-4xl mx-auto">
  <section class="w-full max-w-4xl mx-auto mt-10">
    <div class="rounded-xl p-6 bg-base-200 border border-base-300 shadow-md">

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="rounded-lg p-4 bg-neutral/10 text-center border border-primary hover:shadow-primary/40 hover:shadow-lg transition">
          <div class="text-2xl font-bold">7+</div>
          <div class="text-xs text-base-content/70">Years of Experience</div>
        </div>

        <div class="rounded-lg p-4 bg-neutral/10 text-center border border-primary hover:shadow-primary/40 hover:shadow-lg transition">
          <div class="text-2xl font-bold">5</div>
          <div class="text-xs text-base-content/70">Projects Lead</div>
        </div>

        <div class="rounded-lg p-4 bg-neutral/10 text-center border border-primary hover:shadow-primary/40 hover:shadow-lg transition">
          <div class="text-2xl font-bold">50+</div>
          <div class="text-xs text-base-content/70">Technologies Adopted</div>
        </div>
      </div>
    </div>
  </section>
  </div>

  <div class="w-full max-w-4xl mx-auto">
    <Readings
      book={{
        title: "Good Economics for Hard Times",
        author: "Abhijit V. Banerjee & Esther Duflo",
        cover: "/images/books/geht.webp",
        link: "https://www.amazon.in/Good-Economics-Hard-Times-Problems/dp/9353450705",
        summary: "Why are some countries poor, and some countries rich? Should the United States trade more or less with China? Should the United States have a universal basic income? What can we do to mitigate climate change? Why does racism persist and how can we fight it?"
      }}
    />
  </div>

  <div id="chat" class="w-full max-w-4xl mx-auto">
    <Chatbot 
      apiEndpoint={API_URL} 
      systemPrompt="Hi! I'm kozu, Krithik's virtual assistant. Ask me anything about him."
      onMessage={handleMessage}
      autofocus={false}
      placeholder="Ask kozu.."
    />
  </div>
</section>
