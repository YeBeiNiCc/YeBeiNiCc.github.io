import keystaticConfig from "@/keystatic.config";

// Dynamic import so build doesn't fail when env vars aren't set
async function createHandler() {
  try {
    const { makeRouteHandler } = await import("@keystatic/next/route-handler");
    return makeRouteHandler({ config: keystaticConfig });
  } catch {
    return {
      GET: () => new Response("Keystatic not configured", { status: 500 }),
      POST: () => new Response("Keystatic not configured", { status: 500 }),
    };
  }
}

const handler = createHandler();

export async function GET(request: Request) {
  const h = await handler;
  return h.GET(request);
}

export async function POST(request: Request) {
  const h = await handler;
  return h.POST(request);
}
