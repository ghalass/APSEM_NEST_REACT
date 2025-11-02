import { Injectable } from '@nestjs/common';
import { CreateSaisielubrifiantDto } from './dto/create-saisielubrifiant.dto';
import { UpdateSaisielubrifiantDto } from './dto/update-saisielubrifiant.dto';

@Injectable()
export class SaisielubrifiantService {
  create(createSaisielubrifiantDto: CreateSaisielubrifiantDto) {
    return 'This action adds a new saisielubrifiant';
  }

  findAll() {
    return `This action returns all saisielubrifiant`;
  }

  findOne(id: string) {
    return `This action returns a #${id} saisielubrifiant`;
  }

  update(id: string, updateSaisielubrifiantDto: UpdateSaisielubrifiantDto) {
    return `This action updates a #${id} saisielubrifiant`;
  }

  remove(id: string) {
    return `This action removes a #${id} saisielubrifiant`;
  }
}
