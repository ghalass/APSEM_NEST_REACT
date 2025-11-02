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

  findOne(id: number) {
    return `This action returns a #${id} objectif`;
  }

  update(id: number, updateObjectifDto: UpdateObjectifDto) {
    return `This action updates a #${id} objectif`;
  }

  remove(id: number) {
    return `This action removes a #${id} objectif`;
  }
}
