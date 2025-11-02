import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

// ========================
// 🧴 Saisielubrifiant
export class CreateSaisielubrifiantDto {
  @IsUUID()
  lubrifiantId: string;

  @IsNumber()
  qte: number;

  @IsOptional()
  @IsString()
  obs?: string;

  @IsUUID()
  saisiehimId: string;

  @IsOptional()
  @IsUUID()
  typeconsommationlubId?: string;
}
