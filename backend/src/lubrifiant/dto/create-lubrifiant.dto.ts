import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
// ========================
// 🛢️ Lubrifiant
export class CreateLubrifiantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  typelubrifiantId: string;
}
