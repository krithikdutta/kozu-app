<script context="module" lang="ts">
  export type Role = 'assistant' | 'user';
  
  export interface Message {
    id: string;
    role: Role;
    text: string;
  }
  </script>
  
  <script lang="ts">
  import { onMount, tick } from 'svelte';
  
  /*************
   * Props (strict)
   *************/
  export let systemPrompt: string =
    'Hi — I can answer questions about my portfolio, tools, and analytics. Ask me anything.';
  export let apiEndpoint: string = '/api/chat';
  export let headers: Record<string, string> = { 'content-type': 'application/json' };
  export let placeholder: string = 'Ask about projects, tools, or analytics...';
  export let maxMessages: number = 0;
  export let autofocus: boolean = true;
  
  export let onMessage:
    | ((detail: { message: Message; allMessages: Message[] }) => void)
    | null = null;
  
  /*************
   * Internal state (strict)
   *************/
  let _nextId = 1;
  let messages: Message[] = [];
  let input = '';
  let loading = false;
  let messagesContainer: HTMLElement | null = null;
  let textareaEl: HTMLTextAreaElement | null = null;
  
  /*************
   * Helper functions
   *************/
  function makeId(): string {
    // deterministic-ish unique id
    return `${Date.now()}-${_nextId++}`;
  }
  
  function createMessage(role: Role, text: string): Message {
    return { id: makeId(), role, text };
  }
  
  function pushMessageToState(m: Message): void {
    const next = [...messages, m];
    if (maxMessages > 0 && next.length > maxMessages) {
    messages = next.slice(next.length - maxMessages);
    } else {
    messages = next;
    }
  }
  
  function notify(detail: { message: Message; allMessages: Message[] }): void {
    if (typeof onMessage === 'function') {
    try {
      onMessage(detail);
    } catch (err) {
      // keep UI stable even if handler throws
      // eslint-disable-next-line no-console
      console.error('onMessage handler threw', err);
    }
    }
  }
  
  async function scrollToBottom(): Promise<void> {
    // ensure DOM has updated
    await tick();
    if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
  
  /*************
   * Public methods (exported)
   *************/
  export async function send(): Promise<void> {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
  
    const userMsg = createMessage('user', trimmed);
    pushMessageToState(userMsg);
    notify({ message: userMsg, allMessages: messages });
  
    input = '';
    loading = true;
  
    await scrollToBottom();
  
    try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ prompt: trimmed })
    });
  
    if (!response.ok) {
      const txt = await response.text().catch(() => response.statusText || `Status ${response.status}`);
      throw new Error(txt || `Request failed: ${response.status}`);
    }
  
    // typed parsing of response
    type APIResponse = { reply?: string; text?: string; output?: string } | Record<string, unknown>;
    const data = (await response.json().catch(() => ({}))) as APIResponse;
    const replyText = (data && ((data as any).reply ?? (data as any).text ?? (data as any).output)) ?? '[no reply]';
    const assistantMsg = createMessage('assistant', String(replyText));
    pushMessageToState(assistantMsg);
    notify({ message: assistantMsg, allMessages: messages });
    } catch (e: unknown) {
    const errText = e instanceof Error ? e.message : String(e);
    const errMsg = createMessage('assistant', `Error: ${errText}`);
    pushMessageToState(errMsg);
    notify({ message: errMsg, allMessages: messages });
    } finally {
    loading = false;
    await scrollToBottom();
    }
  }
  
  export function reset(): void {
    _nextId = 1;
    messages = [createMessage('assistant', systemPrompt)];
    input = '';
    notify({ message: messages[0], allMessages: messages });
    // scroll after microtask so DOM updates first
    void scrollToBottom();
  }
  
  function onKey(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    // don't await here; let caller handle the promise if needed
    void send();
    }
  }
  
  /*************
   * Lifecycle
   *************/
  onMount(() => {
    // initialize conversation
    messages = [createMessage('assistant', systemPrompt)];
  
    // autofocus if requested
    if (autofocus) {
    // focus after tick to ensure element exists
    void tick().then(() => textareaEl?.focus());
    }
  
    // ensure we're scrolled to bottom initially
    void scrollToBottom();
  });
  </script>
  
