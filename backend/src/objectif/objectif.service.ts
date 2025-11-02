import { Injectable } from '@nestjs/common';
import { CreateObjectifDto } from './dto/create-objectif.dto';
import { UpdateObjectifDto } from './dto/update-objectif.dto';

@Injectable()
export class ObjectifService {
  create(createObjectifDto: CreateObjectifDto) {
    return 'This action adds a new objectif';
  }

  findAll() {
    return `This action returns all objectif`;
  }

  findOne(id: string) {
    return `This action returns a #${id} objectif`;
  }

  update(id: string, updateObjectifDto: UpdateObjectifDto) {
    return `This action updates a #${id} objectif`;
  }

  remove(id: string) {
    return `This action removes a #${id} objectif`;
  }
}
