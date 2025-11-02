import { PartialType } from '@nestjs/mapped-types';
import { CreateTypepanneParcDto } from './create-typepanne-parc.dto';

export class UpdateTypepanneParcDto extends PartialType(CreateTypepanneParcDto) {}
