import { prisma } from "@/lib/db";
import {
  COMMENT_MAX,
  COMMENT_MIN,
  DISPLAY_NAME_MAX,
  IMPROVEMENT_MAX,
  REVIEW_SOURCE_WHITELIST,
} from "@/lib/reviews-shared";
import { getIpHash } from "@/lib/ip-hash";
import { corsHeaders, handleOptions } from "@/lib/cors";
import { getPublicReviewsForFeed } from "@/lib/reviews";

const RATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const FALLBACK_GLOBAL_PER_WINDOW = 20;
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

export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  const url = new URL(req.url);
  const source = url.searchParams.get("source") ?? undefined;
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  const ALLOWED_SOURCES_FOR_FEED = (
    REVIEW_SOURCE_WHITELIST as readonly string[]
  ).filter((s) => s !== "smoketest");
  if (source && !ALLOWED_SOURCES_FOR_FEED.includes(source)) {
    return Response.json(
      { error: "Invalid source" },
      { status: 400, headers },
    );
  }

  try {
    const reviews = await getPublicReviewsForFeed({ source, limit });
    return Response.json({ reviews }, { headers });
  } catch (e) {
    console.error("GET /api/public/reviews failed:", e);
    return Response.json(
      { error: "Internal server error" },
      { status: 500, headers },
    );
  }
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
    rating?: unknown;
    comment?: unknown;
    improvement?: unknown;
    displayName?: unknown;
    source?: unknown;
    website?: unknown;
  };

  // Honeypot — silent fake-success, no DB write.
  const website = typeof input.website === "string" ? input.website : "";
  if (website.trim().length > 0) {
    return jsonResponse({ ok: true }, { status: 200, headers });
  }

  const ratingRaw =
    typeof input.rating === "number" ? Math.floor(input.rating) : NaN;
  if (!Number.isFinite(ratingRaw) || ratingRaw < 1 || ratingRaw > 5) {
    return jsonResponse(
      { ok: false, error: "Rating must be between 1 and 5 stars" },
      { status: 400, headers },
    );
  }
  const rating = ratingRaw;

  const commentRaw =
    typeof input.comment === "string" ? input.comment.trim() : "";
  if (commentRaw.length < COMMENT_MIN) {
    return jsonResponse(
      {
        ok: false,
        error: `Please share at least ${COMMENT_MIN} characters of feedback`,
      },
      { status: 400, headers },
    );
  }
  if (commentRaw.length > COMMENT_MAX) {
    return jsonResponse(
      {
        ok: false,
        error: `Comment must be ${COMMENT_MAX} characters or fewer`,
      },
      { status: 400, headers },
    );
  }
  const comment = commentRaw;

  const improvementRaw =
    typeof input.improvement === "string" ? input.improvement.trim() : "";
  if (improvementRaw.length > IMPROVEMENT_MAX) {
    return jsonResponse(
      {
        ok: false,
        error: `Improvement note must be ${IMPROVEMENT_MAX} characters or fewer`,
      },
      { status: 400, headers },
    );
  }
  const improvement = improvementRaw.length > 0 ? improvementRaw : null;

  const displayNameRaw =
    typeof input.displayName === "string" ? input.displayName.trim() : "";
  if (displayNameRaw.length === 0) {
    return jsonResponse(
      { ok: false, error: "Display name is required" },
      { status: 400, headers },
    );
  }
  if (displayNameRaw.length > DISPLAY_NAME_MAX) {
    return jsonResponse(
      {
        ok: false,
        error: `Display name must be ${DISPLAY_NAME_MAX} characters or fewer`,
      },
      { status: 400, headers },
    );
  }
  const displayName = displayNameRaw;

  const sourceRaw = typeof input.source === "string" ? input.source.trim() : "";
  if (
    !sourceRaw ||
    !(REVIEW_SOURCE_WHITELIST as readonly string[]).includes(sourceRaw)
  ) {
    return jsonResponse(
      { ok: false, error: "Invalid source" },
      { status: 400, headers },
    );
  }
  const source = sourceRaw;

  const ip = getClientIp(req);
  const ipHash = ip === "unknown" ? null : getIpHash(ip);
  const rateKey = ipHash ?? FALLBACK_GLOBAL_KEY;
  const rateMax = ipHash ? MAX_PER_WINDOW : FALLBACK_GLOBAL_PER_WINDOW;
  if (!rateLimitOk(rateKey, rateMax)) {
    return jsonResponse(
      { ok: false, error: "Too many requests. Please try again in an hour." },
      { status: 429, headers },
    );
  }

  // showOnSite=false by default — admin must approve before public display.
  // This is a moderation gate that does not exist on the logged-in flow,
  // and is critical for cross-product anonymous writes.
  await prisma.review.create({
    data: {
      userId: null,
      rating,
      comment,
      improvement,
      displayName,
      source,
      ipHash,
      showOnSite: false,
    },
  });

  return jsonResponse({ ok: true }, { status: 200, headers });
}
