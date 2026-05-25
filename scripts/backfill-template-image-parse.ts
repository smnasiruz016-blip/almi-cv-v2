// PR #52 — TemplateImage parse backfill.
//
// Manual one-time script the founder runs after migration deploys to
// prod. Iterates active TemplateImage rows that have never been
// parsed, calls the same Haiku 4.5 vision pipeline used by the admin
// upload flow, and writes the result. Idempotent: rows that already
// have parsedAt set are skipped; rows that have a parseError are
// skipped unless --retry-errors is passed (so transient failures can
// be reattempted explicitly).
//
// Concurrency 5 — Anthropic Haiku 4.5 vision tolerates this with no
// rate-limit risk at typical org tier, and 5 parallel API calls keep
// the 246-row backfill under ~3 minutes wall clock at ~3s/parse.
//
// Run (tsx handles the `@/*` path aliases that node strip-types alone
// can't resolve — and `--env-file` injects DATABASE_URL +
// ANTHROPIC_API_KEY from .env.local without polluting the shell):
//
//   node --env-file=.env.local --import tsx \
//     scripts/backfill-template-image-parse.ts
//
//   # to retry rows that previously errored:
//   node --env-file=.env.local --import tsx \
//     scripts/backfill-template-image-parse.ts --retry-errors
//
// `tsx` is fetched on demand by npx-style resolution — no devDependency
// add is needed; `npm exec tsx` or installing globally also work.

import { PrismaClient } from "@prisma/client";
import { parseTemplateImageFromUrl } from "../src/lib/parse/template-image-parse";

const prisma = new PrismaClient();

const CONCURRENCY = 5;
const BATCH_SIZE = 250;

async function main() {
  const retryErrors = process.argv.includes("--retry-errors");
  const founderEmail =
    process.env.BACKFILL_FOUNDER_EMAIL ?? "smnasiruz016@gmail.com";

  const where = retryErrors
    ? { parsedAt: null }
    : { parsedAt: null, parseError: null };

  const total = await prisma.templateImage.count({ where });
  console.log(
    `[backfill] found ${total} candidate rows (retryErrors=${retryErrors}) — running with concurrency ${CONCURRENCY}`,
  );
  if (total === 0) {
    console.log("[backfill] nothing to do.");
    await prisma.$disconnect();
    return;
  }

  const rows = await prisma.templateImage.findMany({
    where,
    select: { id: true, imageUrl: true, title: true },
    take: BATCH_SIZE,
    orderBy: { createdAt: "asc" },
  });

  let done = 0;
  let failed = 0;
  let costUsdTotal = 0;
  const startedAt = Date.now();

  // Simple async-pool with concurrency cap. Avoids p-limit dep.
  const queue = [...rows];
  async function worker(): Promise<void> {
    for (;;) {
      const row = queue.shift();
      if (!row) return;
      const result = await parseTemplateImageFromUrl(row.imageUrl, founderEmail);
      costUsdTotal += result.costUsd;
      if (result.ok) {
        await prisma.templateImage.update({
          where: { id: row.id },
          data: {
            parsedFields: result.parsed as unknown as object,
            parsedAt: new Date(),
            parseError: null,
          },
        });
      } else {
        failed++;
        await prisma.templateImage.update({
          where: { id: row.id },
          data: { parseError: result.error, parsedAt: null },
        });
      }
      done++;
      const status = result.ok ? "✓" : "✗";
      console.log(
        `[backfill] ${status} ${done}/${rows.length} — ${row.title} — cost so far $${costUsdTotal.toFixed(4)}`,
      );
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(
    `[backfill] done. ok=${done - failed} failed=${failed} total=${done} time=${elapsedSec}s cost=$${costUsdTotal.toFixed(4)}`,
  );

  if (total > BATCH_SIZE) {
    console.log(
      `[backfill] ${total - BATCH_SIZE} rows remaining — rerun to continue (script is idempotent).`,
    );
  }

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error("[backfill] fatal:", err);
  await prisma.$disconnect();
  process.exit(1);
});
