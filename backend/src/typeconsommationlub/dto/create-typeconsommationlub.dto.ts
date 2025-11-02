import { IsString, IsNotEmpty } from 'class-validator';

// ========================
// 🛢️ Typeconsommationlub
// ========================
export class CreateTypeconsommationlubDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
