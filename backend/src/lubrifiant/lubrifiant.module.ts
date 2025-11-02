import { Module } from '@nestjs/common';
import { LubrifiantService } from './lubrifiant.service';
import { LubrifiantController } from './lubrifiant.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LubrifiantController],
  providers: [LubrifiantService, PrismaService],
})
export class LubrifiantModule {}
