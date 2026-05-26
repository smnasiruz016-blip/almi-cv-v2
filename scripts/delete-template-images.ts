// One-shot DELETE for the PNG sunset.
//
// Wipes every TemplateImage row. The PR that ships /templates from the
// registry must already be deployed (rows would 404 the gallery until
// then). A local backup is required first:
//   npx tsx scripts/backup-template-images.ts
//
// Run (PROD requires ALLOW_PROD=1):
//   set -a && . ./.env.local && set +a
//   ALLOW_PROD=1 npx tsx scripts/delete-template-images.ts
//
// Idempotent: a second run finds 0 rows and exits cleanly.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dbHost = new URL(process.env.DATABASE_URL ?? "postgresql://x@unknown/").hostname;
  console.log(`Connected to: ${dbHost}`);
  if (dbHost.includes("hidden-frog") && process.env.ALLOW_PROD !== "1") {
    console.error("\n🚨 REFUSING TO RUN — this looks like the production endpoint.");
    console.error("    To run against prod intentionally, set ALLOW_PROD=1:");
    console.error("      ALLOW_PROD=1 npx tsx scripts/delete-template-images.ts\n");
    process.exit(1);
  }
  if (dbHost.includes("hidden-frog")) {
    console.log("⚠️  PRODUCTION RUN — ALLOW_PROD=1 override active.\n");
  }

  const before = await prisma.templateImage.count();
  console.log(`Rows before delete: ${before}`);
  if (before === 0) {
    console.log("Nothing to delete. Exiting clean.");
    return;
  }

  const result = await prisma.templateImage.deleteMany({});
  const after = await prisma.templateImage.count();

  console.log(`\n✓ Deleted ${result.count} rows (before=${before}, after=${after})`);
  if (after !== 0) {
    console.error(`\n⚠️  Expected 0 rows after delete; got ${after}. Investigate.`);
    process.exit(1);
  }
}

main()
  .catch((err) => {
    console.error("delete failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
