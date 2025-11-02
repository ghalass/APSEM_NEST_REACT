import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObjectifService } from './objectif.service';
import { CreateObjectifDto } from './dto/create-objectif.dto';
import { UpdateObjectifDto } from './dto/update-objectif.dto';

@Controller('objectif')
export class ObjectifController {
  constructor(private readonly objectifService: ObjectifService) {}

  @Post()
  create(@Body() createObjectifDto: CreateObjectifDto) {
    return this.objectifService.create(createObjectifDto);
  }

  @Get()
  findAll() {
    return this.objectifService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.objectifService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObjectifDto: UpdateObjectifDto) {
    return this.objectifService.update(+id, updateObjectifDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.objectifService.remove(+id);
  }
}
