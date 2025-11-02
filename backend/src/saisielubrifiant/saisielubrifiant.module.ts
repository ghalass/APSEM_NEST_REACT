import { Module } from '@nestjs/common';
import { SaisielubrifiantService } from './saisielubrifiant.service';
import { SaisielubrifiantController } from './saisielubrifiant.controller';

@Module({
  controllers: [SaisielubrifiantController],
  providers: [SaisielubrifiantService],
})
export class SaisielubrifiantModule {}
