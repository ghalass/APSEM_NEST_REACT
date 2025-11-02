import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypelubrifiantService } from './typelubrifiant.service';
import { CreateTypelubrifiantDto } from './dto/create-typelubrifiant.dto';
import { UpdateTypelubrifiantDto } from './dto/update-typelubrifiant.dto';

@Controller('typelubrifiant')
export class TypelubrifiantController {
  constructor(private readonly typelubrifiantService: TypelubrifiantService) {}

  @Post()
  create(@Body() createTypelubrifiantDto: CreateTypelubrifiantDto) {
    return this.typelubrifiantService.create(createTypelubrifiantDto);
  }

  @Get()
  findAll() {
    return this.typelubrifiantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typelubrifiantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypelubrifiantDto: UpdateTypelubrifiantDto) {
    return this.typelubrifiantService.update(+id, updateTypelubrifiantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typelubrifiantService.remove(+id);
  }
}
