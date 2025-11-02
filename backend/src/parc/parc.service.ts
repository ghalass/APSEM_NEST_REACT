import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParcDto } from './dto/create-parc.dto';
import { UpdateParcDto } from './dto/update-parc.dto';

@Injectable()
export class ParcService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer un parc
  async create(createParcDto: CreateParcDto) {
    const { name, typeparcId } = createParcDto;

    // Vérifier que le Typeparc existe
    const typeparc = await this.prisma.typeparc.findUnique({
      where: { id: typeparcId },
    });
    if (!typeparc)
      throw new NotFoundException(`Typeparc #${typeparcId} non trouvé`);

    try {
      return await this.prisma.parc.create({
        data: {
          name,
          typeparcId,
        },
        include: {
          Typeparc: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Violation contrainte unique (name)
        throw new BadRequestException(
          `Un parc avec le nom "${name}" existe déjà.`,
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Lister tous les parcs
  async findAll() {
    return this.prisma.parc.findMany({
      include: {
        Typeparc: true,
        engins: true,
        typesConsommationLub: { include: { typeconsommationlub: true } },
        typepanneParc: { include: { typepanne: true } },
        lubrifiantParc: { include: { lubrifiant: true } },
        Objectif: true,
      },
    });
  }

  // ✅ Récupérer un parc par ID
  async findOne(id: string) {
    const parc = await this.prisma.parc.findUnique({
      where: { id },
      include: {
        Typeparc: true,
        engins: true,
        typesConsommationLub: { include: { typeconsommationlub: true } },
        typepanneParc: { include: { typepanne: true } },
        lubrifiantParc: { include: { lubrifiant: true } },
        Objectif: true,
      },
    });
    if (!parc) throw new NotFoundException(`Parc #${id} non trouvé`);
    return parc;
  }

  // ✅ Mettre à jour un parc
  async update(id: string, updateParcDto: UpdateParcDto) {
    const existing = await this.prisma.parc.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Parc #${id} non trouvé`);

    // Si typeparcId est fourni, vérifier son existence
    if (updateParcDto.typeparcId) {
      const typeparc = await this.prisma.typeparc.findUnique({
        where: { id: updateParcDto.typeparcId },
      });
      if (!typeparc)
        throw new NotFoundException(
          `Typeparc #${updateParcDto.typeparcId} non trouvé`,
        );
    }

    try {
      return await this.prisma.parc.update({
        where: { id },
        data: updateParcDto,
        include: {
          Typeparc: true,
          engins: true,
          typesConsommationLub: { include: { typeconsommationlub: true } },
          typepanneParc: { include: { typepanne: true } },
          lubrifiantParc: { include: { lubrifiant: true } },
          Objectif: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(`Un parc avec ce nom existe déjà.`);
      }
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Supprimer un parc
  async remove(id: string) {
    const existing = await this.prisma.parc.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Parc #${id} non trouvé`);

    await this.prisma.parc.delete({ where: { id } });
    return { message: `Parc #${id} supprimé avec succès` };
  }
}
