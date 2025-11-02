import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypepanneParcDto } from './dto/create-typepanne-parc.dto';
import { UpdateTypepanneParcDto } from './dto/update-typepanne-parc.dto';

@Injectable()
export class TypepanneParcService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer une liaison Typepanne <-> Parc
  async create(dto: CreateTypepanneParcDto) {
    // Vérifier que le Parc existe
    const parc = await this.prisma.parc.findUnique({
      where: { id: dto.parcId },
    });
    if (!parc) throw new NotFoundException(`Parc #${dto.parcId} non trouvé`);

    // Vérifier que le Typepanne existe
    const typepanne = await this.prisma.typepanne.findUnique({
      where: { id: dto.typepanneId },
    });
    if (!typepanne)
      throw new NotFoundException(`Typepanne #${dto.typepanneId} non trouvé`);

    // Vérifier si la relation existe déjà
    const exists = await this.prisma.typepanneParc.findUnique({
      where: {
        parcId_typepanneId: {
          parcId: dto.parcId,
          typepanneId: dto.typepanneId,
        },
      },
    });
    if (exists)
      throw new BadRequestException(`Cette liaison Parc-Typepanne existe déjà`);

    return this.prisma.typepanneParc.create({
      data: { parcId: dto.parcId, typepanneId: dto.typepanneId },
    });
  }

  // ✅ Lister toutes les liaisons
  async findAll() {
    return this.prisma.typepanneParc.findMany({
      include: {
        parc: true,
        typepanne: true,
      },
    });
  }

  // ✅ Récupérer une liaison par combinaison ID (parcId + typepanneId)
  async findOne(parcId: string, typepanneId: string) {
    const relation = await this.prisma.typepanneParc.findUnique({
      where: { parcId_typepanneId: { parcId, typepanneId } },
      include: { parc: true, typepanne: true },
    });
    if (!relation)
      throw new NotFoundException(
        `Relation Parc #${parcId} - Typepanne #${typepanneId} non trouvée`,
      );
    return relation;
  }

  // ✅ Mettre à jour la liaison (changer le typepanne ou le parc)
  async update(
    parcId: string,
    typepanneId: string,
    dto: UpdateTypepanneParcDto,
  ) {
    const relation = await this.prisma.typepanneParc.findUnique({
      where: { parcId_typepanneId: { parcId, typepanneId } },
    });
    if (!relation)
      throw new NotFoundException(
        `Relation Parc #${parcId} - Typepanne #${typepanneId} non trouvée`,
      );

    // Si on veut modifier le parc ou le typepanne, vérifier l’existence
    if (dto.parcId) {
      const parc = await this.prisma.parc.findUnique({
        where: { id: dto.parcId },
      });
      if (!parc) throw new NotFoundException(`Parc #${dto.parcId} non trouvé`);
    }
    if (dto.typepanneId) {
      const typepanne = await this.prisma.typepanne.findUnique({
        where: { id: dto.typepanneId },
      });
      if (!typepanne)
        throw new NotFoundException(`Typepanne #${dto.typepanneId} non trouvé`);
    }

    // Vérifier si la nouvelle combinaison existe déjà
    const newParcId = dto.parcId ?? parcId;
    const newTypepanneId = dto.typepanneId ?? typepanneId;
    const exists = await this.prisma.typepanneParc.findUnique({
      where: {
        parcId_typepanneId: { parcId: newParcId, typepanneId: newTypepanneId },
      },
    });
    if (exists && (newParcId !== parcId || newTypepanneId !== typepanneId))
      throw new BadRequestException(`Cette liaison Parc-Typepanne existe déjà`);

    return this.prisma.typepanneParc.update({
      where: { parcId_typepanneId: { parcId, typepanneId } },
      data: { parcId: newParcId, typepanneId: newTypepanneId },
    });
  }

  // ✅ Supprimer la liaison
  async remove(parcId: string, typepanneId: string) {
    const relation = await this.prisma.typepanneParc.findUnique({
      where: { parcId_typepanneId: { parcId, typepanneId } },
    });
    if (!relation)
      throw new NotFoundException(
        `Relation Parc #${parcId} - Typepanne #${typepanneId} non trouvée`,
      );

    await this.prisma.typepanneParc.delete({
      where: { parcId_typepanneId: { parcId, typepanneId } },
    });

    return {
      message: `Relation Parc #${parcId} - Typepanne #${typepanneId} supprimée avec succès`,
    };
  }
}
