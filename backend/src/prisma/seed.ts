/* 
  ✅ prisma/seed.ts
  Script de seed complet pour ton schéma UUID
  Génère : Users, Sites, Typeparcs, Parcs, Engins, Lubrifiants, Objectifs, etc.
*/

import { PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Démarrage du seeding...');

  // === USERS ===
  const usersData = [
    {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: `admin_${faker.string.uuid()}@example.com`,
      password: 'hashed_password',
      role: Role.ADMIN,
    },
    {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: `user_${faker.string.uuid()}@example.com`,
      password: 'hashed_password',
      role: Role.USER,
    },
  ];

  for (const user of usersData) {
    await prisma.user.create({ data: user });
  }

  console.log(`👤 ${usersData.length} users créés.`);

  // === SITES ===
  const siteData = Array.from({ length: 5 }).map(() => ({
    name: faker.company.name(),
  }));
  const sites = await prisma.site.createMany({ data: siteData });
  const siteList = await prisma.site.findMany();
  console.log(`🏗️ ${siteList.length} sites créés.`);

  // === TYPEPARC ===
  const typeparcs = await prisma.typeparc.createMany({
    data: ['MINIER', 'CHANTIER', 'TRANSPORT'].map((name) => ({ name })),
  });
  const typeparcList = await prisma.typeparc.findMany();

  // === PARCS ===
  const parcs = await Promise.all(
    Array.from({ length: 4 }).map(async () => {
      return prisma.parc.create({
        data: {
          name: faker.word.sample({ length: { min: 5, max: 10 } }),
          typeparcId: faker.helpers.arrayElement(typeparcList).id,
        },
      });
    }),
  );
  console.log(`🚜 ${parcs.length} parcs créés.`);

  // === ENGINS ===
  const engins = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      return prisma.engin.create({
        data: {
          name: faker.vehicle.vehicle(),
          parcId: faker.helpers.arrayElement(parcs).id,
          siteId: faker.helpers.arrayElement(siteList).id,
          initialHeureChassis: faker.number.float({ min: 0, max: 1000 }),
          active: faker.datatype.boolean(),
        },
      });
    }),
  );
  console.log(`⚙️ ${engins.length} engins créés.`);

  // === TYPE LUBRIFIANT & LUBRIFIANT ===
  const typelub = await prisma.typelubrifiant.create({
    data: { name: 'HUILE MOTEUR' },
  });
  const lubrifiants = await prisma.lubrifiant.createMany({
    data: [
      { name: 'TOTAL 15W40', typelubrifiantId: typelub.id },
      { name: 'SHELL HELIX 10W30', typelubrifiantId: typelub.id },
    ],
  });
  const lubList = await prisma.lubrifiant.findMany();
  console.log(`🛢️ ${lubList.length} lubrifiants créés.`);

  // === TYPE PANNE & PANNE ===
  const typepanne = await prisma.typepanne.create({
    data: { name: 'MÉCANIQUE' },
  });
  const pannes = await prisma.panne.createMany({
    data: [
      { name: 'Casse moteur', typepanneId: typepanne.id },
      { name: 'Fuite hydraulique', typepanneId: typepanne.id },
    ],
  });
  const panneList = await prisma.panne.findMany();
  console.log(`🔧 ${panneList.length} pannes créées.`);

  // === SAISIE HRM / HIM / LUB ===
  for (const engin of engins) {
    const hrm = await prisma.saisiehrm.create({
      data: {
        du: faker.date.recent({ days: 30 }),
        enginId: engin.id,
        siteId: engin.siteId,
        hrm: faker.number.float({ min: 5, max: 10 }),
      },
    });

    const him = await prisma.saisiehim.create({
      data: {
        panneId: faker.helpers.arrayElement(panneList).id,
        him: faker.number.float({ min: 1, max: 8 }),
        ni: faker.number.int({ min: 1, max: 100 }),
        saisiehrmId: hrm.id,
        obs: faker.lorem.sentence(),
        enginId: engin.id,
      },
    });

    await prisma.saisielubrifiant.create({
      data: {
        lubrifiantId: faker.helpers.arrayElement(lubList).id,
        qte: faker.number.float({ min: 5, max: 20 }),
        saisiehimId: him.id,
        obs: faker.lorem.words(3),
      },
    });
  }

  console.log('📊 Saisies HRM/HIM/Lubrifiants créées.');

  // === OBJECTIFS ===
  for (const parc of parcs) {
    await prisma.objectif.create({
      data: {
        annee: 2025,
        parcId: parc.id,
        siteId: faker.helpers.arrayElement(siteList).id,
        dispo: faker.number.float({ min: 70, max: 100 }),
        mtbf: faker.number.float({ min: 10, max: 50 }),
        tdm: faker.number.float({ min: 1, max: 5 }),
        spe_huile: faker.number.float({ min: 0, max: 2 }),
        spe_go: faker.number.float({ min: 0, max: 2 }),
        spe_graisse: faker.number.float({ min: 0, max: 2 }),
      },
    });
  }

  console.log('🎯 Objectifs créés.');
  console.log('✅ Seeding terminé avec succès.');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
