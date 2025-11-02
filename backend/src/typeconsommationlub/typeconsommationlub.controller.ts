import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeconsommationlubService } from './typeconsommationlub.service';
import { CreateTypeconsommationlubDto } from './dto/create-typeconsommationlub.dto';
import { UpdateTypeconsommationlubDto } from './dto/update-typeconsommationlub.dto';

@Controller('typeconsommationlub')
export class TypeconsommationlubController {
  constructor(
    private readonly typeconsommationlubService: TypeconsommationlubService,
  ) {}

  @Post()
  create(@Body() createTypeconsommationlubDto: CreateTypeconsommationlubDto) {
    return this.typeconsommationlubService.create(createTypeconsommationlubDto);
  }

  @Get()
  findAll() {
    return this.typeconsommationlubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeconsommationlubService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeconsommationlubDto: UpdateTypeconsommationlubDto,
  ) {
    return this.typeconsommationlubService.update(
      id,
      updateTypeconsommationlubDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeconsommationlubService.remove(id);
  }
}
