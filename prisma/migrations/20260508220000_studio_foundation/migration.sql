-- CreateEnum
CREATE TYPE "RecipeStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tier" "TemplateTier" NOT NULL DEFAULT 'PREMIUM',
    "role" TEXT,
    "mood" TEXT,
    "culturalFit" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "recipeJson" JSONB NOT NULL,
    "previewPersonaId" TEXT NOT NULL,
    "status" "RecipeStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudioCostLedger" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "founderEmail" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "inputTokens" INTEGER NOT NULL,
    "outputTokens" INTEGER NOT NULL,
    "costUsd" DECIMAL(10,6) NOT NULL,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "errorMessage" TEXT,

    CONSTRAINT "StudioCostLedger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");

-- CreateIndex
CREATE INDEX "Recipe_status_role_mood_idx" ON "Recipe"("status", "role", "mood");

-- CreateIndex
CREATE INDEX "Recipe_publishedAt_idx" ON "Recipe"("publishedAt");

-- CreateIndex
CREATE INDEX "StudioCostLedger_timestamp_idx" ON "StudioCostLedger"("timestamp" DESC);

-- CreateIndex
CREATE INDEX "StudioCostLedger_generationId_idx" ON "StudioCostLedger"("generationId");

-- CreateIndex
CREATE INDEX "StudioCostLedger_founderEmail_timestamp_idx" ON "StudioCostLedger"("founderEmail", "timestamp");
