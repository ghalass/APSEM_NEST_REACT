import { Injectable } from '@nestjs/common';
import { CreateLubrifiantDto } from './dto/create-lubrifiant.dto';
import { UpdateLubrifiantDto } from './dto/update-lubrifiant.dto';

@Injectable()
export class LubrifiantService {
  create(createLubrifiantDto: CreateLubrifiantDto) {
    return 'This action adds a new lubrifiant';
  }

  findAll() {
    return `This action returns all lubrifiant`;
  }

  findOne(id: string) {
    return `This action returns a #${id} lubrifiant`;
  }

  update(id: string, updateLubrifiantDto: UpdateLubrifiantDto) {
    return `This action updates a #${id} lubrifiant`;
  }

  remove(id: string) {
    return `This action removes a #${id} lubrifiant`;
  }
}
