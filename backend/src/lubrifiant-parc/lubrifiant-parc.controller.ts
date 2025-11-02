import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LubrifiantParcService } from './lubrifiant-parc.service';
import { CreateLubrifiantParcDto } from './dto/create-lubrifiant-parc.dto';
import { UpdateLubrifiantParcDto } from './dto/update-lubrifiant-parc.dto';

@Controller('lubrifiant-parc')
export class LubrifiantParcController {
  constructor(private readonly service: LubrifiantParcService) {}

  // ✅ Créer une nouvelle relation
  @Post()
  create(@Body() dto: CreateLubrifiantParcDto) {
    return this.service.create(dto);
  }

  // ✅ Récupérer toutes les relations
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ✅ Récupérer une relation spécifique
  @Get(':parcId/:lubrifiantId')
  findOne(
    @Param('parcId') parcId: string,
    @Param('lubrifiantId') lubrifiantId: string,
  ) {
    return this.service.findOne(parcId, lubrifiantId);
  }

  // ✅ Mettre à jour une relation
  @Patch(':parcId/:lubrifiantId')
  update(
    @Param('parcId') parcId: string,
    @Param('lubrifiantId') lubrifiantId: string,
    @Body() dto: UpdateLubrifiantParcDto,
  ) {
    return this.service.update(parcId, lubrifiantId, dto);
  }

  // ✅ Supprimer une relation
  @Delete(':parcId/:lubrifiantId')
  remove(
    @Param('parcId') parcId: string,
    @Param('lubrifiantId') lubrifiantId: string,
  ) {
    return this.service.remove(parcId, lubrifiantId);
  }
}
