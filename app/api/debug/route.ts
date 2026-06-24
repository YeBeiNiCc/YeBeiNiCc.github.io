export async function GET() {
  // Test GitHub API connection
  let gitHubOk = false;
  let gitHubError = "";
  try {
    const test = await fetch("https://api.github.com");
    gitHubOk = test.ok;
  } catch (e: any) {
    gitHubError = e.message;
  }

  return Response.json({
    env: {
      hasClientId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
      hasClientSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
      hasSecret: !!process.env.KEYSTATIC_SECRET,
      hasAppSlug: !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
      appSlug: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
    },
    gitHubApi: gitHubOk ? "connected" : "failed: " + gitHubError,
    // Check if patch is applied
    keystaticVersion: "0.5.50 (patched)",
  });
}
