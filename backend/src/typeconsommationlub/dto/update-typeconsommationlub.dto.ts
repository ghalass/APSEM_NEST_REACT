import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeconsommationlubDto } from './create-typeconsommationlub.dto';

export class UpdateTypeconsommationlubDto extends PartialType(CreateTypeconsommationlubDto) {}
