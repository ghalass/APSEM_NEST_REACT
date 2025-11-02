import { Module } from '@nestjs/common';
import { TypeconsommationlubParcService } from './typeconsommationlub-parc.service';
import { TypeconsommationlubParcController } from './typeconsommationlub-parc.controller';

@Module({
  controllers: [TypeconsommationlubParcController],
  providers: [TypeconsommationlubParcService],
})
export class TypeconsommationlubParcModule {}
