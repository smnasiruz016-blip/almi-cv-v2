// Read-only verification probe for the 3-day window.
import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
const EMAIL = process.env.TEST_EMAIL ?? "";

async function main() {
  console.log(`===== ${process.argv[2] ?? "PROBE"} =====  ${new Date().toISOString()}`);

  // CV has no user-facing AI cost ledger (StudioCostLedger has one writer and the
  // 11 generators do not call it). The DB-observable proxy for "did an AI call
  // happen" is User.aiCallsThisMonth: requireAIAccess() increments it ONLY on the
  // trialing path and returns before incrementing for a no-subscription user.
  const studioRows = await p.studioCostLedger.count();
  const studioSum = await p.studioCostLedger.aggregate({ _sum: { costUsd: true } });
  console.log(`StudioCostLedger rows=${studioRows} sumUsd=${studioSum._sum.costUsd ?? 0}`);
  const aiAgg = await p.user.aggregate({ _sum: { aiCallsThisMonth: true } });
  console.log(`SUM(User.aiCallsThisMonth) across all users = ${aiAgg._sum.aiCallsThisMonth ?? 0}`);

  const started = await p.user.count({ where: { freeAccessStartedAt: { not: null } } });
  console.log(`users with a started free window = ${started}`);

  if (EMAIL) {
    const u = await p.user.findUnique({
      where: { email: EMAIL },
      select: {
        id: true, email: true, createdAt: true, freeAccessStartedAt: true,
        subscriptionStatus: true, compProUntil: true, aiCallsThisMonth: true,
      },
    });
    if (!u) { console.log(`TEST USER ${EMAIL}: does not exist`); return; }
    const cvs = await p.resume.findMany({
      where: { userId: u.id },
      select: { id: true, createdAt: true, templateSlug: true },
      orderBy: { createdAt: "asc" },
    });
    console.log(
      `TEST USER ${u.email}\n` +
      `  createdAt           = ${u.createdAt.toISOString()}\n` +
      `  freeAccessStartedAt = ${u.freeAccessStartedAt?.toISOString() ?? "NULL (clock not started)"}\n` +
      `  subscriptionStatus  = ${u.subscriptionStatus ?? "null"}  comp=${u.compProUntil ?? "null"}\n` +
      `  aiCallsThisMonth    = ${u.aiCallsThisMonth}\n` +
      `  CVs (${cvs.length}): ${cvs.map((c) => `${c.templateSlug}@${c.createdAt.toISOString()}`).join(", ") || "none"}`,
    );
    if (u.freeAccessStartedAt && cvs.length) {
      const delta = u.freeAccessStartedAt.getTime() - cvs[0].createdAt.getTime();
      console.log(`  clock set ${delta} ms after the FIRST CV row was created`);
    }
  }
}
main().catch((e) => { console.error("FAILED:", e.message); process.exitCode = 1; }).finally(() => p.$disconnect());
