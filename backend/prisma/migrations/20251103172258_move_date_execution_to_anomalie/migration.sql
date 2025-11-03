/*
  Warnings:

  - You are about to drop the column `date_execution` on the `BesoinPdr` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anomalie" ADD COLUMN     "date_execution" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "BesoinPdr" DROP COLUMN "date_execution";
