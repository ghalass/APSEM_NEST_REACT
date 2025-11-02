import { IsString, IsNotEmpty } from 'class-validator';

// ========================
// 🅿️ Typeparc
// ========================
export class CreateTypeparcDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
