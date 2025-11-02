import { Module } from '@nestjs/common';
import { LubrifiantService } from './lubrifiant.service';
import { LubrifiantController } from './lubrifiant.controller';

@Module({
  controllers: [LubrifiantController],
  providers: [LubrifiantService],
})
export class LubrifiantModule {}
