-- CreateEnum
CREATE TYPE "Urgence" AS ENUM ('TRES_ELEVEE', 'ELEVEE', 'MOYENNE', 'FAIBLE');

-- CreateEnum
CREATE TYPE "Source" AS ENUM ('VS', 'VJ', 'INSPECTION');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NON_PROGRAMMEE', 'PROGRAMMEE', 'PDR_PRET', 'ATTENTE_PDR', 'EXECUTE');

-- CreateTable
CREATE TABLE "Anomalie" (
    "id" TEXT NOT NULL,
    "date_anomalie" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "source" "Source" NOT NULL,
    "urgence" "Urgence" NOT NULL,
    "equipe_execution" TEXT,
    "obs" TEXT,
    "typepanneId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,

    CONSTRAINT "Anomalie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BesoinPdr" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "code" TEXT,
    "no_bs" TEXT,
    "status" "Status" NOT NULL,
    "date_execution" TIMESTAMP(3) NOT NULL,
    "obs" TEXT,
    "anomalie_id" TEXT NOT NULL,

    CONSTRAINT "BesoinPdr_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anomalie_date_anomalie_description_key" ON "Anomalie"("date_anomalie", "description");

-- CreateIndex
CREATE UNIQUE INDEX "BesoinPdr_ref_anomalie_id_key" ON "BesoinPdr"("ref", "anomalie_id");

-- AddForeignKey
ALTER TABLE "Anomalie" ADD CONSTRAINT "Anomalie_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anomalie" ADD CONSTRAINT "Anomalie_typepanneId_fkey" FOREIGN KEY ("typepanneId") REFERENCES "typepanne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BesoinPdr" ADD CONSTRAINT "BesoinPdr_anomalie_id_fkey" FOREIGN KEY ("anomalie_id") REFERENCES "Anomalie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
