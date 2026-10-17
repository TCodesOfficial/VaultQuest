import { Injectable } from '@nestjs/common';

export interface PlatformProgress {
  id: string;
  platform: 'PLAYSTATION' | 'XBOX' | 'PC' | 'MOBILE';
  gamertag: string;
  level: number;
  achievementsCount: number;
  totalAchievements: number;
  lastPlayed: string;
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  platforms: PlatformProgress[];
}

const SEED_GAMES: Game[] = [
  {
    id: 'game-cod',
    title: 'Call of Duty',
    slug: 'call-of-duty',
    thumbnail:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900.jpg',
    description:
      'The classic cross-platform dilemma: huge mobile progress, barely-started PC account.',
    platforms: [
      {
        id: 'prog-cod-mobile',
        platform: 'MOBILE',
        gamertag: 'PhantomStrike_88',
        level: 42,
        achievementsCount: 118,
        totalAchievements: 200,
        lastPlayed: '2026-10-10T18:30:00.000Z',
      },
      {
        id: 'prog-cod-pc',
        platform: 'PC',
        gamertag: 'PhantomStrike',
        level: 12,
        achievementsCount: 24,
        totalAchievements: 200,
        lastPlayed: '2026-10-12T09:15:00.000Z',
      },
      {
        id: 'prog-cod-xbox',
        platform: 'XBOX',
        gamertag: 'PhantomStrikeX',
        level: 27,
        achievementsCount: 61,
        totalAchievements: 200,
        lastPlayed: '2026-10-02T21:40:00.000Z',
      },
    ],
  },
  {
    id: 'game-fortnite',
    title: 'Fortnite',
    slug: 'fortnite',
    thumbnail:
      'https://media.rawg.io/media/resize/1280/-/games/d97/d97f663b752a6484df105993f17abb49.jpg',
    description: 'Squad up anywhere — console grind, PC aim, mobile dailies.',
    platforms: [
      {
        id: 'prog-fn-ps',
        platform: 'PLAYSTATION',
        gamertag: 'LobbyKing_Ada',
        level: 87,
        achievementsCount: 310,
        totalAchievements: 400,
        lastPlayed: '2026-10-11T20:00:00.000Z',
      },
      {
        id: 'prog-fn-pc',
        platform: 'PC',
        gamertag: 'LobbyKing',
        level: 34,
        achievementsCount: 96,
        totalAchievements: 400,
        lastPlayed: '2026-10-09T17:45:00.000Z',
      },
      {
        id: 'prog-fn-mobile',
        platform: 'MOBILE',
        gamertag: 'LobbyKing_88',
        level: 15,
        achievementsCount: 22,
        totalAchievements: 400,
        lastPlayed: '2026-09-28T12:10:00.000Z',
      },
    ],
  },
  {
    id: 'game-apex',
    title: 'Apex Legends',
    slug: 'apex-legends',
    thumbnail:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/library_600x900.jpg',
    description: 'Drop in on two fronts — living-room console and desk PC.',
    platforms: [
      {
        id: 'prog-apex-pc',
        platform: 'PC',
        gamertag: 'GibraltarMain',
        level: 156,
        achievementsCount: 240,
        totalAchievements: 350,
        lastPlayed: '2026-10-12T22:05:00.000Z',
      },
      {
        id: 'prog-apex-xbox',
        platform: 'XBOX',
        gamertag: 'GibraltarMainX',
        level: 61,
        achievementsCount: 88,
        totalAchievements: 350,
        lastPlayed: '2026-10-05T19:30:00.000Z',
      },
    ],
  },
  {
    id: 'game-genshin',
    title: 'Genshin Impact',
    slug: 'genshin-impact',
    thumbnail:
      'https://media.rawg.io/media/resize/1280/-/games/c38/c38bdb5da139005777176d33c463d70f.jpg',
    description: 'Teyvat on the commute, Teyvat at the desk — same account energy.',
    platforms: [
      {
        id: 'prog-genshin-mobile',
        platform: 'MOBILE',
        gamertag: 'Traveler_Ada',
        level: 55,
        achievementsCount: 412,
        totalAchievements: 600,
        lastPlayed: '2026-10-12T08:20:00.000Z',
      },
      {
        id: 'prog-genshin-pc',
        platform: 'PC',
        gamertag: 'Traveler',
        level: 48,
        achievementsCount: 301,
        totalAchievements: 600,
        lastPlayed: '2026-10-07T21:00:00.000Z',
      },
      {
        id: 'prog-genshin-ps',
        platform: 'PLAYSTATION',
        gamertag: 'Traveler_PS',
        level: 31,
        achievementsCount: 144,
        totalAchievements: 600,
        lastPlayed: '2026-09-19T18:05:00.000Z',
      },
    ],
  },
  {
    id: 'game-minecraft',
    title: 'Minecraft',
    slug: 'minecraft',
    thumbnail:
      'https://media.rawg.io/media/resize/1280/-/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg',
    description: 'One world, three screens — couch, desk, and backpack.',
    platforms: [
      {
        id: 'prog-mc-xbox',
        platform: 'XBOX',
        gamertag: 'BlockBaron',
        level: 68,
        achievementsCount: 189,
        totalAchievements: 260,
        lastPlayed: '2026-10-11T16:20:00.000Z',
      },
      {
        id: 'prog-mc-pc',
        platform: 'PC',
        gamertag: 'BlockBaron_MC',
        level: 92,
        achievementsCount: 241,
        totalAchievements: 260,
        lastPlayed: '2026-10-12T19:50:00.000Z',
      },
      {
        id: 'prog-mc-mobile',
        platform: 'MOBILE',
        gamertag: 'BlockBaron_Pocket',
        level: 23,
        achievementsCount: 47,
        totalAchievements: 260,
        lastPlayed: '2026-09-30T07:35:00.000Z',
      },
    ],
  },
  {
    id: 'game-valorant',
    title: 'Valorant',
    slug: 'valorant',
    thumbnail:
      'https://media.rawg.io/media/resize/1280/-/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg',
    description: 'Tactical aim on the main rig, chill unrateds on the couch.',
    platforms: [
      {
        id: 'prog-val-pc',
        platform: 'PC',
        gamertag: 'SovaSnipes',
        level: 214,
        achievementsCount: 156,
        totalAchievements: 220,
        lastPlayed: '2026-10-12T23:10:00.000Z',
      },
      {
        id: 'prog-val-ps',
        platform: 'PLAYSTATION',
        gamertag: 'SovaSnipes_PS',
        level: 44,
        achievementsCount: 31,
        totalAchievements: 220,
        lastPlayed: '2026-10-04T20:15:00.000Z',
      },
    ],
  },
  {
    id: 'game-roblox',
    title: 'Roblox',
    slug: 'roblox',
    thumbnail:
      'https://media.rawg.io/media/resize/1280/-/games/3af/3af386b6e26be6741b711ae6215ef42f.jpg',
    description: 'Obbies on the tablet, hangouts on the PC — always in a server.',
    platforms: [
      {
        id: 'prog-rbx-mobile',
        platform: 'MOBILE',
        gamertag: 'PixelPiper07',
        level: 120,
        achievementsCount: 340,
        totalAchievements: 500,
        lastPlayed: '2026-10-12T14:00:00.000Z',
      },
      {
        id: 'prog-rbx-pc',
        platform: 'PC',
        gamertag: 'PixelPiper',
        level: 85,
        achievementsCount: 202,
        totalAchievements: 500,
        lastPlayed: '2026-10-08T18:40:00.000Z',
      },
      {
        id: 'prog-rbx-xbox',
        platform: 'XBOX',
        gamertag: 'PixelPiperX',
        level: 41,
        achievementsCount: 88,
        totalAchievements: 500,
        lastPlayed: '2026-09-22T17:25:00.000Z',
      },
    ],
  },
  {
    id: 'game-elden-ring',
    title: 'Elden Ring',
    slug: 'elden-ring',
    thumbnail:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg',
    description: 'Dying to the same boss on two different platforms.',
    platforms: [
      {
        id: 'prog-er-pc',
        platform: 'PC',
        gamertag: 'Maidenless',
        level: 143,
        achievementsCount: 33,
        totalAchievements: 42,
        lastPlayed: '2026-10-12T21:30:00.000Z',
      },
      {
        id: 'prog-er-ps',
        platform: 'PLAYSTATION',
        gamertag: 'Maidenless_PS',
        level: 87,
        achievementsCount: 21,
        totalAchievements: 42,
        lastPlayed: '2026-10-01T22:45:00.000Z',
      },
      {
        id: 'prog-er-xbox',
        platform: 'XBOX',
        gamertag: 'MaidenlessX',
        level: 29,
        achievementsCount: 8,
        totalAchievements: 42,
        lastPlayed: '2026-08-27T19:10:00.000Z',
      },
    ],
  },
  {
    id: 'game-cyberpunk',
    title: 'Cyberpunk 2077',
    slug: 'cyberpunk-2077',
    thumbnail:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg',
    description: 'Night City on the big TV, Night City on the ultrawide.',
    platforms: [
      {
        id: 'prog-cp-pc',
        platform: 'PC',
        gamertag: 'V_V',
        level: 56,
        achievementsCount: 38,
        totalAchievements: 44,
        lastPlayed: '2026-10-11T23:20:00.000Z',
      },
      {
        id: 'prog-cp-xbox',
        platform: 'XBOX',
        gamertag: 'V_V_X',
        level: 34,
        achievementsCount: 19,
        totalAchievements: 44,
        lastPlayed: '2026-09-15T20:05:00.000Z',
      },
    ],
  },
  {
    id: 'game-bg3',
    title: "Baldur's Gate 3",
    slug: 'baldurs-gate-3',
    thumbnail:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/library_600x900.jpg',
    description: 'Two campaigns, two dice rolls — couch co-op vs. desk solo.',
    platforms: [
      {
        id: 'prog-bg3-pc',
        platform: 'PC',
        gamertag: 'TavGale',
        level: 12,
        achievementsCount: 41,
        totalAchievements: 54,
        lastPlayed: '2026-10-12T20:45:00.000Z',
      },
      {
        id: 'prog-bg3-ps',
        platform: 'PLAYSTATION',
        gamertag: 'TavGale_PS',
        level: 7,
        achievementsCount: 18,
        totalAchievements: 54,
        lastPlayed: '2026-09-27T19:15:00.000Z',
      },
    ],
  },
  {
    id: 'game-rdr2',
    title: 'Red Dead Redemption 2',
    slug: 'red-dead-redemption-2',
    thumbnail:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg',
    description: 'The same outlaw, one save on PC and one on the console.',
    platforms: [
      {
        id: 'prog-rdr-pc',
        platform: 'PC',
        gamertag: 'ArthurMorganish',
        level: 88,
        achievementsCount: 52,
        totalAchievements: 78,
        lastPlayed: '2026-10-06T21:00:00.000Z',
      },
      {
        id: 'prog-rdr-xbox',
        platform: 'XBOX',
        gamertag: 'ArthurMorganX',
        level: 45,
        achievementsCount: 27,
        totalAchievements: 78,
        lastPlayed: '2026-08-30T18:30:00.000Z',
      },
    ],
  },
  {
    id: 'game-gtav',
    title: 'Grand Theft Auto V',
    slug: 'grand-theft-auto-v',
    thumbnail:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg',
    description: 'Los Santos heists split between the TV and the PC rig.',
    platforms: [
      {
        id: 'prog-gta-ps',
        platform: 'PLAYSTATION',
        gamertag: 'HeistQueen',
        level: 312,
        achievementsCount: 44,
        totalAchievements: 79,
        lastPlayed: '2026-10-10T22:10:00.000Z',
      },
      {
        id: 'prog-gta-xbox',
        platform: 'XBOX',
        gamertag: 'HeistQueenX',
        level: 155,
        achievementsCount: 21,
        totalAchievements: 79,
        lastPlayed: '2026-09-18T20:50:00.000Z',
      },
      {
        id: 'prog-gta-pc',
        platform: 'PC',
        gamertag: 'HeistQueen_PC',
        level: 63,
        achievementsCount: 9,
        totalAchievements: 79,
        lastPlayed: '2026-09-05T19:20:00.000Z',
      },
    ],
  },
  {
    id: 'game-witcher-3',
    title: 'The Witcher 3: Wild Hunt',
    slug: 'the-witcher-3-wild-hunt',
    thumbnail:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900.jpg',
    description: 'Geralt on the desktop, Geralt on the laptop — same beard.',
    platforms: [
      {
        id: 'prog-w3-pc',
        platform: 'PC',
        gamertag: 'GeraltOfSteam',
        level: 71,
        achievementsCount: 63,
        totalAchievements: 78,
        lastPlayed: '2026-10-03T21:40:00.000Z',
      },
      {
        id: 'prog-w3-ps',
        platform: 'PLAYSTATION',
        gamertag: 'GeraltOfPSN',
        level: 38,
        achievementsCount: 29,
        totalAchievements: 78,
        lastPlayed: '2026-08-21T20:15:00.000Z',
      },
    ],
  },
  {
    id: 'game-hogwarts',
    title: 'Hogwarts Legacy',
    slug: 'hogwarts-legacy',
    thumbnail:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg',
    description: 'One wizard, one PS save, one PC save, zero house unity.',
    platforms: [
      {
        id: 'prog-hl-ps',
        platform: 'PLAYSTATION',
        gamertag: 'Headmasterish',
        level: 34,
        achievementsCount: 29,
        totalAchievements: 95,
        lastPlayed: '2026-10-09T18:25:00.000Z',
      },
      {
        id: 'prog-hl-pc',
        platform: 'PC',
        gamertag: 'Headmasterish',
        level: 19,
        achievementsCount: 14,
        totalAchievements: 95,
        lastPlayed: '2026-09-12T21:55:00.000Z',
      },
    ],
  },
  {
    id: 'game-helldivers',
    title: 'Helldivers 2',
    slug: 'helldivers-2',
    thumbnail:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/553850/library_600x900.jpg',
    description: 'Managed democracy from the couch and from the command chair.',
    platforms: [
      {
        id: 'prog-hd-ps',
        platform: 'PLAYSTATION',
        gamertag: 'General_Bean',
        level: 48,
        achievementsCount: 25,
        totalAchievements: 38,
        lastPlayed: '2026-10-12T19:05:00.000Z',
      },
      {
        id: 'prog-hd-pc',
        platform: 'PC',
        gamertag: 'GeneralBean_PC',
        level: 22,
        achievementsCount: 11,
        totalAchievements: 38,
        lastPlayed: '2026-10-07T22:30:00.000Z',
      },
    ],
  },
];

@Injectable()
export class GamesService {
  private readonly library: Game[] =
    process.env.SEED_ON_BOOT === 'false' ? [] : [...SEED_GAMES];

  findAll(): Game[] {
    return this.library;
  }

  findPopular(): Game[] {
    return SEED_GAMES;
  }

  addGame(slug: string): Game | null {
    const alreadyTracked = this.library.find((game) => game.slug === slug);
    if (alreadyTracked) {
      return alreadyTracked;
    }
    const entry = SEED_GAMES.find((game) => game.slug === slug);
    if (!entry) {
      return null;
    }
    this.library.push(entry);
    return entry;
  }
}
