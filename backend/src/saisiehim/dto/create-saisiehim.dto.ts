import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsUUID,
  IsInt,
} from 'class-validator';

// ========================
// 🧰 Saisiehim
export class CreateSaisiehimDto {
  @IsUUID()
  panneId: string;

  @IsNumber()
  him: number;

  @IsInt()
  ni: number;

  @IsUUID()
  saisiehrmId: string;

  @IsOptional()
  @IsString()
  obs?: string;

  @IsOptional()
  @IsUUID()
  enginId?: string;
}
