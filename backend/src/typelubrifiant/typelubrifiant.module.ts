import { Module } from '@nestjs/common';
import { TypelubrifiantService } from './typelubrifiant.service';
import { TypelubrifiantController } from './typelubrifiant.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TypelubrifiantController],
  providers: [TypelubrifiantService, PrismaService],
})
export class TypelubrifiantModule {}
