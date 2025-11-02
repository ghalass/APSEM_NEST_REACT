import { PartialType } from '@nestjs/mapped-types';
import { CreateParcDto } from './create-parc.dto';

export class UpdateParcDto extends PartialType(CreateParcDto) {}
