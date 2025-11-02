import { Module } from '@nestjs/common';
import { SaisielubrifiantService } from './saisielubrifiant.service';
import { SaisielubrifiantController } from './saisielubrifiant.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SaisielubrifiantController],
  providers: [SaisielubrifiantService, PrismaService],
})
export class SaisielubrifiantModule {}
