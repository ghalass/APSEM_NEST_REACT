import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PanneService } from './panne.service';
import { CreatePanneDto } from './dto/create-panne.dto';
import { UpdatePanneDto } from './dto/update-panne.dto';

@Controller('panne')
export class PanneController {
  constructor(private readonly panneService: PanneService) {}

  @Post()
  create(@Body() createPanneDto: CreatePanneDto) {
    return this.panneService.create(createPanneDto);
  }

  @Get()
  findAll() {
    return this.panneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.panneService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePanneDto: UpdatePanneDto) {
    return this.panneService.update(id, updatePanneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.panneService.remove(id);
  }
}
