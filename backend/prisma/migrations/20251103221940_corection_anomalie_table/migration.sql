/*
  Warnings:

  - Added the required column `enginId` to the `Anomalie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Anomalie" ADD COLUMN     "enginId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Anomalie" ADD CONSTRAINT "Anomalie_enginId_fkey" FOREIGN KEY ("enginId") REFERENCES "engin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
