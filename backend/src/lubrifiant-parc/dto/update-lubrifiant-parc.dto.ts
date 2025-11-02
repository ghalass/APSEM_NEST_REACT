import { PartialType } from '@nestjs/mapped-types';
import { CreateLubrifiantParcDto } from './create-lubrifiant-parc.dto';

export class UpdateLubrifiantParcDto extends PartialType(CreateLubrifiantParcDto) {}
