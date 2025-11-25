// src/routes/api/chat/+server.ts
import type { RequestHandler } from './$types';
// import { PRIVATE_BACKEND_API_URL, PRIVATE_BACKEND_API_KEY } from '$env/static/private';


export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const prompt = typeof body === 'object' && body !== null ? (body as any).prompt : undefined;

    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400 });
    }
    
    return new Response(JSON.stringify({ output: "Sorry! I'm still learning how to respond. In the meantime, please read more about me at: https://krru.dev/kozu" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

    // Compose request to the external API.
    // Adjust method, headers, and payload shape to your provider's spec.
    // const upstreamResp = await fetch(PRIVATE_BACKEND_API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Use your provider's auth header format (Bearer shown as example)
    //     Authorization: `Bearer ${PRIVATE_BACKEND_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     // Example minimal payload — change to match the API you're calling.
    //     prompt
    //   })
    // });

    // const text = await upstreamResp.text().catch(() => '');
    // // If upstream returned JSON content, forward it parsed; otherwise pass raw text.
    // const contentType = upstreamResp.headers.get('content-type') ?? '';

    // if (contentType.includes('application/json')) {
    //   // forward JSON response with the same status code
    //   return new Response(text, {
    //     status: upstreamResp.status,
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // } else {
    //   // non-JSON fallback
    //   return new Response(JSON.stringify({ output: text }), {
    //     status: upstreamResp.status,
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
