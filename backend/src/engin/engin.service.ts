import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnginDto } from './dto/create-engin.dto';
import { UpdateEnginDto } from './dto/update-engin.dto';

@Injectable()
export class EnginService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer un engin
  async create(createEnginDto: CreateEnginDto) {
    try {
      // Vérifier que le parc et le site existent
      const parc = await this.prisma.parc.findUnique({
        where: { id: createEnginDto.parcId },
      });
      const site = await this.prisma.site.findUnique({
        where: { id: createEnginDto.siteId },
      });

      if (!parc) throw new BadRequestException('Parc non trouvé');
      if (!site) throw new BadRequestException('Site non trouvé');

      // Vérifier si un engin avec le même nom existe déjà
      const existingEngin = await this.prisma.engin.findUnique({
        where: { name: createEnginDto.name },
      });
      if (existingEngin) {
        throw new BadRequestException('Un engin avec ce nom existe déjà');
      }

      const engin = await this.prisma.engin.create({
        data: {
          name: createEnginDto.name,
          active: createEnginDto.active ?? true,
          parcId: createEnginDto.parcId,
          siteId: createEnginDto.siteId,
          initialHeureChassis: createEnginDto.initialHeureChassis ?? 0,
        },
      });

      return engin;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Lister tous les engins
  async findAll() {
    return this.prisma.engin.findMany({
      include: {
        Parc: true,
        Site: true,
      },
    });
  }

  // ✅ Récupérer un engin par ID
  async findOne(id: string) {
    const engin = await this.prisma.engin.findUnique({
      where: { id },
      include: { Parc: true, Site: true },
    });
    if (!engin) throw new NotFoundException(`Engin #${id} non trouvé`);
    return engin;
  }

  // ✅ Mettre à jour un engin
  async update(id: string, updateEnginDto: UpdateEnginDto) {
    try {
      const existing = await this.prisma.engin.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException(`Engin #${id} non trouvé`);

      // Optionnel : vérifier que le nouveau parc/site existent si fournis
      if (updateEnginDto.parcId) {
        const parc = await this.prisma.parc.findUnique({
          where: { id: updateEnginDto.parcId },
        });
        if (!parc) throw new BadRequestException('Parc non trouvé');
      }

      if (updateEnginDto.siteId) {
        const site = await this.prisma.site.findUnique({
          where: { id: updateEnginDto.siteId },
        });
        if (!site) throw new BadRequestException('Site non trouvé');
      }

      const updatedEngin = await this.prisma.engin.update({
        where: { id },
        data: {
          name: updateEnginDto.name,
          active: updateEnginDto.active,
          parcId: updateEnginDto.parcId,
          siteId: updateEnginDto.siteId,
          initialHeureChassis: updateEnginDto.initialHeureChassis,
        },
      });

      return updatedEngin;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Supprimer un engin
  async remove(id: string) {
    try {
      const existing = await this.prisma.engin.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException(`Engin #${id} non trouvé`);

      await this.prisma.engin.delete({ where: { id } });
      return { message: `Engin #${id} supprimé avec succès` };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
