import { Injectable } from '@nestjs/common';
import { CreateTypeparcDto } from './dto/create-typeparc.dto';
import { UpdateTypeparcDto } from './dto/update-typeparc.dto';

@Injectable()
export class TypeparcService {
  create(createTypeparcDto: CreateTypeparcDto) {
    return 'This action adds a new typeparc';
  }

  findAll() {
    return `This action returns all typeparc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeparc`;
  }

  update(id: number, updateTypeparcDto: UpdateTypeparcDto) {
    return `This action updates a #${id} typeparc`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeparc`;
  }
}
