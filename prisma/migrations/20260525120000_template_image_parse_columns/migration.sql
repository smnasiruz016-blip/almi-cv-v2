-- PR #52 — parse pipeline columns.
--
-- TemplateImage: three additive nullable columns so the admin upload
-- flow can cache the result of a Haiku 4.5 vision parse against the
-- image. Existing 246 rows stay valid (every column is NULL on
-- migration day) — backfill script will populate retroactively.
--
-- StudioCostLedger: one additive nullable column to tag the spend
-- source. Existing rows stay NULL (treated as pre-PR-52 Studio
-- recipe spend). New parse calls write "template_image_parse"; new
-- studio generation calls write "studio_recipe".
--
-- All three changes are ALTER TABLE ADD COLUMN with no default and no
-- NOT NULL — Postgres performs these as metadata-only operations, no
-- table rewrite, safe to run online against production.

ALTER TABLE "TemplateImage" ADD COLUMN "parsedFields" JSONB;
ALTER TABLE "TemplateImage" ADD COLUMN "parsedAt" TIMESTAMP(3);
ALTER TABLE "TemplateImage" ADD COLUMN "parseError" TEXT;

ALTER TABLE "StudioCostLedger" ADD COLUMN "generationType" TEXT;
