import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { BesoinStatus } from '@prisma/client';

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

  @IsEnum(BesoinStatus)
  @IsNotEmpty()
  besoin_status: BesoinStatus;

  @IsString()
  @IsOptional()
  obs?: string;

  @IsUUID()
  @IsNotEmpty()
  anomalie_id: string;
}
