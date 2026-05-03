-- AlterTable
ALTER TABLE "User" ADD COLUMN     "compGrantedAt" TIMESTAMP(3),
ADD COLUMN     "compGrantedBy" TEXT,
ADD COLUMN     "compProUntil" TIMESTAMP(3),
ADD COLUMN     "compReason" TEXT;

-- CreateIndex
CREATE INDEX "User_compProUntil_idx" ON "User"("compProUntil");
