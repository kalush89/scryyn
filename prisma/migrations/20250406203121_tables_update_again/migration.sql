/*
  Warnings:

  - You are about to drop the column `user_id` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `dependant_id` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `dp_id` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `dp_test_offering_id` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `dependants` table. All the data in the column will be lost.
  - You are about to drop the column `dp_id` on the `diagnostic_provider_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `diagnostic_provider_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `dp_id` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `diagnostic_provider_staff` table. All the data in the column will be lost.
  - You are about to drop the column `dp_id` on the `diagnostic_provider_test_offerings` table. All the data in the column will be lost.
  - You are about to drop the column `test_id` on the `diagnostic_provider_test_offerings` table. All the data in the column will be lost.
  - You are about to drop the column `admin_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `dp_staff_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `patients` table. All the data in the column will be lost.
  - Added the required column `dpId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dpTestOfferingId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `dependants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dpId` to the `diagnostic_provider_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `diagnostic_provider_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dpId` to the `diagnostic_provider_staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dpId` to the `diagnostic_provider_test_offerings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testId` to the `diagnostic_provider_test_offerings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_dependant_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_dp_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_dp_test_offering_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "dependants" DROP CONSTRAINT "dependants_user_id_fkey";

-- DropForeignKey
ALTER TABLE "diagnostic_provider_reviews" DROP CONSTRAINT "diagnostic_provider_reviews_dp_id_fkey";

-- DropForeignKey
ALTER TABLE "diagnostic_provider_reviews" DROP CONSTRAINT "diagnostic_provider_reviews_user_id_fkey";

-- DropForeignKey
ALTER TABLE "diagnostic_provider_staff" DROP CONSTRAINT "diagnostic_provider_staff_dp_id_fkey";

-- DropForeignKey
ALTER TABLE "diagnostic_provider_test_offerings" DROP CONSTRAINT "diagnostic_provider_test_offerings_dp_id_fkey";

-- DropForeignKey
ALTER TABLE "diagnostic_provider_test_offerings" DROP CONSTRAINT "diagnostic_provider_test_offerings_test_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_dp_staff_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_id_fkey";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "dependant_id",
DROP COLUMN "dp_id",
DROP COLUMN "dp_test_offering_id",
DROP COLUMN "user_id",
ADD COLUMN     "dependentId" TEXT,
ADD COLUMN     "dpId" TEXT NOT NULL,
ADD COLUMN     "dpTestOfferingId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "dependants" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "diagnostic_provider_reviews" DROP COLUMN "dp_id",
DROP COLUMN "user_id",
ADD COLUMN     "dpId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "diagnostic_provider_staff" DROP COLUMN "dp_id",
DROP COLUMN "user_id",
ADD COLUMN     "dpId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "diagnostic_provider_test_offerings" DROP COLUMN "dp_id",
DROP COLUMN "test_id",
ADD COLUMN     "dpId" TEXT NOT NULL,
ADD COLUMN     "testId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "admin_id",
DROP COLUMN "dp_staff_id",
DROP COLUMN "user_id",
ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "dpStaffId" TEXT,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "user_id";

-- AddForeignKey
ALTER TABLE "dependants" ADD CONSTRAINT "dependants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_provider_staff" ADD CONSTRAINT "diagnostic_provider_staff_dpId_fkey" FOREIGN KEY ("dpId") REFERENCES "diagnostic_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_provider_test_offerings" ADD CONSTRAINT "diagnostic_provider_test_offerings_dpId_fkey" FOREIGN KEY ("dpId") REFERENCES "diagnostic_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_provider_test_offerings" ADD CONSTRAINT "diagnostic_provider_test_offerings_testId_fkey" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_dependentId_fkey" FOREIGN KEY ("dependentId") REFERENCES "dependants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_dpId_fkey" FOREIGN KEY ("dpId") REFERENCES "diagnostic_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_dpTestOfferingId_fkey" FOREIGN KEY ("dpTestOfferingId") REFERENCES "diagnostic_provider_test_offerings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_provider_reviews" ADD CONSTRAINT "diagnostic_provider_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_provider_reviews" ADD CONSTRAINT "diagnostic_provider_reviews_dpId_fkey" FOREIGN KEY ("dpId") REFERENCES "diagnostic_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_dpStaffId_fkey" FOREIGN KEY ("dpStaffId") REFERENCES "diagnostic_provider_staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
