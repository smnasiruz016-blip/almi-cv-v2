// Pre-destruction safety dump. Read-only on prod — exports every
// TemplateImage row (with blob URLs) to a local JSON file so the
// PNG sunset is fully recoverable if needed.
//
// Run:
//   node --env-file=.env.local --import tsx scripts/backup-template-images.ts
//
// Or:
//   set -a && . ./.env.local && set +a
//   npx tsx scripts/backup-template-images.ts
//
// Output: scripts/backups/templateimage-backup-<ISO>.json (gitignored).

import { PrismaClient } from "@prisma/client";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const prisma = new PrismaClient();

async function main() {
  const dbHost = new URL(process.env.DATABASE_URL ?? "postgresql://x@unknown/").hostname;
  console.log(`Backup source: ${dbHost}`);

  const rows = await prisma.templateImage.findMany({
    orderBy: [{ roleSlug: "asc" }, { createdAt: "asc" }],
  });
  console.log(`Found ${rows.length} rows.`);

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outDir = join(__dirname, "backups");
  mkdirSync(outDir, { recursive: true });

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outPath = join(outDir, `templateimage-backup-${stamp}.json`);
  const payload = {
    sourceHost: dbHost,
    backedUpAt: new Date().toISOString(),
    rowCount: rows.length,
    rows,
  };
  writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`\n✓ Wrote ${rows.length} rows to ${outPath}`);
  console.log(`  Size: ${(JSON.stringify(payload).length / 1024).toFixed(1)} KB`);

  // Print a quick summary so the log is meaningful even without opening the file.
  const distinctRoles = new Set(rows.map((r) => r.roleSlug)).size;
  const blobCount = rows.filter((r) => r.imageUrl).length;
  console.log(`  Roles covered: ${distinctRoles}`);
  console.log(`  Rows with blob URL: ${blobCount}`);
}

main()
  .catch((err) => {
    console.error("backup failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
