import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SEED_GAMES } from './seed-data';
import type { Game, PlatformProgress } from './seed-data';

export type { Game, PlatformProgress } from './seed-data';

interface PrismaGameRecord {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnails: string[];
  genres: string[];
  description: string;
  createdAt: Date;
  platforms: {
    id: string;
    platform: string;
    gamertag: string;
    level: number;
    achievementsCount: number;
    totalAchievements: number;
    lastPlayed: Date;
  }[];
}

function mapGame(record: PrismaGameRecord): Game {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    thumbnail: record.thumbnail,
    thumbnails: record.thumbnails,
    genres: record.genres,
    description: record.description,
    createdAt: record.createdAt.toISOString(),
    platforms: record.platforms.map((progress) => ({
      id: progress.id,
      platform: progress.platform as PlatformProgress['platform'],
      gamertag: progress.gamertag,
      level: progress.level,
      achievementsCount: progress.achievementsCount,
      totalAchievements: progress.totalAchievements,
      lastPlayed: progress.lastPlayed.toISOString(),
    })),
  };
}

@Injectable()
export class GamesService {
  private readonly library: Game[] =
    process.env.SEED_ON_BOOT === 'false' ? [] : [...SEED_GAMES];

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Game[]> {
    if (this.prisma.isReady) {
      const records = await this.prisma.game.findMany({
        include: { platforms: true },
      });
      return records.map(mapGame);
    }
    return this.library;
  }

  findPopular(): Game[] {
    return SEED_GAMES;
  }

  async findOne(id: string): Promise<Game | null> {
    if (this.prisma.isReady) {
      const record = await this.prisma.game.findUnique({
        where: { id },
        include: { platforms: true },
      });
      return record ? mapGame(record) : null;
    }
    return this.library.find((game) => game.id === id) ?? null;
  }

  async addGame(slug: string): Promise<Game | null> {
    const entry = SEED_GAMES.find((game) => game.slug === slug);
    if (!entry) {
      return null;
    }

    if (this.prisma.isReady) {
      const existing = await this.prisma.game.findUnique({
        where: { slug },
        include: { platforms: true },
      });
      if (existing) {
        return mapGame(existing);
      }
      const created = await this.prisma.game.create({
        data: {
          title: entry.title,
          slug: entry.slug,
          thumbnail: entry.thumbnail,
          thumbnails: entry.thumbnails,
          genres: entry.genres,
          description: entry.description,
          createdAt: new Date(entry.createdAt),
          platforms: {
            create: entry.platforms.map((progress) => ({
              platform: progress.platform,
              gamertag: progress.gamertag,
              level: progress.level,
              achievementsCount: progress.achievementsCount,
              totalAchievements: progress.totalAchievements,
              lastPlayed: new Date(progress.lastPlayed),
            })),
          },
        },
        include: { platforms: true },
      });
      return mapGame(created);
    }

    const tracked = this.library.find((game) => game.slug === slug);
    if (tracked) {
      return tracked;
    }
    this.library.push(entry);
    return entry;
  }
}
