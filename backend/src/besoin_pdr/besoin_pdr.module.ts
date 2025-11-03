import { Module } from '@nestjs/common';
import { BesoinPdrService } from './besoin_pdr.service';
import { BesoinPdrController } from './besoin_pdr.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BesoinPdrController],
  providers: [BesoinPdrService, PrismaService, BesoinPdrService],
})
export class BesoinPdrModule {}
