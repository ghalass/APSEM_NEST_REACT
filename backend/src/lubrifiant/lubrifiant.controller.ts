import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LubrifiantService } from './lubrifiant.service';
import { CreateLubrifiantDto } from './dto/create-lubrifiant.dto';
import { UpdateLubrifiantDto } from './dto/update-lubrifiant.dto';

@Controller('lubrifiant')
export class LubrifiantController {
  constructor(private readonly lubrifiantService: LubrifiantService) {}

  @Post()
  create(@Body() createLubrifiantDto: CreateLubrifiantDto) {
    return this.lubrifiantService.create(createLubrifiantDto);
  }

  @Get()
  findAll() {
    return this.lubrifiantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lubrifiantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLubrifiantDto: UpdateLubrifiantDto) {
    return this.lubrifiantService.update(+id, updateLubrifiantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lubrifiantService.remove(+id);
  }
}
