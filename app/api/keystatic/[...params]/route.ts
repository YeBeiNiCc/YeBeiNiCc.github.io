import keystaticConfig from "@/keystatic.config";

// Helper to serialize cookies for the Keystatic frontend
function cookie(name: string, value: string, options: { maxAge?: number; httpOnly?: boolean } = {}) {
  const parts = [`${name}=${value}`, "Path=/", "SameSite=Lax"];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  if (options.maxAge) parts.push(`Max-Age=${options.maxAge}`);
  if (options.httpOnly) parts.push("HttpOnly");
  return parts.join("; ");
}

// Lazy-load the Keystatic route handler only for routes we don't override
async function getKeystaticHandler() {
  try {
    const { makeRouteHandler } = await import("@keystatic/next/route-handler");
    return makeRouteHandler({ config: keystaticConfig });
  } catch {
    return {
      GET: (r: Request) => new Response("Keystatic not configured", { status: 500 }),
      POST: (r: Request) => new Response("Keystatic not configured", { status: 500 }),
    };
  }
}

// Custom handler: GitHub login (redirect to OAuth authorize page)
async function handleLogin(request: Request) {
  const reqUrl = new URL(request.url);
  const state = Array.from({ length: 10 }, () => Math.random().toString(36)[2]).join("");
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", process.env.KEYSTATIC_GITHUB_CLIENT_ID!);
  authorizeUrl.searchParams.set("redirect_uri", `${reqUrl.origin}/api/keystatic/github/oauth/callback`);

  const headers = new Headers();
  headers.set("Location", authorizeUrl.toString());
  // Set state cookie for CSRF protection
  headers.append("Set-Cookie", cookie(`ks-${state}`, "/", { maxAge: 86400 }));

  return new Response(null, { status: 307, headers });
}

// Custom handler: OAuth callback - exchange code for token
async function handleCallback(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const tokenUrl = new URL("https://github.com/login/oauth/access_token");
  tokenUrl.searchParams.set("client_id", process.env.KEYSTATIC_GITHUB_CLIENT_ID!);
  tokenUrl.searchParams.set("client_secret", process.env.KEYSTATIC_GITHUB_CLIENT_SECRET!);
  tokenUrl.searchParams.set("code", code);

  const tokenRes = await fetch(tokenUrl.toString(), {
    method: "POST",
    headers: { Accept: "application/json" },
  });

  if (!tokenRes.ok) {
    return new Response("GitHub token exchange failed", { status: 401 });
  }

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    return new Response("No access token in response", { status: 401 });
  }

  // OAuth App tokens don't have expires_in/refresh_token, use fallbacks
  const expiresIn = tokenData.expires_in ?? 31536000;
  const refreshToken = tokenData.refresh_token ?? tokenData.access_token;

  const headers = new Headers();
  headers.append("Set-Cookie", cookie("keystatic-gh-access-token", tokenData.access_token, { maxAge: expiresIn }));
  headers.append("Set-Cookie", cookie("keystatic-gh-refresh-token", refreshToken, { maxAge: expiresIn, httpOnly: true }));
  headers.set("Location", "/keystatic");

  return new Response(null, { status: 307, headers });
}

// Custom handler: Token refresh (OAuth Apps don't support refresh, just return existing)
async function handleRefreshToken(request: Request) {
  const cookies = request.headers.get("cookie") || "";
  const match = cookies.match(/keystatic-gh-access-token=([^;]+)/);
  const accessToken = match?.[1];

  if (!accessToken) {
    return new Response("Not authenticated", { status: 401 });
  }

  const headers = new Headers();
  headers.append("Set-Cookie", cookie("keystatic-gh-access-token", accessToken, { maxAge: 31536000 }));
  headers.append("Set-Cookie", cookie("keystatic-gh-refresh-token", accessToken, { maxAge: 31536000, httpOnly: true }));

  return new Response(null, { status: 200, headers });
}

// Custom handler: Logout
async function handleLogout() {
  const headers = new Headers();
  headers.append("Set-Cookie", cookie("keystatic-gh-access-token", "", { maxAge: 0 }));
  headers.append("Set-Cookie", cookie("keystatic-gh-refresh-token", "", { maxAge: 0 }));
  headers.set("Location", "/keystatic");
  return new Response(null, { status: 307, headers });
}

export async function GET(request: Request) {
  const path = new URL(request.url).pathname.replace(/^\/api\/keystatic\/?/, "");

  switch (path) {
    case "github/login":
    case "github/repo-not-found":
      return handleLogin(request);
    case "github/oauth/callback":
      return handleCallback(request);
    default: {
      const h = await getKeystaticHandler();
      return h.GET(request);
    }
  }
}

export async function POST(request: Request) {
  const path = new URL(request.url).pathname.replace(/^\/api\/keystatic\/?/, "");

  switch (path) {
    case "github/refresh-token":
      return handleRefreshToken(request);
    case "github/logout":
      return handleLogout();
    default: {
      const h = await getKeystaticHandler();
      return h.POST(request);
    }
  }
}
