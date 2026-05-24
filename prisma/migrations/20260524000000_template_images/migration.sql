-- CreateTable
CREATE TABLE "TemplateImage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "roleSlug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "filenameOriginal" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TemplateImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemplateImage_slug_key" ON "TemplateImage"("slug");

-- CreateIndex
CREATE INDEX "TemplateImage_roleSlug_active_createdAt_idx" ON "TemplateImage"("roleSlug", "active", "createdAt");

-- CreateIndex
CREATE INDEX "TemplateImage_active_createdAt_idx" ON "TemplateImage"("active", "createdAt");
