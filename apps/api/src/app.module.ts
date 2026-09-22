import { Controller, Get, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt'; import { AuthController } from './auth/auth.controller'; import { AuthService } from './auth/auth.service'; import { AuthGuard } from './auth/auth.guard'; import { PrismaService } from './prisma.service'; import { TenantsController } from './tenants/tenants.controller'; import { TenantContextGuard } from './tenants/tenant-context.guard';

@Controller('health')
class HealthController {
  @Get()
  health() { return { status: 'ok' as const }; }
}

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validationSchema: Joi.object({ PORT: Joi.number().default(3000), CORS_ORIGIN: Joi.string().required(), DATABASE_URL: Joi.string().required(), JWT_SECRET: Joi.string().min(32).required(), JWT_EXPIRES_IN: Joi.string().default('1h') }) }), JwtModule.registerAsync({ global: true, inject: [], useFactory: () => ({ secret: process.env.JWT_SECRET!, signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as any } }) })],
  controllers: [HealthController, AuthController, TenantsController], providers: [PrismaService, AuthService, AuthGuard, TenantContextGuard],
})
export class AppModule {}
