import { Injectable } from '@nestjs/common';
import { CreateTypepanneParcDto } from './dto/create-typepanne-parc.dto';
import { UpdateTypepanneParcDto } from './dto/update-typepanne-parc.dto';

@Injectable()
export class TypepanneParcService {
  create(createTypepanneParcDto: CreateTypepanneParcDto) {
    return 'This action adds a new typepanneParc';
  }

  findAll() {
    return `This action returns all typepanneParc`;
  }

  findOne(id: string) {
    return `This action returns a #${id} typepanneParc`;
  }

  update(id: string, updateTypepanneParcDto: UpdateTypepanneParcDto) {
    return `This action updates a #${id} typepanneParc`;
  }

  remove(id: string) {
    return `This action removes a #${id} typepanneParc`;
  }
}
