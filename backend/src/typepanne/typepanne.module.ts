import { Module } from '@nestjs/common';
import { TypepanneService } from './typepanne.service';
import { TypepanneController } from './typepanne.controller';

@Module({
  controllers: [TypepanneController],
  providers: [TypepanneService],
})
export class TypepanneModule {}
