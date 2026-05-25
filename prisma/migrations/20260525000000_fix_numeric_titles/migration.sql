-- Rollback-safety snapshot before the numeric-title regen.
-- The regen itself runs in TypeScript via the founder-only server
-- action regenerateAllNumericTitles() in
-- src/app/admin/templates/actions.ts — that path can read role display
-- names from src/lib/roles.ts (JOB_ROLES). SQL cannot, hence why this
-- migration only creates the backup.
--
-- Restore SQL (if needed):
--   TRUNCATE "TemplateImage";
--   INSERT INTO "TemplateImage" SELECT * FROM "TemplateImage_backup_before_title_fix";
--
-- Cleanup (after confirming regen succeeded, drop the backup when safe):
--   DROP TABLE "TemplateImage_backup_before_title_fix";
--
-- The table is created OUT-OF-BAND of the Prisma schema — `prisma format`
-- and `migrate dev` won't know about it. `migrate deploy` (what Vercel
-- runs) just applies migrations and is happy with side-tables.

-- CreateTable (idempotent — re-running `migrate deploy` won't double-snapshot)
CREATE TABLE IF NOT EXISTS "TemplateImage_backup_before_title_fix" AS
  SELECT * FROM "TemplateImage";
