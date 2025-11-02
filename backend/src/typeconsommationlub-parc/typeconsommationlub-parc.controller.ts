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

  @Get(':parcId/:typeconsommationlubId')
  findOne(
    @Param('parcId') parcId: string,
    @Param('typeconsommationlubId') typeconsommationlubId: string,
  ) {
    return this.typeconsommationlubParcService.findOne(
      parcId,
      typeconsommationlubId,
    );
  }

  @Patch(':parcId/:typeconsommationlubId')
  update(
    @Param('parcId') parcId: string,
    @Param('typeconsommationlubId') typeconsommationlubId: string,
    @Body() dto: UpdateTypeconsommationlubParcDto,
  ) {
    return this.typeconsommationlubParcService.update(
      parcId,
      typeconsommationlubId,
      dto,
    );
  }

  @Delete(':parcId/:typeconsommationlubId')
  remove(
    @Param('parcId') parcId: string,
    @Param('typeconsommationlubId') typeconsommationlubId: string,
  ) {
    return this.typeconsommationlubParcService.remove(
      parcId,
      typeconsommationlubId,
    );
  }
}
