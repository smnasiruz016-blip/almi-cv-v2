"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isOwner } from "@/lib/owner";
import { EMAIL_RE, RATE_LIMIT_PER_IP, RATE_WINDOW_MS } from "@/lib/subscribers-shared";

type Result<T = undefined> =
  | (T extends undefined ? { ok: true } : { ok: true } & T)
  | { ok: false; error: string };

// In-memory rate limit map. NOTE: per-Vercel-function-instance, not global.
// With N warm instances, an attacker can theoretically get ~N×5 hits/hour
// from one IP. Acceptable for pre-launch zero-traffic state. Upgrade to
// Upstash Redis (single global counter) before scaling traffic.
const rateBuckets = new Map<string, number[]>();

function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const prev = rateBuckets.get(ip) ?? [];
  const recent = prev.filter((t) => t > cutoff);
  if (recent.length >= RATE_LIMIT_PER_IP) {
    rateBuckets.set(ip, recent);
    return false;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  return true;
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  // Vercel injects x-forwarded-for; first comma-separated entry is the
  // closest client. Fall back gracefully so local dev still works.
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = h.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

async function getUserAgent(): Promise<string | null> {
  const h = await headers();
  return h.get("user-agent");
}

async function ownerGate(): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await requireUser();
  if (!isOwner(user.email)) return { ok: false, error: "Unauthorized" };
  return { ok: true };
}

export async function subscribeToNewsletter(input: {
  email: string;
  source?: string;
  // Honeypot: a hidden field that real users never see; bots fill all fields.
  // Non-empty value → silent fake-success, no DB write.
  website?: string;
}): Promise<Result<{ alreadySubscribed: boolean }>> {
  // Honeypot: respond as if we accepted, never touch the DB.
  if (input.website && input.website.trim().length > 0) {
    return { ok: true, alreadySubscribed: false };
  }

  const email = (input.email ?? "").trim().toLowerCase();
  if (!email) return { ok: false, error: "Email is required" };
  if (email.length > 254) return { ok: false, error: "Email is too long" };
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address" };
  }

  const ip = await getClientIp();
  if (!rateLimitOk(ip)) {
    return {
      ok: false,
      error: "Too many requests. Please try again in an hour.",
    };
  }

  const source = (input.source ?? "homepage").trim().slice(0, 40) || "homepage";
  const ua = await getUserAgent();
  const uaTrimmed = ua ? ua.slice(0, 500) : null;

  // Privacy-first dedup: if the email already lives anywhere in our system
  // (User.marketingOptIn=true OR active Subscriber row), respond with the
  // same generic success — no info leak about whether the email has an
  // account or not.
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { marketingOptIn: true },
  });
  if (existingUser?.marketingOptIn) {
    return { ok: true, alreadySubscribed: true };
  }

  const existingSub = await prisma.subscriber.findUnique({
    where: { email },
    select: { id: true, unsubscribedAt: true },
  });

  if (existingSub) {
    if (existingSub.unsubscribedAt === null) {
      return { ok: true, alreadySubscribed: true };
    }
    // Re-subscribe an unsubscribed row.
    await prisma.subscriber.update({
      where: { id: existingSub.id },
      data: {
        unsubscribedAt: null,
        subscribedAt: new Date(),
        source,
        ipAddress: ip === "unknown" ? null : ip,
        userAgent: uaTrimmed,
      },
    });
    return { ok: true, alreadySubscribed: false };
  }

  await prisma.subscriber.create({
    data: {
      email,
      source,
      ipAddress: ip === "unknown" ? null : ip,
      userAgent: uaTrimmed,
    },
  });

  return { ok: true, alreadySubscribed: false };
}

export type SubscriberRow = {
  id: string;
  email: string;
  source: string;
  subscribedAt: string;
};

export async function listAllSubscribersForAdmin(): Promise<
  Result<{ subscribers: SubscriberRow[] }>
