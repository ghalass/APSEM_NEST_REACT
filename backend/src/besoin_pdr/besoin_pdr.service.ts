import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBesoinPdrDto } from './dto/create-besoin_pdr.dto';
import { UpdateBesoinPdrDto } from './dto/update-besoin_pdr.dto';

@Injectable()
export class BesoinPdrService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBesoinPdrDto) {
    // Relation via clé étrangère
    return this.prisma.besoinPdr.create({
      data: {
        ref: dto.ref,
        code: dto.code,
        no_bs: dto.no_bs,
        status: dto.status,
        date_execution: dto.date_execution,
        obs: dto.obs,
        anomalie: { connect: { id: dto.anomalie_id } }, // ✅ Relation connectée
      },
      include: {
        anomalie: true,
      },
    });
  }

  async findAll() {
    return this.prisma.besoinPdr.findMany({
      include: { anomalie: true },
      orderBy: { date_execution: 'desc' },
    });
  }

  // ✅ Créer un besoin PDR directement lié à une anomalie
  async createForAnomalie(anomalieId: string, dto: CreateBesoinPdrDto) {
    // Vérifie que l’anomalie existe
    const anomalie = await this.prisma.anomalie.findUnique({
      where: { id: anomalieId },
    });
    if (!anomalie) {
      throw new NotFoundException('Anomalie non trouvée');
    }

    // Crée le besoin PDR lié
    return this.prisma.besoinPdr.create({
      data: {
        ref: dto.ref,
        code: dto.code,
        no_bs: dto.no_bs,
        status: dto.status,
        date_execution: dto.date_execution,
        obs: dto.obs,
        anomalie: { connect: { id: anomalieId } },
      },
      include: { anomalie: true },
    });
  }

  async findOne(id: string) {
    const besoin = await this.prisma.besoinPdr.findUnique({
      where: { id },
      include: { anomalie: true },
    });
    if (!besoin) throw new NotFoundException('Besoin PDR non trouvé');
    return besoin;
  }

  async update(id: string, dto: UpdateBesoinPdrDto) {
    await this.findOne(id);
    return this.prisma.besoinPdr.update({
      where: { id },
      data: {
        ref: dto.ref,
        code: dto.code,
        no_bs: dto.no_bs,
        status: dto.status,
        date_execution: dto.date_execution,
        obs: dto.obs,
        anomalie: dto.anomalie_id
          ? { connect: { id: dto.anomalie_id } }
          : undefined,
      },
      include: { anomalie: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.besoinPdr.delete({ where: { id } });
  }
}
