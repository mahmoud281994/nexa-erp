import { ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

export async function createApp() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.use(cookieParser()); app.enableCors({ origin: config.get<string>('CORS_ORIGIN'), credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.enableShutdownHooks();
  return app;
}
async function bootstrap() { const app = await createApp(); await app.listen(app.get(ConfigService).get<number>('PORT', 3000)); }
if (require.main === module) bootstrap();
