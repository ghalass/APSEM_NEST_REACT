import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import type { RequestWithUser } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import type { Response } from 'express';
import { COOKIE_MAX_AGE } from 'src/utils/constants';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authServive: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authServive.login(loginUserDto);

    // Stocker le token dans un cookie HTTP-only
    res.cookie('access_token', access_token, {
      // httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: 'strict',
      // maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // dev
      sameSite: 'lax', // dev
      path: '/',
      maxAge: COOKIE_MAX_AGE,
    });

    // Renvoyer seulement user "safe" sans circular refs
    return { user };
  }

  @Post('register')
  async register(@Body() registerBody: CreateUserDto) {
    return await this.authServive.register(registerBody);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticateUser(@Request() request: RequestWithUser) {
    return await this.userService.getUserById(request.user.userId);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Déconnexion réussie' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: RequestWithUser) {
    return this.userService.getUserById(req.user.userId);
  }
}
