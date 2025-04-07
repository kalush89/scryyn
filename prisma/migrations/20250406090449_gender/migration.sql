/*
  Warnings:

  - You are about to drop the column `sex` on the `dependants` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `patients` table. All the data in the column will be lost.
  - Added the required column `gender` to the `dependants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dependants" DROP COLUMN "sex",
ADD COLUMN     "gender" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "sex",
ADD COLUMN     "gender" TEXT;

-- DropEnum
DROP TYPE "Sex";
