import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RapportService } from './rapport.service';

@Controller('rapport')
export class RapportController {
  constructor(private readonly rapportService: RapportService) {}

  @Post('rje')
  async getRapportRje(@Body('du') du: string) {
    try {
      return await this.rapportService.getRapportRje(du);
    } catch (error) {
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('unite-physique')
  async getRapportUnitePhysique(@Body('du') du: string) {
    try {
      return await this.rapportService.getRapportUnitePhysique(du);
    } catch (error) {
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('etat-mensuel')
  async getEtatMensuel(@Body('du') du: string) {
    try {
      return await this.rapportService.getEtatMensuel(du);
    } catch (error) {
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('indispo-parc')
  async getIndispoParParc(@Body('du') du: string) {
    try {
      return await this.rapportService.getIndispoParParc(du);
    } catch (error) {
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('heures-chassis')
  async getHeuresChassis(@Body('du') du: string) {
    try {
      return await this.rapportService.getHeuresChassis(du);
    } catch (error) {
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('spec-lubrifiant')
  async getSpecLub(@Body() body: { typelubrifiantId: string; year: number }) {
    try {
      if (!body.typelubrifiantId || !body.year) {
        throw new HttpException(
          { message: 'typelubrifiantId and year are required' },
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.rapportService.getSpecLub(
        body.typelubrifiantId,
        body.year,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('pareto-indispo-parc')
  async getParetoIndispoParc(@Body() body: { parcId: string; date: string }) {
    try {
      if (!body.parcId || !body.date) {
        throw new HttpException(
          { message: 'parcId and date are required' },
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.rapportService.getParetoIndispoParc(
        body.parcId,
        body.date,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('pareto-mtbf-parc')
  async getParetoMtbfParc(@Body() body: { parcId: string; date: string }) {
    try {
      if (!body.parcId || !body.date) {
        throw new HttpException(
          { message: 'parcId and date are required' },
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.rapportService.getParetoMtbfParc(
        body.parcId,
        body.date,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('analyse-spc-period-parc-type-consomm')
  async getAnalyseSpcPeriodParcTypeConsomm(
    @Body()
    body: {
      parcId: string;
      dateDu: string;
      dateAu: string;
      typelubrifiantId: string;
    },
  ) {
    try {
      if (
        !body.parcId ||
        !body.dateDu ||
        !body.dateAu ||
        !body.typelubrifiantId
      ) {
        throw new HttpException(
          {
            message: 'parcId, dateDu, dateAu and typelubrifiantId are required',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.rapportService.getAnalyseSpcPeriodParcTypeConsomm(
        body.parcId,
        body.dateDu,
        body.dateAu,
        body.typelubrifiantId,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('indispo-parc-periode')
  async getIndispoParcPeriode(
    @Body() body: { parcId: string; dateDu: string; dateAu: string },
  ) {
    try {
      if (!body.parcId || !body.dateDu || !body.dateAu) {
        throw new HttpException(
          { message: 'parcId, dateDu and dateAu are required' },
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.rapportService.getIndispoParcPeriode(
        body.parcId,
        body.dateDu,
        body.dateAu,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('indispo-engins-periode')
  async getIndispoEnginsPeriode(
    @Body() body: { parcId: string; dateDu: string; dateAu: string },
  ) {
    try {
      if (!body.parcId || !body.dateDu || !body.dateAu) {
        throw new HttpException(
          { message: 'parcId, dateDu and dateAu are required' },
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.rapportService.getIndispoEnginsPeriode(
        body.parcId,
        body.dateDu,
        body.dateAu,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('performances-engins-periode')
  async getPerormancesEnginsPeriode(
    @Body() body: { parcId: string; dateDu: string; dateAu: string },
  ) {
    try {
      if (!body.parcId || !body.dateDu || !body.dateAu) {
        throw new HttpException(
          { message: 'parcId, dateDu and dateAu are required' },
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.rapportService.getPerormancesEnginsPeriode(
        body.parcId,
        body.dateDu,
        body.dateAu,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erreur serveur', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
