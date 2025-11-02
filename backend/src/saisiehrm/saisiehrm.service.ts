import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaisiehrmDto } from './dto/create-saisiehrm.dto';
import { UpdateSaisiehrmDto } from './dto/update-saisiehrm.dto';

@Injectable()
export class SaisiehrmService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer une saisiehrm
  async create(createSaisiehrmDto: CreateSaisiehrmDto) {
    const { du, enginId, siteId, hrm } = createSaisiehrmDto;

    // Vérifier que l'engin existe
    const engin = await this.prisma.engin.findUnique({
      where: { id: enginId },
    });
    if (!engin) throw new NotFoundException(`Engin #${enginId} non trouvé`);

    // Vérifier que le site existe
    const site = await this.prisma.site.findUnique({ where: { id: siteId } });
    if (!site) throw new NotFoundException(`Site #${siteId} non trouvé`);

    try {
      return await this.prisma.saisiehrm.create({
        data: {
          du,
          enginId,
          siteId,
          hrm,
        },
        include: {
          Engin: true,
          Site: true,
          Saisiehim: {
            include: {
              Panne: true,
              Engin: true,
              Saisielubrifiant: {
                include: { Lubrifiant: true, Typeconsommationlub: true },
              },
            },
          },
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Violation de la contrainte unique [du, enginId]
        throw new BadRequestException(
          `Une saisie HRM pour cet engin à cette date existe déjà.`,
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Lister toutes les saisiehrm
  async findAll() {
    return this.prisma.saisiehrm.findMany({
      include: {
        Engin: true,
        Site: true,
        Saisiehim: {
          include: {
            Panne: true,
            Engin: true,
            Saisielubrifiant: {
              include: { Lubrifiant: true, Typeconsommationlub: true },
            },
          },
        },
      },
    });
  }

  // ✅ Récupérer une saisiehrm par ID
  async findOne(id: string) {
    const saisiehrm = await this.prisma.saisiehrm.findUnique({
      where: { id },
      include: {
        Engin: true,
        Site: true,
        Saisiehim: {
          include: {
            Panne: true,
            Engin: true,
            Saisielubrifiant: {
              include: { Lubrifiant: true, Typeconsommationlub: true },
            },
          },
        },
      },
    });
    if (!saisiehrm) throw new NotFoundException(`Saisiehrm #${id} non trouvée`);
    return saisiehrm;
  }

  // ✅ Mettre à jour une saisiehrm
  async update(id: string, updateSaisiehrmDto: UpdateSaisiehrmDto) {
    const existing = await this.prisma.saisiehrm.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Saisiehrm #${id} non trouvée`);

    // Vérifier les relations si elles sont mises à jour
    if (updateSaisiehrmDto.enginId) {
      const engin = await this.prisma.engin.findUnique({
        where: { id: updateSaisiehrmDto.enginId },
      });
      if (!engin)
        throw new NotFoundException(
          `Engin #${updateSaisiehrmDto.enginId} non trouvé`,
        );
    }

    if (updateSaisiehrmDto.siteId) {
      const site = await this.prisma.site.findUnique({
        where: { id: updateSaisiehrmDto.siteId },
      });
      if (!site)
        throw new NotFoundException(
          `Site #${updateSaisiehrmDto.siteId} non trouvé`,
        );
    }

    try {
      return await this.prisma.saisiehrm.update({
        where: { id },
        data: updateSaisiehrmDto,
        include: {
          Engin: true,
          Site: true,
          Saisiehim: {
            include: {
              Panne: true,
              Engin: true,
              Saisielubrifiant: {
                include: { Lubrifiant: true, Typeconsommationlub: true },
              },
            },
          },
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `Une saisie HRM pour cet engin à cette date existe déjà.`,
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Supprimer une saisiehrm
  async remove(id: string) {
    const existing = await this.prisma.saisiehrm.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Saisiehrm #${id} non trouvée`);

    await this.prisma.saisiehrm.delete({ where: { id } });
    return { message: `Saisiehrm #${id} supprimée avec succès` };
  }
}
