export type UserPayload = { userId: string };
export type RequestWithUser = { user: UserPayload };

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// }
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.access_token, // ✅ depuis le cookie
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: { userId: string }) {
    return { userId: payload.userId };
  }
}
