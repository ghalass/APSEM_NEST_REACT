import { Injectable } from '@nestjs/common';
import { CreateTypelubrifiantDto } from './dto/create-typelubrifiant.dto';
import { UpdateTypelubrifiantDto } from './dto/update-typelubrifiant.dto';

@Injectable()
export class TypelubrifiantService {
  create(createTypelubrifiantDto: CreateTypelubrifiantDto) {
    return 'This action adds a new typelubrifiant';
  }

  findAll() {
    return `This action returns all typelubrifiant`;
  }

  findOne(id: string) {
    return `This action returns a #${id} typelubrifiant`;
  }

  update(id: string, updateTypelubrifiantDto: UpdateTypelubrifiantDto) {
    return `This action updates a #${id} typelubrifiant`;
  }

  remove(id: string) {
    return `This action removes a #${id} typelubrifiant`;
  }
}
