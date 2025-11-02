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

  findOne(id: number) {
    return `This action returns a #${id} panne`;
  }

  update(id: number, updatePanneDto: UpdatePanneDto) {
    return `This action updates a #${id} panne`;
  }

  remove(id: number) {
    return `This action removes a #${id} panne`;
  }
}
