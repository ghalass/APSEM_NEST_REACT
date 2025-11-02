import { PartialType } from '@nestjs/mapped-types';
import { CreateEnginDto } from './create-engin.dto';

export class UpdateEnginDto extends PartialType(CreateEnginDto) {}
