/*
  Warnings:

  - The values [OTHER] on the enum `Sex` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `rcNumber` on table `diagnostic_providers` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `recipientType` on the `notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Sex_new" AS ENUM ('MALE', 'FEMALE');
ALTER TABLE "patients" ALTER COLUMN "sex" TYPE "Sex_new" USING ("sex"::text::"Sex_new");
ALTER TABLE "dependants" ALTER COLUMN "sex" TYPE "Sex_new" USING ("sex"::text::"Sex_new");
ALTER TYPE "Sex" RENAME TO "Sex_old";
ALTER TYPE "Sex_new" RENAME TO "Sex";
DROP TYPE "Sex_old";
COMMIT;

-- DropIndex
DROP INDEX "accounts_provider_account_id_key";

-- AlterTable
ALTER TABLE "diagnostic_providers" ALTER COLUMN "rcNumber" SET NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "recipientType",
ADD COLUMN     "recipientType" "NotificationRecipientType" NOT NULL;
