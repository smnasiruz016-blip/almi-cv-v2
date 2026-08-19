-- 3-day no-card free window: the first-use clock.
-- Nullable, no default: NULL means "never started", correct for every existing
-- row and for anyone who registers and never builds a CV.
ALTER TABLE "User" ADD COLUMN "freeAccessStartedAt" TIMESTAMP(3);
