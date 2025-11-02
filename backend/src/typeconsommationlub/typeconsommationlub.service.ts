import { Injectable } from '@nestjs/common';
import { CreateTypeconsommationlubDto } from './dto/create-typeconsommationlub.dto';
import { UpdateTypeconsommationlubDto } from './dto/update-typeconsommationlub.dto';

@Injectable()
export class TypeconsommationlubService {
  create(createTypeconsommationlubDto: CreateTypeconsommationlubDto) {
    return 'This action adds a new typeconsommationlub';
  }

  findAll() {
    return `This action returns all typeconsommationlub`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeconsommationlub`;
  }

  update(id: number, updateTypeconsommationlubDto: UpdateTypeconsommationlubDto) {
    return `This action updates a #${id} typeconsommationlub`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeconsommationlub`;
  }
}
