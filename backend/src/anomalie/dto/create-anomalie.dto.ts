import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Source, Urgence } from '@prisma/client';

export class CreateAnomalieDto {
  @IsUUID()
  @IsNotEmpty()
  site_id: string;

  @IsDateString()
  @IsNotEmpty()
  date_anomalie: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  typepanne_id: string;

  @IsEnum(Source)
  @IsNotEmpty()
  source: Source;

  @IsEnum(Urgence)
  @IsNotEmpty()
  urgence: Urgence;

  @IsString()
  @IsOptional()
  equipe_execution?: string;

  @IsString()
  @IsOptional()
  obs?: string;
}
