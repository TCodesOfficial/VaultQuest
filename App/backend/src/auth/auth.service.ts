import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { randomBytes, randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

const SESSION_TTL_MS = 2 * 60 * 60 * 1000;

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
}

interface MemoryUser extends PublicUser {
  createdAt: Date;
}

interface MemorySession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly memoryUsers = new Map<string, MemoryUser>();
  private readonly memorySessions = new Map<string, MemorySession>();
  private degraded = false;

  constructor(private readonly prisma: PrismaService) {}

  async login(email: string) {
    const normalized = email.trim().toLowerCase();

    let user: PublicUser | null = null;
    if (this.useDatabase()) {
      try {
        user = await this.prisma.user.upsert({
          where: { email: normalized },
          update: {},
          create: { email: normalized, name: normalized.split('@')[0] },
        });
      } catch {
        this.markDegraded();
      }
    }
    if (!user) {
      user = this.memoryLogin(normalized);
    }

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

    let storedInDatabase = false;
    if (this.useDatabase()) {
      try {
        await this.prisma.session.create({
          data: { userId: user.id, token, expiresAt },
        });
        storedInDatabase = true;
      } catch {
        this.markDegraded();
      }
    }
    if (!storedInDatabase) {
      this.memorySessions.set(token, {
        id: randomUUID(),
        userId: user.id,
        token,
        expiresAt,
      });
    }

    return { token, expiresAt: expiresAt.toISOString(), user: publicUser(user) };
  }

  async getSession(token: string | undefined) {
    if (!token) {
      throw new UnauthorizedException('No session token provided');
    }

    let user: PublicUser | null = null;
    let expiresAt: Date | null = null;

    if (this.useDatabase()) {
      try {
        const session = await this.prisma.session.findUnique({
          where: { token },
          include: { user: true },
        });
        if (session) {
          expiresAt = session.expiresAt;
          user = publicUser(session.user);
        }
      } catch {
        this.markDegraded();
      }
    }

    if (!user) {
      const session = this.memorySessions.get(token);
      if (session) {
        expiresAt = session.expiresAt;
        user = this.memoryUsers.get(session.userId) ?? null;
      }
    }

    if (!user || !expiresAt) {
      throw new UnauthorizedException('Invalid session token');
    }
    if (expiresAt.getTime() < Date.now()) {
      this.memorySessions.delete(token);
      if (this.useDatabase()) {
        await this.prisma.session
          .deleteMany({ where: { token, expiresAt: { lt: new Date() } } })
          .catch(() => undefined);
      }
      throw new UnauthorizedException('Session expired');
    }

    return { user, expiresAt: expiresAt.toISOString() };
  }

  async logout(token: string | undefined) {
    if (token) {
      this.memorySessions.delete(token);
      if (this.useDatabase()) {
        await this.prisma.session.deleteMany({ where: { token } }).catch(() => undefined);
      }
    }
    return { ok: true };
  }

  private useDatabase(): boolean {
    return this.prisma.isReady && !this.degraded;
  }

  private markDegraded() {
    if (!this.degraded) {
      this.degraded = true;
      this.logger.warn(
        'Database call failed mid-session — auth switching to in-memory fallback (spec > Important Failure Modes).',
      );
    }
  }

  private memoryLogin(email: string): MemoryUser {
    let user = this.memoryUsers.get(email);
    if (!user) {
      user = {
        id: randomUUID(),
        email,
        name: email.split('@')[0],
        avatar: null,
        createdAt: new Date(),
      };
      this.memoryUsers.set(email, user);
    }
    return user;
  }
}

function publicUser(user: { id: string; email: string; name: string; avatar: string | null }): PublicUser {
  return { id: user.id, email: user.email, name: user.name, avatar: user.avatar };
}
