// One-shot backfill for Phase 4 of the Template Engine.
//
// Re-pins every existing TemplateImage row's `templateSlug` column to the
// layout that `suggestTemplate()` picks for its `roleSlug`. Rows that
// don't change (already on the right layout) are skipped; the run prints
// a per-row line for the ones it does change plus a summary breakdown by
// destination template.
//
// Idempotent — re-runs find 0 mutated rows because the second pass would
// re-compute the same slug.
//
// Run (against Neon BRANCH, NEVER prod):
//   set -a && . ./.env.development.local && set +a
//   npx tsx scripts/backfill-template-slugs.ts
//
// Or directly via node:
//   node --env-file=.env.development.local --import tsx \
//     scripts/backfill-template-slugs.ts

import { PrismaClient } from "@prisma/client";
import { suggestTemplate } from "../src/components/templates/template-registry";

const prisma = new PrismaClient();

async function main() {
  // Safety log — make the DB host visible before any writes, so a
  // misconfigured env can be caught from the first console line.
  const dbHost = new URL(process.env.DATABASE_URL ?? "postgresql://x@unknown/").hostname;
  console.log(`Connected to: ${dbHost}`);
  if (dbHost.includes("hidden-frog")) {
    console.error("\n🚨 REFUSING TO RUN — this looks like the production endpoint.");
    console.error("    Re-export DATABASE_URL from .env.development.local before retrying.\n");
    process.exit(1);
  }

  const images = await prisma.templateImage.findMany({
    select: { id: true, roleSlug: true, templateSlug: true, title: true },
    orderBy: [{ roleSlug: "asc" }, { createdAt: "asc" }],
  });

  console.log(`Found ${images.length} TemplateImage rows.\n`);

  // Tally destinations so the run prints a clean per-template breakdown
  // alongside the per-row trace.
  const destCounts: Map<string, number> = new Map();
  let updated = 0;
  let unchanged = 0;

  for (const img of images) {
    // industrySlug doesn't exist on TemplateImage in the v1 schema; the
    // registry's suggestTemplate accepts undefined for both args, so just
    // pass roleSlug. (See registry: roleSlug match wins anyway.)
    const layout = suggestTemplate({ roleSlug: img.roleSlug });
    destCounts.set(layout.slug, (destCounts.get(layout.slug) ?? 0) + 1);

    if (img.templateSlug !== layout.slug) {
      await prisma.templateImage.update({
        where: { id: img.id },
        data: { templateSlug: layout.slug },
      });
      updated++;
      console.log(
        `  ${img.roleSlug.padEnd(40)} ${img.templateSlug.padEnd(22)} → ${layout.slug}`,
      );
    } else {
      unchanged++;
    }
  }

  console.log(`\n✓ Updated ${updated} / ${images.length} rows (${unchanged} unchanged)`);
  console.log(`\nDestination breakdown (all ${images.length} rows after backfill):`);
  const sorted = Array.from(destCounts.entries()).sort((a, b) => b[1] - a[1]);
  for (const [slug, count] of sorted) {
    const bar = "█".repeat(Math.max(1, Math.round(count / 4)));
    console.log(`  ${slug.padEnd(24)} ${String(count).padStart(4)}  ${bar}`);
  }
}

main()
  .catch((err) => {
    console.error("backfill failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
