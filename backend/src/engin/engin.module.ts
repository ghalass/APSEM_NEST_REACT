import { Module } from '@nestjs/common';
import { EnginService } from './engin.service';
import { EnginController } from './engin.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EnginController],
  providers: [EnginService, PrismaService],
})
export class EnginModule {}
