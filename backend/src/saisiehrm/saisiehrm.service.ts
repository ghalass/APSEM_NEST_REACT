import { Injectable } from '@nestjs/common';
import { CreateSaisiehrmDto } from './dto/create-saisiehrm.dto';
import { UpdateSaisiehrmDto } from './dto/update-saisiehrm.dto';

@Injectable()
export class SaisiehrmService {
  create(createSaisiehrmDto: CreateSaisiehrmDto) {
    return 'This action adds a new saisiehrm';
  }

  findAll() {
    return `This action returns all saisiehrm`;
  }

  findOne(id: string) {
    return `This action returns a #${id} saisiehrm`;
  }

  update(id: string, updateSaisiehrmDto: UpdateSaisiehrmDto) {
    return `This action updates a #${id} saisiehrm`;
  }

  remove(id: string) {
    return `This action removes a #${id} saisiehrm`;
  }
}
