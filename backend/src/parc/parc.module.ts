import { Module } from '@nestjs/common';
import { ParcService } from './parc.service';
import { ParcController } from './parc.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ParcController],
  providers: [ParcService, PrismaService],
})
export class ParcModule {}
