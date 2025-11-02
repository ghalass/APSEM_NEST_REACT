import { SaisieHrmDayData } from './../utils/types';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaisiehrmDto } from './dto/create-saisiehrm.dto';
import { UpdateSaisiehrmDto } from './dto/update-saisiehrm.dto';

@Injectable()
export class SaisiehrmService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Créer une saisiehrm
  async create(createSaisiehrmDto: CreateSaisiehrmDto) {
    const { du, enginId, siteId, hrm } = createSaisiehrmDto;

    // 1️⃣ Vérifier les champs obligatoires
    const missingFields = ['du', 'enginId', 'siteId', 'hrm'].filter(
      (field) => !createSaisiehrmDto[field as keyof CreateSaisiehrmDto],
    );
    if (missingFields.length > 0) {
      throw new BadRequestException({
        error: 'Veuillez remplir tous les champs!',
        missingFields,
      });
    }

    // 2️⃣ Vérifier que l'engin existe
    const engin = await this.prisma.engin.findUnique({
      where: { id: enginId },
    });
    if (!engin) throw new NotFoundException(`Engin #${enginId} non trouvé`);

    // 3️⃣ Vérifier que le site existe
    const site = await this.prisma.site.findUnique({ where: { id: siteId } });
    if (!site) throw new NotFoundException(`Site #${siteId} non trouvé`);

    // 4️⃣ Vérifier HRM
    if (isNaN(hrm) || hrm < 0 || hrm > 24) {
      throw new BadRequestException('HRM doit être entre 0 et 24 heures');
    }

    // 5️⃣ Vérifier si une saisie existe déjà pour ce engin à cette date
    const exist = await this.prisma.saisiehrm.findFirst({
      where: {
        du: new Date(du),
        enginId,
      },
    });
    if (exist) {
      throw new BadRequestException(
        `Saisie déjà faite pour cet engin à cette date !`,
      );
    }

    // 6️⃣ Créer la saisie
    try {
      const savedSaisie = await this.prisma.saisiehrm.create({
        data: {
          du: new Date(du),
          enginId,
          siteId,
          hrm,
        },
      });
      return savedSaisie;
    } catch (error: any) {
      // Gestion contrainte unique (au cas où)
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `Une saisie HRM pour cet engin à cette date existe déjà.`,
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Lister toutes les saisiehrm
  async findAll() {
    return this.prisma.saisiehrm.findMany({
      // include: {
      //   Engin: true,
      //   Site: true,
      //   Saisiehim: {
      //     include: {
      //       Panne: true,
      //       Engin: true,
      //       Saisielubrifiant: {
      //         include: { Lubrifiant: true, Typeconsommationlub: true },
      //       },
      //     },
      //   },
      // },
    });
  }

  // ✅ Récupérer une saisiehrm par ID
  async findOne(id: string) {
    const saisiehrm = await this.prisma.saisiehrm.findUnique({
      where: { id },
      // include: {
      //   Engin: true,
      //   Site: true,
      //   Saisiehim: {
      //     include: {
      //       Panne: true,
      //       Engin: true,
      //       Saisielubrifiant: {
      //         include: { Lubrifiant: true, Typeconsommationlub: true },
      //       },
      //     },
      //   },
      // },
    });
    if (!saisiehrm) throw new NotFoundException(`Saisiehrm #${id} non trouvée`);
    return saisiehrm;
  }

  // ✅ Récupérer une saisiehrm par ENGIN_ID et Date
  async findByEnginByDate(enginId: string, date: Date) {
    if (!date || !enginId) {
      throw new BadRequestException('Date et enginId sont requis');
    }

    // Conversion sécurisée
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new BadRequestException('Date invalide');
    }

    // Définir le début et la fin de la journée
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const saisiehrm = await this.prisma.saisiehrm.findMany({
      where: {
        du: {
          gte: startDate,
          lt: endDate,
        },
        enginId: enginId,
      },
      // include: {
      //   Saisiehim: {
      //     include: {
      //       Panne: { include: { Typepanne: true } },
      //       Saisielubrifiant: {
      //         include: {
      //           Lubrifiant: { include: { Typelubrifiant: true } },
      //           Typeconsommationlub: true,
      //         },
      //       },
      //     },
      //   },
      //   Engin: true,
      //   Site: true,
      // },
      orderBy: { du: 'desc' },
    });

    return saisiehrm;
  }

  // ✅ Récupérer une saisiehrm par Date
  async findByDate(date: Date) {
    if (!date) {
      throw new BadRequestException('La date est requise');
    }

    // Conversion sécurisée
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new BadRequestException('Date invalide');
    }

    // Calculer le premier et le dernier jour du mois
    const firstDayOfMonth = new Date(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      dateObj.getFullYear(),
      dateObj.getMonth() + 1,
      0,
    );

    firstDayOfMonth.setHours(0, 0, 0, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999);

    // Récupérer toutes les saisies HRM pour la période avec les relations nécessaires
    const saisies = await this.prisma.saisiehrm.findMany({
      where: {
        du: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
      include: {
        Engin: { include: { Parc: { include: { Typeparc: true } } } },
        Site: true,
        Saisiehim: {
          include: {
            Panne: true,
            Saisielubrifiant: {
              include: { Lubrifiant: true, Typeconsommationlub: true },
            },
          },
        },
      },
      orderBy: { du: 'asc' },
    });

    // Préparer le résultat final
    const result: SaisieHrmDayData[] = [];

    for (const saisie of saisies) {
      const baseData = {
        date: saisie.du.toISOString().split('T')[0],
        typeparc: saisie.Engin.Parc.Typeparc.name,
        parc: saisie.Engin.Parc.name,
        engin: saisie.Engin.name,
        site: saisie.Site.name,
        hrm: saisie.hrm,
      };

      if (saisie.Saisiehim && saisie.Saisiehim.length > 0) {
        for (const saisieHim of saisie.Saisiehim) {
          const lubrifiants = saisieHim.Saisielubrifiant.map((lub) => ({
            name: lub.Lubrifiant.name,
            qte: lub.qte,
            typeConsommation: lub.Typeconsommationlub?.name || null,
          }));

          result.push({
            ...baseData,
            panne: saisieHim.Panne.name,
            him: saisieHim.him,
            ni: saisieHim.ni,
            obs: saisieHim.obs || null,
            lubrifiants,
          });
        }
      } else {
        result.push({
          ...baseData,
          panne: null,
          him: 0,
          ni: 0,
          obs: null,
          lubrifiants: [],
        });
      }
    }

    return result;
  }

  // ✅ Mettre à jour une saisiehrm
  async update(id: string, updateSaisiehrmDto: UpdateSaisiehrmDto) {
    const { hrm } = updateSaisiehrmDto;

    // Vérifier que les champs obligatoires sont présents
    if (hrm === undefined || !id) {
      throw new BadRequestException({
        error: 'Veuillez remplir tous les champs !',
        missingFields: [
          ...(id ? [] : ['id']),
          ...(hrm === undefined ? ['hrm'] : []),
        ],
      });
    }

    // Vérifier que la saisie existe
    const existing = await this.prisma.saisiehrm.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException({ error: 'Saisie n’existe pas !' });
    }

    // Somme HRM actuelle
    const totalHRM = await this.prisma.saisiehrm.aggregate({
      _sum: { hrm: true },
      where: { id },
    });

    // Somme HIM associée
    const totalHIM = await this.prisma.saisiehim.aggregate({
      _sum: { him: true },
      where: { saisiehrmId: id },
    });

    const him_hrm_saisie = (totalHIM._sum.him || 0) + Number(hrm);

    if (him_hrm_saisie > 24) {
      const message =
        `HRM saisie = ${totalHRM._sum.hrm || 0}\n` +
        `HIM saisie = ${totalHIM._sum.him || 0}\n` +
        `Nouveau HRM = ${hrm}\n` +
        `Total sera = ${him_hrm_saisie} > 24h\n` +
        `** IMPOSSIBLE de dépasser 24h **`;
      throw new BadRequestException({ error: message });
    }

    // Mise à jour
    const updated = await this.prisma.saisiehrm.update({
      where: { id },
      data: { hrm: Number(hrm) },
    });

    return updated;
  }

  // ✅ Supprimer une saisiehrm
  async remove(id: string) {
    const existing = await this.prisma.saisiehrm.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Saisiehrm #${id} non trouvée`);

    await this.prisma.saisiehrm.delete({ where: { id } });
    return { message: `Saisiehrm #${id} supprimée avec succès` };
  }
}
