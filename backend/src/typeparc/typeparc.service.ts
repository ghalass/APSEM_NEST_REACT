import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeparcDto } from './dto/create-typeparc.dto';
import { UpdateTypeparcDto } from './dto/update-typeparc.dto';

@Injectable()
export class TypeparcService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer un Typeparc
  async create(dto: CreateTypeparcDto) {
    // Vérifier si le nom existe déjà
    const exists = await this.prisma.typeparc.findUnique({
      where: { name: dto.name },
    });
    if (exists)
      throw new BadRequestException(
        `Le type de parc "${dto.name}" existe déjà`,
      );

    return this.prisma.typeparc.create({ data: { name: dto.name } });
  }

  // ✅ Lister tous les Typeparc
  async findAll() {
    return this.prisma.typeparc.findMany({
      include: { parcs: true }, // inclure les parcs liés
    });
  }

  // ✅ Récupérer un Typeparc par ID
  async findOne(id: string) {
    const typeparc = await this.prisma.typeparc.findUnique({
      where: { id },
      include: { parcs: true },
    });
    if (!typeparc)
      throw new NotFoundException(`Type de parc #${id} non trouvé`);
    return typeparc;
  }

  // ✅ Mettre à jour un Typeparc
  async update(id: string, dto: UpdateTypeparcDto) {
    const typeparc = await this.prisma.typeparc.findUnique({ where: { id } });
    if (!typeparc)
      throw new NotFoundException(`Type de parc #${id} non trouvé`);

    // Vérifier si le nouveau nom existe déjà
    if (dto.name && dto.name !== typeparc.name) {
      const exists = await this.prisma.typeparc.findUnique({
        where: { name: dto.name },
      });
      if (exists)
        throw new BadRequestException(
          `Le type de parc "${dto.name}" existe déjà`,
        );
    }

    return this.prisma.typeparc.update({
      where: { id },
      data: { name: dto.name },
    });
  }

  // ✅ Supprimer un Typeparc
  async remove(id: string) {
    const typeparc = await this.prisma.typeparc.findUnique({ where: { id } });
    if (!typeparc)
      throw new NotFoundException(`Type de parc #${id} non trouvé`);

    // Vérifier s'il existe des parcs liés
    const hasParcs = await this.prisma.parc.count({
      where: { typeparcId: id },
    });
    if (hasParcs > 0) {
      throw new BadRequestException(
        `Impossible de supprimer : des parcs sont associés à ce type de parc`,
      );
    }

    await this.prisma.typeparc.delete({ where: { id } });
    return { message: `Type de parc #${id} supprimé avec succès` };
  }
}
