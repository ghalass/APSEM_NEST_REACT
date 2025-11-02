import { Injectable } from '@nestjs/common';
import { CreateTypepanneDto } from './dto/create-typepanne.dto';
import { UpdateTypepanneDto } from './dto/update-typepanne.dto';

@Injectable()
export class TypepanneService {
  create(createTypepanneDto: CreateTypepanneDto) {
    return 'This action adds a new typepanne';
  }

  findAll() {
    return `This action returns all typepanne`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typepanne`;
  }

  update(id: number, updateTypepanneDto: UpdateTypepanneDto) {
    return `This action updates a #${id} typepanne`;
  }

  remove(id: number) {
    return `This action removes a #${id} typepanne`;
  }
}
