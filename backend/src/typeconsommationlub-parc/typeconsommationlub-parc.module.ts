import { Module } from '@nestjs/common';
import { TypeconsommationlubParcService } from './typeconsommationlub-parc.service';
import { TypeconsommationlubParcController } from './typeconsommationlub-parc.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TypeconsommationlubParcController],
  providers: [TypeconsommationlubParcService, PrismaService],
})
export class TypeconsommationlubParcModule {}
