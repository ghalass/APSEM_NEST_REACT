import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaisielubrifiantService } from './saisielubrifiant.service';
import { CreateSaisielubrifiantDto } from './dto/create-saisielubrifiant.dto';
import { UpdateSaisielubrifiantDto } from './dto/update-saisielubrifiant.dto';

@Controller('saisielubrifiant')
export class SaisielubrifiantController {
  constructor(
    private readonly saisielubrifiantService: SaisielubrifiantService,
  ) {}

  @Post()
  create(@Body() createSaisielubrifiantDto: CreateSaisielubrifiantDto) {
    return this.saisielubrifiantService.create(createSaisielubrifiantDto);
  }

  @Get()
  findAll() {
    return this.saisielubrifiantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saisielubrifiantService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaisielubrifiantDto: UpdateSaisielubrifiantDto,
  ) {
    return this.saisielubrifiantService.update(id, updateSaisielubrifiantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saisielubrifiantService.remove(id);
  }
}
