import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

// ========================
// 🕒 Saisiehrm
export class CreateSaisiehrmDto {
  @IsNotEmpty()
  du: Date;

  @IsUUID()
  enginId: string;

  @IsUUID()
  siteId: string;

  @IsNumber()
  hrm: number;
}
