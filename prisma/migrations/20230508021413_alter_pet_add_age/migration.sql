/*
  Warnings:

  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StagesAge" AS ENUM ('PUPPY', 'YOUNG', 'ADULT', 'SENIOR');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "age" "StagesAge" NOT NULL;
