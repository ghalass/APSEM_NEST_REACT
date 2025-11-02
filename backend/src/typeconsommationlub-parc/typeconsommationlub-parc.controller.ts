import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeconsommationlubParcService } from './typeconsommationlub-parc.service';
import { CreateTypeconsommationlubParcDto } from './dto/create-typeconsommationlub-parc.dto';
import { UpdateTypeconsommationlubParcDto } from './dto/update-typeconsommationlub-parc.dto';

@Controller('typeconsommationlub-parc')
export class TypeconsommationlubParcController {
  constructor(
    private readonly typeconsommationlubParcService: TypeconsommationlubParcService,
  ) {}

  @Post()
  create(
    @Body() createTypeconsommationlubParcDto: CreateTypeconsommationlubParcDto,
  ) {
    return this.typeconsommationlubParcService.create(
      createTypeconsommationlubParcDto,
    );
  }

  @Get()
  findAll() {
    return this.typeconsommationlubParcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeconsommationlubParcService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeconsommationlubParcDto: UpdateTypeconsommationlubParcDto,
  ) {
    return this.typeconsommationlubParcService.update(
      id,
      updateTypeconsommationlubParcDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeconsommationlubParcService.remove(id);
  }
}
