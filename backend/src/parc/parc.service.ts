import { Injectable } from '@nestjs/common';
import { CreateParcDto } from './dto/create-parc.dto';
import { UpdateParcDto } from './dto/update-parc.dto';

@Injectable()
export class ParcService {
  create(createParcDto: CreateParcDto) {
    return 'This action adds a new parc';
  }

  findAll() {
    return `This action returns all parc`;
  }

  findOne(id: string) {
    return `This action returns a #${id} parc`;
  }

  update(id: string, updateParcDto: UpdateParcDto) {
    return `This action updates a #${id} parc`;
  }

  remove(id: string) {
    return `This action removes a #${id} parc`;
  }
}
