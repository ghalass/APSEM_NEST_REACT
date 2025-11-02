import { Module } from '@nestjs/common';
import { TypeconsommationlubService } from './typeconsommationlub.service';
import { TypeconsommationlubController } from './typeconsommationlub.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TypeconsommationlubController],
  providers: [TypeconsommationlubService, PrismaService],
})
export class TypeconsommationlubModule {}
