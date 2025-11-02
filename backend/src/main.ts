import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import cookieParser from 'cookie-parser';
import { JwtExpiredFilter } from './filters/jwt-expired.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); // ✅ indispensable pour lire les cookies

  // 🔥 Appliquer le filtre globalement
  app.useGlobalFilters(new JwtExpiredFilter());

  // Middleware global pour logger toutes les requêtes HTTP
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      // Colorer la méthode HTTP
      const method = chalk.cyan(req.method);

      // Colorer le path
      const path = chalk.blue(req.path);

      // Colorer le status selon le code
      let status: string;
      if (res.statusCode >= 500) status = chalk.red(res.statusCode.toString());
      else if (res.statusCode >= 400)
        status = chalk.yellow(res.statusCode.toString());
      else status = chalk.green(res.statusCode.toString());

      console.log(`✅ ${method} ${path} [${status}]`);
    });
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ✅ enlève les champs non déclarés dans le DTO
      forbidNonWhitelisted: true, // 🚫 rejette carrément la requête si des champs inconnus sont envoyés
      transform: true, // 🎯 transforme les payloads en instances de DTO

      // 👉 Personnalisation du format d’erreur
      exceptionFactory: (errors) => {
        const formattedErrors = {};

        errors.forEach((err) => {
          formattedErrors[err.property] = Object.values(err.constraints ?? {});
        });

        return new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: formattedErrors,
        });
      },
    }),
  );
  app.useGlobalFilters(new PrismaExceptionFilter()); // 👈 activation globale

  // ✅ Autoriser le CORS pour ton front-end
  app.enableCors({
    origin: ['http://localhost:5173'], // ton app React
    credentials: true, // si tu utilises les cookies ou des headers d'auth
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
