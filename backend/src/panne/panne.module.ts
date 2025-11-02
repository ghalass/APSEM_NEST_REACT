import { Module } from '@nestjs/common';
import { PanneService } from './panne.service';
import { PanneController } from './panne.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PanneController],
  providers: [PanneService, PrismaService],
})
export class PanneModule {}
