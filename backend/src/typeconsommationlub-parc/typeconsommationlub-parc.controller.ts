import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeconsommationlubParcService } from './typeconsommationlub-parc.service';
import { CreateTypeconsommationlubParcDto } from './dto/create-typeconsommationlub-parc.dto';
import { UpdateTypeconsommationlubParcDto } from './dto/update-typeconsommationlub-parc.dto';

@Controller('typeconsommationlub-parc')
export class TypeconsommationlubParcController {
  constructor(private readonly service: TypeconsommationlubParcService) {}

  // ✅ Créer une nouvelle relation
  @Post()
  create(@Body() dto: CreateTypeconsommationlubParcDto) {
    return this.service.create(dto);
  }

  // ✅ Récupérer toutes les relations
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ✅ Récupérer une relation spécifique
  @Get(':parcId/:typeconsommationlubId')
  findOne(
    @Param('parcId') parcId: string,
    @Param('typeconsommationlubId') typeconsommationlubId: string,
  ) {
    return this.service.findOne(parcId, typeconsommationlubId);
  }

  // ✅ Mettre à jour une relation
  @Patch(':parcId/:typeconsommationlubId')
  update(
    @Param('parcId') parcId: string,
    @Param('typeconsommationlubId') typeconsommationlubId: string,
    @Body() dto: UpdateTypeconsommationlubParcDto,
  ) {
    return this.service.update(parcId, typeconsommationlubId, dto);
  }

  // ✅ Supprimer une relation
  @Delete(':parcId/:typeconsommationlubId')
  remove(
    @Param('parcId') parcId: string,
    @Param('typeconsommationlubId') typeconsommationlubId: string,
  ) {
    return this.service.remove(parcId, typeconsommationlubId);
  }
}
