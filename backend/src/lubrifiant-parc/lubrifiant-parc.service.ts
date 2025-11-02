import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLubrifiantParcDto } from './dto/create-lubrifiant-parc.dto';
import { UpdateLubrifiantParcDto } from './dto/update-lubrifiant-parc.dto';

@Injectable()
export class LubrifiantParcService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(parcId: string, lubrifiantId: string) {
    const record = await this.prisma.lubrifiantParc.findUnique({
      where: { parcId_lubrifiantId: { parcId, lubrifiantId } },
    });
    if (!record) throw new NotFoundException('LubrifiantParc not found');
    return record;
  }

  async update(
    parcId: string,
    lubrifiantId: string,
    dto: UpdateLubrifiantParcDto,
  ) {
    return this.prisma.lubrifiantParc.update({
      where: { parcId_lubrifiantId: { parcId, lubrifiantId } },
      data: dto,
    });
  }

  async remove(parcId: string, lubrifiantId: string) {
    return this.prisma.lubrifiantParc.delete({
      where: { parcId_lubrifiantId: { parcId, lubrifiantId } },
    });
  }
}
