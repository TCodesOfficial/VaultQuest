import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private databaseReady = false;

  async onModuleInit(): Promise<void> {
    if (!process.env.DATABASE_URL) {
      this.logger.warn(
        'DATABASE_URL is missing — running on in-memory fallback data (spec > Important Failure Modes).',
      );
      return;
    }
    try {
      await this.$queryRaw`SELECT 1`;
      this.databaseReady = true;
      this.logger.log('Connected to the database.');
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      this.logger.error(`Database unreachable — in-memory fallback active: ${detail}`);
    }
  }

  get isReady(): boolean {
    return this.databaseReady;
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
