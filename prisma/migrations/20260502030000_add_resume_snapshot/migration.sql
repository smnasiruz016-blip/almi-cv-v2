-- AlterTable: add tailor undo snapshot columns
ALTER TABLE "Resume" ADD COLUMN "lastSnapshot" JSONB;
ALTER TABLE "Resume" ADD COLUMN "lastSnapshotAt" TIMESTAMP(3);
