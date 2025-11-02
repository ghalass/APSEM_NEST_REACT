import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsUUID,
} from 'class-validator';
// ========================
// 🚜 Engin
// ========================
export class CreateEnginDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsUUID()
  parcId: string;

  @IsUUID()
  siteId: string;

  @IsOptional()
  @IsNumber()
  initialHeureChassis?: number;
}
