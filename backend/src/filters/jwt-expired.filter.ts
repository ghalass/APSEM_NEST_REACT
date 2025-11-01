import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Catch(UnauthorizedException)
export class JwtExpiredFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // Supprimer le cookie
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    // Déterminer le message
    let message = 'Authentification requise. Veuillez vous reconnecter.';

    if ((exception as any).cause instanceof TokenExpiredError) {
      message = 'Votre session a expiré. Veuillez vous reconnecter.';
    } else if ((exception as any).cause instanceof JsonWebTokenError) {
      message = 'Token invalide. Veuillez vous reconnecter.';
    }

    res.status(401).json({
      statusCode: 401,
      message,
    });
  }
}

// // src/common/filters/jwt-expired.filter.ts
// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Response } from 'express';

// @Catch(UnauthorizedException)
// export class JwtExpiredFilter implements ExceptionFilter {
//   catch(exception: UnauthorizedException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const res = ctx.getResponse<Response>();

//     // ⚠️ Même si le message ne contient pas "jwt expired",
//     // on supprime le cookie dès qu'on reçoit une erreur 401
//     res.clearCookie('access_token', {
//       httpOnly: true,
//       sameSite: 'strict',
//       secure: process.env.NODE_ENV === 'production',
//       path: '/',
//     });

//     res.status(401).json({
//       statusCode: 401,
//       message: 'Votre session a expiré. Veuillez vous reconnecter.',
//     });
//   }
// }
