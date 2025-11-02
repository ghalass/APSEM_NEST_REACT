import { PartialType } from '@nestjs/mapped-types';
import { CreateSaisiehrmDto } from './create-saisiehrm.dto';

export class UpdateSaisiehrmDto extends PartialType(CreateSaisiehrmDto) {}
