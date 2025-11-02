import { PartialType } from '@nestjs/mapped-types';
import { CreateSaisielubrifiantDto } from './create-saisielubrifiant.dto';

export class UpdateSaisielubrifiantDto extends PartialType(CreateSaisielubrifiantDto) {}
