import { IsOptional, IsNumber, IsUUID, IsInt } from 'class-validator';

// ========================
// 🎯 Objectif
export class CreateObjectifDto {
  @IsInt()
  annee: number;

  @IsUUID()
  parcId: string;

  @IsUUID()
  siteId: string;

  @IsOptional()
  @IsNumber()
  dispo?: number;

  @IsOptional()
  @IsNumber()
  mtbf?: number;

  @IsOptional()
  @IsNumber()
  tdm?: number;

  @IsOptional()
  @IsNumber()
  spe_huile?: number;

  @IsOptional()
  @IsNumber()
  spe_go?: number;

  @IsOptional()
  @IsNumber()
  spe_graisse?: number;
}
