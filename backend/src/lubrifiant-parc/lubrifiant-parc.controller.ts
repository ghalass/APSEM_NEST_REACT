import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LubrifiantParcService } from './lubrifiant-parc.service';
import { CreateLubrifiantParcDto } from './dto/create-lubrifiant-parc.dto';
import { UpdateLubrifiantParcDto } from './dto/update-lubrifiant-parc.dto';

@Controller('lubrifiant-parc')
export class LubrifiantParcController {
  constructor(private readonly lubrifiantParcService: LubrifiantParcService) {}

  @Post()
  create(@Body() createLubrifiantParcDto: CreateLubrifiantParcDto) {
    return this.lubrifiantParcService.create(createLubrifiantParcDto);
  }

  @Get()
  findAll() {
    return this.lubrifiantParcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lubrifiantParcService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLubrifiantParcDto: UpdateLubrifiantParcDto,
  ) {
    return this.lubrifiantParcService.update(id, updateLubrifiantParcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lubrifiantParcService.remove(id);
  }
}
