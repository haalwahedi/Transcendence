import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { DataSource } from 'typeorm';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  app.use(cookieParser());
  app.setGlobalPrefix("api")
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials (cookies)
  });
  await app.listen(3001);
}
bootstrap();
