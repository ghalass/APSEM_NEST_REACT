import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnginService } from './engin.service';
import { CreateEnginDto } from './dto/create-engin.dto';
import { UpdateEnginDto } from './dto/update-engin.dto';

@Controller('engin')
export class EnginController {
  constructor(private readonly enginService: EnginService) {}

  @Post()
  create(@Body() createEnginDto: CreateEnginDto) {
    return this.enginService.create(createEnginDto);
  }

  @Get()
  findAll() {
    return this.enginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnginDto: UpdateEnginDto) {
    return this.enginService.update(+id, updateEnginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enginService.remove(+id);
  }
}
