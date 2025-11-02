import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeconsommationlubParcDto } from './dto/create-typeconsommationlub-parc.dto';
import { UpdateTypeconsommationlubParcDto } from './dto/update-typeconsommationlub-parc.dto';

@Injectable()
export class TypeconsommationlubParcService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer une liaison Typeconsommationlub <-> Parc
  async create(dto: CreateTypeconsommationlubParcDto) {
    const { parcId, typeconsommationlubId } = dto;

    // Vérifier que le Parc existe
    const parc = await this.prisma.parc.findUnique({ where: { id: parcId } });
    if (!parc) throw new NotFoundException(`Parc #${parcId} non trouvé`);

    // Vérifier que le Typeconsommationlub existe
    const typeLub = await this.prisma.typeconsommationlub.findUnique({
      where: { id: typeconsommationlubId },
    });
    if (!typeLub)
      throw new NotFoundException(
        `Typeconsommationlub #${typeconsommationlubId} non trouvé`,
      );

    // Vérifier si la relation existe déjà
    const exists = await this.prisma.typeconsommationlubParc.findUnique({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
    });
    if (exists)
      throw new BadRequestException(
        `Cette relation Parc-Typeconsommationlub existe déjà`,
      );

    return this.prisma.typeconsommationlubParc.create({
      data: { parcId, typeconsommationlubId },
      include: { parc: true, typeconsommationlub: true },
    });
  }

  // ✅ Lister toutes les relations
  async findAll() {
    return this.prisma.typeconsommationlubParc.findMany({
      include: { parc: true, typeconsommationlub: true },
    });
  }

  // ✅ Récupérer une relation spécifique
  async findOne(parcId: string, typeconsommationlubId: string) {
    const relation = await this.prisma.typeconsommationlubParc.findUnique({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
      include: { parc: true, typeconsommationlub: true },
    });
    if (!relation)
      throw new NotFoundException(
        `Relation Parc-Typeconsommationlub non trouvée`,
      );
    return relation;
  }

  // ✅ Mettre à jour une relation (changer le Typeconsommationlub ou le Parc)
  async update(
    parcId: string,
    typeconsommationlubId: string,
    updateDto: UpdateTypeconsommationlubParcDto,
  ) {
    const relation = await this.prisma.typeconsommationlubParc.findUnique({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
    });
    if (!relation)
      throw new NotFoundException(
        `Relation Parc-Typeconsommationlub non trouvée`,
      );

    const newParcId = updateDto.parcId ?? parcId;
    const newTypeLubId =
      updateDto.typeconsommationlubId ?? typeconsommationlubId;

    // Vérifier existence du nouveau Parc et Typeconsommationlub
    const [parc, typeLub] = await Promise.all([
      this.prisma.parc.findUnique({ where: { id: newParcId } }),
      this.prisma.typeconsommationlub.findUnique({
        where: { id: newTypeLubId },
      }),
    ]);
    if (!parc) throw new NotFoundException(`Parc #${newParcId} non trouvé`);
    if (!typeLub)
      throw new NotFoundException(
        `Typeconsommationlub #${newTypeLubId} non trouvé`,
      );

    // Vérifier que la nouvelle relation n'existe pas déjà
    const exists = await this.prisma.typeconsommationlubParc.findUnique({
      where: {
        parcId_typeconsommationlubId: {
          parcId: newParcId,
          typeconsommationlubId: newTypeLubId,
        },
      },
    });
    if (
      exists &&
      (newParcId !== parcId || newTypeLubId !== typeconsommationlubId)
    ) {
      throw new BadRequestException(
        `Cette relation Parc-Typeconsommationlub existe déjà`,
      );
    }

    // Supprimer l'ancienne et créer la nouvelle (Prisma ne permet pas de mettre à jour les champs faisant partie de la clé primaire composite)
    await this.prisma.typeconsommationlubParc.delete({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
    });
    return this.prisma.typeconsommationlubParc.create({
      data: { parcId: newParcId, typeconsommationlubId: newTypeLubId },
      include: { parc: true, typeconsommationlub: true },
    });
  }

  // ✅ Supprimer une relation
  async remove(parcId: string, typeconsommationlubId: string) {
    const relation = await this.prisma.typeconsommationlubParc.findUnique({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
    });
    if (!relation)
      throw new NotFoundException(
        `Relation Parc-Typeconsommationlub non trouvée`,
      );

    await this.prisma.typeconsommationlubParc.delete({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
    });
    return {
      message: `Relation Parc-Typeconsommationlub supprimée avec succès`,
    };
  }
}
