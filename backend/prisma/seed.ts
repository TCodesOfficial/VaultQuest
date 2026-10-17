import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { SEED_GAMES } from '../src/games/seed-data';

const prisma = new PrismaClient();

function platformRows(game: (typeof SEED_GAMES)[number]) {
  return game.platforms.map((progress) => ({
    platform: progress.platform,
    gamertag: progress.gamertag,
    level: progress.level,
    achievementsCount: progress.achievementsCount,
    totalAchievements: progress.totalAchievements,
    lastPlayed: new Date(progress.lastPlayed),
  }));
}

async function main(): Promise<void> {
  for (const game of SEED_GAMES) {
    const data = {
      title: game.title,
      thumbnail: game.thumbnail,
      thumbnails: game.thumbnails,
      genres: game.genres,
      description: game.description,
      createdAt: new Date(game.createdAt),
      platforms: { create: platformRows(game) },
    };
    await prisma.game.upsert({
      where: { slug: game.slug },
      update: {
        title: data.title,
        thumbnail: data.thumbnail,
        thumbnails: data.thumbnails,
        genres: data.genres,
        description: data.description,
        createdAt: data.createdAt,
        platforms: { deleteMany: {}, create: platformRows(game) },
      },
      create: { slug: game.slug, ...data },
    });
    console.log(`  upserted ${game.title}`);
  }
  console.log(`Seeded ${SEED_GAMES.length} games (repeatable — no duplicates).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
