import { Module } from '@nestjs/common';
import { TypepanneService } from './typepanne.service';
import { TypepanneController } from './typepanne.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TypepanneController],
  providers: [TypepanneService, PrismaService],
})
export class TypepanneModule {}
