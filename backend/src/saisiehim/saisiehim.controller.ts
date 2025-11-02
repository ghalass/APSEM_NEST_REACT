import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaisiehimService } from './saisiehim.service';
import { CreateSaisiehimDto } from './dto/create-saisiehim.dto';
import { UpdateSaisiehimDto } from './dto/update-saisiehim.dto';

@Controller('saisiehim')
export class SaisiehimController {
  constructor(private readonly saisiehimService: SaisiehimService) {}

  @Post()
  create(@Body() createSaisiehimDto: CreateSaisiehimDto) {
    return this.saisiehimService.create(createSaisiehimDto);
  }

  @Get()
  findAll() {
    return this.saisiehimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saisiehimService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaisiehimDto: UpdateSaisiehimDto,
  ) {
    return this.saisiehimService.update(id, updateSaisiehimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saisiehimService.remove(id);
  }
}
