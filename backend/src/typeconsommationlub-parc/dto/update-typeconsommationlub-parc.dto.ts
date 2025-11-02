import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeconsommationlubParcDto } from './create-typeconsommationlub-parc.dto';

export class UpdateTypeconsommationlubParcDto extends PartialType(CreateTypeconsommationlubParcDto) {}
