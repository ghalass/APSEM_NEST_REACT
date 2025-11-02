import { PartialType } from '@nestjs/mapped-types';
import { CreateSaisiehimDto } from './create-saisiehim.dto';

export class UpdateSaisiehimDto extends PartialType(CreateSaisiehimDto) {}
