import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaisiehimDto } from './dto/create-saisiehim.dto';
import { UpdateSaisiehimDto } from './dto/update-saisiehim.dto';

@Injectable()
export class SaisiehimService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer une saisiehim
  async create(createSaisiehimDto: CreateSaisiehimDto) {
    const { panneId, saisiehrmId, enginId, him, ni, obs } = createSaisiehimDto;

    // Vérifier que la Panne existe
    const panne = await this.prisma.panne.findUnique({
      where: { id: panneId },
    });
    if (!panne) throw new NotFoundException(`Panne #${panneId} non trouvée`);

    // Vérifier que la Saisiehrm existe
    const saisiehrm = await this.prisma.saisiehrm.findUnique({
      where: { id: saisiehrmId },
    });
    if (!saisiehrm)
      throw new NotFoundException(`Saisiehrm #${saisiehrmId} non trouvée`);

    // Vérifier que l'Engin existe si fourni
    if (enginId) {
      const engin = await this.prisma.engin.findUnique({
        where: { id: enginId },
      });
      if (!engin) throw new NotFoundException(`Engin #${enginId} non trouvé`);
    }

    try {
      return await this.prisma.saisiehim.create({
        data: {
          panneId,
          saisiehrmId,
          enginId,
          him,
          ni,
          obs,
        },
        include: {
          Panne: true,
          Saisiehrm: true,
          Engin: true,
          Saisielubrifiant: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Violation contrainte unique [panneId, saisiehrmId]
        throw new BadRequestException(
          `Une saisie pour cette panne et ce HRM existe déjà.`,
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Lister toutes les saisiehim
  async findAll() {
    return this.prisma.saisiehim.findMany({
      include: {
        Panne: true,
        Saisiehrm: true,
        Engin: true,
        Saisielubrifiant: {
          include: { Lubrifiant: true, Typeconsommationlub: true },
        },
      },
    });
  }

  // ✅ Récupérer une saisiehim par ID
  async findOne(id: string) {
    const saisiehim = await this.prisma.saisiehim.findUnique({
      where: { id },
      include: {
        Panne: true,
        Saisiehrm: true,
        Engin: true,
        Saisielubrifiant: {
          include: { Lubrifiant: true, Typeconsommationlub: true },
        },
      },
    });
    if (!saisiehim) throw new NotFoundException(`Saisiehim #${id} non trouvée`);
    return saisiehim;
  }

  // ✅ Mettre à jour une saisiehim
  async update(id: string, updateSaisiehimDto: UpdateSaisiehimDto) {
    const existing = await this.prisma.saisiehim.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Saisiehim #${id} non trouvée`);

    // Vérifier les relations si elles sont mises à jour
    if (updateSaisiehimDto.panneId) {
      const panne = await this.prisma.panne.findUnique({
        where: { id: updateSaisiehimDto.panneId },
      });
      if (!panne)
        throw new NotFoundException(
          `Panne #${updateSaisiehimDto.panneId} non trouvée`,
        );
    }

    if (updateSaisiehimDto.saisiehrmId) {
      const saisiehrm = await this.prisma.saisiehrm.findUnique({
        where: { id: updateSaisiehimDto.saisiehrmId },
      });
      if (!saisiehrm)
        throw new NotFoundException(
          `Saisiehrm #${updateSaisiehimDto.saisiehrmId} non trouvée`,
        );
    }

    if (updateSaisiehimDto.enginId) {
      const engin = await this.prisma.engin.findUnique({
        where: { id: updateSaisiehimDto.enginId },
      });
      if (!engin)
        throw new NotFoundException(
          `Engin #${updateSaisiehimDto.enginId} non trouvé`,
        );
    }

    try {
      return await this.prisma.saisiehim.update({
        where: { id },
        data: updateSaisiehimDto,
        include: {
          Panne: true,
          Saisiehrm: true,
          Engin: true,
          Saisielubrifiant: {
            include: { Lubrifiant: true, Typeconsommationlub: true },
          },
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `Une saisie pour cette panne et ce HRM existe déjà.`,
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Supprimer une saisiehim
  async remove(id: string) {
    const existing = await this.prisma.saisiehim.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Saisiehim #${id} non trouvée`);

    await this.prisma.saisiehim.delete({ where: { id } });
    return { message: `Saisiehim #${id} supprimée avec succès` };
  }
}