<section id="chat" class="rounded-box p-6 bg-base-200 border border-base-300 shadow-md">
  <h2 class="text-2xl font-semibold">Chat assistant</h2>
  <p class="text-sm text-base-content/70 mt-1">Inspired by <i>Sacoglossa</i>, kozu is here to answer any questions you might ask me.</p>

  <div class="mt-4">
  <div class="flex flex-col chat-root rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto h-150">
  <!-- Messages -->
  <div bind:this={messagesContainer} class="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth chat-messages">
    {#if messages.length === 0}
    <div class="flex flex-col items-center justify-center h-full">
      <div class="text-5xl opacity-50 mb-2">💬</div>
      <p>Start a conversation...</p>
    </div>
    {:else}
    {#each messages as m (m.id)}
      <div class="flex flex-col {m.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300 chat-row">
      <div class="text-xs font-semibold px-2 mb-1">
        {#if m.role === 'user'}
          <span class="flex items-center gap-2">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-xs">You</span>
          </span>
        {:else}
          <span class="flex items-center gap-2">
            <img src="/images/kozu/Kozu.png" alt="Assistant avatar" class="w-4 h-4 rounded-full object-cover" />
            <span class="text-xs">kozu</span>
          </span>
        {/if}
      </div>
      <div class="bubble {
        m.role === 'user' 
          ? 'bubble-user' 
          : 'bubble-assistant'
        }">
        {m.text}
      </div>
      </div>
    {/each}
    {/if}
  
    {#if loading}
    <div class="flex flex-col items-start animate-in slide-in-from-bottom-2 duration-300 loading-row">
      <div class="text-xs font-semibold px-2 mb-1">
        <span class="flex items-center gap-2">
          <img src="/images/kozu/Kozu.png" alt="Assistant avatar" class="w-4 h-4 rounded-full object-cover" />
          <span class="text-xs">kozu</span>
        </span>
      </div>
      <div class="loading-bubble">
      <div class="flex gap-1.5">
        <span class="dot" style="animation-delay:-0.3s"></span>
        <span class="dot" style="animation-delay:-0.15s"></span>
        <span class="dot"></span>
      </div>
      </div>
    </div>
    {/if}
  </div>
  
  <!-- Input Area -->
  <div class="flex gap-3 p-6 input-area">
    <textarea
    bind:this={textareaEl}
    bind:value={input}
    on:keydown={onKey}
    disabled={loading}
    placeholder={placeholder}
    rows="1"
    class="flex-1 input-field"
    />
  
    <div class="flex flex-col gap-2 controls">
    <button
      on:click={send}
      disabled={loading || !input.trim()}
      title="Send message (Enter)"
      class="btn btn-send"
    >
      {#if loading}
      <div class="spinner"></div>
      {:else}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
      {/if}
    </button>
  
    <button
      on:click={reset}
      title="Reset conversation"
      class="btn btn-reset"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M3 21v-5h5"/>
      </svg>
    </button>
    </div>
  </div>
  </div>
</div>
</section>

<style>
  /* container */
  .chat-root {
    display: flex;
    flex-direction: column;
    background: var(--color-base-100);
    color: var(--color-base-content);
    border-radius: var(--radius-box);
    box-shadow: 0 calc(var(--depth) * 2px) calc(var(--depth) * 8px) rgba(0,0,0,0.08);
    overflow: hidden;
    min-height: 0;
    width: 100%;
    max-width: 48rem;
    margin: 0 auto;
    height: 60vh;
    max-height: 80vh;
  }

  .chat-messages {
    background: transparent;
    min-height: 0;
    padding: 1rem;
  }

  .muted {
    color: var(--color-neutral-content);
    opacity: 0.9;
  }

  .chat-row {
    width: 100%;
  }

  /* bubbles */
  .bubble {
    max-width: 85%;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-box);
    white-space: pre-wrap;
    word-break: break-word;
    border: var(--border) solid rgba(0,0,0,0.05);
  }

  .bubble-assistant {
    background: var(--color-base-300);
    color: var(--color-base-content);
    border-bottom-left-radius: calc(var(--radius-box) - 0.25rem);
  }

  .bubble-user {
    background: var(--color-primary);
    color: var(--color-primary-content);
    border-bottom-right-radius: calc(var(--radius-box) - 0.25rem);
  }

  /* loading bubble */
  .loading-bubble {
    padding: 0.75rem 1rem;
    border-radius: var(--radius-box);
    background: var(--color-base-200);
    color: var(--color-base-content);
    border: var(--border) solid rgba(0,0,0,0.05);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    display: inline-block;
    background: var(--color-info);
    opacity: 0.95;
    animation: bounce 0.9s infinite ease-in-out;
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: .6; }
    40% { transform: translateY(-6px); opacity: 1; }
  }

  /* input area */
  .input-area {
    background: var(--color-base-200);
    border-top: var(--border) solid rgba(0,0,0,0.05);
    padding: 1.25rem;
    gap: 1rem;
    align-items: center;
    position: relative;
  }

  @media (max-width: 640px) {
    .input-area {
      position: sticky;
      bottom: 0;
      z-index: 20;
      padding: 0.75rem;
      backdrop-filter: blur(6px);
      background: var(--color-base-100);
    }
  }

  .input-field {
    font: inherit;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-field);
    min-height: 44px;
    max-height: 8rem;
    resize: none;
    outline: none;
    border: var(--border) solid rgba(0,0,0,0.1);
    background: var(--color-base-100);
    color: var(--color-base-content);
    transition: box-shadow .15s, border-color .15s;
    overflow: auto;
  }

  .input-field:focus {
    box-shadow: 0 6px 18px rgba(0,0,0,0.1);
    border-color: var(--color-primary);
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    padding: 0.5rem;
    border-radius: var(--radius-field);
    font-weight: 600;
    cursor: pointer;
    transition: transform .08s ease, box-shadow .12s ease, opacity .12s ease;
    border: none;
  }

  /* Send button: solid primary */
  .btn-send {
    background: var(--color-primary);
    color: var(--color-primary-content);
    box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  }

  /* Reset button: solid neutral */
  .btn-reset {
    background: var(--color-neutral);
    color: var(--color-neutral-content);
  }

  .spinner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid rgba(0,0,0,0.1);
    border-top-color: var(--color-base-content);
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .animate-in {
    animation: slide-in-from-bottom-2 0.3s ease-out;
  }

  @keyframes slide-in-from-bottom-2 {
    from { opacity: 0; transform: translateY(0.5rem); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 640px) {
    .chat-root {
      height: calc(100vh - 120px);
      max-height: calc(100vh - 80px);
      border-radius: calc(var(--radius-box) - 0.25rem);
    }

    .bubble {
      max-width: 95%;
      padding: 0.6rem 0.9rem;
    }

    .controls {
      flex-direction: row;
    }

    .chat-messages {
      padding: 0.75rem;
    }

    .meta {
      font-size: 11px;
    }

    .btn {
      min-width: 48px;
      min-height: 48px;
    }
  }
</style>
