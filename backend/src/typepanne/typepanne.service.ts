import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypepanneDto } from './dto/create-typepanne.dto';
import { UpdateTypepanneDto } from './dto/update-typepanne.dto';

@Injectable()
export class TypepanneService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer un type de panne
  async create(dto: CreateTypepanneDto) {
    // Vérifier si le nom existe déjà
    const exists = await this.prisma.typepanne.findUnique({
      where: { name: dto.name },
    });
    if (exists)
      throw new BadRequestException(`Typepanne "${dto.name}" existe déjà`);

    return this.prisma.typepanne.create({ data: { name: dto.name } });
  }

  // ✅ Lister tous les types de panne
  async findAll() {
    return this.prisma.typepanne.findMany({
      include: { pannes: true, TypepanneParc: true }, // inclure les relations si nécessaire
    });
  }

  // ✅ Récupérer un type de panne par ID
  async findOne(id: string) {
    const typepanne = await this.prisma.typepanne.findUnique({
      where: { id },
      include: { pannes: true, TypepanneParc: true },
    });
    if (!typepanne) throw new NotFoundException(`Typepanne #${id} non trouvé`);
    return typepanne;
  }

  // ✅ Mettre à jour un type de panne
  async update(id: string, dto: UpdateTypepanneDto) {
    const typepanne = await this.prisma.typepanne.findUnique({ where: { id } });
    if (!typepanne) throw new NotFoundException(`Typepanne #${id} non trouvé`);

    // Vérifier si le nouveau nom existe déjà (sauf pour l'élément courant)
    if (dto.name && dto.name !== typepanne.name) {
      const exists = await this.prisma.typepanne.findUnique({
        where: { name: dto.name },
      });
      if (exists)
        throw new BadRequestException(`Typepanne "${dto.name}" existe déjà`);
    }

    return this.prisma.typepanne.update({
      where: { id },
      data: { name: dto.name ?? typepanne.name },
    });
  }

  // ✅ Supprimer un type de panne
  async remove(id: string) {
    const typepanne = await this.prisma.typepanne.findUnique({ where: { id } });
    if (!typepanne) throw new NotFoundException(`Typepanne #${id} non trouvé`);

    // Vérifier qu'il n'a pas de pannes associées ou de TypepanneParc
    const hasPannes = await this.prisma.panne.findFirst({
      where: { typepanneId: id },
    });
    const hasParcs = await this.prisma.typepanneParc.findFirst({
      where: { typepanneId: id },
    });
    if (hasPannes || hasParcs)
      throw new BadRequestException(
        `Impossible de supprimer ce Typepanne car il est utilisé par des pannes ou des parcs`,
      );

    await this.prisma.typepanne.delete({ where: { id } });
    return { message: `Typepanne #${id} supprimé avec succès` };
  }
}
