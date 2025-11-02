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
// 🚜 Parc
// ========================
export class CreateParcDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  typeparcId: string;
}
