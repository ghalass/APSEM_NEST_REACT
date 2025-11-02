import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePanneDto } from './dto/create-panne.dto';
import { UpdatePanneDto } from './dto/update-panne.dto';

@Injectable()
export class PanneService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer une panne
  async create(createPanneDto: CreatePanneDto) {
    const { name, typepanneId } = createPanneDto;

    // Vérifier que le Typepanne existe
    const typepanne = await this.prisma.typepanne.findUnique({
      where: { id: typepanneId },
    });
    if (!typepanne)
      throw new NotFoundException(`Typepanne #${typepanneId} non trouvé`);

    try {
      return await this.prisma.panne.create({
        data: {
          name,
          typepanneId,
        },
        include: {
          Typepanne: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Violation contrainte unique (name)
        throw new BadRequestException(
          `Une panne avec le nom "${name}" existe déjà.`,
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Lister toutes les pannes
  async findAll() {
    return this.prisma.panne.findMany({
      include: {
        Typepanne: true,
      },
    });
  }

  // ✅ Récupérer une panne par ID
  async findOne(id: string) {
    const panne = await this.prisma.panne.findUnique({
      where: { id },
      include: { Typepanne: true },
    });
    if (!panne) throw new NotFoundException(`Panne #${id} non trouvée`);
    return panne;
  }

  // ✅ Mettre à jour une panne
  async update(id: string, updatePanneDto: UpdatePanneDto) {
    const existing = await this.prisma.panne.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Panne #${id} non trouvée`);

    // Si typepanneId est fourni, vérifier son existence
    if (updatePanneDto.typepanneId) {
      const typepanne = await this.prisma.typepanne.findUnique({
        where: { id: updatePanneDto.typepanneId },
      });
      if (!typepanne)
        throw new NotFoundException(
          `Typepanne #${updatePanneDto.typepanneId} non trouvé`,
        );
    }

    try {
      return await this.prisma.panne.update({
        where: { id },
        data: updatePanneDto,
        include: { Typepanne: true },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(`Une panne avec ce nom existe déjà.`);
      }
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Supprimer une panne
  async remove(id: string) {
    const existing = await this.prisma.panne.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Panne #${id} non trouvée`);

    await this.prisma.panne.delete({ where: { id } });
    return { message: `Panne #${id} supprimée avec succès` };
  }
}
