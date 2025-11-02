import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParcService } from './parc.service';
import { CreateParcDto } from './dto/create-parc.dto';
import { UpdateParcDto } from './dto/update-parc.dto';

@Controller('parc')
export class ParcController {
  constructor(private readonly parcService: ParcService) {}

  @Post()
  create(@Body() createParcDto: CreateParcDto) {
    return this.parcService.create(createParcDto);
  }

  @Get()
  findAll() {
    return this.parcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parcService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParcDto: UpdateParcDto) {
    return this.parcService.update(+id, updateParcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parcService.remove(+id);
  }
}
