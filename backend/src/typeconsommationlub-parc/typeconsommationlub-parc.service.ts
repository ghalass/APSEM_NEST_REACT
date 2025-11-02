import { Injectable } from '@nestjs/common';
import { CreateTypeconsommationlubParcDto } from './dto/create-typeconsommationlub-parc.dto';
import { UpdateTypeconsommationlubParcDto } from './dto/update-typeconsommationlub-parc.dto';

@Injectable()
export class TypeconsommationlubParcService {
  create(createTypeconsommationlubParcDto: CreateTypeconsommationlubParcDto) {
    return 'This action adds a new typeconsommationlubParc';
  }

  findAll() {
    return `This action returns all typeconsommationlubParc`;
  }

  findOne(id: string) {
    return `This action returns a #${id} typeconsommationlubParc`;
  }

  update(
    id: string,
    updateTypeconsommationlubParcDto: UpdateTypeconsommationlubParcDto,
  ) {
    return `This action updates a #${id} typeconsommationlubParc`;
  }

  remove(id: string) {
    return `This action removes a #${id} typeconsommationlubParc`;
  }
}
