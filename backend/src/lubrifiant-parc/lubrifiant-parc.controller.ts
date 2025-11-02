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

  @Get(':parcId/:lubrifiantId')
  findOne(
    @Param('parcId') parcId: string,
    @Param('lubrifiantId') lubrifiantId: string,
  ) {
    return this.lubrifiantParcService.findOne(parcId, lubrifiantId);
  }

  @Patch(':parcId/:lubrifiantId')
  update(
    @Param('parcId') parcId: string,
    @Param('lubrifiantId') lubrifiantId: string,
    @Body() dto: UpdateLubrifiantParcDto,
  ) {
    return this.lubrifiantParcService.update(parcId, lubrifiantId, dto);
  }

  @Delete(':parcId/:lubrifiantId')
  remove(
    @Param('parcId') parcId: string,
    @Param('lubrifiantId') lubrifiantId: string,
  ) {
    return this.lubrifiantParcService.remove(parcId, lubrifiantId);
  }
}
