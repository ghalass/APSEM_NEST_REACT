import { PartialType } from '@nestjs/mapped-types';
import { CreateAnomalieDto } from './create-anomalie.dto';

export class UpdateAnomalieDto extends PartialType(CreateAnomalieDto) {}
