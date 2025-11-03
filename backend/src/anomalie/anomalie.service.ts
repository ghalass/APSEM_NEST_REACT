import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnomalieDto } from './dto/create-anomalie.dto';
import { UpdateAnomalieDto } from './dto/update-anomalie.dto';

@Injectable()
export class AnomalieService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAnomalieDto) {
    return this.prisma.anomalie.create({
      data: {
        date_anomalie: dto.date_anomalie,
        description: dto.description,
        source: dto.source,
        urgence: dto.urgence,
        equipe_execution: dto.equipe_execution,
        obs: dto.obs,
        site: { connect: { id: dto.site_id } },
        typepanne: { connect: { id: dto.typepanne_id } },
      },
      include: {
        site: true,
        typepanne: true,
        besoin_pdr: true,
      },
    });
  }

  async findAll() {
    return this.prisma.anomalie.findMany({
      include: {
        site: true,
        typepanne: true,
        besoin_pdr: true,
      },
      orderBy: { date_anomalie: 'desc' },
    });
  }

  async findOne(id: string) {
    const anomalie = await this.prisma.anomalie.findUnique({
      where: { id },
      include: {
        site: true,
        typepanne: true,
        besoin_pdr: true,
      },
    });

    if (!anomalie) {
      throw new NotFoundException(`Anomalie avec l'ID ${id} non trouvée`);
    }

    return anomalie;
  }

  async update(id: string, dto: UpdateAnomalieDto) {
    await this.findOne(id); // vérifie que l’anomalie existe

    return this.prisma.anomalie.update({
      where: { id },
      data: {
        ...dto,
      },
      include: {
        site: true,
        typepanne: true,
        besoin_pdr: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.anomalie.delete({ where: { id } });
  }
}
