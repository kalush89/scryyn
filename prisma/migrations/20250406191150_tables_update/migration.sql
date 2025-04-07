/*
  Warnings:

  - You are about to drop the column `dependentId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `dpId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `dpTestOfferingId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `dependants` table. All the data in the column will be lost.
  - You are about to drop the column `dpId` on the `diagnostic_provider_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `diagnostic_provider_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `dpId` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `dpId` on the `diagnostic_provider_test_offerings` table. All the data in the column will be lost.
  - You are about to drop the column `testId` on the `diagnostic_provider_test_offerings` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `dpStaffId` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dp_id` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dp_test_offering_id` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `dependants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dp_id` to the `diagnostic_provider_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `diagnostic_provider_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dp_id` to the `diagnostic_provider_staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `diagnostic_provider_staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dp_id` to the `diagnostic_provider_test_offerings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `test_id` to the `diagnostic_provider_test_offerings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_dependentId_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_dpId_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_dpTestOfferingId_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_userId_fkey";

-- DropForeignKey
ALTER TABLE "dependants" DROP CONSTRAINT "dependants_userId_fkey";

-- DropForeignKey
ALTER TABLE "diagnostic_provider_reviews" DROP CONSTRAINT "diagnostic_provider_reviews_dpId_fkey";

-- DropForeignKey
ALTER TABLE "diagnostic_provider_reviews" DROP CONSTRAINT "diagnostic_provider_reviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "diagnostic_provider_staff" DROP CONSTRAINT "diagnostic_provider_staff_dpId_fkey";

-- DropForeignKey
ALTER TABLE "diagnostic_provider_test_offerings" DROP CONSTRAINT "diagnostic_provider_test_offerings_dpId_fkey";

-- DropForeignKey
ALTER TABLE "diagnostic_provider_test_offerings" DROP CONSTRAINT "diagnostic_provider_test_offerings_testId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_adminId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_dpStaffId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "dependentId",
DROP COLUMN "dpId",
DROP COLUMN "dpTestOfferingId",
DROP COLUMN "userId",
ADD COLUMN     "dependant_id" TEXT,
ADD COLUMN     "dp_id" TEXT NOT NULL,
ADD COLUMN     "dp_test_offering_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "dependants" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "diagnostic_provider_reviews" DROP COLUMN "dpId",
DROP COLUMN "userId",
ADD COLUMN     "dp_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "diagnostic_provider_staff" DROP COLUMN "dpId",
ADD COLUMN     "dp_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "diagnostic_provider_test_offerings" DROP COLUMN "dpId",
DROP COLUMN "testId",
ADD COLUMN     "dp_id" TEXT NOT NULL,
ADD COLUMN     "test_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "adminId",
DROP COLUMN "dpStaffId",
DROP COLUMN "userId",
ADD COLUMN     "admin_id" TEXT,
ADD COLUMN     "dp_staff_id" TEXT,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "dependants" ADD CONSTRAINT "dependants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_provider_staff" ADD CONSTRAINT "diagnostic_provider_staff_dp_id_fkey" FOREIGN KEY ("dp_id") REFERENCES "diagnostic_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_provider_test_offerings" ADD CONSTRAINT "diagnostic_provider_test_offerings_dp_id_fkey" FOREIGN KEY ("dp_id") REFERENCES "diagnostic_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_provider_test_offerings" ADD CONSTRAINT "diagnostic_provider_test_offerings_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_dependant_id_fkey" FOREIGN KEY ("dependant_id") REFERENCES "dependants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_dp_id_fkey" FOREIGN KEY ("dp_id") REFERENCES "diagnostic_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_dp_test_offering_id_fkey" FOREIGN KEY ("dp_test_offering_id") REFERENCES "diagnostic_provider_test_offerings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_provider_reviews" ADD CONSTRAINT "diagnostic_provider_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_provider_reviews" ADD CONSTRAINT "diagnostic_provider_reviews_dp_id_fkey" FOREIGN KEY ("dp_id") REFERENCES "diagnostic_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_dp_staff_id_fkey" FOREIGN KEY ("dp_staff_id") REFERENCES "diagnostic_provider_staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
