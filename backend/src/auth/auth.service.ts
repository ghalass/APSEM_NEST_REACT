import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import type { UserPayload } from './jwt.strategy';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser)
      throw new NotFoundException("informations d'identification invalides!");

    const isPasswordValid = await this.isPasswordValid({
      password,
      hashedPassword: existingUser.password,
    });
    console.log(isPasswordValid);

    if (!isPasswordValid)
      throw new NotFoundException("informations d'identification invalides!");

    // Supprimer password avant de renvoyer
    const { password: _, ...userWithoutPassword } = existingUser;

    const access_token = this.authenticateUser({
      userId: existingUser.id,
    }).access_token;

    return { user: userWithoutPassword, access_token };
  }

  async register(registerBody: CreateUserDto) {
    const { email, password } = registerBody;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser)
      throw new ConflictException(
        'Un compte existe déjà à cette addresse email!',
      );
    const hashedPassword = await this.hashPassword({ password });
    const createdUser = await this.prisma.user.create({
      data: {
        ...registerBody,
        password: hashedPassword,
      },
    });
    return this.authenticateUser({ userId: createdUser.id });
  }

  private async hashPassword({ password }: { password: string }) {
    return await hash(password, 10);
  }

  private async isPasswordValid({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }) {
    return await compare(password, hashedPassword);
  }

  private authenticateUser({ userId }: UserPayload) {
    const payload: UserPayload = { userId };
    return { access_token: this.jwtService.sign(payload) };
  }
}
