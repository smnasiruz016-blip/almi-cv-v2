import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  compActive,
  paidActive,
  planWhere,
  trialActive,
} from "@/lib/billing/plan-where";

// Owner-only network stats for AlmiWorld HQ. Read-only, this app's OWN DB only.
// Guarded by ADMIN_API_SECRET (header x-admin-secret) — FAIL-CLOSED: if the
// secret is unset the endpoint always 401s, so it is never open by default.
//
// THE COUNTS HERE MUST MATCH isProActive(). They previously did not: `trialing`
// and `paid` filtered on subscriptionStatus alone, with no
// subscriptionCurrentPeriodEnd clause, so a lapsed subscriber whose row still
// said "active" was reported to HQ as paying while the product denied them
// access. `free` was then derived by subtraction from those numbers, so one
// missing clause skewed all three. They now use the shared predicates in
// lib/billing/plan-where.ts, and `free` is counted directly instead of inferred.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret || req.headers.get("x-admin-secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const startToday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const d7 = new Date(now.getTime() - 7 * 864e5);
  const d30 = new Date(now.getTime() - 30 * 864e5);

  const [accounts, today, s7, s30, trialing, billing, comp, free, owner] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: startToday } } }),
      prisma.user.count({ where: { createdAt: { gte: d7 } } }),
      prisma.user.count({ where: { createdAt: { gte: d30 } } }),
      prisma.user.count({ where: trialActive(now) }),
      prisma.user.count({ where: paidActive(now) }),
      // planWhere("comp"), not the raw compActive predicate, so the owner is
      // carved out here exactly as it is in the other buckets.
      prisma.user.count({ where: planWhere("comp", now) }),
      prisma.user.count({ where: planWhere("free", now) }),
      prisma.user.count({ where: planWhere("owner", now) }),
    ]);

  // `paid` keeps its existing meaning for HQ — everyone with Pro access who is
  // not on a trial, i.e. real subscribers plus comped accounts. It is reported
  // alongside its parts so the number can be read without guessing.
  const paid = billing + comp;

  return NextResponse.json({
    accounts,
    signups: { today, d7: s7, d30: s30 },
    trialing,
    paid,
    billing,
    comp,
    free,
    // The owner is reported as its own bucket and is NOT folded into paid,
    // billing or trialing. Folding it in would inflate the subscriber count
    // with an account that pays nothing — a fake revenue number on the one
    // dashboard that has to be trustworthy.
    owner,
    // The five buckets are mutually exclusive and counted independently, so this
    // is a real check rather than an identity. HQ can assert it instead of
    // trusting the numbers blind.
    bucketsSumToAccounts:
      free + trialing + billing + comp + owner === accounts,
    asOf: now.toISOString(),
  });
}
