-- Subscriber: add nullable ipHash for cross-product public newsletter route.
ALTER TABLE "Subscriber" ADD COLUMN "ipHash" TEXT;

-- Review: add new columns nullable so backfill is safe.
ALTER TABLE "Review" ADD COLUMN "source" TEXT;
ALTER TABLE "Review" ADD COLUMN "ipHash" TEXT;
ALTER TABLE "Review" ADD COLUMN "submitterEmail" TEXT;

-- Backfill existing reviews — every row pre-this-migration came from AlmiCV.
UPDATE "Review" SET "source" = 'almicv' WHERE "source" IS NULL;

-- Now enforce NOT NULL on source.
ALTER TABLE "Review" ALTER COLUMN "source" SET NOT NULL;

-- Drop and re-add the FK so userId can become nullable.
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";
ALTER TABLE "Review" ALTER COLUMN "userId" DROP NOT NULL;
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- New index for product-filtered testimonial queries
-- (e.g. WHERE source = 'almisalary' AND showOnSite = true ORDER BY createdAt DESC).
CREATE INDEX "Review_source_showOnSite_createdAt_idx"
  ON "Review"("source", "showOnSite", "createdAt");
