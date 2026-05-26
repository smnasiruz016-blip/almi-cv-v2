-- AlterTable
ALTER TABLE "Resume" ADD COLUMN "templateSlug" TEXT NOT NULL DEFAULT 'classic-serif';

-- AlterTable
ALTER TABLE "TemplateImage" ADD COLUMN "templateSlug" TEXT NOT NULL DEFAULT 'classic-serif';
