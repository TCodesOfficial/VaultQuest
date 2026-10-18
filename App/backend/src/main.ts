import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { toNodeHandler } from 'better-auth/node';
import { AppModule } from './app.module';
import { auth } from './auth/auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  const port = Number(process.env.PORT ?? 3001);
  const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: corsOrigin, credentials: true });

  const server = app.getHttpAdapter().getInstance();
  server.all('/api/auth/*', toNodeHandler(auth));
  server.use(express.json());

  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}/api/v1`);
}
bootstrap();
