import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypepanneParcService } from './typepanne-parc.service';
import { CreateTypepanneParcDto } from './dto/create-typepanne-parc.dto';
import { UpdateTypepanneParcDto } from './dto/update-typepanne-parc.dto';

@Controller('typepanne-parc')
export class TypepanneParcController {
  constructor(private readonly typepanneParcService: TypepanneParcService) {}

  @Post()
  create(@Body() dto: CreateTypepanneParcDto) {
    return this.typepanneParcService.create(dto);
  }

  @Get()
  findAll() {
    return this.typepanneParcService.findAll();
  }

  // ⚠️ Route N:N doit passer les deux IDs
  @Get(':parcId/:typepanneId')
  findOne(
    @Param('parcId') parcId: string,
    @Param('typepanneId') typepanneId: string,
  ) {
    return this.typepanneParcService.findOne(parcId, typepanneId);
  }

  @Patch(':parcId/:typepanneId')
  update(
    @Param('parcId') parcId: string,
    @Param('typepanneId') typepanneId: string,
    @Body() dto: UpdateTypepanneParcDto,
  ) {
    return this.typepanneParcService.update(parcId, typepanneId, dto);
  }

  @Delete(':parcId/:typepanneId')
  remove(
    @Param('parcId') parcId: string,
    @Param('typepanneId') typepanneId: string,
  ) {
    return this.typepanneParcService.remove(parcId, typepanneId);
  }
}
