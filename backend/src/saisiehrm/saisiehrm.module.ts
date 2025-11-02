import { Module } from '@nestjs/common';
import { SaisiehrmService } from './saisiehrm.service';
import { SaisiehrmController } from './saisiehrm.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SaisiehrmController],
  providers: [SaisiehrmService, PrismaService],
})
export class SaisiehrmModule {}
