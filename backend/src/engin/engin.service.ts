import { Injectable } from '@nestjs/common';
import { CreateEnginDto } from './dto/create-engin.dto';
import { UpdateEnginDto } from './dto/update-engin.dto';

@Injectable()
export class EnginService {
  create(createEnginDto: CreateEnginDto) {
    return 'This action adds a new engin';
  }

  findAll() {
    return `This action returns all engin`;
  }

  findOne(id: string) {
    return `This action returns a #${id} engin`;
  }

  update(id: string, updateEnginDto: UpdateEnginDto) {
    return `This action updates a #${id} engin`;
  }

  remove(id: string) {
    return `This action removes a #${id} engin`;
  }
}
