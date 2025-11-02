import { PartialType } from '@nestjs/mapped-types';
import { CreateTypelubrifiantDto } from './create-typelubrifiant.dto';

export class UpdateTypelubrifiantDto extends PartialType(CreateTypelubrifiantDto) {}
