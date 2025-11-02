import { IsDateString, IsNumber, IsUUID, Max, Min } from 'class-validator';

// ========================
// 🕒 Saisiehrm
export class CreateSaisiehrmDto {
  @IsDateString(
    {},
    {
      message:
        'du doit être une date valide au format ISO (YYYY-MM-DD ou ISO8601)',
    },
  )
  du: string;

  @IsUUID('4', { message: 'enginId doit être un UUID valide' })
  enginId: string;

  @IsUUID('4', { message: 'siteId doit être un UUID valide' })
  siteId: string;

  @IsNumber({}, { message: 'hrm doit être un nombre' })
  @Min(0, { message: 'hrm ne peut pas être négatif' })
  @Max(24, { message: 'hrm ne doit pas dépasser 24 heures' })
  hrm: number;
}
