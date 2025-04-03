/*
  Warnings:

  - You are about to drop the column `avatarURL` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `avatarURL` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `sex` on the `dependants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropIndex
DROP INDEX "accounts_provider_key";

-- DropIndex
DROP INDEX "admins_email_key";

-- DropIndex
DROP INDEX "diagnostic_provider_staff_email_key";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "avatarURL",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "isActive",
DROP COLUMN "lastLogin",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "role",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "dependants" DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex" NOT NULL;

-- AlterTable
ALTER TABLE "diagnostic_provider_staff" DROP COLUMN "avatarURL",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "isActive",
DROP COLUMN "lastLogin",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "role",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "dateOfBirth",
DROP COLUMN "sex",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ALTER COLUMN "role" DROP DEFAULT;

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "sex" "Sex" NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- CreateIndex
CREATE INDEX "bookings_createdAt_idx" ON "bookings"("createdAt");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_provider_staff" ADD CONSTRAINT "diagnostic_provider_staff_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
