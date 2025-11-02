import { Module } from '@nestjs/common';
import { LubrifiantParcService } from './lubrifiant-parc.service';
import { LubrifiantParcController } from './lubrifiant-parc.controller';

@Module({
  controllers: [LubrifiantParcController],
  providers: [LubrifiantParcService],
})
export class LubrifiantParcModule {}
