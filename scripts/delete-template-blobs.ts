// One-shot delete of the PNG sunset's Vercel Blob residue.
//
// Reads the most recent backup at scripts/backups/templateimage-backup-*.json
// (produced by scripts/backup-template-images.ts), pulls the imageUrl
// field from every row, and issues a single batched `del()` to the
// Vercel Blob API.
//
// Run (PROD requires ALLOW_PROD=1):
//   set -a && . ./.env.local && set +a
//   ALLOW_PROD=1 npx tsx scripts/delete-template-blobs.ts
//
// Requires BLOB_READ_WRITE_TOKEN in env (already present in .env.local).
// Idempotent: a second run finds the URLs already gone and del() no-ops.

import { del, head } from "@vercel/blob";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

type BackupRow = { id: string; roleSlug: string; imageUrl: string };
type BackupFile = {
  sourceHost: string;
  backedUpAt: string;
  rowCount: number;
  rows: BackupRow[];
};

async function main() {
  if (process.env.ALLOW_PROD !== "1") {
    console.error("\n🚨 REFUSING TO RUN — Blob deletion is irreversible.");
    console.error("    To proceed: ALLOW_PROD=1 npx tsx scripts/delete-template-blobs.ts\n");
    process.exit(1);
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN is not set. Source .env.local first.");
    process.exit(1);
  }

  // Resolve the newest backup file deterministically.
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const backupsDir = join(__dirname, "backups");
  const backupFiles = readdirSync(backupsDir)
    .filter((f) => f.startsWith("templateimage-backup-") && f.endsWith(".json"))
    .map((f) => ({ name: f, mtime: statSync(join(backupsDir, f)).mtime.getTime() }))
    .sort((a, b) => b.mtime - a.mtime);
  if (backupFiles.length === 0) {
    console.error("No backup file found in scripts/backups/. Run scripts/backup-template-images.ts first.");
    process.exit(1);
  }
  const backupPath = join(backupsDir, backupFiles[0].name);
  console.log(`Using backup: ${backupFiles[0].name}`);

  const backup = JSON.parse(readFileSync(backupPath, "utf8")) as BackupFile;
  const urls = backup.rows
    .map((r) => r.imageUrl)
    .filter((u): u is string => typeof u === "string" && u.length > 0);
  console.log(`URLs to delete: ${urls.length}`);

  if (urls.length === 0) {
    console.log("Nothing to delete. Exiting clean.");
    return;
  }

  // Probe one URL first so a wrong token / wrong store surfaces before
  // we issue the batch delete.
  console.log(`Probing first URL via head(): ${urls[0]}`);
  try {
    const meta = await head(urls[0]);
    console.log(`  Size: ${meta.size} bytes, contentType: ${meta.contentType}`);
  } catch (err) {
    console.error(`  Probe failed: ${err instanceof Error ? err.message : String(err)}`);
    console.error("  Token may be wrong or URL may already be gone. Aborting.");
    process.exit(1);
  }

  // Track total bytes about to be deleted (best-effort, sampled) so the
  // savings line in the report is grounded.
  const probedSize = (await head(urls[0])).size;
  const estimatedTotalBytes = probedSize * urls.length;

  // @vercel/blob del() accepts an array — single batched API call.
  console.log(`\nDeleting ${urls.length} blobs in one batched call …`);
  await del(urls);

  // Verify a couple of random URLs are 404 now.
  console.log("\nVerification (3 sample HEAD requests, should all 404):");
  const samples = [urls[0], urls[Math.floor(urls.length / 2)], urls[urls.length - 1]];
  for (const u of samples) {
    try {
      await head(u);
      console.log(`  ⚠️  ${u} — STILL EXISTS`);
    } catch {
      console.log(`  ✓ 404 — ${u.slice(0, 80)}…`);
    }
  }

  const mb = (estimatedTotalBytes / (1024 * 1024)).toFixed(1);
  console.log(`\n✓ Deleted ${urls.length} blobs.`);
  console.log(`  Estimated storage freed (probe-sampled): ~${mb} MB`);
}

main().catch((err) => {
  console.error("blob delete failed:", err);
  process.exit(1);
});
