import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Suppression des données (hors Users)...');

  // ⚠️ Ordre important : supprimer les dépendances avant les tables principales

  // 1️⃣ Supprimer BesoinPdr et Anomalies
  await prisma.besoinPdr.deleteMany();
  await prisma.anomalie.deleteMany();

  // 2️⃣ Supprimer les saisies
  await prisma.saisielubrifiant.deleteMany();
  await prisma.saisiehim.deleteMany();
  await prisma.saisiehrm.deleteMany();

  // 3️⃣ Supprimer les relations Parc <-> Lubrifiant / TypeConsommation / TypePanne
  await prisma.lubrifiantParc.deleteMany();
  await prisma.typeconsommationlubParc.deleteMany();
  await prisma.typepanneParc.deleteMany();

  // 4️⃣ Supprimer Objectifs
  await prisma.objectif.deleteMany();

  // 5️⃣ Supprimer Parcs, Engins et Sites
  await prisma.engin.deleteMany();
  await prisma.parc.deleteMany();
  await prisma.site.deleteMany();

  // 6️⃣ Supprimer Lubrifiants et Types
  await prisma.lubrifiant.deleteMany();
  await prisma.typelubrifiant.deleteMany();
  await prisma.panne.deleteMany();
  await prisma.typepanne.deleteMany();
  await prisma.typeconsommationlub.deleteMany();
  await prisma.typeparc.deleteMany();

  console.log('✅ Toutes les données supprimées, les Users sont conservés.');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors de la suppression :', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
