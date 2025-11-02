import { Module } from '@nestjs/common';
import { ParcService } from './parc.service';
import { ParcController } from './parc.controller';

@Module({
  controllers: [ParcController],
  providers: [ParcService],
})
export class ParcModule {}
