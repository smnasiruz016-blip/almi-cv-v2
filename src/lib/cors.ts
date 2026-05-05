export const ALLOWED_ORIGINS = [
  "https://almisalary.almiworld.com",
  "https://almiworld.com",
  "https://www.almiworld.com",
] as const;

type AllowedOrigin = (typeof ALLOWED_ORIGINS)[number];

function isAllowed(origin: string | null): origin is AllowedOrigin {
  return origin !== null && (ALLOWED_ORIGINS as readonly string[]).includes(origin);
}

export function corsHeaders(origin: string | null): Record<string, string> {
  if (!isAllowed(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function handleOptions(req: Request): Response {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);
  if (Object.keys(headers).length === 0) {
    return new Response(null, { status: 403 });
  }
  return new Response(null, { status: 204, headers });
}
