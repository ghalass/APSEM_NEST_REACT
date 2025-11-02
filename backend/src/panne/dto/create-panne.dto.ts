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
// ⚠️ Panne
export class CreatePanneDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  typepanneId: string;
}
