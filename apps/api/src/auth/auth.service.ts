import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma.service';
import { LoginDto, RegisterDto } from './dto';
const publicUser = { id: true, name: true, email: true } as const;
function slugify(value: string) { return value.trim().toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'tenant'; }
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}
  private token(id: string) { return this.jwt.sign({ sub: id }); }
  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    try {
      const result = await this.prisma.$transaction(async tx => {
        const user = await tx.user.create({ data: { name: dto.name.trim(), email, passwordHash: await argon2.hash(dto.password) } });
        const base = slugify(dto.companyName); let slug = base;
        for (let n = 2; n < 100; n++) { try { const tenant = await tx.tenant.create({ data: { name: dto.companyName.trim(), slug } }); const membership = await tx.membership.create({ data: { userId: user.id, tenantId: tenant.id, role: 'OWNER' } }); return { user, tenant, membership }; } catch (e) { if (!(e instanceof Prisma.PrismaClientKnownRequestError) || e.code !== 'P2002') throw e; slug = `${base}-${n}`; } }
        throw new ConflictException('Unable to allocate tenant slug');
      });
      return { user: { id: result.user.id, name: result.user.name, email: result.user.email }, token: this.token(result.user.id) };
    } catch (e) { if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') throw new ConflictException('Email is already registered'); throw e; }
  }
  async login(dto: LoginDto) { const user = await this.prisma.user.findUnique({ where: { email: dto.email.trim().toLowerCase() } }); if (!user || !(await argon2.verify(user.passwordHash, dto.password))) throw new UnauthorizedException('Invalid email or password'); return { user: { id: user.id, name: user.name, email: user.email }, token: this.token(user.id) }; }
  async me(id: string) { return this.prisma.user.findUniqueOrThrow({ where: { id }, select: publicUser }); }
}
