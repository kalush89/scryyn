/*
  Warnings:

  - Added the required column `licenseNumber` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationNumber` to the `Lab` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "licenseNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lab" ADD COLUMN     "registrationNumber" TEXT NOT NULL;
