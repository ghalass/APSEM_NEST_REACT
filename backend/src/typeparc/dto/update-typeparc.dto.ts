import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeparcDto } from './create-typeparc.dto';

export class UpdateTypeparcDto extends PartialType(CreateTypeparcDto) {}
