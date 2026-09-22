import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'; import { Response } from 'express'; import { AuthService } from './auth.service'; import { AuthGuard } from './auth.guard'; import { LoginDto, RegisterDto } from './dto';
@Controller('auth') export class AuthController { constructor(private readonly auth: AuthService) {} private set(res: Response, token: string) { res.cookie('access_token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }); }
 @Post('register') async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) { const out = await this.auth.register(dto); this.set(res, out.token); return { user: out.user }; }
 @Post('login') async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) { const out = await this.auth.login(dto); this.set(res, out.token); return { user: out.user }; }
 @UseGuards(AuthGuard) @Get('me') me(@Req() req: any) { return this.auth.me(req.user.sub); }
 @Post('logout') logout(@Res({ passthrough: true }) res: Response) { res.clearCookie('access_token'); return { ok: true }; }
}
