import { IsString, IsNotEmpty } from 'class-validator';

// ========================
// ⚙️ Typepanne
// ========================
export class CreateTypepanneDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
