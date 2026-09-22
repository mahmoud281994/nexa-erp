import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  canActivate(context: ExecutionContext) { const req = context.switchToHttp().getRequest(); const token = req.cookies?.access_token || req.headers.authorization?.replace(/^Bearer /, ''); if (!token) throw new UnauthorizedException(); try { req.user = this.jwt.verify<{ sub: string }>(token); return true; } catch { throw new UnauthorizedException(); } }
}
