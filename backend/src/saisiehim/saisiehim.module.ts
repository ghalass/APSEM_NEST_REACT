import { Module } from '@nestjs/common';
import { SaisiehimService } from './saisiehim.service';
import { SaisiehimController } from './saisiehim.controller';

@Module({
  controllers: [SaisiehimController],
  providers: [SaisiehimService],
})
export class SaisiehimModule {}
