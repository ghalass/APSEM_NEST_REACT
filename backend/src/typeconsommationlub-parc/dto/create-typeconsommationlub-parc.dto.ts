import { IsUUID } from 'class-validator';

// ========================
// 🔗 TypeconsommationlubParc (N:N)
export class CreateTypeconsommationlubParcDto {
  @IsUUID()
  parcId: string;

  @IsUUID()
  typeconsommationlubId: string;
}
