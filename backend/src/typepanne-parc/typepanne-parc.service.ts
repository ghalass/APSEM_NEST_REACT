import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTypepanneParcDto } from './dto/create-typepanne-parc.dto';
import { UpdateTypepanneParcDto } from './dto/update-typepanne-parc.dto';

@Injectable()
export class TypepanneParcService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTypepanneParcDto) {
    return this.prisma.typepanneParc.create({ data: dto });
  }

  async findAll() {
    return this.prisma.typepanneParc.findMany();
  }

  async findOne(parcId: string, typepanneId: string) {
    const record = await this.prisma.typepanneParc.findUnique({
      where: { parcId_typepanneId: { parcId, typepanneId } },
    });
    if (!record) throw new NotFoundException('TypepanneParc not found');
    return record;
  }

  async update(
    parcId: string,
    typepanneId: string,
    dto: UpdateTypepanneParcDto,
  ) {
    return this.prisma.typepanneParc.update({
      where: { parcId_typepanneId: { parcId, typepanneId } },
      data: dto,
    });
  }

  async remove(parcId: string, typepanneId: string) {
    return this.prisma.typepanneParc.delete({
      where: { parcId_typepanneId: { parcId, typepanneId } },
    });
  }
}
