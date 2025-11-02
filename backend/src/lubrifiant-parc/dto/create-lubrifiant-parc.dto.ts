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
// 🛢️ LubrifiantParc (N:N)
export class CreateLubrifiantParcDto {
  @IsUUID()
  parcId: string;

  @IsUUID()
  lubrifiantId: string;
}
