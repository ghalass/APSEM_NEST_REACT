import { Injectable } from '@nestjs/common';
import { CreateLubrifiantParcDto } from './dto/create-lubrifiant-parc.dto';
import { UpdateLubrifiantParcDto } from './dto/update-lubrifiant-parc.dto';

@Injectable()
export class LubrifiantParcService {
  create(createLubrifiantParcDto: CreateLubrifiantParcDto) {
    return 'This action adds a new lubrifiantParc';
  }

  findAll() {
    return `This action returns all lubrifiantParc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lubrifiantParc`;
  }

  update(id: number, updateLubrifiantParcDto: UpdateLubrifiantParcDto) {
    return `This action updates a #${id} lubrifiantParc`;
  }

  remove(id: number) {
    return `This action removes a #${id} lubrifiantParc`;
  }
}
