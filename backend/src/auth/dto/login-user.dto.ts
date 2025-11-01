import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString({
    message: "L'email de l'utilisateur doit être une chaîne de caractères",
  })
  @IsEmail(
    {
      blacklisted_chars: '?!/$^#&%[]{}',
    },
    {
      message: "Un email de l'utilisateur est requis pour s'inscrire",
    },
  )
  @IsNotEmpty({
    message: "L'addresse Email n'est pas valide",
  })
  email: string;

  @IsString({
    message:
      "Le mot de passe de l'utilisateur doit être une chaîne de caractères",
  })
  @MinLength(8, {
    message:
      "Le mot de passe de l'utilisateur doit contenir au moins 8 caractères",
  })
  @IsNotEmpty({
    message: "Un mot de passe de l'utilisateur est requis pour s'inscrire",
  })
  password: string;
}
