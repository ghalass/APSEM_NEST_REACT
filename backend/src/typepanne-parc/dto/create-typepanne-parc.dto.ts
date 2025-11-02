import { IsUUID } from 'class-validator';

// ========================
// TypepanneParc (N:N)
export class CreateTypepanneParcDto {
  @IsUUID()
  parcId: string;

  @IsUUID()
  typepanneId: string;
}
