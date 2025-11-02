import { Injectable } from '@nestjs/common';
import { CreatePanneDto } from './dto/create-panne.dto';
import { UpdatePanneDto } from './dto/update-panne.dto';

@Injectable()
export class PanneService {
  create(createPanneDto: CreatePanneDto) {
    return 'This action adds a new panne';
  }

  findAll() {
    return `This action returns all panne`;
  }

  findOne(id: string) {
    return `This action returns a #${id} panne`;
  }

  update(id: string, updatePanneDto: UpdatePanneDto) {
    return `This action updates a #${id} panne`;
  }

  remove(id: string) {
    return `This action removes a #${id} panne`;
  }
}
