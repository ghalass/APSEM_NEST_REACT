-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Typeparc" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Typeparc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parc" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeparcId" TEXT NOT NULL,

    CONSTRAINT "Parc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Typeconsommationlub" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Typeconsommationlub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeconsommationlub_parc" (
    "parc_id" TEXT NOT NULL,
    "typeconsommationlub_id" TEXT NOT NULL,

    CONSTRAINT "typeconsommationlub_parc_pkey" PRIMARY KEY ("parc_id","typeconsommationlub_id")
);

-- CreateTable
CREATE TABLE "lubrifiant_parc" (
    "parc_id" TEXT NOT NULL,
    "lubrifiant_id" TEXT NOT NULL,

    CONSTRAINT "lubrifiant_parc_pkey" PRIMARY KEY ("parc_id","lubrifiant_id")
);

-- CreateTable
CREATE TABLE "Engin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "parcId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "initialHeureChassis" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "Engin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Typepanne" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Typepanne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typepanne_parc" (
    "parc_id" TEXT NOT NULL,
    "typepanne_id" TEXT NOT NULL,

    CONSTRAINT "typepanne_parc_pkey" PRIMARY KEY ("parc_id","typepanne_id")
);

-- CreateTable
CREATE TABLE "Panne" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typepanneId" TEXT NOT NULL,

    CONSTRAINT "Panne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saisiehrm" (
    "id" TEXT NOT NULL,
    "du" TIMESTAMP(3) NOT NULL,
    "enginId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "hrm" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Saisiehrm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saisiehim" (
    "id" TEXT NOT NULL,
    "panneId" TEXT NOT NULL,
    "him" DOUBLE PRECISION NOT NULL,
    "ni" INTEGER NOT NULL,
    "saisiehrmId" TEXT NOT NULL,
    "obs" TEXT,
    "enginId" TEXT,

    CONSTRAINT "Saisiehim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Typelubrifiant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Typelubrifiant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lubrifiant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typelubrifiantId" TEXT NOT NULL,

    CONSTRAINT "Lubrifiant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saisielubrifiant" (
    "id" TEXT NOT NULL,
    "lubrifiantId" TEXT NOT NULL,
    "qte" DOUBLE PRECISION NOT NULL,
    "obs" TEXT,
    "saisiehimId" TEXT NOT NULL,
    "typeconsommationlubId" TEXT,

    CONSTRAINT "Saisielubrifiant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objectif" (
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

    CONSTRAINT "Objectif_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Site_name_key" ON "Site"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Typeparc_name_key" ON "Typeparc"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Parc_name_key" ON "Parc"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Typeconsommationlub_name_key" ON "Typeconsommationlub"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Engin_name_key" ON "Engin"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Typepanne_name_key" ON "Typepanne"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Panne_name_key" ON "Panne"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Saisiehrm_du_enginId_key" ON "Saisiehrm"("du", "enginId");

-- CreateIndex
CREATE UNIQUE INDEX "Saisiehim_panneId_saisiehrmId_key" ON "Saisiehim"("panneId", "saisiehrmId");

-- CreateIndex
CREATE UNIQUE INDEX "Typelubrifiant_name_key" ON "Typelubrifiant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lubrifiant_name_key" ON "Lubrifiant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Objectif_annee_parcId_siteId_key" ON "Objectif"("annee", "parcId", "siteId");

-- AddForeignKey
ALTER TABLE "Parc" ADD CONSTRAINT "Parc_typeparcId_fkey" FOREIGN KEY ("typeparcId") REFERENCES "Typeparc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typeconsommationlub_parc" ADD CONSTRAINT "typeconsommationlub_parc_parc_id_fkey" FOREIGN KEY ("parc_id") REFERENCES "Parc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typeconsommationlub_parc" ADD CONSTRAINT "typeconsommationlub_parc_typeconsommationlub_id_fkey" FOREIGN KEY ("typeconsommationlub_id") REFERENCES "Typeconsommationlub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lubrifiant_parc" ADD CONSTRAINT "lubrifiant_parc_parc_id_fkey" FOREIGN KEY ("parc_id") REFERENCES "Parc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lubrifiant_parc" ADD CONSTRAINT "lubrifiant_parc_lubrifiant_id_fkey" FOREIGN KEY ("lubrifiant_id") REFERENCES "Lubrifiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engin" ADD CONSTRAINT "Engin_parcId_fkey" FOREIGN KEY ("parcId") REFERENCES "Parc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engin" ADD CONSTRAINT "Engin_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typepanne_parc" ADD CONSTRAINT "typepanne_parc_parc_id_fkey" FOREIGN KEY ("parc_id") REFERENCES "Parc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typepanne_parc" ADD CONSTRAINT "typepanne_parc_typepanne_id_fkey" FOREIGN KEY ("typepanne_id") REFERENCES "Typepanne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Panne" ADD CONSTRAINT "Panne_typepanneId_fkey" FOREIGN KEY ("typepanneId") REFERENCES "Typepanne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saisiehrm" ADD CONSTRAINT "Saisiehrm_enginId_fkey" FOREIGN KEY ("enginId") REFERENCES "Engin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saisiehrm" ADD CONSTRAINT "Saisiehrm_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saisiehim" ADD CONSTRAINT "Saisiehim_panneId_fkey" FOREIGN KEY ("panneId") REFERENCES "Panne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saisiehim" ADD CONSTRAINT "Saisiehim_saisiehrmId_fkey" FOREIGN KEY ("saisiehrmId") REFERENCES "Saisiehrm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saisiehim" ADD CONSTRAINT "Saisiehim_enginId_fkey" FOREIGN KEY ("enginId") REFERENCES "Engin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lubrifiant" ADD CONSTRAINT "Lubrifiant_typelubrifiantId_fkey" FOREIGN KEY ("typelubrifiantId") REFERENCES "Typelubrifiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saisielubrifiant" ADD CONSTRAINT "Saisielubrifiant_lubrifiantId_fkey" FOREIGN KEY ("lubrifiantId") REFERENCES "Lubrifiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saisielubrifiant" ADD CONSTRAINT "Saisielubrifiant_saisiehimId_fkey" FOREIGN KEY ("saisiehimId") REFERENCES "Saisiehim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saisielubrifiant" ADD CONSTRAINT "Saisielubrifiant_typeconsommationlubId_fkey" FOREIGN KEY ("typeconsommationlubId") REFERENCES "Typeconsommationlub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objectif" ADD CONSTRAINT "Objectif_parcId_fkey" FOREIGN KEY ("parcId") REFERENCES "Parc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objectif" ADD CONSTRAINT "Objectif_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
