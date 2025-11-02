import { IsString, IsNotEmpty } from 'class-validator';

// ========================
// 🛢️ Typelubrifiant
export class CreateTypelubrifiantDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
