import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeconsommationlubDto } from './dto/create-typeconsommationlub.dto';
import { UpdateTypeconsommationlubDto } from './dto/update-typeconsommationlub.dto';

@Injectable()
export class TypeconsommationlubService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer un typeconsommationlub
  async create(createDto: CreateTypeconsommationlubDto) {
    const { name } = createDto;

    // Vérifier l'unicité
    const exists = await this.prisma.typeconsommationlub.findUnique({
      where: { name },
    });
    if (exists)
      throw new BadRequestException(
        `Typeconsommationlub '${name}' existe déjà`,
      );

    return this.prisma.typeconsommationlub.create({
      data: { name },
      include: { parcs: true, Saisielubrifiant: true },
    });
  }

  // ✅ Lister tous les typeconsommationlub
  async findAll() {
    return this.prisma.typeconsommationlub.findMany({
      include: { parcs: true, Saisielubrifiant: true },
    });
  }

  // ✅ Récupérer un typeconsommationlub par ID
  async findOne(id: string) {
    const item = await this.prisma.typeconsommationlub.findUnique({
      where: { id },
      include: { parcs: true, Saisielubrifiant: true },
    });
    if (!item)
      throw new NotFoundException(`Typeconsommationlub #${id} non trouvé`);
    return item;
  }

  // ✅ Mettre à jour un typeconsommationlub
  async update(id: string, updateDto: UpdateTypeconsommationlubDto) {
    const existing = await this.prisma.typeconsommationlub.findUnique({
      where: { id },
    });
    if (!existing)
      throw new NotFoundException(`Typeconsommationlub #${id} non trouvé`);

    // Vérifier l'unicité du nouveau name si changé
    if (updateDto.name && updateDto.name !== existing.name) {
      const exists = await this.prisma.typeconsommationlub.findUnique({
        where: { name: updateDto.name },
      });
      if (exists)
        throw new BadRequestException(
          `Typeconsommationlub '${updateDto.name}' existe déjà`,
        );
    }

    return this.prisma.typeconsommationlub.update({
      where: { id },
      data: updateDto,
      include: { parcs: true, Saisielubrifiant: true },
    });
  }

  // ✅ Supprimer un typeconsommationlub
  async remove(id: string) {
    const existing = await this.prisma.typeconsommationlub.findUnique({
      where: { id },
    });
    if (!existing)
      throw new NotFoundException(`Typeconsommationlub #${id} non trouvé`);

    await this.prisma.typeconsommationlub.delete({ where: { id } });
    return { message: `Typeconsommationlub #${id} supprimé avec succès` };
  }
}
