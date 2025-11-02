import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeconsommationlubParcDto } from './dto/create-typeconsommationlub-parc.dto';
import { UpdateTypeconsommationlubParcDto } from './dto/update-typeconsommationlub-parc.dto';

@Injectable()
export class TypeconsommationlubParcService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(parcId: string, typeconsommationlubId: string) {
    const record = await this.prisma.typeconsommationlubParc.findUnique({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
    });
    if (!record)
      throw new NotFoundException('TypeconsommationlubParc not found');
    return record;
  }

  async update(
    parcId: string,
    typeconsommationlubId: string,
    dto: UpdateTypeconsommationlubParcDto,
  ) {
    return this.prisma.typeconsommationlubParc.update({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
      data: dto,
    });
  }

  async remove(parcId: string, typeconsommationlubId: string) {
    return this.prisma.typeconsommationlubParc.delete({
      where: {
        parcId_typeconsommationlubId: { parcId, typeconsommationlubId },
      },
    });
  }
}
