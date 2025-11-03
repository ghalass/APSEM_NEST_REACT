import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Source, Status, Urgence } from '@prisma/client';

export class CreateAnomalieDto {
  @IsUUID()
  @IsNotEmpty()
  siteId: string; // correspond à siteId dans le modèle

  @IsUUID()
  @IsNotEmpty()
  enginId: string; // correspond à enginId dans le modèle

  @IsUUID()
  @IsNotEmpty()
  typepanneId: string; // correspond à typepanneId dans le modèle

  @IsDateString()
  @IsNotEmpty()
  date_anomalie: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Source)
  @IsNotEmpty()
  source: Source;

  @IsEnum(Urgence)
  @IsNotEmpty()
  urgence: Urgence;

  @IsString()
  @IsOptional()
  equipe_execution?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsDateString()
  @IsOptional() // peut être null dans la base si pas encore exécutée
  date_execution?: Date;

  @IsString()
  @IsOptional()
  obs?: string;
}
