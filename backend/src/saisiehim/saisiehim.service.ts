import { Injectable } from '@nestjs/common';
import { CreateSaisiehimDto } from './dto/create-saisiehim.dto';
import { UpdateSaisiehimDto } from './dto/update-saisiehim.dto';

@Injectable()
export class SaisiehimService {
  create(createSaisiehimDto: CreateSaisiehimDto) {
    return 'This action adds a new saisiehim';
  }

  findAll() {
    return `This action returns all saisiehim`;
  }

  findOne(id: string) {
    return `This action returns a #${id} saisiehim`;
  }

  update(id: string, updateSaisiehimDto: UpdateSaisiehimDto) {
    return `This action updates a #${id} saisiehim`;
  }

  remove(id: string) {
    return `This action removes a #${id} saisiehim`;
  }
}