> {
  const gate = await ownerGate();
  if (!gate.ok) return gate;

  const rows = await prisma.subscriber.findMany({
    where: { unsubscribedAt: null },
    orderBy: { subscribedAt: "desc" },
    select: {
      id: true,
      email: true,
      source: true,
      subscribedAt: true,
    },
  });

  return {
    ok: true,
    subscribers: rows.map((r) => ({
      id: r.id,
      email: r.email,
      source: r.source,
      subscribedAt: r.subscribedAt.toISOString(),
    })),
  };
}

export async function deleteSubscriber(input: {
  subscriberId: string;
}): Promise<Result> {
  const gate = await ownerGate();
  if (!gate.ok) return gate;
  if (!input.subscriberId) {
    return { ok: false, error: "subscriberId required" };
  }
  await prisma.subscriber.delete({ where: { id: input.subscriberId } });
  revalidatePath("/admin/reviews");
  return { ok: true };
}

export type UnifiedStats = {
  usersOptedIn: number;
  subscribers: number;
  overlap: number;
  unique: number;
};

export async function getUnifiedEmailListStats(): Promise<Result<UnifiedStats>> {
  const gate = await ownerGate();
  if (!gate.ok) return gate;

  const [userEmailRows, subscriberEmailRows] = await Promise.all([
    prisma.user.findMany({
      where: { marketingOptIn: true },
      select: { email: true },
    }),
    prisma.subscriber.findMany({
      where: { unsubscribedAt: null },
      select: { email: true },
    }),
  ]);

  const userSet = new Set(userEmailRows.map((u) => u.email.toLowerCase().trim()));
  const subSet = new Set(
    subscriberEmailRows.map((s) => s.email.toLowerCase().trim()),
  );

  let overlap = 0;
  for (const e of userSet) if (subSet.has(e)) overlap += 1;

  const usersOptedIn = userSet.size;
  const subscribers = subSet.size;
  const unique = usersOptedIn + subscribers - overlap;

  return {
    ok: true,
    usersOptedIn,
    subscribers,
    overlap,
    unique,
  };
}

export type UnifiedExportRow = {
  email: string;
  name: string;
  optedInAt: string | null;
  source: "user_account" | "subscriber" | "user_account_and_subscriber";
};

export async function exportUnifiedEmailListCSV(): Promise<
  Result<{ rows: UnifiedExportRow[] }>
> {
  const gate = await ownerGate();
  if (!gate.ok) return gate;

  const [users, subs] = await Promise.all([
    prisma.user.findMany({
      where: { marketingOptIn: true },
      select: { email: true, name: true, marketingOptInAt: true },
    }),
    prisma.subscriber.findMany({
      where: { unsubscribedAt: null },
      select: { email: true, subscribedAt: true },
    }),
  ]);

  // Merge keyed by lowercase-trimmed email. Earliest opt-in wins.
  const merged = new Map<string, UnifiedExportRow>();

  for (const u of users) {
    const key = u.email.toLowerCase().trim();
    merged.set(key, {
      email: u.email,
      name: u.name,
      optedInAt: u.marketingOptInAt?.toISOString() ?? null,
      source: "user_account",
    });
  }

  for (const s of subs) {
    const key = s.email.toLowerCase().trim();
    const subAt = s.subscribedAt.toISOString();
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, {
        email: s.email,
        name: "",
        optedInAt: subAt,
        source: "subscriber",
      });
    } else {
      // Email lives on both sides → mark merged source + earliest date.
      const earlier =
        existing.optedInAt === null
          ? subAt
          : new Date(existing.optedInAt) < new Date(subAt)
            ? existing.optedInAt
            : subAt;
      merged.set(key, {
        ...existing,
        optedInAt: earlier,
        source: "user_account_and_subscriber",
      });
    }
  }

  // Sort by opt-in date desc (most recent first), nulls last.
  const rows = Array.from(merged.values()).sort((a, b) => {
    if (a.optedInAt === b.optedInAt) return 0;
    if (a.optedInAt === null) return 1;
    if (b.optedInAt === null) return -1;
    return a.optedInAt < b.optedInAt ? 1 : -1;
  });

  return { ok: true, rows };
}
