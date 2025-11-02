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
// 🏗️ Site
// ========================
export class CreateSiteDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
