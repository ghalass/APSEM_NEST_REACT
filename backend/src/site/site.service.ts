import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SiteService {
  constructor(private readonly prisma: PrismaService) {}

  // Créer un site
  async create(createSiteDto: CreateSiteDto) {
    try {
      return await this.prisma.site.create({
        data: createSiteDto,
      });
    } catch (error) {
      // Gestion d'erreur pour doublon
      if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
        throw new BadRequestException(
          `Un site avec ce nom "${createSiteDto.name}" existe déjà.`,
        );
      }
      throw error;
    }
  }

  // Récupérer tous les sites
  async findAll() {
    return this.prisma.site.findMany({
      include: {
        engins: true,
        Saisiehrm: true,
        Objectif: true,
      },
    });
  }

  // Récupérer un site par id
  async findOne(id: string) {
    const site = await this.prisma.site.findUnique({
      where: { id },
      include: {
        engins: true,
        Saisiehrm: true,
        Objectif: true,
      },
    });
    if (!site) throw new NotFoundException(`Site avec id ${id} non trouvé`);
    return site;
  }

  // Mettre à jour un site
  async update(id: string, updateSiteDto: UpdateSiteDto) {
    try {
      // Vérifier que le site existe
      await this.findOne(id);
      return await this.prisma.site.update({
        where: { id },
        data: updateSiteDto,
      });
    } catch (error) {
      // Gestion d'erreur pour doublon
      if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
        throw new BadRequestException(
          `Un site avec ce nom "${updateSiteDto.name}" existe déjà.`,
        );
      }
      throw error;
    }
  }

  // Supprimer un site
  async remove(id: string) {
    // Vérifier que le site existe
    await this.findOne(id);
    return this.prisma.site.delete({
      where: { id },
    });
  }
}
