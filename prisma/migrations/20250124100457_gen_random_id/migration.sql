/*
  Warnings:

  - The primary key for the `Booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Doctor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Doctor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Lab` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Lab` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Patient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Referral` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Referral` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `TestTypes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TestTypes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `TestsOffered` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TestsOffered` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[patientId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[doctorId]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[labId]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[labId]` on the table `TestsOffered` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[testTypeId]` on the table `TestsOffered` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `labId` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `patientId` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `paymentId` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Doctor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Lab` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Patient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `patientId` on the `Referral` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `doctorId` on the `Referral` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `labId` on the `Referral` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `paymentId` on the `Referral` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `labId` on the `TestsOffered` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `testTypeId` on the `TestsOffered` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_labId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_userId_fkey";

-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_labId_fkey";

-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "TestsOffered" DROP CONSTRAINT "TestsOffered_labId_fkey";

-- DropForeignKey
ALTER TABLE "TestsOffered" DROP CONSTRAINT "TestsOffered_testTypeId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "labId",
ADD COLUMN     "labId" UUID NOT NULL,
DROP COLUMN "patientId",
ADD COLUMN     "patientId" UUID NOT NULL,
DROP COLUMN "paymentId",
ADD COLUMN     "paymentId" UUID NOT NULL,
ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "Lab_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "patientId",
ADD COLUMN     "patientId" UUID NOT NULL,
DROP COLUMN "doctorId",
ADD COLUMN     "doctorId" UUID NOT NULL,
DROP COLUMN "labId",
ADD COLUMN     "labId" UUID NOT NULL,
DROP COLUMN "paymentId",
ADD COLUMN     "paymentId" UUID NOT NULL,
ADD CONSTRAINT "Referral_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TestTypes" DROP CONSTRAINT "TestTypes_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "TestTypes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TestsOffered" DROP CONSTRAINT "TestsOffered_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "labId",
ADD COLUMN     "labId" UUID NOT NULL,
DROP COLUMN "testTypeId",
ADD COLUMN     "testTypeId" UUID NOT NULL,
ADD CONSTRAINT "TestsOffered_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "email_verified" TIMESTAMP(3),
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_labId_key" ON "Booking"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_patientId_key" ON "Booking"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_paymentId_key" ON "Booking"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "Doctor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_userId_key" ON "Lab"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_key" ON "Notification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_patientId_key" ON "Referral"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_doctorId_key" ON "Referral"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_labId_key" ON "Referral"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_paymentId_key" ON "Referral"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "TestsOffered_labId_key" ON "TestsOffered"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "TestsOffered_testTypeId_key" ON "TestsOffered"("testTypeId");

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestsOffered" ADD CONSTRAINT "TestsOffered_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestsOffered" ADD CONSTRAINT "TestsOffered_testTypeId_fkey" FOREIGN KEY ("testTypeId") REFERENCES "TestTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
