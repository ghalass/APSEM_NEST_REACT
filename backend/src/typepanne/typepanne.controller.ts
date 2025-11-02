import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypepanneService } from './typepanne.service';
import { CreateTypepanneDto } from './dto/create-typepanne.dto';
import { UpdateTypepanneDto } from './dto/update-typepanne.dto';

@Controller('typepanne')
export class TypepanneController {
  constructor(private readonly typepanneService: TypepanneService) {}

  @Post()
  create(@Body() createTypepanneDto: CreateTypepanneDto) {
    return this.typepanneService.create(createTypepanneDto);
  }

  @Get()
  findAll() {
    return this.typepanneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typepanneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypepanneDto: UpdateTypepanneDto) {
    return this.typepanneService.update(+id, updateTypepanneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typepanneService.remove(+id);
  }
}
