/*
  Warnings:

  - Added the required column `category` to the `TestTypes` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `TestTypes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TestTypes" ADD COLUMN     "category" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
