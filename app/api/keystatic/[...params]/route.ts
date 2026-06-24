import keystaticConfig from "@/keystatic.config";

async function createHandler() {
  const { makeRouteHandler } = await import("@keystatic/next/route-handler");
  return makeRouteHandler({
    config: keystaticConfig,
    clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID!,
    clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET!,
    secret: process.env.KEYSTATIC_SECRET!,
  });
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
