import { Module } from '@nestjs/common';
import { TypepanneParcService } from './typepanne-parc.service';
import { TypepanneParcController } from './typepanne-parc.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TypepanneParcController],
  providers: [TypepanneParcService, PrismaService],
})
export class TypepanneParcModule {}
