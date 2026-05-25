// One-off Phase 1 quality-check runner. Picks 5 random TemplateImage
// rows where parsedFields IS NULL AND parseError IS NULL, parses them
// via the same parseTemplateImageFromUrl pipeline the production
// backfill uses, writes the result, and prints each row's title +
// image URL + full parsedFields JSON for founder eyeball.
//
// Run with both env files loaded so DATABASE_URL (project tree) and
// ANTHROPIC_API_KEY (founder's OneDrive .env.local) are both visible:
//
//   node \
//     --env-file=.env.local \
//     --env-file="C:/Users/Lenovo/OneDrive/Desktop/almiworld/almi projects/Almicv/.env.local" \
//     --import tsx \
//     scripts/_5row-sample.ts
//
// Delete this file after the production 246-row backfill ships.

import { PrismaClient } from "@prisma/client";
import { parseTemplateImageFromUrl } from "../src/lib/parse/template-image-parse";

const prisma = new PrismaClient();
const SAMPLE_SIZE = 5;

async function main() {
  const founderEmail =
    process.env.BACKFILL_FOUNDER_EMAIL ?? "smnasiruz016@gmail.com";

  // INCLUDE_IDS=cuid1,cuid2 — force-include these rows in the sample
  // and fill the rest randomly up to SAMPLE_SIZE. Used for retry runs
  // where we want to specifically re-test rows that previously failed.
  // Rows in INCLUDE_IDS must already be eligible (parseError reset by
  // the caller).
  const includeIds = (process.env.INCLUDE_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Mirror the canonical backfill script's filter — parsedAt-is-null
  // implies parsedFields-is-null (we only write both together on
  // success). Json? columns can't be filtered with bare `null` in
  // Prisma 6.x — they require Prisma.JsonNullValueFilter — so we use
  // parsedAt as the proxy.
  const candidates = await prisma.templateImage.findMany({
    where: { parsedAt: null, parseError: null, active: true },
    select: { id: true, title: true, imageUrl: true },
  });

  if (candidates.length === 0) {
    console.log("[sample] no unparsed candidates — nothing to do.");
    await prisma.$disconnect();
    return;
  }

  // Split into must-include vs the rest; shuffle the rest; concat
  // must-includes first then fill up to SAMPLE_SIZE.
  const mustInclude = candidates.filter((r) => includeIds.includes(r.id));
  const rest = candidates.filter((r) => !includeIds.includes(r.id));
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  const sample = [...mustInclude, ...rest].slice(0, SAMPLE_SIZE);
  if (mustInclude.length > 0) {
    console.log(
      `[sample] force-included ${mustInclude.length} row(s) via INCLUDE_IDS`,
    );
  }

  console.log(
    `[sample] picked ${sample.length} of ${candidates.length} eligible rows`,
  );
  console.log("[sample] starting parallel parse (concurrency 5)…\n");

  const startedAt = Date.now();
  type Outcome = {
    id: string;
    title: string;
    imageUrl: string;
    ok: boolean;
    parsed?: unknown;
    error?: string;
    costUsd: number;
    elapsedMs: number;
  };

  const results: Outcome[] = await Promise.all(
    sample.map(async (row) => {
      const t0 = Date.now();
      const r = await parseTemplateImageFromUrl(row.imageUrl, founderEmail);
      const elapsedMs = Date.now() - t0;
      if (r.ok) {
        await prisma.templateImage.update({
          where: { id: row.id },
          data: {
            parsedFields: r.parsed as unknown as object,
            parsedAt: new Date(),
            parseError: null,
          },
        });
        return {
          id: row.id,
          title: row.title,
          imageUrl: row.imageUrl,
          ok: true,
          parsed: r.parsed,
          costUsd: r.costUsd,
          elapsedMs,
        };
      }
      await prisma.templateImage.update({
        where: { id: row.id },
        data: { parseError: r.error, parsedAt: null },
      });
      return {
        id: row.id,
        title: row.title,
        imageUrl: row.imageUrl,
        ok: false,
        error: r.error,
        costUsd: r.costUsd,
        elapsedMs,
      };
    }),
  );

  const okCount = results.filter((r) => r.ok).length;
  const failCount = results.length - okCount;
  const costTotal = results.reduce((s, r) => s + r.costUsd, 0);
  const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);

  console.log(
    `[sample] done. ok=${okCount} failed=${failCount} total=${results.length} time=${elapsedSec}s cost=$${costTotal.toFixed(4)}`,
  );
  console.log("");
  console.log("=========================== PER-ROW REPORT ===========================");
  for (const r of results) {
    console.log("");
    console.log(`### ${r.title}`);
    console.log(`id:           ${r.id}`);
    console.log(`imageUrl:     ${r.imageUrl}`);
    console.log(`status:       ${r.ok ? "OK" : "FAIL"}`);
    console.log(`elapsedMs:    ${r.elapsedMs}`);
    console.log(`costUsd:      ${r.costUsd.toFixed(6)}`);
    if (r.ok) {
      console.log(`parsedFields:`);
      console.log(JSON.stringify(r.parsed, null, 2));
    } else {
      console.log(`parseError:   ${r.error}`);
    }
  }
  console.log("");
  console.log("======================================================================");

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error("[sample] fatal:", err);
  await prisma.$disconnect();
  process.exit(1);
});
