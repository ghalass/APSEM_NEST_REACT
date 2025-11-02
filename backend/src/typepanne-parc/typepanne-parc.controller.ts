import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypepanneParcService } from './typepanne-parc.service';
import { CreateTypepanneParcDto } from './dto/create-typepanne-parc.dto';
import { UpdateTypepanneParcDto } from './dto/update-typepanne-parc.dto';

@Controller('typepanne-parc')
export class TypepanneParcController {
  constructor(private readonly typepanneParcService: TypepanneParcService) {}

  @Post()
  create(@Body() createTypepanneParcDto: CreateTypepanneParcDto) {
    return this.typepanneParcService.create(createTypepanneParcDto);
  }

  @Get()
  findAll() {
    return this.typepanneParcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typepanneParcService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypepanneParcDto: UpdateTypepanneParcDto) {
    return this.typepanneParcService.update(+id, updateTypepanneParcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typepanneParcService.remove(+id);
  }
}
