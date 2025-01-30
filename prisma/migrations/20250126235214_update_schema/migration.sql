/*
  Warnings:

  - You are about to drop the column `userId` on the `Lab` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'LAB_ADMIN';
ALTER TYPE "Role" ADD VALUE 'LAB_TECHNICIAN';

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_userId_fkey";

-- DropIndex
DROP INDEX "Lab_userId_key";

-- AlterTable
ALTER TABLE "Lab" DROP COLUMN "userId",
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "LabAdmin" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "labId" UUID NOT NULL,

    CONSTRAINT "LabAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabTechnician" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "labId" UUID NOT NULL,

    CONSTRAINT "LabTechnician_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LabAdmin_userId_key" ON "LabAdmin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LabAdmin_labId_key" ON "LabAdmin"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "LabTechnician_userId_key" ON "LabTechnician"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LabTechnician_labId_key" ON "LabTechnician"("labId");

-- AddForeignKey
ALTER TABLE "LabAdmin" ADD CONSTRAINT "LabAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabAdmin" ADD CONSTRAINT "LabAdmin_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTechnician" ADD CONSTRAINT "LabTechnician_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTechnician" ADD CONSTRAINT "LabTechnician_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
