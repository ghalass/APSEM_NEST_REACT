import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateBesoinPdrDto } from './dto/create-besoin_pdr.dto';
import { UpdateBesoinPdrDto } from './dto/update-besoin_pdr.dto';
import { BesoinPdrService } from './besoin_pdr.service';

@Controller('besoin-pdr')
export class BesoinPdrController {
  constructor(private readonly besoinPdrService: BesoinPdrService) {}

  // GET /besoin-pdr
  @Get()
  async findAll() {
    return this.besoinPdrService.findAll();
  }

  // GET /besoin-pdr/:id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.besoinPdrService.findOne(id);
  }

  // POST /besoin-pdr
  @Post()
  async create(@Body() dto: CreateBesoinPdrDto) {
    return this.besoinPdrService.create(dto);
  }

  // POST /besoin-pdr/anomalie/:anomalieId
  // Crée un Besoin PDR lié directement à une anomalie
  @Post('anomalie/:anomalieId')
  async createForAnomalie(
    @Param('anomalieId') anomalieId: string,
    @Body() dto: CreateBesoinPdrDto,
  ) {
    return this.besoinPdrService.createForAnomalie(anomalieId, dto);
  }

  // PATCH /besoin-pdr/:id
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBesoinPdrDto) {
    return this.besoinPdrService.update(id, dto);
  }

  // DELETE /besoin-pdr/:id
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.besoinPdrService.remove(id);
  }
}
