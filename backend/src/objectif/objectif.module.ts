import { Module } from '@nestjs/common';
import { ObjectifService } from './objectif.service';
import { ObjectifController } from './objectif.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ObjectifController],
  providers: [ObjectifService, PrismaService],
})
export class ObjectifModule {}
