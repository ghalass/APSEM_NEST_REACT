import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class RapportService {
  async getRapportRje(du: string) {
    const dateCible = new Date(du);
    const debutMois = new Date(
      dateCible.getFullYear(),
      dateCible.getMonth(),
      1,
    );
    const debutAnnee = new Date(dateCible.getFullYear(), 0, 1);
    const nho_j = 24;
    const finJournee = new Date(dateCible.getTime() + 86400000);
    const nho_m = dateCible.getDate() * 24;
    const joursEcoules =
      Math.floor((dateCible.getTime() - debutAnnee.getTime()) / 86400000) + 1;
    const nho_a = joursEcoules * 24;

    const getHimHrmNi = async (
      enginId: string,
      startDate: Date,
      endDate: Date,
    ) => {
      const him = await prisma.saisiehim.aggregate({
        _sum: { him: true },
        where: { Saisiehrm: { du: { gte: startDate, lte: endDate }, enginId } },
      });
      const hrm = await prisma.saisiehrm.aggregate({
        _sum: { hrm: true },
        where: { du: { gte: startDate, lte: endDate }, enginId },
      });
      const ni = await prisma.saisiehim.count({
        where: { Saisiehrm: { du: { gte: startDate, lte: endDate }, enginId } },
      });
      return { him: him._sum?.him || 0, hrm: hrm._sum?.hrm || 0, ni: ni || 0 };
    };

    const calculateIndicators = (
      him: number,
      hrm: number,
      ni: number,
      nho: number,
    ) => {
      const dispo = ((1 - him / nho) * 100).toFixed(2);
      const mtbf = ni === 0 ? '0.00' : (hrm / ni).toFixed(2);
      const tdm = ((100 * hrm) / nho).toFixed(2);
      return { dispo, mtbf, tdm };
    };

    const engins = await prisma.engin.findMany({
      where: { Saisiehrm: { some: {} } },
      select: { id: true, name: true },
      distinct: ['name'],
    });

    const finalData = await Promise.all(
      engins.map(async (engin) => {
        const enginDetails = await prisma.engin.findUnique({
          where: { id: engin.id },
          select: { parcId: true, Parc: { select: { name: true } } },
        });

        if (!enginDetails) {
          return null;
        }

        const saisieJour = await prisma.saisiehrm.findFirst({
          where: { enginId: engin.id, du: dateCible },
          select: { siteId: true, Site: { select: { name: true } } },
        });

        const siteId = saisieJour?.siteId ?? null;
        const siteName = saisieJour?.Site?.name ?? null;
        const annee = dateCible.getFullYear();

        const objectif = siteId
          ? await prisma.objectif.findUnique({
              where: {
                annee_parcId_siteId: {
                  annee,
                  parcId: enginDetails.parcId,
                  siteId,
                },
              },
              select: { dispo: true, mtbf: true, tdm: true },
            })
          : null;

        const [dataJ, dataM, dataA] = await Promise.all([
          getHimHrmNi(engin.id, dateCible, finJournee),
          getHimHrmNi(engin.id, debutMois, dateCible),
          getHimHrmNi(engin.id, debutAnnee, dateCible),
        ]);

        return {
          engin: engin.name,
          parcId: enginDetails.parcId,
          parcName: enginDetails.Parc?.name ?? null,
          siteId,
          siteName,
          annee,
          objectif_dispo: objectif?.dispo ?? null,
          objectif_mtbf: objectif?.mtbf ?? null,
          objectif_tdm: objectif?.tdm ?? null,
          nho_j,
          dispo_j: calculateIndicators(dataJ.him, dataJ.hrm, dataJ.ni, nho_j)
            .dispo,
          mtbf_j: calculateIndicators(dataJ.him, dataJ.hrm, dataJ.ni, nho_j)
            .mtbf,
          tdm_j: calculateIndicators(dataJ.him, dataJ.hrm, dataJ.ni, nho_j).tdm,
          him_j: dataJ.him,
          hrm_j: dataJ.hrm,
          ni_j: dataJ.ni,
          nho_m,
          dispo_m: calculateIndicators(dataM.him, dataM.hrm, dataM.ni, nho_m)
            .dispo,
          mtbf_m: calculateIndicators(dataM.him, dataM.hrm, dataM.ni, nho_m)
            .mtbf,
          tdm_m: calculateIndicators(dataM.him, dataM.hrm, dataM.ni, nho_m).tdm,
          him_m: dataM.him,
          hrm_m: dataM.hrm,
          ni_m: dataM.ni,
          nho_a,
          dispo_a: calculateIndicators(dataA.him, dataA.hrm, dataA.ni, nho_a)
            .dispo,
          mtbf_a: calculateIndicators(dataA.him, dataA.hrm, dataA.ni, nho_a)
            .mtbf,
          tdm_a: calculateIndicators(dataA.him, dataA.hrm, dataA.ni, nho_a).tdm,
          him_a: dataA.him,
          hrm_a: dataA.hrm,
          ni_a: dataA.ni,
        };
      }),
    );

    return finalData.filter((item) => item !== null);
  }

  async getRapportUnitePhysique(du: string) {
    const dateCible = new Date(du);
    const debutMois = new Date(
      dateCible.getFullYear(),
      dateCible.getMonth(),
      1,
    );
    const finMois = new Date(
      dateCible.getFullYear(),
      dateCible.getMonth() + 1,
      0,
    );
    const debutAnnee = new Date(dateCible.getFullYear(), 0, 1);
    const finAnnee = new Date(dateCible.getFullYear(), 11, 31);

    const parcs = await prisma.parc.findMany({
      include: {
        engins: {
          include: {
            Saisiehrm: {
              where: {
                OR: [
                  { du: { gte: debutMois, lte: finMois } },
                  { du: { gte: debutAnnee, lte: finAnnee } },
                ],
              },
              include: {
                Site: true,
                Saisiehim: true,
              },
            },
          },
        },
      },
    });

    const result = parcs.map((parc) => {
      const allEngins = parc.engins;
      const engins = allEngins?.filter((e) => e?.Saisiehrm?.length > 0);
      const sitesData: Record<string, any> = {};

      engins.forEach((engin) => {
        engin.Saisiehrm.forEach((saisie) => {
          const siteName = saisie.Site.name;

          if (!sitesData[siteName]) {
            sitesData[siteName] = {
              site: siteName,
              hrm_m: 0,
              him_m: 0,
              hrm_a: 0,
              him_a: 0,
            };
          }

          if (saisie.du >= debutMois && saisie.du <= finMois) {
            sitesData[siteName].hrm_m += saisie.hrm;
            sitesData[siteName].him_m += saisie.Saisiehim.reduce(
              (sum, him) => sum + him.him,
              0,
            );
          }

          if (saisie.du >= debutAnnee && saisie.du <= finAnnee) {
            sitesData[siteName].hrm_a += saisie.hrm;
            sitesData[siteName].him_a += saisie.Saisiehim.reduce(
              (sum, him) => sum + him.him,
              0,
            );
          }
        });
      });

      const par_site = Object.values(sitesData);
      const hrm_m_total = par_site.reduce(
        (sum, site: any) => sum + site.hrm_m,
        0,
      );
      const him_m_total = par_site.reduce(
        (sum, site: any) => sum + site.him_m,
        0,
      );
      const hrm_a_total = par_site.reduce(
        (sum, site: any) => sum + site.hrm_a,
        0,
      );
      const him_a_total = par_site.reduce(
        (sum, site: any) => sum + site.him_a,
        0,
      );

      return {
        parc: parc.name,
        nombre_d_engin: engins.length,
        par_site,
        hrm_m_total,
        him_m_total,
        hrm_a_total,
        him_a_total,
      };
    });

    return result;
  }

  async getEtatMensuel(du: string) {
    const dateDu = new Date(du);
    const annee = dateDu.getFullYear();
    const firstDayOfMonth = new Date(annee, dateDu.getMonth(), 1);
    const lastDayOfMonth = new Date(annee, dateDu.getMonth() + 1, 0);
    const firstDayOfYear = new Date(annee, 0, 1);

    const parcs = await prisma.parc.findMany({
      include: {
        engins: {
          include: {
            Saisiehrm: {
              where: { du: { gte: firstDayOfYear, lte: lastDayOfMonth } },
              include: { Saisiehim: true, Site: true },
            },
          },
        },
        Typeparc: true,
      },
    });

    const calculateIndicators = (
      engins: any[],
      periodStart: Date,
      periodEnd: Date,
    ) => {
      let nho = 0,
        hrm = 0,
        him = 0,
        ni = 0;
      const enginsAvecSaisieDansPeriode = new Set();

      engins.forEach((engin) => {
        if (engin.Saisiehrm) {
          const hasSaisieInPeriod = engin.Saisiehrm.some(
            (s: any) => s.du >= periodStart && s.du <= periodEnd,
          );
          if (hasSaisieInPeriod) {
            enginsAvecSaisieDansPeriode.add(engin.id);
          }

          engin.Saisiehrm.forEach((s: any) => {
            if (s.du >= periodStart && s.du <= periodEnd) {
              hrm += s.hrm;
              s.Saisiehim?.forEach((himEntry: any) => {
                him += himEntry.him;
                ni += himEntry.ni;
              });
            }
          });
        }
      });

      const daysInPeriod =
        Math.floor((periodEnd.getTime() - periodStart.getTime()) / 86400000) +
        1;
      nho = enginsAvecSaisieDansPeriode.size * 24 * daysInPeriod;

      const hrd = nho - (him + hrm);
      const mttr = ni > 0 ? him / ni : 0;
      const dispo = nho > 0 ? (1 - him / nho) * 100 : 0;
      const tdm = nho > 0 ? (hrm / nho) * 100 : 0;
      const mtbf = ni > 0 ? hrm / ni : 0;
      const util = hrm + hrd > 0 ? (hrm / (hrm + hrd)) * 100 : 0;

      return {
        nho: +nho.toFixed(2),
        hrm: +hrm.toFixed(2),
        him: +him.toFixed(2),
        ni: +ni.toFixed(2),
        hrd: +hrd.toFixed(2),
        mttr: +mttr.toFixed(2),
        dispo: +dispo.toFixed(2),
        tdm: +tdm.toFixed(2),
        mtbf: +mtbf.toFixed(2),
        util: +util.toFixed(2),
      };
    };

    const result = await Promise.all(
      parcs.map(async (parc) => {
        const allEngins = parc.engins;
        const engins = allEngins?.filter((e) => e?.Saisiehrm?.length > 0);
        const nombre_d_engin = engins.length;

        const indicators_m = calculateIndicators(
          engins,
          firstDayOfMonth,
          lastDayOfMonth,
        );
        const indicators_a = calculateIndicators(
          engins,
          firstDayOfYear,
          lastDayOfMonth,
        );

        let objectif: {
          dispo: number | null;
          mtbf: number | null;
          tdm: number | null;
        } | null = null;
        for (const engin of engins) {
          for (const saisie of engin.Saisiehrm) {
            if (saisie.siteId) {
              objectif = await prisma.objectif.findUnique({
                where: {
                  annee_parcId_siteId: {
                    annee,
                    parcId: parc.id,
                    siteId: saisie.siteId,
                  },
                },
                select: { dispo: true, mtbf: true, tdm: true },
              });
              if (objectif) break;
            }
          }
          if (objectif) break;
        }

        return {
          typeparc: parc.Typeparc.name,
          parc: parc.name,
          nombre_d_engin,
          nho_m: indicators_m.nho,
          hrm_m: indicators_m.hrm,
          him_m: indicators_m.him,
          ni_m: indicators_m.ni,
          hrd_m: indicators_m.hrd,
          mttr_m: indicators_m.mttr,
          dispo_m: indicators_m.dispo,
          tdm_m: indicators_m.tdm,
          mtbf_m: indicators_m.mtbf,
          util_m: indicators_m.util,
          nho_a: indicators_a.nho,
          hrm_a: indicators_a.hrm,
          him_a: indicators_a.him,
          ni_a: indicators_a.ni,
          hrd_a: indicators_a.hrd,
          mttr_a: indicators_a.mttr,
          dispo_a: indicators_a.dispo,
          tdm_a: indicators_a.tdm,
          mtbf_a: indicators_a.mtbf,
          util_a: indicators_a.util,
          objectif_dispo: objectif?.dispo ?? null,
          objectif_mtbf: objectif?.mtbf ?? null,
          objectif_tdm: objectif?.tdm ?? null,
        };
      }),
    );

    return result;
  }

  async getIndispoParParc(du: string) {
    const dateDu = new Date(du);
    const firstDayOfMonth = new Date(
      dateDu.getFullYear(),
      dateDu.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      dateDu.getFullYear(),
      dateDu.getMonth() + 1,
      0,
    );
    firstDayOfMonth.setHours(0, 0, 0, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999);
    const firstDayOfYear = new Date(dateDu.getFullYear(), 0, 1);
    firstDayOfYear.setHours(0, 0, 0, 0);

    const parcs = await prisma.parc.findMany({
      include: {
        engins: {
          include: {
            Site: true,
            Saisiehrm: {
              where: { du: { gte: firstDayOfYear, lte: lastDayOfMonth } },
              include: { Saisiehim: { include: { Panne: true } } },
            },
          },
        },
        Typeparc: true,
      },
    });

    const calculateIndicators = (
      engins: any[],
      periodStart: Date,
      periodEnd: Date,
    ) => {
      const result: Record<string, any> = {};
      let him_total = 0;
      const enginsAvecSaisieDansPeriode = new Set();

      engins.forEach((engin) => {
        if (engin.Saisiehrm && Array.isArray(engin.Saisiehrm)) {
          const hasSaisieInPeriod = engin.Saisiehrm.some(
            (saisie: any) => saisie.du >= periodStart && saisie.du <= periodEnd,
          );

          if (hasSaisieInPeriod) {
            enginsAvecSaisieDansPeriode.add(engin.id);
          }

          engin.Saisiehrm.forEach((saisie: any) => {
            if (saisie.du >= periodStart && saisie.du <= periodEnd) {
              if (saisie.Saisiehim && Array.isArray(saisie.Saisiehim)) {
                saisie.Saisiehim.forEach((saisieHim: any) => {
                  const panneName = saisieHim.Panne.name;

                  if (!result[panneName]) {
                    result[panneName] = { ni: 0, him: 0 };
                  }

                  result[panneName].ni += saisieHim.ni;
                  result[panneName].him += saisieHim.him;
                  him_total += saisieHim.him;
                });
              }
            }
          });
        }
      });

      return {
        result,
        him_total,
        activeEnginsCount: enginsAvecSaisieDansPeriode.size,
      };
    };

    const result: any[] = [];

    parcs.forEach((parc) => {
      const allEngins = parc.engins;
      const engins = allEngins?.filter((e) => e?.Saisiehrm?.length > 0);
      const nombre_d_engin = engins.length;

      const {
        result: indicators_m,
        him_total: him_total_m,
        activeEnginsCount: activeEngins_m,
      } = calculateIndicators(engins, firstDayOfMonth, lastDayOfMonth);

      const {
        result: indicators_a,
        him_total: him_total_a,
        activeEnginsCount: activeEngins_a,
      } = calculateIndicators(engins, firstDayOfYear, lastDayOfMonth);

      const daysInMonth =
        Math.floor(
          (lastDayOfMonth.getTime() - firstDayOfMonth.getTime()) /
            (1000 * 60 * 60 * 24),
        ) + 1;
      const daysInYear =
        Math.floor(
          (lastDayOfMonth.getTime() - firstDayOfYear.getTime()) /
            (1000 * 60 * 60 * 24),
        ) + 1;

      const nho_m = 24 * activeEngins_m * daysInMonth;
      const nho_a = 24 * activeEngins_a * daysInYear;

      Object.keys(indicators_m).forEach((panne) => {
        const him_m = indicators_m[panne].him;
        const him_a = indicators_a[panne]?.him ?? 0;
        const ni_m = indicators_m[panne].ni;
        const ni_a = indicators_a[panne]?.ni ?? 0;

        const indisp_m = nho_m ? (him_m / nho_m) * 100 : 0;
        const indisp_a = nho_a ? (him_a / nho_a) * 100 : 0;
        const coef_indispo_m = him_total_m ? (him_m / him_total_m) * 100 : 0;
        const coef_indispo_a = him_total_a ? (him_a / him_total_a) * 100 : 0;

        result.push({
          typeparc: parc.Typeparc.name,
          parc: parc.name,
          panne: panne,
          nombre_d_engin,
          nho_m: parseFloat(nho_m.toFixed(2)),
          nho_a: parseFloat(nho_a.toFixed(2)),
          ni_m: parseFloat(ni_m.toFixed(2)),
          ni_a: parseFloat(ni_a.toFixed(2)),
          him_m: parseFloat(him_m.toFixed(2)),
          him_a: parseFloat(him_a.toFixed(2)),
          indisp_m: parseFloat(indisp_m.toFixed(2)),
          indisp_a: parseFloat(indisp_a.toFixed(2)),
          coef_indispo_m: parseFloat(coef_indispo_m.toFixed(2)),
          coef_indispo_a: parseFloat(coef_indispo_a.toFixed(2)),
        });
      });
    });

    return result;
  }

  async getHeuresChassis(du: string) {
    const dateDu = new Date(du);
    const firstDayOfMonth = new Date(
      dateDu.getFullYear(),
      dateDu.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      dateDu.getFullYear(),
      dateDu.getMonth() + 1,
      0,
    );

    const engins = await prisma.engin.findMany({
      include: {
        Parc: { include: { Typeparc: true } },
        Site: true,
        Saisiehrm: true,
      },
    });

    const result = engins.map((engin) => {
      const hrm_m = engin.Saisiehrm.filter(
        (saisie) => saisie.du >= firstDayOfMonth && saisie.du <= lastDayOfMonth,
      ).reduce((sum, saisie) => sum + saisie.hrm, 0);

      const sommeHrmTotal = engin.Saisiehrm.reduce(
        (sum, saisie) => sum + saisie.hrm,
        0,
      );
      const heuresChassis = sommeHrmTotal + (engin.initialHeureChassis || 0);

      return {
        typeparc: engin.Parc.Typeparc.name,
        parc: engin.Parc.name,
        engin: engin.name,
        hrm_m: parseFloat(hrm_m.toFixed(2)),
        heuresChassis: parseFloat(heuresChassis.toFixed(2)),
        site: engin.Site.name,
      };
    });

    return result;
  }

  async getSpecLub(typelubrifiantId: string, year: number) {
    const yearNum = parseInt(year.toString());
    const startDate = new Date(yearNum, 0, 1);
    const endDate = new Date(yearNum + 1, 0, 1);

    const typelubrifiant = await prisma.typelubrifiant.findUnique({
      where: { id: typelubrifiantId.toString() },
    });

    if (!typelubrifiant) {
      throw new Error('Typelubrifiant not found');
    }

    const parcs = await prisma.parc.findMany({
      orderBy: { name: 'asc' },
      include: { engins: { select: { id: true } } },
    });

    const result = await Promise.all(
      parcs.map(async (parc) => {
        const parcResult: any = {
          parc: parc.name,
          nombe_engin: parc.engins.length,
          typelubrifiantId: typelubrifiantId.toString(),
          typelubrifiant: typelubrifiant.name,
          hrm_total: 0,
          qte_total: 0,
        };

        for (let month = 1; month <= 12; month++) {
          parcResult[`hrm_${month}`] = 0;
          parcResult[`qte_${month}`] = 0;
          parcResult[`spec_${month}`] = 0;
        }

        const hrmByMonth = await prisma.saisiehrm.groupBy({
          by: ['du'],
          where: {
            enginId: { in: parc.engins.map((e) => e.id) },
            du: { gte: startDate, lt: endDate },
          },
          _sum: { hrm: true },
        });

        hrmByMonth.forEach(({ du, _sum }) => {
          const month = du.getMonth() + 1;
          parcResult[`hrm_${month}`] += _sum.hrm || 0;
          parcResult.hrm_total += _sum.hrm || 0;
        });

        const qteByMonth = await prisma.saisielubrifiant.findMany({
          where: {
            Lubrifiant: { typelubrifiantId: typelubrifiantId.toString() },
            Saisiehim: {
              Saisiehrm: {
                enginId: { in: parc.engins.map((e) => e.id) },
                du: { gte: startDate, lt: endDate },
              },
            },
          },
          include: {
            Saisiehim: { include: { Saisiehrm: { select: { du: true } } } },
          },
        });

        qteByMonth.forEach(({ qte, Saisiehim }) => {
          const month = Saisiehim.Saisiehrm.du.getMonth() + 1;
          parcResult[`qte_${month}`] += qte;
          parcResult.qte_total += qte;
        });

        for (let month = 1; month <= 12; month++) {
          const hrm = parcResult[`hrm_${month}`];
          const qte = parcResult[`qte_${month}`];
          const spec = hrm > 0 ? qte / hrm : 0;

          parcResult[`hrm_${month}`] = parseFloat(hrm.toFixed(2));
          parcResult[`qte_${month}`] = parseFloat(qte.toFixed(2));
          parcResult[`spec_${month}`] = parseFloat(spec.toFixed(2));
        }

        parcResult.hrm_total = parseFloat(parcResult.hrm_total.toFixed(2));
        parcResult.qte_total = parseFloat(parcResult.qte_total.toFixed(2));
        parcResult.spec_total =
          parcResult.hrm_total > 0
            ? parseFloat(
                (parcResult.qte_total / parcResult.hrm_total).toFixed(2),
              )
            : 0;

        return parcResult;
      }),
    );

    return result;
  }

  async getParetoIndispoParc(parcId: string, date: string) {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const daysInMonth = new Date(year, month, 0).getDate();
    const hoursInMonth = daysInMonth * 24;

    const parc = await prisma.parc.findUnique({
      where: { id: parcId.toString() },
      include: {
        engins: {
          where: {
            Saisiehrm: {
              some: { du: { gte: startDate, lte: endDate } },
            },
          },
          select: {
            id: true,
            name: true,
            Saisiehrm: {
              where: { du: { gte: startDate, lte: endDate } },
            },
          },
          orderBy: { name: 'asc' },
        },
      },
    });

    if (!parc) {
      throw new Error('Parc not found');
    }

    const nho = hoursInMonth * parc.engins.length;

    const records = await prisma.saisiehim.findMany({
      where: {
        Saisiehrm: {
          enginId: { in: parc.engins.map((e) => e.id) },
          du: { gte: startDate, lte: endDate },
        },
      },
      select: {
        panneId: true,
        him: true,
        ni: true,
        enginId: true,
        Saisiehrm: { select: { enginId: true, du: true } },
      },
    });

    const panneIds = [...new Set(records.map((r) => r.panneId))];
    const pannes = await prisma.panne.findMany({
      where: { id: { in: panneIds } },
      select: { id: true, name: true },
    });
    const panneMap = new Map(pannes.map((panne) => [panne.id, panne.name]));

    const dataByPanne: Record<string, any> = {};
    records.forEach((record) => {
      const panneId = record.panneId;
      const enginId = record.enginId || record.Saisiehrm.enginId;
      const dateDu = record.Saisiehrm.du;

      if (dateDu >= startDate && dateDu <= endDate) {
        if (!dataByPanne[panneId]) {
          dataByPanne[panneId] = { himTotal: 0, niTotal: 0, engins: {} };
        }

        dataByPanne[panneId].himTotal += record.him;
        dataByPanne[panneId].niTotal += record.ni;

        if (!dataByPanne[panneId].engins[enginId]) {
          dataByPanne[panneId].engins[enginId] = { him: 0, ni: 0 };
        }

        dataByPanne[panneId].engins[enginId].him += record.him;
        dataByPanne[panneId].engins[enginId].ni += record.ni;
      }
    });

    const result = Object.entries(dataByPanne)
      .map(([panneId, data]) => {
        const enginsList = parc.engins
          .filter((engin) => data.engins[engin.id]?.him > 0)
          .map((engin) => ({
            name: engin.name,
            him: data.engins[engin.id].him,
          }))
          .sort((a, b) => b.him - a.him);

        const enginsMtbfList = parc.engins
          .filter((engin) => data.engins[engin.id]?.ni > 0)
          .map((engin) => ({
            name: engin.name,
            ni: data.engins[engin.id].ni,
          }))
          .sort((a, b) => b.ni - a.ni);

        const indispo =
          nho > 0 ? parseFloat(((100 * data.himTotal) / nho).toFixed(2)) : 0;

        return {
          parc: parc.name,
          year: year.toString(),
          month: month.toString(),
          nombe_engin: parc.engins.length,
          panne: panneMap.get(panneId) || 'Inconnue',
          indispo: indispo,
          engins: enginsList,
          engins_mtbf: enginsMtbfList,
        };
      })
      .sort((a, b) => b.indispo - a.indispo);

    return result;
  }

  async getParetoMtbfParc(parcId: string, date: string) {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();

    const parc = await prisma.parc.findUnique({
      where: { id: parcId.toString() },
      include: {
        engins: { select: { id: true, active: true } },
      },
    });

    if (!parc) {
      throw new Error('Parc not found');
    }

    const objectif = await prisma.objectif.findFirst({
      where: {
        AND: [{ annee: year }, { parcId: parcId.toString() }],
      },
      select: { mtbf: true },
    });

    const monthNames = [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ];

    const results: Array<{
      mois: string;
      mtbf: number | null;
      engins_actifs: number;
      objectif_mtbf?: number | null;
    }> = monthNames.map((monthName) => ({
      mois: monthName.slice(0, 3),
      mtbf: null,
      engins_actifs: 0,
    }));

    const activeEnginIds = parc.engins
      .filter((engin) => engin.active)
      .map((engin) => engin.id);

    if (activeEnginIds.length === 0) {
      return results;
    }

    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);

      const hrmResult = await prisma.saisiehrm.aggregate({
        where: {
          enginId: { in: activeEnginIds },
          du: { gte: monthStart, lte: monthEnd },
        },
        _sum: { hrm: true },
      });
      const hrm = hrmResult._sum.hrm || 0;

      const niResult = await prisma.saisiehim.aggregate({
        where: {
          Saisiehrm: {
            enginId: { in: activeEnginIds },
            du: { gte: monthStart, lte: monthEnd },
          },
        },
        _sum: { ni: true },
      });
      const ni = niResult._sum.ni || 0;

      const mtbf = ni > 0 ? parseFloat((hrm / ni).toFixed(2)) : null;

      results[month] = {
        mois: results[month].mois,
        mtbf: mtbf,
        engins_actifs: activeEnginIds.length,
        objectif_mtbf: objectif?.mtbf ?? null,
      };
    }

    return results;
  }

  async getAnalyseSpcPeriodParcTypeConsomm(
    parcId: string,
    dateDu: string,
    dateAu: string,
    typelubrifiantId: string,
  ) {
    const saisies = await prisma.saisielubrifiant.findMany({
      where: {
        Lubrifiant: {
          typelubrifiantId: typelubrifiantId.toString(),
        },
        Typeconsommationlub: {
          parcs: {
            some: {
              parcId: parcId.toString(),
            },
          },
        },
        Saisiehim: {
          Saisiehrm: {
            du: {
              gte: new Date(dateDu),
              lte: new Date(dateAu),
            },
            Engin: {
              parcId: parcId.toString(),
            },
          },
        },
      },
      include: {
        Typeconsommationlub: true,
      },
    });

    const grouped: Record<string, number> = {};
    let totalQte = 0;

    for (const s of saisies) {
      const name = s.Typeconsommationlub?.name || 'Non spécifié';
      grouped[name] = (grouped[name] || 0) + s.qte;
      totalQte += s.qte;
    }

    const result = Object.entries(grouped)
      .map(([name, sum]) => ({
        name,
        sum,
        percentage: totalQte
          ? parseFloat(((sum / totalQte) * 100).toFixed(2))
          : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return result;
  }

  async getIndispoParcPeriode(parcId: string, dateDu: string, dateAu: string) {
    const parc = await prisma.parc.findUnique({
      where: { id: parcId.toString() },
      select: { name: true },
    });

    if (!parc) {
      throw new Error('Parc not found');
    }

    const saisiehimList = await prisma.saisiehim.findMany({
      where: {
        Saisiehrm: {
          du: {
            gte: new Date(dateDu),
            lte: new Date(dateAu),
          },
          Engin: {
            parcId: parcId.toString(),
          },
        },
      },
      include: {
        Panne: {
          select: {
            name: true,
            Typepanne: {
              select: {
                name: true,
              },
            },
          },
        },
        Saisiehrm: {
          select: {
            du: true,
            Engin: {
              select: {
                id: true,
                parcId: true,
              },
            },
          },
        },
      },
    });

    const grouped: Record<string, any> = {};

    for (const item of saisiehimList) {
      const panneName = item.Panne?.name || 'Inconnu';
      const typepanneName = item.Panne?.Typepanne?.name || 'Inconnu';
      const key = `${typepanneName}||${panneName}`;

      if (!grouped[key]) {
        grouped[key] = {
          dateDu,
          dateAu,
          parc: parc.name,
          panne: panneName,
          typepanne: typepanneName,
          ni_m: 0,
          ni_a: 0,
          him_m: 0,
          him_a: 0,
        };
      }

      grouped[key].ni_m += item.ni || 0;
      grouped[key].ni_a += item.ni || 0;
      grouped[key].him_m += item.him || 0;
      grouped[key].him_a += item.him || 0;
    }

    const result = Object.values(grouped).sort((a, b) => {
      if (a.typepanne === b.typepanne) {
        return a.panne.localeCompare(b.panne);
      }
      return a.typepanne.localeCompare(b.typepanne);
    });

    return result;
  }

  async getIndispoEnginsPeriode(
    parcId: string,
    dateDu: string,
    dateAu: string,
  ) {
    const parc = await prisma.parc.findUnique({
      where: { id: parcId.toString() },
      select: { name: true },
    });

    if (!parc) {
      throw new Error('Parc not found');
    }

    const saisiehimList = await prisma.saisiehim.findMany({
      where: {
        Saisiehrm: {
          du: {
            gte: new Date(dateDu),
            lte: new Date(dateAu),
          },
          Engin: {
            parcId: parcId.toString(),
          },
        },
      },
      include: {
        Panne: {
          select: {
            name: true,
            Typepanne: {
              select: {
                name: true,
              },
            },
          },
        },
        Saisiehrm: {
          select: {
            du: true,
            Engin: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const grouped: Record<string, any> = {};

    for (const item of saisiehimList) {
      const panneName = item.Panne?.name || 'Inconnu';
      const typepanneName = item.Panne?.Typepanne?.name || 'Inconnu';
      const enginName = item.Saisiehrm.Engin?.name || 'Inconnu';

      const key = `${enginName}||${typepanneName}||${panneName}`;

      if (!grouped[key]) {
        grouped[key] = {
          dateDu,
          dateAu,
          parc: parc.name,
          engin: enginName,
          panne: panneName,
          typepanne: typepanneName,
          ni_m: 0,
          ni_a: 0,
          him_m: 0,
          him_a: 0,
        };
      }

      grouped[key].ni_m += item.ni || 0;
      grouped[key].ni_a += item.ni || 0;
      grouped[key].him_m += item.him || 0;
      grouped[key].him_a += item.him || 0;
    }

    const result = Object.values(grouped).sort((a, b) => {
      if (a.engin === b.engin) {
        if (a.typepanne === b.typepanne) {
          return a.panne.localeCompare(b.panne);
        }
        return a.typepanne.localeCompare(b.typepanne);
      }
      return a.engin.localeCompare(b.engin);
    });

    return result;
  }

  async getPerormancesEnginsPeriode(
    parcId: string,
    dateDu: string,
    dateAu: string,
  ) {
    const parc = await prisma.parc.findUnique({
      where: { id: parcId.toString() },
      select: { name: true },
    });

    if (!parc) {
      throw new Error('Parc not found');
    }

    const startDate = new Date(dateDu);
    const endDate = new Date(dateAu);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const saisiehrms = await prisma.saisiehrm.findMany({
      where: {
        du: {
          gte: startDate,
          lte: endDate,
        },
        Engin: {
          parcId: parcId.toString(),
        },
      },
      include: {
        Engin: true,
        Saisiehim: true,
      },
    });

    const grouped: Record<string, any> = {};

    for (const saisie of saisiehrms) {
      const enginName = saisie.Engin.name;

      if (!grouped[enginName]) {
        grouped[enginName] = {
          dateDu,
          dateAu,
          parc: parc.name,
          engin: enginName,
          hrm: 0,
          him: 0,
          ni: 0,
          nho: diffDays * 24,
        };
      }

      grouped[enginName].hrm += saisie.hrm || 0;

      for (const him of saisie.Saisiehim) {
        grouped[enginName].him += him.him || 0;
        grouped[enginName].ni += him.ni || 0;
      }
    }

    const result = Object.values(grouped).map((e) => {
      const { hrm, him, ni, nho } = e;

      const dispo = nho > 0 ? 100 * (1 - him / nho) : 0;
      const tdm = nho > 0 ? 100 * (hrm / nho) : 0;
      const mtbf = ni > 0 ? hrm / ni : 0;
      const util = nho > him ? (100 * hrm) / (nho - him) : 0;
      const hrd = nho - (him + hrm);

      return {
        ...e,
        hrm: hrm.toFixed(2),
        him: him.toFixed(2),
        ni: ni.toFixed(2),
        nho: nho.toFixed(2),
        dispo: dispo.toFixed(2),
        tdm: tdm.toFixed(2),
        mtbf: mtbf.toFixed(2),
        util: util.toFixed(2),
        hrd: hrd.toFixed(2),
      };
    });

    return result;
  }
}
