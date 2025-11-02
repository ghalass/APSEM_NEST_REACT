import { Module } from '@nestjs/common';
import { SaisiehimService } from './saisiehim.service';
import { SaisiehimController } from './saisiehim.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SaisiehimController],
  providers: [SaisiehimService, PrismaService],
})
export class SaisiehimModule {}
