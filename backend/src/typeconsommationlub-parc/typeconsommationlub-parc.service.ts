import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeconsommationlubParcDto } from './dto/create-typeconsommationlub-parc.dto';
import { UpdateTypeconsommationlubParcDto } from './dto/update-typeconsommationlub-parc.dto';

@Injectable()
export class TypeconsommationlubParcService {
  constructor(private prisma: PrismaService) {}

  // ✅ Créer une relation Parc <-> TypeConsommationLub
  async create(dto: CreateTypeconsommationlubParcDto) {
    return this.prisma.typeconsommationlubParc.create({
      data: {
        parcId: dto.parcId,
        typeconsommationlubId: dto.typeconsommationlubId,
      },
    });
  }

  // ✅ Récupérer toutes les relations
  async findAll() {
    return this.prisma.typeconsommationlubParc.findMany({
      include: {
        parc: true,
        typeconsommationlub: true,
      },
    });
  }

  // ✅ Récupérer une relation spécifique
  async findOne(parcId: string, typeconsommationlubId: string) {
    const relation = await this.prisma.typeconsommationlubParc.findUnique({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
      include: {
        parc: true,
        typeconsommationlub: true,
      },
    });

    if (!relation) {
      throw new NotFoundException(
        `Relation Parc(${parcId}) <-> TypeConsommationLub(${typeconsommationlubId}) non trouvée`,
      );
    }

    return relation;
  }

  // ✅ Mettre à jour une relation
  async update(
    parcId: string,
    typeconsommationlubId: string,
    dto: UpdateTypeconsommationlubParcDto,
  ) {
    return this.prisma.typeconsommationlubParc.update({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
      data: dto,
    });
  }

  // ✅ Supprimer une relation
  async remove(parcId: string, typeconsommationlubId: string) {
    return this.prisma.typeconsommationlubParc.delete({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
    });
  }
}
