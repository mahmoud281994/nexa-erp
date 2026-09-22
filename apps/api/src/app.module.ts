import { Controller, Get, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Controller('health')
class HealthController {
  @Get()
  health() { return { status: 'ok' as const }; }
}

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validationSchema: Joi.object({ PORT: Joi.number().default(3000), CORS_ORIGIN: Joi.string().required(), DATABASE_URL: Joi.string().required() }) })],
  controllers: [HealthController],
})
export class AppModule {}
