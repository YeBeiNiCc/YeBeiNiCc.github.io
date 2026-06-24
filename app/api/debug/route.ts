export async function GET() {
  const envVars = {
    hasClientId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    clientIdPrefix: process.env.KEYSTATIC_GITHUB_CLIENT_ID?.substring(0, 8) + "...",
    hasClientSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    clientSecretPrefix: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET?.substring(0, 4) + "...",
    hasSecret: !!process.env.KEYSTATIC_SECRET,
    secretLength: process.env.KEYSTATIC_SECRET?.length,
    hasAppSlug: !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
    appSlug: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
  };

  return Response.json(envVars);
}
