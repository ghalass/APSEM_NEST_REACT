import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLubrifiantParcDto } from './dto/create-lubrifiant-parc.dto';
import { UpdateLubrifiantParcDto } from './dto/update-lubrifiant-parc.dto';

@Injectable()
export class LubrifiantParcService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer un lien Parc <-> Lubrifiant
  async create(createLubrifiantParcDto: CreateLubrifiantParcDto) {
    const { parcId, lubrifiantId } = createLubrifiantParcDto;

    // Vérifier que le Parc existe
    const parc = await this.prisma.parc.findUnique({ where: { id: parcId } });
    if (!parc) throw new NotFoundException(`Parc #${parcId} non trouvé`);

    // Vérifier que le Lubrifiant existe
    const lubrifiant = await this.prisma.lubrifiant.findUnique({
      where: { id: lubrifiantId },
    });
    if (!lubrifiant)
      throw new NotFoundException(`Lubrifiant #${lubrifiantId} non trouvé`);

    try {
      return await this.prisma.lubrifiantParc.create({
        data: {
          parcId,
          lubrifiantId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Lister tous les liens avec informations
  async findAll() {
    return this.prisma.lubrifiantParc.findMany({
      include: {
        parc: true,
        lubrifiant: true,
      },
    });
  }

  // ✅ Récupérer un lien spécifique (clé composite)
  async findOne(parcId: string, lubrifiantId: string) {
    const link = await this.prisma.lubrifiantParc.findUnique({
      where: {
        parcId_lubrifiantId: { parcId, lubrifiantId },
      },
      include: {
        parc: true,
        lubrifiant: true,
      },
    });
    if (!link)
      throw new NotFoundException(
        `Lien Parc #${parcId} - Lubrifiant #${lubrifiantId} non trouvé`,
      );
    return link;
  }

  // ✅ Mettre à jour un lien (ici on peut seulement remplacer les IDs si besoin)
  async update(
    parcId: string,
    lubrifiantId: string,
    updateLubrifiantParcDto: UpdateLubrifiantParcDto,
  ) {
    const existing = await this.prisma.lubrifiantParc.findUnique({
      where: { parcId_lubrifiantId: { parcId, lubrifiantId } },
    });
    if (!existing)
      throw new NotFoundException(
        `Lien Parc #${parcId} - Lubrifiant #${lubrifiantId} non trouvé`,
      );

    try {
      return await this.prisma.lubrifiantParc.update({
        where: { parcId_lubrifiantId: { parcId, lubrifiantId } },
        data: {
          parcId: updateLubrifiantParcDto.parcId ?? parcId,
          lubrifiantId: updateLubrifiantParcDto.lubrifiantId ?? lubrifiantId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Supprimer un lien
  async remove(parcId: string, lubrifiantId: string) {
    const existing = await this.prisma.lubrifiantParc.findUnique({
      where: { parcId_lubrifiantId: { parcId, lubrifiantId } },
    });
    if (!existing)
      throw new NotFoundException(
        `Lien Parc #${parcId} - Lubrifiant #${lubrifiantId} non trouvé`,
      );

    try {
      await this.prisma.lubrifiantParc.delete({
        where: { parcId_lubrifiantId: { parcId, lubrifiantId } },
      });
      return {
        message: `Lien Parc #${parcId} - Lubrifiant #${lubrifiantId} supprimé avec succès`,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
