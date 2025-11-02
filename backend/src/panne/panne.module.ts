import { Module } from '@nestjs/common';
import { PanneService } from './panne.service';
import { PanneController } from './panne.controller';

@Module({
  controllers: [PanneController],
  providers: [PanneService],
})
export class PanneModule {}
