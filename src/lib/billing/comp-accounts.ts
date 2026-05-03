"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isOwner } from "@/lib/owner";

const DAY_MS = 24 * 60 * 60 * 1000;

type ActionResult<T = undefined> =
  | (T extends undefined ? { ok: true } : { ok: true } & T)
  | { ok: false; error: string };

async function gate(): Promise<
  { ok: true; adminEmail: string } | { ok: false; error: string }
> {
  const user = await requireUser();
  if (!isOwner(user.email)) return { ok: false, error: "Unauthorized" };
  return { ok: true, adminEmail: user.email };
}

export async function grantCompPro(input: {
  email: string;
  days?: number;
  reason?: string;
}): Promise<ActionResult<{ userId: string }>> {
  const g = await gate();
  if (!g.ok) return g;

  const email = input.email.trim().toLowerCase();
  if (!email) return { ok: false, error: "Email is required" };
  const days = Math.floor(input.days ?? 90);
  if (!Number.isFinite(days) || days <= 0 || days > 365 * 5) {
    return { ok: false, error: "Days must be between 1 and 1825" };
  }

  const target = await prisma.user.findUnique({
    where: { email },
    select: { id: true, compProUntil: true },
  });
  if (!target) return { ok: false, error: `No user with email ${email}` };

  if (target.compProUntil && target.compProUntil.getTime() > Date.now()) {
    return {
      ok: false,
      error: "User already has an active comp — use Extend instead",
    };
  }

  const now = new Date();
  const until = new Date(now.getTime() + days * DAY_MS);

  await prisma.user.update({
    where: { id: target.id },
    data: {
      compProUntil: until,
      compGrantedAt: now,
      compGrantedBy: g.adminEmail,
      compReason: input.reason?.trim() || null,
    },
  });

  revalidatePath("/admin/comp-accounts");
  return { ok: true, userId: target.id };
}

export async function revokeCompPro(input: {
  userId: string;
}): Promise<ActionResult> {
  const g = await gate();
  if (!g.ok) return g;
  if (!input.userId) return { ok: false, error: "userId required" };

  const target = await prisma.user.findUnique({
    where: { id: input.userId },
    select: { id: true },
  });
  if (!target) return { ok: false, error: "User not found" };

  await prisma.user.update({
    where: { id: target.id },
    data: {
      compProUntil: null,
      compGrantedAt: null,
      compGrantedBy: null,
      compReason: null,
    },
  });

  revalidatePath("/admin/comp-accounts");
  return { ok: true };
}

export async function extendCompPro(input: {
  userId: string;
  additionalDays: number;
}): Promise<ActionResult> {
  const g = await gate();
  if (!g.ok) return g;
  const days = Math.floor(input.additionalDays);
  if (!Number.isFinite(days) || days <= 0 || days > 365 * 5) {
    return { ok: false, error: "additionalDays must be between 1 and 1825" };
  }

  const target = await prisma.user.findUnique({
    where: { id: input.userId },
    select: { id: true, compProUntil: true },
  });
  if (!target) return { ok: false, error: "User not found" };

  // Extend from whichever is later (now or current expiry) — so revoking and
  // re-extending on an already-expired comp doesn't accidentally credit days
  // in the past.
  const base = target.compProUntil && target.compProUntil.getTime() > Date.now()
    ? target.compProUntil.getTime()
    : Date.now();
  const until = new Date(base + days * DAY_MS);

  await prisma.user.update({
    where: { id: target.id },
    data: {
      compProUntil: until,
      // Preserve compGrantedAt / compGrantedBy / compReason from the original
      // grant — extension is not a new grant, it's a top-up.
    },
  });

  revalidatePath("/admin/comp-accounts");
  return { ok: true };
}

export type CompAccountRow = {
  userId: string;
  email: string;
  name: string;
  compProUntil: string;
  compGrantedAt: string | null;
  compGrantedBy: string | null;
  compReason: string | null;
  isActive: boolean;
  daysRemaining: number | null;
};

export async function listCompAccounts(): Promise<
  ActionResult<{ accounts: CompAccountRow[] }>
> {
  const g = await gate();
  if (!g.ok) return g;

  const rows = await prisma.user.findMany({
    where: { compProUntil: { not: null } },
    select: {
      id: true,
      email: true,
      name: true,
      compProUntil: true,
      compGrantedAt: true,
      compGrantedBy: true,
      compReason: true,
    },
    orderBy: { compGrantedAt: "desc" },
  });

  const now = Date.now();
  const accounts: CompAccountRow[] = rows.map((r) => {
    const untilMs = r.compProUntil!.getTime();
    const isActive = untilMs > now;
    const daysRemaining = isActive
      ? Math.ceil((untilMs - now) / DAY_MS)
      : null;
    return {
      userId: r.id,
      email: r.email,
      name: r.name,
      compProUntil: r.compProUntil!.toISOString(),
      compGrantedAt: r.compGrantedAt?.toISOString() ?? null,
      compGrantedBy: r.compGrantedBy,
      compReason: r.compReason,
      isActive,
      daysRemaining,
    };
  });

  return { ok: true, accounts };
}
