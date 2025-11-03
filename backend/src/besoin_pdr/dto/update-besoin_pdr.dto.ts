import { PartialType } from '@nestjs/mapped-types';
import { CreateBesoinPdrDto } from './create-besoin_pdr.dto';

export class UpdateBesoinPdrDto extends PartialType(CreateBesoinPdrDto) {}
