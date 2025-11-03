/*
  Warnings:

  - You are about to drop the column `status` on the `BesoinPdr` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BesoinStatus" AS ENUM ('ATTENTE_BS', 'BS_FAIT', 'PDR_SORTIE', 'EN_DA', 'EN_COMMANDE', 'SANS_RESSOURCE', 'NON_SUIVI_APPRO');

-- AlterTable
ALTER TABLE "Anomalie" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NON_PROGRAMMEE';

-- AlterTable
ALTER TABLE "BesoinPdr" DROP COLUMN "status",
ADD COLUMN     "besoin_status" "BesoinStatus" NOT NULL DEFAULT 'ATTENTE_BS';
