import { Module } from '@nestjs/common';
import { EnginService } from './engin.service';
import { EnginController } from './engin.controller';

@Module({
  controllers: [EnginController],
  providers: [EnginService],
})
export class EnginModule {}
