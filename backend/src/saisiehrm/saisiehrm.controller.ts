import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaisiehrmService } from './saisiehrm.service';
import { CreateSaisiehrmDto } from './dto/create-saisiehrm.dto';
import { UpdateSaisiehrmDto } from './dto/update-saisiehrm.dto';

@Controller('saisiehrm')
export class SaisiehrmController {
  constructor(private readonly saisiehrmService: SaisiehrmService) {}

  @Post()
  create(@Body() createSaisiehrmDto: CreateSaisiehrmDto) {
    return this.saisiehrmService.create(createSaisiehrmDto);
  }

  @Get()
  findAll() {
    return this.saisiehrmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saisiehrmService.findOne(id);
  }

  @Get('/by_engin_by_date/:enginId/:date')
  findByDateByEngin(
    @Param('enginId') enginId: string,
    @Param('date') date: Date,
  ) {
    return this.saisiehrmService.findByEnginByDate(enginId, date);
  }

  @Get('/by_date/:date')
  findByDate(@Param('date') date: Date) {
    console.log(date);

    return this.saisiehrmService.findByDate(date);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaisiehrmDto: UpdateSaisiehrmDto,
  ) {
    return this.saisiehrmService.update(id, updateSaisiehrmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saisiehrmService.remove(id);
  }
}
