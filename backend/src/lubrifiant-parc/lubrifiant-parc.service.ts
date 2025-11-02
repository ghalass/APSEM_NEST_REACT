import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLubrifiantParcDto } from './dto/create-lubrifiant-parc.dto';
import { UpdateLubrifiantParcDto } from './dto/update-lubrifiant-parc.dto';

@Injectable()
export class LubrifiantParcService {
  constructor(private prisma: PrismaService) {}

  // ✅ Créer une relation Parc <-> Lubrifiant
  async create(dto: CreateLubrifiantParcDto) {
    return this.prisma.lubrifiantParc.create({
      data: {
        parcId: dto.parcId,
        lubrifiantId: dto.lubrifiantId,
      },
    });
  }

  // ✅ Récupérer toutes les relations
  async findAll() {
    return this.prisma.lubrifiantParc.findMany({
      include: {
        parc: true,
        lubrifiant: true,
      },
    });
  }

  // ✅ Récupérer une relation spécifique
  async findOne(parcId: string, lubrifiantId: string) {
    const relation = await this.prisma.lubrifiantParc.findUnique({
      where: {
        parcId_lubrifiantId: { parcId, lubrifiantId },
      },
      include: {
        parc: true,
        lubrifiant: true,
      },
    });

    if (!relation) {
      throw new NotFoundException(
        `Relation Parc(${parcId}) <-> Lubrifiant(${lubrifiantId}) non trouvée`,
      );
    }

    return relation;
  }

  // ✅ Mettre à jour une relation
  async update(
    parcId: string,
    lubrifiantId: string,
    dto: UpdateLubrifiantParcDto,
  ) {
    return this.prisma.lubrifiantParc.update({
      where: {
        parcId_lubrifiantId: { parcId, lubrifiantId },
      },
      data: dto,
    });
  }

  // ✅ Supprimer une relation
  async remove(parcId: string, lubrifiantId: string) {
    return this.prisma.lubrifiantParc.delete({
      where: {
        parcId_lubrifiantId: { parcId, lubrifiantId },
      },
    });
  }
}
