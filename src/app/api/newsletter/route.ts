import { prisma } from "@/lib/db";
import {
  EMAIL_RE,
  NEWSLETTER_SOURCE_WHITELIST,
  RATE_LIMIT_PER_IP,
  RATE_WINDOW_MS,
} from "@/lib/subscribers-shared";
import { getIpHash } from "@/lib/ip-hash";
import { corsHeaders, handleOptions } from "@/lib/cors";

const FALLBACK_GLOBAL_PER_WINDOW = 50;
const FALLBACK_GLOBAL_KEY = "__no_hash__";
const buckets = new Map<string, number[]>();

function rateLimitOk(key: string, max: number): boolean {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const prev = buckets.get(key) ?? [];
  const recent = prev.filter((t) => t > cutoff);
  if (recent.length >= max) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  return true;
}

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function jsonResponse(
  body: Record<string, unknown>,
  init: { status: number; headers: Record<string, string> },
): Response {
  return new Response(JSON.stringify(body), {
    status: init.status,
    headers: { "Content-Type": "application/json", ...init.headers },
  });
}

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);
  if (Object.keys(headers).length === 0) {
    return jsonResponse(
      { ok: false, error: "Origin not allowed" },
      { status: 403, headers },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(
      { ok: false, error: "Invalid JSON" },
      { status: 400, headers },
    );
  }

  const input = body as {
    email?: unknown;
    source?: unknown;
    website?: unknown;
  };

  // Honeypot — silent fake-success, no DB write.
  const website = typeof input.website === "string" ? input.website : "";
  if (website.trim().length > 0) {
    return jsonResponse({ ok: true }, { status: 200, headers });
  }

  const emailRaw = typeof input.email === "string" ? input.email : "";
  const email = emailRaw.trim().toLowerCase();
  if (!email) {
    return jsonResponse(
      { ok: false, error: "Email is required" },
      { status: 400, headers },
    );
  }
  if (email.length > 254) {
    return jsonResponse(
      { ok: false, error: "Email is too long" },
      { status: 400, headers },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return jsonResponse(
      { ok: false, error: "Please enter a valid email address" },
      { status: 400, headers },
    );
  }

  const sourceRaw = typeof input.source === "string" ? input.source.trim() : "";
  let source: string;
  if (!sourceRaw) {
    source = "homepage_footer";
  } else if (
    (NEWSLETTER_SOURCE_WHITELIST as readonly string[]).includes(sourceRaw)
  ) {
    source = sourceRaw;
  } else {
    return jsonResponse(
      { ok: false, error: "Invalid source" },
      { status: 400, headers },
    );
  }

  const ip = getClientIp(req);
  const ipHash = ip === "unknown" ? null : getIpHash(ip);
  const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

  const rateKey = ipHash ?? FALLBACK_GLOBAL_KEY;
  const rateMax = ipHash ? RATE_LIMIT_PER_IP : FALLBACK_GLOBAL_PER_WINDOW;
  if (!rateLimitOk(rateKey, rateMax)) {
    return jsonResponse(
      { ok: false, error: "Too many requests. Please try again in an hour." },
      { status: 429, headers },
    );
  }

  // Privacy-first dedup: respond with the same generic success whether the
  // address is new, already subscribed, or already an opted-in user — no leak.
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { marketingOptIn: true },
  });
  if (existingUser?.marketingOptIn) {
    return jsonResponse({ ok: true }, { status: 200, headers });
  }

  const existingSub = await prisma.subscriber.findUnique({
    where: { email },
    select: { id: true, unsubscribedAt: true },
  });

  if (existingSub) {
    if (existingSub.unsubscribedAt === null) {
      return jsonResponse({ ok: true }, { status: 200, headers });
    }
    await prisma.subscriber.update({
      where: { id: existingSub.id },
      data: {
        unsubscribedAt: null,
        subscribedAt: new Date(),
        source,
        ipAddress: null,
        ipHash,
        userAgent,
      },
    });
    return jsonResponse({ ok: true }, { status: 200, headers });
  }

  await prisma.subscriber.create({
    data: {
      email,
      source,
      ipAddress: null,
      ipHash,
      userAgent,
    },
  });
  return jsonResponse({ ok: true }, { status: 200, headers });
}
