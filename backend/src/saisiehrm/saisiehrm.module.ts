import { Module } from '@nestjs/common';
import { SaisiehrmService } from './saisiehrm.service';
import { SaisiehrmController } from './saisiehrm.controller';

@Module({
  controllers: [SaisiehrmController],
  providers: [SaisiehrmService],
})
export class SaisiehrmModule {}
