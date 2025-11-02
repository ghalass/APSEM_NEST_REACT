import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaisielubrifiantDto } from './dto/create-saisielubrifiant.dto';
import { UpdateSaisielubrifiantDto } from './dto/update-saisielubrifiant.dto';

@Injectable()
export class SaisielubrifiantService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer un Saisielubrifiant
  async create(createDto: CreateSaisielubrifiantDto) {
    const { lubrifiantId, saisiehimId, typeconsommationlubId, qte, obs } =
      createDto;

    // Vérifier que le lubrifiant existe
    const lubrifiant = await this.prisma.lubrifiant.findUnique({
      where: { id: lubrifiantId },
    });
    if (!lubrifiant)
      throw new NotFoundException(`Lubrifiant #${lubrifiantId} non trouvé`);

    // Vérifier que la saisiehim existe
    const saisiehim = await this.prisma.saisiehim.findUnique({
      where: { id: saisiehimId },
    });
    if (!saisiehim)
      throw new NotFoundException(`SaisieHIM #${saisiehimId} non trouvée`);

    // Vérifier le typeconsommationlub si fourni
    if (typeconsommationlubId) {
      const typeLub = await this.prisma.typeconsommationlub.findUnique({
        where: { id: typeconsommationlubId },
      });
      if (!typeLub)
        throw new NotFoundException(
          `Typeconsommationlub #${typeconsommationlubId} non trouvé`,
        );
    }

    return this.prisma.saisielubrifiant.create({
      data: { lubrifiantId, saisiehimId, typeconsommationlubId, qte, obs },
      include: {
        Lubrifiant: true,
        Saisiehim: { include: { Panne: true, Engin: true } },
        Typeconsommationlub: true,
      },
    });
  }

  // ✅ Lister tous les Saisielubrifiants
  async findAll() {
    return this.prisma.saisielubrifiant.findMany({
      include: {
        Lubrifiant: true,
        Saisiehim: { include: { Panne: true, Engin: true } },
        Typeconsommationlub: true,
      },
    });
  }

  // ✅ Récupérer un Saisielubrifiant par ID
  async findOne(id: string) {
    const item = await this.prisma.saisielubrifiant.findUnique({
      where: { id },
      include: {
        Lubrifiant: true,
        Saisiehim: { include: { Panne: true, Engin: true } },
        Typeconsommationlub: true,
      },
    });
    if (!item)
      throw new NotFoundException(`Saisielubrifiant #${id} non trouvé`);
    return item;
  }

  // ✅ Mettre à jour un Saisielubrifiant
  async update(id: string, updateDto: UpdateSaisielubrifiantDto) {
    const existing = await this.prisma.saisielubrifiant.findUnique({
      where: { id },
    });
    if (!existing)
      throw new NotFoundException(`Saisielubrifiant #${id} non trouvé`);

    // Vérifier les relations si elles sont mises à jour
    if (updateDto.lubrifiantId) {
      const lubrifiant = await this.prisma.lubrifiant.findUnique({
        where: { id: updateDto.lubrifiantId },
      });
      if (!lubrifiant)
        throw new NotFoundException(
          `Lubrifiant #${updateDto.lubrifiantId} non trouvé`,
        );
    }

    if (updateDto.saisiehimId) {
      const saisiehim = await this.prisma.saisiehim.findUnique({
        where: { id: updateDto.saisiehimId },
      });
      if (!saisiehim)
        throw new NotFoundException(
          `SaisieHIM #${updateDto.saisiehimId} non trouvée`,
        );
    }

    if (updateDto.typeconsommationlubId) {
      const typeLub = await this.prisma.typeconsommationlub.findUnique({
        where: { id: updateDto.typeconsommationlubId },
      });
      if (!typeLub)
        throw new NotFoundException(
          `Typeconsommationlub #${updateDto.typeconsommationlubId} non trouvé`,
        );
    }

    return this.prisma.saisielubrifiant.update({
      where: { id },
      data: updateDto,
      include: {
        Lubrifiant: true,
        Saisiehim: { include: { Panne: true, Engin: true } },
        Typeconsommationlub: true,
      },
    });
  }

  // ✅ Supprimer un Saisielubrifiant
  async remove(id: string) {
    const existing = await this.prisma.saisielubrifiant.findUnique({
      where: { id },
    });
    if (!existing)
      throw new NotFoundException(`Saisielubrifiant #${id} non trouvé`);

    await this.prisma.saisielubrifiant.delete({ where: { id } });
    return { message: `Saisielubrifiant #${id} supprimé avec succès` };
  }
}
