import { Module } from '@nestjs/common';
import { TypeparcService } from './typeparc.service';
import { TypeparcController } from './typeparc.controller';

@Module({
  controllers: [TypeparcController],
  providers: [TypeparcService],
})
export class TypeparcModule {}
