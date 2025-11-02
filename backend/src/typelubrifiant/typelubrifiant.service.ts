import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypelubrifiantDto } from './dto/create-typelubrifiant.dto';
import { UpdateTypelubrifiantDto } from './dto/update-typelubrifiant.dto';

@Injectable()
export class TypelubrifiantService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer un type de lubrifiant
  async create(dto: CreateTypelubrifiantDto) {
    // Vérifier si le nom existe déjà
    const exists = await this.prisma.typelubrifiant.findUnique({
      where: { name: dto.name },
    });
    if (exists)
      throw new BadRequestException(`Typelubrifiant "${dto.name}" existe déjà`);

    return this.prisma.typelubrifiant.create({ data: { name: dto.name } });
  }

  // ✅ Lister tous les types de lubrifiant
  async findAll() {
    return this.prisma.typelubrifiant.findMany({
      include: { lubrifiants: true }, // inclure les lubrifiants associés
    });
  }

  // ✅ Récupérer un type de lubrifiant par ID
  async findOne(id: string) {
    const typelubrifiant = await this.prisma.typelubrifiant.findUnique({
      where: { id },
      include: { lubrifiants: true },
    });
    if (!typelubrifiant)
      throw new NotFoundException(`Typelubrifiant #${id} non trouvé`);
    return typelubrifiant;
  }

  // ✅ Mettre à jour un type de lubrifiant
  async update(id: string, dto: UpdateTypelubrifiantDto) {
    const typelubrifiant = await this.prisma.typelubrifiant.findUnique({
      where: { id },
    });
    if (!typelubrifiant)
      throw new NotFoundException(`Typelubrifiant #${id} non trouvé`);

    // Vérifier si le nouveau nom existe déjà (sauf pour l'élément courant)
    if (dto.name && dto.name !== typelubrifiant.name) {
      const exists = await this.prisma.typelubrifiant.findUnique({
        where: { name: dto.name },
      });
      if (exists)
        throw new BadRequestException(
          `Typelubrifiant "${dto.name}" existe déjà`,
        );
    }

    return this.prisma.typelubrifiant.update({
      where: { id },
      data: { name: dto.name ?? typelubrifiant.name },
    });
  }

  // ✅ Supprimer un type de lubrifiant
  async remove(id: string) {
    const typelubrifiant = await this.prisma.typelubrifiant.findUnique({
      where: { id },
    });
    if (!typelubrifiant)
      throw new NotFoundException(`Typelubrifiant #${id} non trouvé`);

    // Vérifier qu'il n'a pas de lubrifiants associés pour respecter l'intégrité
    const hasLubrifiants = await this.prisma.lubrifiant.findFirst({
      where: { typelubrifiantId: id },
    });
    if (hasLubrifiants)
      throw new BadRequestException(
        `Impossible de supprimer ce Typelubrifiant car il a des lubrifiants associés`,
      );

    await this.prisma.typelubrifiant.delete({ where: { id } });
    return { message: `Typelubrifiant #${id} supprimé avec succès` };
  }
}
