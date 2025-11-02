/*
  Warnings:

  - You are about to drop the `Engin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lubrifiant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Objectif` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Panne` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Saisiehim` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Saisiehrm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Saisielubrifiant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Site` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Typeconsommationlub` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Typelubrifiant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Typepanne` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Typeparc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Engin" DROP CONSTRAINT "Engin_parcId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Engin" DROP CONSTRAINT "Engin_siteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Lubrifiant" DROP CONSTRAINT "Lubrifiant_typelubrifiantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Objectif" DROP CONSTRAINT "Objectif_parcId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Objectif" DROP CONSTRAINT "Objectif_siteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Panne" DROP CONSTRAINT "Panne_typepanneId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Parc" DROP CONSTRAINT "Parc_typeparcId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Saisiehim" DROP CONSTRAINT "Saisiehim_enginId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Saisiehim" DROP CONSTRAINT "Saisiehim_panneId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Saisiehim" DROP CONSTRAINT "Saisiehim_saisiehrmId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Saisiehrm" DROP CONSTRAINT "Saisiehrm_enginId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Saisiehrm" DROP CONSTRAINT "Saisiehrm_siteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Saisielubrifiant" DROP CONSTRAINT "Saisielubrifiant_lubrifiantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Saisielubrifiant" DROP CONSTRAINT "Saisielubrifiant_saisiehimId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Saisielubrifiant" DROP CONSTRAINT "Saisielubrifiant_typeconsommationlubId_fkey";

-- DropForeignKey
ALTER TABLE "public"."lubrifiant_parc" DROP CONSTRAINT "lubrifiant_parc_lubrifiant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lubrifiant_parc" DROP CONSTRAINT "lubrifiant_parc_parc_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."typeconsommationlub_parc" DROP CONSTRAINT "typeconsommationlub_parc_parc_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."typeconsommationlub_parc" DROP CONSTRAINT "typeconsommationlub_parc_typeconsommationlub_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."typepanne_parc" DROP CONSTRAINT "typepanne_parc_parc_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."typepanne_parc" DROP CONSTRAINT "typepanne_parc_typepanne_id_fkey";

-- DropTable
DROP TABLE "public"."Engin";

-- DropTable
DROP TABLE "public"."Lubrifiant";

-- DropTable
DROP TABLE "public"."Objectif";

-- DropTable
DROP TABLE "public"."Panne";

-- DropTable
DROP TABLE "public"."Parc";

-- DropTable
DROP TABLE "public"."Saisiehim";

-- DropTable
DROP TABLE "public"."Saisiehrm";

-- DropTable
DROP TABLE "public"."Saisielubrifiant";

-- DropTable
DROP TABLE "public"."Site";

-- DropTable
DROP TABLE "public"."Typeconsommationlub";

-- DropTable
DROP TABLE "public"."Typelubrifiant";

-- DropTable
DROP TABLE "public"."Typepanne";

-- DropTable
DROP TABLE "public"."Typeparc";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeparc" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "typeparc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parc" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeparcId" TEXT NOT NULL,

    CONSTRAINT "parc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeconsommation_lub" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "typeconsommation_lub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "parcId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "initialHeureChassis" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "engin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typepanne" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "typepanne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "panne" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typepanneId" TEXT NOT NULL,

    CONSTRAINT "panne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saisie_hrm" (
    "id" TEXT NOT NULL,
    "du" TIMESTAMP(3) NOT NULL,
    "enginId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "hrm" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "saisie_hrm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saisie_him" (
    "id" TEXT NOT NULL,
    "panneId" TEXT NOT NULL,
    "him" DOUBLE PRECISION NOT NULL,
    "ni" INTEGER NOT NULL,
    "saisiehrmId" TEXT NOT NULL,
    "obs" TEXT,
    "enginId" TEXT,

    CONSTRAINT "saisie_him_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_lubrifiant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "type_lubrifiant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lubrifiant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typelubrifiantId" TEXT NOT NULL,

    CONSTRAINT "lubrifiant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saisie_lubrifiant" (
    "id" TEXT NOT NULL,
    "lubrifiantId" TEXT NOT NULL,
    "qte" DOUBLE PRECISION NOT NULL,
    "obs" TEXT,
    "saisiehimId" TEXT NOT NULL,
    "typeconsommationlubId" TEXT,

    CONSTRAINT "saisie_lubrifiant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectif" (
    "id" TEXT NOT NULL,
    "annee" INTEGER NOT NULL,
    "parcId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "dispo" DOUBLE PRECISION,
    "mtbf" DOUBLE PRECISION,
    "tdm" DOUBLE PRECISION,
    "spe_huile" DOUBLE PRECISION,
    "spe_go" DOUBLE PRECISION,
    "spe_graisse" DOUBLE PRECISION,

    CONSTRAINT "objectif_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "site_name_key" ON "site"("name");

-- CreateIndex
CREATE UNIQUE INDEX "typeparc_name_key" ON "typeparc"("name");

-- CreateIndex
CREATE UNIQUE INDEX "parc_name_key" ON "parc"("name");

-- CreateIndex
CREATE UNIQUE INDEX "typeconsommation_lub_name_key" ON "typeconsommation_lub"("name");

-- CreateIndex
CREATE UNIQUE INDEX "engin_name_key" ON "engin"("name");

-- CreateIndex
CREATE UNIQUE INDEX "typepanne_name_key" ON "typepanne"("name");

-- CreateIndex
CREATE UNIQUE INDEX "panne_name_key" ON "panne"("name");

-- CreateIndex
CREATE UNIQUE INDEX "saisie_hrm_du_enginId_key" ON "saisie_hrm"("du", "enginId");

-- CreateIndex
CREATE UNIQUE INDEX "saisie_him_panneId_saisiehrmId_key" ON "saisie_him"("panneId", "saisiehrmId");

-- CreateIndex
CREATE UNIQUE INDEX "type_lubrifiant_name_key" ON "type_lubrifiant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "lubrifiant_name_key" ON "lubrifiant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "objectif_annee_parcId_siteId_key" ON "objectif"("annee", "parcId", "siteId");

-- AddForeignKey
ALTER TABLE "parc" ADD CONSTRAINT "parc_typeparcId_fkey" FOREIGN KEY ("typeparcId") REFERENCES "typeparc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typeconsommationlub_parc" ADD CONSTRAINT "typeconsommationlub_parc_parc_id_fkey" FOREIGN KEY ("parc_id") REFERENCES "parc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typeconsommationlub_parc" ADD CONSTRAINT "typeconsommationlub_parc_typeconsommationlub_id_fkey" FOREIGN KEY ("typeconsommationlub_id") REFERENCES "typeconsommation_lub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lubrifiant_parc" ADD CONSTRAINT "lubrifiant_parc_parc_id_fkey" FOREIGN KEY ("parc_id") REFERENCES "parc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lubrifiant_parc" ADD CONSTRAINT "lubrifiant_parc_lubrifiant_id_fkey" FOREIGN KEY ("lubrifiant_id") REFERENCES "lubrifiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "engin" ADD CONSTRAINT "engin_parcId_fkey" FOREIGN KEY ("parcId") REFERENCES "parc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "engin" ADD CONSTRAINT "engin_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typepanne_parc" ADD CONSTRAINT "typepanne_parc_parc_id_fkey" FOREIGN KEY ("parc_id") REFERENCES "parc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typepanne_parc" ADD CONSTRAINT "typepanne_parc_typepanne_id_fkey" FOREIGN KEY ("typepanne_id") REFERENCES "typepanne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "panne" ADD CONSTRAINT "panne_typepanneId_fkey" FOREIGN KEY ("typepanneId") REFERENCES "typepanne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisie_hrm" ADD CONSTRAINT "saisie_hrm_enginId_fkey" FOREIGN KEY ("enginId") REFERENCES "engin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisie_hrm" ADD CONSTRAINT "saisie_hrm_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisie_him" ADD CONSTRAINT "saisie_him_panneId_fkey" FOREIGN KEY ("panneId") REFERENCES "panne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisie_him" ADD CONSTRAINT "saisie_him_saisiehrmId_fkey" FOREIGN KEY ("saisiehrmId") REFERENCES "saisie_hrm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisie_him" ADD CONSTRAINT "saisie_him_enginId_fkey" FOREIGN KEY ("enginId") REFERENCES "engin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lubrifiant" ADD CONSTRAINT "lubrifiant_typelubrifiantId_fkey" FOREIGN KEY ("typelubrifiantId") REFERENCES "type_lubrifiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisie_lubrifiant" ADD CONSTRAINT "saisie_lubrifiant_lubrifiantId_fkey" FOREIGN KEY ("lubrifiantId") REFERENCES "lubrifiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisie_lubrifiant" ADD CONSTRAINT "saisie_lubrifiant_saisiehimId_fkey" FOREIGN KEY ("saisiehimId") REFERENCES "saisie_him"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisie_lubrifiant" ADD CONSTRAINT "saisie_lubrifiant_typeconsommationlubId_fkey" FOREIGN KEY ("typeconsommationlubId") REFERENCES "typeconsommation_lub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "objectif" ADD CONSTRAINT "objectif_parcId_fkey" FOREIGN KEY ("parcId") REFERENCES "parc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "objectif" ADD CONSTRAINT "objectif_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
