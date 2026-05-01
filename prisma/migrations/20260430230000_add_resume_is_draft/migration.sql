-- AlterTable: add isDraft boolean to track whether a CV is still an
-- untouched seed-data row (true) or has been edited at least once (false).
-- Defaults to true so existing rows keep behaviour-safe semantics.
ALTER TABLE "Resume" ADD COLUMN "isDraft" BOOLEAN NOT NULL DEFAULT true;

-- Backfill: any existing row with a custom title, OR with a >30s gap
-- between createdAt and updatedAt (well past any plausible Prisma /
-- serverless clock skew), is clearly an edited CV — flip isDraft=false
-- so it is not eligible for /cv/new reuse. Untitled rows with tight
-- timestamps stay isDraft=true; /cv/new will pick the most recent one.
UPDATE "Resume"
SET "isDraft" = false
WHERE title <> 'Untitled CV'
   OR EXTRACT(EPOCH FROM ("updatedAt" - "createdAt")) > 30;

-- CreateIndex
CREATE INDEX "Resume_userId_isDraft_idx" ON "Resume"("userId", "isDraft");
