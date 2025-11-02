import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Suppression des données (hors Users)...');

  // ⚠️ Ordre important : supprimer les dépendances avant les tables principales
  await prisma.saisielubrifiant.deleteMany();
  await prisma.saisiehim.deleteMany();
  await prisma.saisiehrm.deleteMany();

  await prisma.lubrifiantParc.deleteMany();
  await prisma.typeconsommationlubParc.deleteMany();
  await prisma.typepanneParc.deleteMany();

  await prisma.objectif.deleteMany();

  await prisma.engin.deleteMany();
  await prisma.parc.deleteMany();
  await prisma.site.deleteMany();

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
