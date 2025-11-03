import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Status } from '@prisma/client';

export class CreateBesoinPdrDto {
  @IsString()
  @IsNotEmpty()
  ref: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  no_bs?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsDateString()
  @IsNotEmpty()
  date_execution: Date;

  @IsString()
  @IsOptional()
  obs?: string;

  @IsUUID()
  @IsNotEmpty()
  anomalie_id: string;
}
