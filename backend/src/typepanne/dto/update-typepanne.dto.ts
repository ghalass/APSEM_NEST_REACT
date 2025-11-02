import { PartialType } from '@nestjs/mapped-types';
import { CreateTypepanneDto } from './create-typepanne.dto';

export class UpdateTypepanneDto extends PartialType(CreateTypepanneDto) {}
