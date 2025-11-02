import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateObjectifDto } from './dto/create-objectif.dto';
import { UpdateObjectifDto } from './dto/update-objectif.dto';

@Injectable()
export class ObjectifService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer un objectif
  async create(createObjectifDto: CreateObjectifDto) {
    const {
      parcId,
      siteId,
      annee,
      dispo,
      mtbf,
      tdm,
      spe_huile,
      spe_go,
      spe_graisse,
    } = createObjectifDto;

    // Vérifier existence du Parc
    const parc = await this.prisma.parc.findUnique({ where: { id: parcId } });
    if (!parc) throw new NotFoundException(`Parc #${parcId} non trouvé`);

    // Vérifier existence du Site
    const site = await this.prisma.site.findUnique({ where: { id: siteId } });
    if (!site) throw new NotFoundException(`Site #${siteId} non trouvé`);

    try {
      return await this.prisma.objectif.create({
        data: {
          annee,
          parcId,
          siteId,
          dispo,
          mtbf,
          tdm,
          spe_huile,
          spe_go,
          spe_graisse,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Violation contrainte unique
        throw new BadRequestException(
          `Un objectif pour l'année ${annee} sur ce parc et site existe déjà.`,
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Lister tous les objectifs
  async findAll() {
    return this.prisma.objectif.findMany({
      include: {
        Parc: true,
        Site: true,
      },
    });
  }

  // ✅ Récupérer un objectif par ID
  async findOne(id: string) {
    const objectif = await this.prisma.objectif.findUnique({
      where: { id },
      include: {
        Parc: true,
        Site: true,
      },
    });
    if (!objectif) throw new NotFoundException(`Objectif #${id} non trouvé`);
    return objectif;
  }

  // ✅ Mettre à jour un objectif
  async update(id: string, updateObjectifDto: UpdateObjectifDto) {
    const existing = await this.prisma.objectif.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Objectif #${id} non trouvé`);

    try {
      return await this.prisma.objectif.update({
        where: { id },
        data: updateObjectifDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'Un objectif avec cette combinaison année-parc-site existe déjà.',
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Supprimer un objectif
  async remove(id: string) {
    const existing = await this.prisma.objectif.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Objectif #${id} non trouvé`);

    await this.prisma.objectif.delete({ where: { id } });
    return { message: `Objectif #${id} supprimé avec succès` };
  }
}
