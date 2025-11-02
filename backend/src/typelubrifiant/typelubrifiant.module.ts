import { Module } from '@nestjs/common';
import { TypelubrifiantService } from './typelubrifiant.service';
import { TypelubrifiantController } from './typelubrifiant.controller';

@Module({
  controllers: [TypelubrifiantController],
  providers: [TypelubrifiantService],
})
export class TypelubrifiantModule {}
