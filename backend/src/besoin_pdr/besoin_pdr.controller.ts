import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateBesoinPdrDto } from './dto/create-besoin_pdr.dto';
import { UpdateBesoinPdrDto } from './dto/update-besoin_pdr.dto';
import { BesoinPdrService } from './besoin_pdr.service';

@Controller('besoins-pdr')
export class BesoinPdrController {
  constructor(private readonly besoinPdrService: BesoinPdrService) {}

  // ✅ Nouveau endpoint : créer un besoin PDR pour une anomalie donnée
  @Post('/anomalies/:anomalieId')
  createForAnomalie(
    @Param('anomalieId') anomalieId: string,
    @Body() dto: CreateBesoinPdrDto,
  ) {
    return this.besoinPdrService.createForAnomalie(anomalieId, dto);
  }

  // ✅ Récupérer tous les besoins PDR
  @Get()
  findAll() {
    return this.besoinPdrService.findAll();
  }

  // ✅ Récupérer un besoin PDR par ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.besoinPdrService.findOne(id);
  }

  // ✅ Mettre à jour un besoin PDR
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBesoinPdrDto) {
    return this.besoinPdrService.update(id, dto);
  }

  // ✅ Supprimer un besoin PDR
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.besoinPdrService.remove(id);
  }
}
