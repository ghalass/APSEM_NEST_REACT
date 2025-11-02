import { Module } from '@nestjs/common';
import { TypeconsommationlubService } from './typeconsommationlub.service';
import { TypeconsommationlubController } from './typeconsommationlub.controller';

@Module({
  controllers: [TypeconsommationlubController],
  providers: [TypeconsommationlubService],
})
export class TypeconsommationlubModule {}
