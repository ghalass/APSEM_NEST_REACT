import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeparcService } from './typeparc.service';
import { CreateTypeparcDto } from './dto/create-typeparc.dto';
import { UpdateTypeparcDto } from './dto/update-typeparc.dto';

@Controller('typeparc')
export class TypeparcController {
  constructor(private readonly typeparcService: TypeparcService) {}

  @Post()
  create(@Body() createTypeparcDto: CreateTypeparcDto) {
    return this.typeparcService.create(createTypeparcDto);
  }

  @Get()
  findAll() {
    return this.typeparcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeparcService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeparcDto: UpdateTypeparcDto,
  ) {
    return this.typeparcService.update(id, updateTypeparcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeparcService.remove(id);
  }
}
