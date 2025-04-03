/*
  Warnings:

  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `nationalId` on the `diagnostic_provider_staff` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SUPERADMIN', 'STAFF', 'SUPPORT', 'DP_MANAGER', 'DP_STAFF', 'PATIENT');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "diagnostic_provider_staff" DROP COLUMN "nationalId",
ADD COLUMN     "identificationNumber" TEXT,
ADD COLUMN     "identificationType" TEXT;

-- AlterTable
ALTER TABLE "diagnostic_providers" ALTER COLUMN "latitude" SET DATA TYPE TEXT,
ALTER COLUMN "longitude" SET DATA TYPE TEXT;
