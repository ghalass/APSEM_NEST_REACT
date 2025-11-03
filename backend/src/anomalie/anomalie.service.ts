// src/anomalie/anomalie.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAnomalieDto } from './dto/create-anomalie.dto';
import { UpdateAnomalieDto } from './dto/update-anomalie.dto';

@Injectable()
export class AnomalieService {
  private prisma = new PrismaClient();

  // === CREATE ===
  async create(dto: CreateAnomalieDto) {
    // Vérifier que l'engin existe
    const engin = await this.prisma.engin.findUnique({
      where: { id: dto.enginId },
    });
    if (!engin) throw new NotFoundException('Engin non trouvé');

    // Vérifier que le site existe
    const site = await this.prisma.site.findUnique({
      where: { id: dto.siteId },
    });
    if (!site) throw new NotFoundException('Site non trouvé');

    // Vérifier que le type de panne existe
    const typepanne = await this.prisma.typepanne.findUnique({
      where: { id: dto.typepanneId },
    });
    if (!typepanne) throw new NotFoundException('Type de panne non trouvé');

    return this.prisma.anomalie.create({
      data: {
        date_anomalie: dto.date_anomalie,
        description: dto.description,
        source: dto.source,
        urgence: dto.urgence,
        status: dto.status,
        date_execution: dto.date_execution,
        equipe_execution: dto.equipe_execution,
        obs: dto.obs,
        // Relations
        engin: { connect: { id: engin.id } },
        site: { connect: { id: site.id } },
        typepanne: { connect: { id: typepanne.id } },
      },
    });
  }

  // === UPDATE ===
  async update(id: string, dto: UpdateAnomalieDto) {
    // Vérifier que l'anomalie existe
    const anomalie = await this.prisma.anomalie.findUnique({
      where: { id },
    });
    if (!anomalie) throw new NotFoundException('Anomalie non trouvée');

    return this.prisma.anomalie.update({
      where: { id },
      data: {
        date_anomalie: dto.date_anomalie,
        description: dto.description,
        source: dto.source,
        urgence: dto.urgence,
        status: dto.status,
        date_execution: dto.date_execution,
        equipe_execution: dto.equipe_execution,
        obs: dto.obs,
        // Relations mises à jour uniquement si fournies
        engin: dto.enginId ? { connect: { id: dto.enginId } } : undefined,
        site: dto.siteId ? { connect: { id: dto.siteId } } : undefined,
        typepanne: dto.typepanneId
          ? { connect: { id: dto.typepanneId } }
          : undefined,
      },
    });
  }

  // === FIND ALL ===
  async findAll() {
    return this.prisma.anomalie.findMany({
      include: { engin: true, site: true, typepanne: true, besoin_pdr: true },
    });
  }

  // === FIND ONE ===
  async findOne(id: string) {
    const anomalie = await this.prisma.anomalie.findUnique({
      where: { id },
      include: { engin: true, site: true, typepanne: true, besoin_pdr: true },
    });
    if (!anomalie) throw new NotFoundException('Anomalie non trouvée');
    return anomalie;
  }

  // === DELETE ===
  async remove(id: string) {
    // Vérifier que l'anomalie existe
    const anomalie = await this.prisma.anomalie.findUnique({
      where: { id },
    });
    if (!anomalie) throw new NotFoundException('Anomalie non trouvée');

    return this.prisma.anomalie.delete({ where: { id } });
  }

  async getAnomaliesFormatted() {
    const anomalies = await this.prisma.anomalie.findMany({
      include: {
        engin: true,
        site: true,
        typepanne: true,
        besoin_pdr: true,
      },
      orderBy: {
        date_anomalie: 'desc',
      },
    });

    // Transformer le format
    const formatted = anomalies.flatMap((a) =>
      a.besoin_pdr.map((b) => ({
        date_anomalie: new Date(a.date_anomalie).toLocaleDateString('fr-FR'),
        engin: a.engin.name,
        description: a.description,
        source: a.source,
        urgence: a.urgence,
        equipe_execution: a.equipe_execution,
        obs_anomalie: a.obs,
        type_panne: a.typepanne.name,
        site: a.site.name,
        status: a.status,
        date_execution: a.date_execution
          ? new Date(a.date_execution).toLocaleDateString('fr-FR')
          : null,
        ref_bs: b.ref,
        code_bs: b.code,
        no_bs: b.no_bs,
        besoin_status: b.besoin_status,
        obs_bs: b.obs,
      })),
    );

    return formatted;
  }

  async getBacklogDashboardStats() {
    const anomalies = await this.prisma.anomalie.findMany({
      include: {
        engin: true,
        site: true,
        typepanne: true,
        besoin_pdr: true,
      },
    });

    const totalAnomalies = anomalies.length;

    // === Statistiques par type de panne ===
    const byTypePanne = anomalies.reduce(
      (acc, a) => {
        const key = a.typepanne.name;
        acc[key] = acc[key] || {
          total: 0,
          status: {
            NON_PROGRAMMEE: 0,
            PROGRAMMEE: 0,
            PDR_PRET: 0,
            ATTENTE_PDR: 0,
            EXECUTE: 0,
          },
          totalBesoinPdr: 0,
        };
        acc[key].total++;
        acc[key].status[a.status]++;
        acc[key].totalBesoinPdr += a.besoin_pdr.length;
        return acc;
      },
      {} as Record<string, any>,
    );

    // === Statistiques par site ===
    const bySite = anomalies.reduce(
      (acc, a) => {
        const key = a.site.name;
        acc[key] = acc[key] || {
          total: 0,
          status: {
            NON_PROGRAMMEE: 0,
            PROGRAMMEE: 0,
            PDR_PRET: 0,
            ATTENTE_PDR: 0,
            EXECUTE: 0,
          },
        };
        acc[key].total++;
        acc[key].status[a.status]++;
        return acc;
      },
      {} as Record<string, any>,
    );

    // === Statistiques globales ===
    const byUrgence = anomalies.reduce(
      (acc, a) => {
        acc[a.urgence] = (acc[a.urgence] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const totalBesoinPdrByStatus = anomalies
      .flatMap((a) => a.besoin_pdr)
      .reduce(
        (acc, b) => {
          acc[b.besoin_status] = (acc[b.besoin_status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

    const tempsExecution = anomalies
      .filter((a) => a.status === 'EXECUTE' && a.date_execution)
      .map((a) => {
        const start = a.date_anomalie.getTime();
        const end = a.date_execution!.getTime();
        return (end - start) / (1000 * 3600 * 24); // temps en jours
      });

    const moyenneTempsExecution =
      tempsExecution.length > 0
        ? tempsExecution.reduce((a, b) => a + b, 0) / tempsExecution.length
        : 0;

    return {
      totalAnomalies,
      byTypePanne,
      bySite,
      byUrgence,
      totalBesoinPdrByStatus,
      moyenneTempsExecution,
    };
  }
}
