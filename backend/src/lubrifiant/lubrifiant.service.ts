import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLubrifiantDto } from './dto/create-lubrifiant.dto';
import { UpdateLubrifiantDto } from './dto/update-lubrifiant.dto';

@Injectable()
export class LubrifiantService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer un lubrifiant
  async create(createLubrifiantDto: CreateLubrifiantDto) {
    try {
      // Vérifier que le type de lubrifiant existe
      const typelubrifiant = await this.prisma.typelubrifiant.findUnique({
        where: { id: createLubrifiantDto.typelubrifiantId },
      });
      if (!typelubrifiant)
        throw new BadRequestException('Type de lubrifiant non trouvé');

      const lubrifiant = await this.prisma.lubrifiant.create({
        data: {
          name: createLubrifiantDto.name,
          typelubrifiantId: createLubrifiantDto.typelubrifiantId,
        },
      });
      return lubrifiant;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Lister tous les lubrifiants avec leur type
  async findAll() {
    return this.prisma.lubrifiant.findMany({
      include: { Typelubrifiant: true },
    });
  }

  // ✅ Récupérer un lubrifiant par ID
  async findOne(id: string) {
    const lubrifiant = await this.prisma.lubrifiant.findUnique({
      where: { id },
      include: { Typelubrifiant: true },
    });
    if (!lubrifiant)
      throw new NotFoundException(`Lubrifiant #${id} non trouvé`);
    return lubrifiant;
  }

  // ✅ Mettre à jour un lubrifiant
  async update(id: string, updateLubrifiantDto: UpdateLubrifiantDto) {
    try {
      const existing = await this.prisma.lubrifiant.findUnique({
        where: { id },
      });
      if (!existing)
        throw new NotFoundException(`Lubrifiant #${id} non trouvé`);

      // Vérifier le nouveau type si fourni
      if (updateLubrifiantDto.typelubrifiantId) {
        const typelubrifiant = await this.prisma.typelubrifiant.findUnique({
          where: { id: updateLubrifiantDto.typelubrifiantId },
        });
        if (!typelubrifiant)
          throw new BadRequestException('Type de lubrifiant non trouvé');
      }

      const updated = await this.prisma.lubrifiant.update({
        where: { id },
        data: {
          name: updateLubrifiantDto.name,
          typelubrifiantId: updateLubrifiantDto.typelubrifiantId,
        },
      });
      return updated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Supprimer un lubrifiant
  async remove(id: string) {
    try {
      const existing = await this.prisma.lubrifiant.findUnique({
        where: { id },
      });
      if (!existing)
        throw new NotFoundException(`Lubrifiant #${id} non trouvé`);

      await this.prisma.lubrifiant.delete({ where: { id } });
      return { message: `Lubrifiant #${id} supprimé avec succès` };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
