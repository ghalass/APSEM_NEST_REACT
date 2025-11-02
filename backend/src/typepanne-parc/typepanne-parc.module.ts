import { Module } from '@nestjs/common';
import { TypepanneParcService } from './typepanne-parc.service';
import { TypepanneParcController } from './typepanne-parc.controller';

@Module({
  controllers: [TypepanneParcController],
  providers: [TypepanneParcService],
})
export class TypepanneParcModule {}
