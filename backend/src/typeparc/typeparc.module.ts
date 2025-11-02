import { Module } from '@nestjs/common';
import { TypeparcService } from './typeparc.service';
import { TypeparcController } from './typeparc.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TypeparcController],
  providers: [TypeparcService, PrismaService],
})
export class TypeparcModule {}
