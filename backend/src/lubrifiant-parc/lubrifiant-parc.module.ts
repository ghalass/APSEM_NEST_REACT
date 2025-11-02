import { Module } from '@nestjs/common';
import { LubrifiantParcService } from './lubrifiant-parc.service';
import { LubrifiantParcController } from './lubrifiant-parc.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LubrifiantParcController],
  providers: [LubrifiantParcService, PrismaService],
})
export class LubrifiantParcModule {}
