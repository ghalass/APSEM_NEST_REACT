import { Module } from '@nestjs/common';
import { AnomalieService } from './anomalie.service';
import { AnomalieController } from './anomalie.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AnomalieController],
  providers: [AnomalieService, PrismaService],
})
export class AnomalieModule {}
