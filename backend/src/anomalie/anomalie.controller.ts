import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnomalieService } from './anomalie.service';
import { CreateAnomalieDto } from './dto/create-anomalie.dto';
import { UpdateAnomalieDto } from './dto/update-anomalie.dto';

@Controller('anomalie')
export class AnomalieController {
  constructor(private readonly anomalieService: AnomalieService) {}

  @Post()
  create(@Body() dto: CreateAnomalieDto) {
    return this.anomalieService.create(dto);
  }

  @Get()
  findAll() {
    return this.anomalieService.findAll();
  }

  @Get('formatted')
  async getFormattedAnomalies() {
    return this.anomalieService.getAnomaliesFormatted();
  }

  @Get('/backlog_dashboard')
  async getBacklogDashboard() {
    return this.anomalieService.getBacklogDashboardStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('iii');

    return this.anomalieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAnomalieDto) {
    return this.anomalieService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anomalieService.remove(id);
  }
}
