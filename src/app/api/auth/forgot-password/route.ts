import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/db";
import { getIpHash } from "@/lib/ip-hash";
import { sendPasswordResetEmail } from "@/lib/email";

const RATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_EMAIL = 3;
const MAX_PER_IP = 5;
const TOKEN_TTL_MS = 60 * 60 * 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "https://almicv.almiworld.com";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const input = body as { email?: unknown };
  const emailRaw = typeof input.email === "string" ? input.email : "";
  const email = emailRaw.trim().toLowerCase();

  // Generic 200 for any well-formed request — never leak whether the email
  // is valid, exists, or hit a rate limit.
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return Response.json({ ok: true });
  }

  const ip = getClientIp(req);
  const ipHash = ip === "unknown" ? null : getIpHash(ip);

  const emailKey = `email:${email}`;
  const ipKey = ipHash ? `ip:${ipHash}` : null;

  if (!rateLimitOk(emailKey, MAX_PER_EMAIL)) {
    return Response.json({ ok: true });
  }
  if (ipKey && !rateLimitOk(ipKey, MAX_PER_IP)) {
    return Response.json({ ok: true });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (user) {
    const rawToken = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    const resetUrl = `${getBaseUrl()}/reset-password?token=${rawToken}`;

    try {
      await sendPasswordResetEmail({ to: email, resetUrl });
    } catch (err) {
      console.error("[forgot-password] email send failed:", err);
    }
  }

  return Response.json({ ok: true });
}
