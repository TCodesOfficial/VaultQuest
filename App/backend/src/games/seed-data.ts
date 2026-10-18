// Demo seed data shared by the in-memory fallback and prisma/seed.ts

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
  thumbnails: string[];
  description: string;
  genres: string[];
  platforms: PlatformProgress[];
  createdAt: string;
}

export const SEED_GAMES: Game[] = [
  {
    "id": "game-cod",
    "title": "Call of Duty",
    "slug": "call-of-duty",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900.jpg",
    "description": "The classic cross-platform dilemma: huge mobile progress, barely-started PC account.",
    "platforms": [
      {
        "id": "prog-cod-mobile",
        "platform": "MOBILE",
        "gamertag": "PhantomStrike_88",
        "level": 42,
        "achievementsCount": 118,
        "totalAchievements": 200,
        "lastPlayed": "2026-10-10T18:30:00.000Z"
      },
      {
        "id": "prog-cod-pc",
        "platform": "PC",
        "gamertag": "PhantomStrike",
        "level": 12,
        "achievementsCount": 24,
        "totalAchievements": 200,
        "lastPlayed": "2026-10-12T09:15:00.000Z"
      },
      {
        "id": "prog-cod-xbox",
        "platform": "XBOX",
        "gamertag": "PhantomStrikeX",
        "level": 27,
        "achievementsCount": 61,
        "totalAchievements": 200,
        "lastPlayed": "2026-10-02T21:40:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1938090/ee5f6b6aebe4dc9e86b49c4e309d361b132df308/ss_ee5f6b6aebe4dc9e86b49c4e309d361b132df308.1920x1080.jpg?t=1792179713",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1938090/ca97243a998802a38c7cddf195cee327c5760353/ss_ca97243a998802a38c7cddf195cee327c5760353.1920x1080.jpg?t=1792179713",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1938090/6b8f4040a1e923f036e04d9eb21ecb0f866be57e/ss_6b8f4040a1e923f036e04d9eb21ecb0f866be57e.1920x1080.jpg?t=1792179713",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1938090/c6f865bd79b76a1fa50c59cd17a68d7837abf0b2/ss_c6f865bd79b76a1fa50c59cd17a68d7837abf0b2.1920x1080.jpg?t=1792179713"
    ],
    "genres": [
      "Action"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-fortnite",
    "title": "Fortnite",
    "slug": "fortnite",
    "thumbnail": "https://media.rawg.io/media/resize/1280/-/games/d97/d97f663b752a6484df105993f17abb49.jpg",
    "description": "Squad up anywhere — console grind, PC aim, mobile dailies.",
    "platforms": [
      {
        "id": "prog-fn-ps",
        "platform": "PLAYSTATION",
        "gamertag": "LobbyKing_Ada",
        "level": 87,
        "achievementsCount": 310,
        "totalAchievements": 400,
        "lastPlayed": "2026-10-11T20:00:00.000Z"
      },
      {
        "id": "prog-fn-pc",
        "platform": "PC",
        "gamertag": "LobbyKing",
        "level": 34,
        "achievementsCount": 96,
        "totalAchievements": 400,
        "lastPlayed": "2026-10-09T17:45:00.000Z"
      },
      {
        "id": "prog-fn-mobile",
        "platform": "MOBILE",
        "gamertag": "LobbyKing_88",
        "level": 15,
        "achievementsCount": 22,
        "totalAchievements": 400,
        "lastPlayed": "2026-09-28T12:10:00.000Z"
      }
    ],
    "thumbnails": [
      "https://media.rawg.io/media/resize/1280/-/games/d97/d97f663b752a6484df105993f17abb49.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/bd/a7/e3/bda7e31a-7341-2cf8-d54f-880aec955620/EN_FNBR_42-00_C7S4_Shot_1_iOS_AppStore_Screenshot_iPhone_2868x1320.jpg/320x480bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/2a/f2/a3/2af2a36b-16e8-6977-3391-9a30364932e7/EN_FNBR_42-00_C7S4_Shot_2_iOS_AppStore_Screenshot_iPhone_2868x1320.jpg/320x480bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/2d/ea/e9/2deae962-f00f-5d8d-2bfe-e645dcc4616c/EN_FNBR_42-00_C7S4_Shot_3_iOS_AppStore_Screenshot_iPhone_2868x1320.jpg/320x480bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/c1/27/16/c12716b1-67cd-f26b-2bfa-b96d652f528b/EN_FNBR_42-00_C7S4_Shot_5_iOS_AppStore_Screenshot_iPhone_2868x1320.jpg/320x480bb.jpg"
    ],
    "genres": [
      "Battle Royale",
      "Shooter"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-apex",
    "title": "Apex Legends",
    "slug": "apex-legends",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/library_600x900.jpg",
    "description": "Drop in on two fronts — living-room console and desk PC.",
    "platforms": [
      {
        "id": "prog-apex-pc",
        "platform": "PC",
        "gamertag": "GibraltarMain",
        "level": 156,
        "achievementsCount": 240,
        "totalAchievements": 350,
        "lastPlayed": "2026-10-12T22:05:00.000Z"
      },
      {
        "id": "prog-apex-xbox",
        "platform": "XBOX",
        "gamertag": "GibraltarMainX",
        "level": 61,
        "achievementsCount": 88,
        "totalAchievements": 350,
        "lastPlayed": "2026-10-05T19:30:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/3fc2dfcf0e8d7d7202a3ca32ae26c7afaec723e2/ss_3fc2dfcf0e8d7d7202a3ca32ae26c7afaec723e2.1920x1080.jpg?t=1790164440",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/d64ce54903a3ba6429c6e3189ad746a7db70ee3e/ss_d64ce54903a3ba6429c6e3189ad746a7db70ee3e.1920x1080.jpg?t=1790164440",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/6593905f527d4b1bf01b0bb148b9c9a39616a2e4/ss_6593905f527d4b1bf01b0bb148b9c9a39616a2e4.1920x1080.jpg?t=1790164440",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/d8a07de4444fb8f43ad19c7aa9e3fa8e26eb94d6/ss_d8a07de4444fb8f43ad19c7aa9e3fa8e26eb94d6.1920x1080.jpg?t=1790164440"
    ],
    "genres": [
      "Action",
      "Adventure",
      "Free To Play"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-genshin",
    "title": "Genshin Impact",
    "slug": "genshin-impact",
    "thumbnail": "https://media.rawg.io/media/resize/1280/-/games/c38/c38bdb5da139005777176d33c463d70f.jpg",
    "description": "Teyvat on the commute, Teyvat at the desk — same account energy.",
    "platforms": [
      {
        "id": "prog-genshin-mobile",
        "platform": "MOBILE",
        "gamertag": "Traveler_Ada",
        "level": 55,
        "achievementsCount": 412,
        "totalAchievements": 600,
        "lastPlayed": "2026-10-12T08:20:00.000Z"
      },
      {
        "id": "prog-genshin-pc",
        "platform": "PC",
        "gamertag": "Traveler",
        "level": 48,
        "achievementsCount": 301,
        "totalAchievements": 600,
        "lastPlayed": "2026-10-07T21:00:00.000Z"
      },
      {
        "id": "prog-genshin-ps",
        "platform": "PLAYSTATION",
        "gamertag": "Traveler_PS",
        "level": 31,
        "achievementsCount": 144,
        "totalAchievements": 600,
        "lastPlayed": "2026-09-19T18:05:00.000Z"
      }
    ],
    "thumbnails": [
      "https://media.rawg.io/media/resize/1280/-/games/c38/c38bdb5da139005777176d33c463d70f.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/2d/09/2f/2d092f1a-f550-9e4e-51f3-483a973ffc53/EN-1.jpg/320x480bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/79/b3/ef/79b3eff7-e4a7-2b04-ddef-25a53569d307/2.jpg/320x480bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/1d/d3/3c/1dd33cd0-fdd6-6bec-abd3-36ea164ed03d/EN-2796x1290-_U65e0logo.jpg/320x480bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/55/ab/74/55ab74de-836c-a229-50bd-659ed6a51c6e/bb6c4f66-e823-44fa-a5bc-57a02a573516_EN-2.jpg/320x480bb.jpg"
    ],
    "genres": [
      "Action RPG",
      "Adventure"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-minecraft",
    "title": "Minecraft",
    "slug": "minecraft",
    "thumbnail": "https://media.rawg.io/media/resize/1280/-/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg",
    "description": "One world, three screens — couch, desk, and backpack.",
    "platforms": [
      {
        "id": "prog-mc-xbox",
        "platform": "XBOX",
        "gamertag": "BlockBaron",
        "level": 68,
        "achievementsCount": 189,
        "totalAchievements": 260,
        "lastPlayed": "2026-10-11T16:20:00.000Z"
      },
      {
        "id": "prog-mc-pc",
        "platform": "PC",
        "gamertag": "BlockBaron_MC",
        "level": 92,
        "achievementsCount": 241,
        "totalAchievements": 260,
        "lastPlayed": "2026-10-12T19:50:00.000Z"
      },
      {
        "id": "prog-mc-mobile",
        "platform": "MOBILE",
        "gamertag": "BlockBaron_Pocket",
        "level": 23,
        "achievementsCount": 47,
        "totalAchievements": 260,
        "lastPlayed": "2026-09-30T07:35:00.000Z"
      }
    ],
    "thumbnails": [
      "https://media.rawg.io/media/resize/1280/-/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/07/47/6f/07476fcd-1ecf-18ca-e7f7-364d6c6cd5e1/pr_source.png/406x228bb.png",
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/74/a6/ed/74a6ed67-e5e9-a1ae-3233-225b651d6bf0/pr_source.png/406x228bb.png",
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/be/4f/92/be4f92ef-8b4b-94e3-cd78-da32db4193b0/pr_source.png/406x228bb.png",
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/64/03/ee/6403eee1-4fbf-6b89-d2ec-6fc410182689/pr_source.png/406x228bb.png"
    ],
    "genres": [
      "Sandbox",
      "Survival"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-valorant",
    "title": "Valorant",
    "slug": "valorant",
    "thumbnail": "https://media.rawg.io/media/resize/1280/-/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg",
    "description": "Tactical aim on the main rig, chill unrateds on the couch.",
    "platforms": [
      {
        "id": "prog-val-pc",
        "platform": "PC",
        "gamertag": "SovaSnipes",
        "level": 214,
        "achievementsCount": 156,
        "totalAchievements": 220,
        "lastPlayed": "2026-10-12T23:10:00.000Z"
      },
      {
        "id": "prog-val-ps",
        "platform": "PLAYSTATION",
        "gamertag": "SovaSnipes_PS",
        "level": 44,
        "achievementsCount": 31,
        "totalAchievements": 220,
        "lastPlayed": "2026-10-04T20:15:00.000Z"
      }
    ],
    "thumbnails": [
      "https://media.rawg.io/media/resize/1280/-/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg",
      "https://upload.wikimedia.org/wikipedia/en/b/ba/Valorant_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
      "https://upload.wikimedia.org/wikipedia/en/c/c7/Valorant_gameplay.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    "genres": [
      "Tactical Shooter",
      "FPS"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-roblox",
    "title": "Roblox",
    "slug": "roblox",
    "thumbnail": "https://media.rawg.io/media/resize/1280/-/games/3af/3af386b6e26be6741b711ae6215ef42f.jpg",
    "description": "Obbies on the tablet, hangouts on the PC — always in a server.",
    "platforms": [
      {
        "id": "prog-rbx-mobile",
        "platform": "MOBILE",
        "gamertag": "PixelPiper07",
        "level": 120,
        "achievementsCount": 340,
        "totalAchievements": 500,
        "lastPlayed": "2026-10-12T14:00:00.000Z"
      },
      {
        "id": "prog-rbx-pc",
        "platform": "PC",
        "gamertag": "PixelPiper",
        "level": 85,
        "achievementsCount": 202,
        "totalAchievements": 500,
        "lastPlayed": "2026-10-08T18:40:00.000Z"
      },
      {
        "id": "prog-rbx-xbox",
        "platform": "XBOX",
        "gamertag": "PixelPiperX",
        "level": 41,
        "achievementsCount": 88,
        "totalAchievements": 500,
        "lastPlayed": "2026-09-22T17:25:00.000Z"
      }
    ],
    "thumbnails": [
      "https://media.rawg.io/media/resize/1280/-/games/3af/3af386b6e26be6741b711ae6215ef42f.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/44/6e/a8/446ea852-2d09-c4c2-5cbf-cbeca590a42f/ASO_Q1_26_Default_EEAO_2602_Apple_iPhone_SC1-RIVALS.jpg/320x480bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/e4/ef/be/e4efbe05-7a4c-fda1-2d4f-a5f891c0ce65/ASO_Q1_26_Default_EEAO_2602_Apple_iPhone_SC2-C.jpg/320x480bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/5b/03/d6/5b03d6b4-c217-6495-2dc9-fb4116a4aacc/ASO_Q1_26_Default_EEAO_2602_Apple_iPhone_SC3.jpg/320x480bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/72/cc/89/72cc89f5-debf-0c03-0377-268757c86491/ASO_Q1_26_Default_EEAO_2602_Apple_iPhone_SC4.jpg/320x480bb.jpg"
    ],
    "genres": [
      "Sandbox",
      "Social"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-elden-ring",
    "title": "Elden Ring",
    "slug": "elden-ring",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg",
    "description": "Dying to the same boss on two different platforms.",
    "platforms": [
      {
        "id": "prog-er-pc",
        "platform": "PC",
        "gamertag": "Maidenless",
        "level": 143,
        "achievementsCount": 33,
        "totalAchievements": 42,
        "lastPlayed": "2026-10-12T21:30:00.000Z"
      },
      {
        "id": "prog-er-ps",
        "platform": "PLAYSTATION",
        "gamertag": "Maidenless_PS",
        "level": 87,
        "achievementsCount": 21,
        "totalAchievements": 42,
        "lastPlayed": "2026-10-01T22:45:00.000Z"
      },
      {
        "id": "prog-er-xbox",
        "platform": "XBOX",
        "gamertag": "MaidenlessX",
        "level": 29,
        "achievementsCount": 8,
        "totalAchievements": 42,
        "lastPlayed": "2026-08-27T19:10:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_943bf6fe62352757d9070c1d33e50b92fe8539f1.1920x1080.jpg?t=1790290043",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_dcdac9e4b26ac0ee5248bfd2967d764fd00cdb42.1920x1080.jpg?t=1790290043",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_3c41384a24d86dddd58a8f61db77f9dc0bfda8b5.1920x1080.jpg?t=1790290043",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_e0316c76f8197405c1312d072b84331dd735d60b.1920x1080.jpg?t=1790290043"
    ],
    "genres": [
      "Action",
      "RPG"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-cyberpunk",
    "title": "Cyberpunk 2077",
    "slug": "cyberpunk-2077",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg",
    "description": "Night City on the big TV, Night City on the ultrawide.",
    "platforms": [
      {
        "id": "prog-cp-pc",
        "platform": "PC",
        "gamertag": "V_V",
        "level": 56,
        "achievementsCount": 38,
        "totalAchievements": 44,
        "lastPlayed": "2026-10-11T23:20:00.000Z"
      },
      {
        "id": "prog-cp-xbox",
        "platform": "XBOX",
        "gamertag": "V_V_X",
        "level": 34,
        "achievementsCount": 19,
        "totalAchievements": 44,
        "lastPlayed": "2026-09-15T20:05:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.1920x1080.jpg?t=1784714077",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_0e64170751e1ae20ff8fdb7001a8892fd48260e7.1920x1080.jpg?t=1784714077",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_af2804aa4bf35d4251043744412ce3b359a125ef.1920x1080.jpg?t=1784714077",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_7924f64b6e5d586a80418c9896a1c92881a7905b.1920x1080.jpg?t=1784714077"
    ],
    "genres": [
      "RPG"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-bg3",
    "title": "Baldur's Gate 3",
    "slug": "baldurs-gate-3",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/library_600x900.jpg",
    "description": "Two campaigns, two dice rolls — couch co-op vs. desk solo.",
    "platforms": [
      {
        "id": "prog-bg3-pc",
        "platform": "PC",
        "gamertag": "TavGale",
        "level": 12,
        "achievementsCount": 41,
        "totalAchievements": 54,
        "lastPlayed": "2026-10-12T20:45:00.000Z"
      },
      {
        "id": "prog-bg3-ps",
        "platform": "PLAYSTATION",
        "gamertag": "TavGale_PS",
        "level": 7,
        "achievementsCount": 18,
        "totalAchievements": 54,
        "lastPlayed": "2026-09-27T19:15:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_c73bc54415178c07fef85f54ee26621728c77504.1920x1080.jpg?t=1777363040",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_73d93bea842b93914d966622104dcb8c0f42972b.1920x1080.jpg?t=1777363040",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_cf936d31061b58e98e0c646aee00e6030c410cda.1920x1080.jpg?t=1777363040",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_b6a6ee6e046426d08ceea7a4506a1b5f44181543.1920x1080.jpg?t=1777363040"
    ],
    "genres": [
      "Adventure",
      "RPG",
      "Strategy"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-rdr2",
    "title": "Red Dead Redemption 2",
    "slug": "red-dead-redemption-2",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg",
    "description": "The same outlaw, one save on PC and one on the console.",
    "platforms": [
      {
        "id": "prog-rdr-pc",
        "platform": "PC",
        "gamertag": "ArthurMorganish",
        "level": 88,
        "achievementsCount": 52,
        "totalAchievements": 78,
        "lastPlayed": "2026-10-06T21:00:00.000Z"
      },
      {
        "id": "prog-rdr-xbox",
        "platform": "XBOX",
        "gamertag": "ArthurMorganX",
        "level": 45,
        "achievementsCount": 27,
        "totalAchievements": 78,
        "lastPlayed": "2026-08-30T18:30:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/ss_66b553f4c209476d3e4ce25fa4714002cc914c4f.1920x1080.jpg?t=1759502961",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/ss_bac60bacbf5da8945103648c08d27d5e202444ca.1920x1080.jpg?t=1759502961",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/ss_668dafe477743f8b50b818d5bbfcec669e9ba93e.1920x1080.jpg?t=1759502961",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/ss_4ce07ae360b166f0f650e9a895a3b4b7bf15e34f.1920x1080.jpg?t=1759502961"
    ],
    "genres": [
      "Action",
      "Adventure"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-gtav",
    "title": "Grand Theft Auto V",
    "slug": "grand-theft-auto-v",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg",
    "description": "Los Santos heists split between the TV and the PC rig.",
    "platforms": [
      {
        "id": "prog-gta-ps",
        "platform": "PLAYSTATION",
        "gamertag": "HeistQueen",
        "level": 312,
        "achievementsCount": 44,
        "totalAchievements": 79,
        "lastPlayed": "2026-10-10T22:10:00.000Z"
      },
      {
        "id": "prog-gta-xbox",
        "platform": "XBOX",
        "gamertag": "HeistQueenX",
        "level": 155,
        "achievementsCount": 21,
        "totalAchievements": 79,
        "lastPlayed": "2026-09-18T20:50:00.000Z"
      },
      {
        "id": "prog-gta-pc",
        "platform": "PC",
        "gamertag": "HeistQueen_PC",
        "level": 63,
        "achievementsCount": 9,
        "totalAchievements": 79,
        "lastPlayed": "2026-09-05T19:20:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_32aa18ab3175e3002217862dd5917646d298ab6b.1920x1080.jpg?t=1765387725",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_2744f112fa060320d191a50e8b3a92441a648a56.1920x1080.jpg?t=1765387725",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_da39c16db175f6973770bae6b91d411251763152.1920x1080.jpg?t=1765387725",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_bd5db78286be0a7c6b2c62519099a9e27e6b06f3.1920x1080.jpg?t=1765387725"
    ],
    "genres": [
      "Action",
      "Adventure"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-witcher-3",
    "title": "The Witcher 3: Wild Hunt",
    "slug": "the-witcher-3-wild-hunt",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900.jpg",
    "description": "Geralt on the desktop, Geralt on the laptop — same beard.",
    "platforms": [
      {
        "id": "prog-w3-pc",
        "platform": "PC",
        "gamertag": "GeraltOfSteam",
        "level": 71,
        "achievementsCount": 63,
        "totalAchievements": 78,
        "lastPlayed": "2026-10-03T21:40:00.000Z"
      },
      {
        "id": "prog-w3-ps",
        "platform": "PLAYSTATION",
        "gamertag": "GeraltOfPSN",
        "level": 38,
        "achievementsCount": 29,
        "totalAchievements": 78,
        "lastPlayed": "2026-08-21T20:15:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/f7f564ecedd09b3e503b071a637aeefdedbeedd8/ss_f7f564ecedd09b3e503b071a637aeefdedbeedd8.1920x1080.jpg?t=1790845156",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/0a38e4d0d57f15934772dbe09b322d08132d5518/ss_0a38e4d0d57f15934772dbe09b322d08132d5518.1920x1080.jpg?t=1790845156",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/19c03c2b997d3a393fc629fd42f55ddb4a3d8dd0/ss_19c03c2b997d3a393fc629fd42f55ddb4a3d8dd0.1920x1080.jpg?t=1790845156",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/3a3f430982cc3bccac1633d3ea60a30bf3d1ae9e/ss_3a3f430982cc3bccac1633d3ea60a30bf3d1ae9e.1920x1080.jpg?t=1790845156"
    ],
    "genres": [
      "RPG"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-hogwarts",
    "title": "Hogwarts Legacy",
    "slug": "hogwarts-legacy",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg",
    "description": "One wizard, one PS save, one PC save, zero house unity.",
    "platforms": [
      {
        "id": "prog-hl-ps",
        "platform": "PLAYSTATION",
        "gamertag": "Headmasterish",
        "level": 34,
        "achievementsCount": 29,
        "totalAchievements": 95,
        "lastPlayed": "2026-10-09T18:25:00.000Z"
      },
      {
        "id": "prog-hl-pc",
        "platform": "PC",
        "gamertag": "Headmasterish",
        "level": 19,
        "achievementsCount": 14,
        "totalAchievements": 95,
        "lastPlayed": "2026-09-12T21:55:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/ss_725bf58485beb4aa37a3a69c1e2baa69bf3e4653.1920x1080.jpg?t=1790708992",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/ss_df93b5e8a183f7232d68be94ae78920a90de1443.1920x1080.jpg?t=1790708992",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/ss_94058497bf0f8fabdde17ee8d59bece609a60663.1920x1080.jpg?t=1790708992",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/ss_8e08976236d29b1897769257ac3c64e9264792a5.1920x1080.jpg?t=1790708992"
    ],
    "genres": [
      "Action",
      "Adventure",
      "RPG"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-helldivers",
    "title": "Helldivers 2",
    "slug": "helldivers-2",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/553850/library_600x900.jpg",
    "description": "Managed democracy from the couch and from the command chair.",
    "platforms": [
      {
        "id": "prog-hd-ps",
        "platform": "PLAYSTATION",
        "gamertag": "General_Bean",
        "level": 48,
        "achievementsCount": 25,
        "totalAchievements": 38,
        "lastPlayed": "2026-10-12T19:05:00.000Z"
      },
      {
        "id": "prog-hd-pc",
        "platform": "PC",
        "gamertag": "GeneralBean_PC",
        "level": 22,
        "achievementsCount": 11,
        "totalAchievements": 38,
        "lastPlayed": "2026-10-07T22:30:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/553850/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/aed08979e15f54798f287dd8820fb5838476b5fa/ss_aed08979e15f54798f287dd8820fb5838476b5fa.1920x1080.jpg?t=1792146147",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/71ef7c65fcf63ff974ce42150190c0420c66c72b/ss_71ef7c65fcf63ff974ce42150190c0420c66c72b.1920x1080.jpg?t=1792146147",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/6c8b61a7c63479b6f526d285af6687a362d5d7ae/ss_6c8b61a7c63479b6f526d285af6687a362d5d7ae.1920x1080.jpg?t=1792146147",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/ss_0c79f56fc7be1bd0102f2ca1c92c8f0900daf4fb.1920x1080.jpg?t=1792146147"
    ],
    "genres": [
      "Action"
    ],
    "createdAt": "2026-08-15T12:00:00.000Z"
  },
  {
    "id": "game-sekiro",
    "title": "Sekiro: Shadows Die Twice - GOTY Edition",
    "slug": "sekiro-shadows-die-twice",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900.jpg",
    "description": "Game of the Year - The Game Awards 2019 Best Action Game of 2019 - IGN Carve your own clever path to vengeance in the award winning adventure from developer FromSoftware, creators of Bloodborne and the Dark Souls series. Take Revenge. Restore Your Honor. Kill Ingeniously.",
    "platforms": [
      {
        "id": "prog-sekiro-pc-0",
        "platform": "PC",
        "gamertag": "Shinobi_Main",
        "level": 76,
        "achievementsCount": 28,
        "totalAchievements": 34,
        "lastPlayed": "2026-10-08T19:20:00.000Z"
      },
      {
        "id": "prog-sekiro-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "Shinobi_PS",
        "level": 49,
        "achievementsCount": 17,
        "totalAchievements": 34,
        "lastPlayed": "2026-09-21T21:10:00.000Z"
      },
      {
        "id": "prog-sekiro-xbox-2",
        "platform": "XBOX",
        "gamertag": "ShinobiX",
        "level": 22,
        "achievementsCount": 8,
        "totalAchievements": 34,
        "lastPlayed": "2026-08-15T18:45:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/ss_0f7b0f8ed9ffc49aba26f9328caa9a1d59ad60f0.1920x1080.jpg?t=1762888662",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/ss_2685dd844a2a523b6c7ec207d46a538db6a908cd.1920x1080.jpg?t=1762888662",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/ss_15f0e9982621aed44900215ad283811af0779b1d.1920x1080.jpg?t=1762888662",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/ss_1e6f5540866a5564d65df915c22fe1e57e336a6f.1920x1080.jpg?t=1762888662"
    ],
    "genres": [
      "Action",
      "Adventure"
    ],
    "createdAt": "2026-10-01T12:00:00.000Z"
  },
  {
    "id": "game-dark-souls-3",
    "title": "DARK SOULS III",
    "slug": "dark-souls-3",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/374320/library_600x900.jpg",
    "description": "Dark Souls continues to push the boundaries with the latest, ambitious chapter in the critically-acclaimed and genre-defining series. Prepare yourself and Embrace The Darkness!",
    "platforms": [
      {
        "id": "prog-dark-souls-3-pc-0",
        "platform": "PC",
        "gamertag": "AshenOne",
        "level": 94,
        "achievementsCount": 31,
        "totalAchievements": 43,
        "lastPlayed": "2026-10-04T22:30:00.000Z"
      },
      {
        "id": "prog-dark-souls-3-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "AshenOne_PS",
        "level": 57,
        "achievementsCount": 20,
        "totalAchievements": 43,
        "lastPlayed": "2026-09-16T20:05:00.000Z"
      },
      {
        "id": "prog-dark-souls-3-xbox-2",
        "platform": "XBOX",
        "gamertag": "AshenOneX",
        "level": 28,
        "achievementsCount": 9,
        "totalAchievements": 43,
        "lastPlayed": "2026-07-30T19:40:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/374320/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/ss_5efd318b85a3917d1c6e717f4cb813b47547cd6f.1920x1080.jpg?t=1748630784",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/ss_1c0fa39091901496d77cf4cecfea4ffb056d6452.1920x1080.jpg?t=1748630784",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/ss_1318a04ef11d87f38aebe6d47a96124f8f888ca8.1920x1080.jpg?t=1748630784",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/ss_61524dee9ebf72d462638f21adbbbea4c93d791d.1920x1080.jpg?t=1748630784"
    ],
    "genres": [
      "Action"
    ],
    "createdAt": "2026-10-01T18:00:00.000Z"
  },
  {
    "id": "game-hollow-knight",
    "title": "Hollow Knight",
    "slug": "hollow-knight",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900.jpg",
    "description": "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs, all in a classic, hand-drawn 2D style.",
    "platforms": [
      {
        "id": "prog-hollow-knight-pc-0",
        "platform": "PC",
        "gamertag": "Nailmaster",
        "level": 62,
        "achievementsCount": 41,
        "totalAchievements": 63,
        "lastPlayed": "2026-09-29T21:15:00.000Z"
      },
      {
        "id": "prog-hollow-knight-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "Nailmaster_PS",
        "level": 35,
        "achievementsCount": 22,
        "totalAchievements": 63,
        "lastPlayed": "2026-08-18T20:50:00.000Z"
      },
      {
        "id": "prog-hollow-knight-xbox-2",
        "platform": "XBOX",
        "gamertag": "NailmasterX",
        "level": 14,
        "achievementsCount": 7,
        "totalAchievements": 63,
        "lastPlayed": "2026-07-12T17:25:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_5384f9f8b96a0b9934b2bc35a4058376211636d2.1920x1080.jpg?t=1776125684",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_d5b6edd94e77ba6db31c44d8a3c09d807ab27751.1920x1080.jpg?t=1776125684",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_a81e4231cc8d55f58b51a4a938898af46503cae5.1920x1080.jpg?t=1776125684",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_62e10cf506d461e11e050457b08aa0e2a1c078d0.1920x1080.jpg?t=1776125684"
    ],
    "genres": [
      "Action",
      "Adventure",
      "Indie"
    ],
    "createdAt": "2026-10-02T00:00:00.000Z"
  },
  {
    "id": "game-stardew-valley",
    "title": "Stardew Valley",
    "slug": "stardew-valley",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/library_600x900.jpg",
    "description": "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?",
    "platforms": [
      {
        "id": "prog-stardew-valley-pc-0",
        "platform": "PC",
        "gamertag": "StardewFarmer",
        "level": 45,
        "achievementsCount": 33,
        "totalAchievements": 49,
        "lastPlayed": "2026-10-11T16:40:00.000Z"
      },
      {
        "id": "prog-stardew-valley-mobi-1",
        "platform": "MOBILE",
        "gamertag": "StardewFarmer_Pocket",
        "level": 31,
        "achievementsCount": 19,
        "totalAchievements": 49,
        "lastPlayed": "2026-10-12T12:05:00.000Z"
      },
      {
        "id": "prog-stardew-valley-play-2",
        "platform": "PLAYSTATION",
        "gamertag": "StardewFarmer_PS",
        "level": 18,
        "achievementsCount": 11,
        "totalAchievements": 49,
        "lastPlayed": "2026-08-25T19:30:00.000Z"
      },
      {
        "id": "prog-stardew-valley-xbox-3",
        "platform": "XBOX",
        "gamertag": "StardewFarmerX",
        "level": 9,
        "achievementsCount": 4,
        "totalAchievements": 49,
        "lastPlayed": "2026-07-08T18:15:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/ss_b887651a93b0525739049eb4194f633de2df75be.1920x1080.jpg?t=1786554168",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/ss_9ac899fe2cda15d48b0549bba77ef8c4a090a71c.1920x1080.jpg?t=1786554168",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/ss_4fa0866709ede3753fdf2745349b528d5e8c4054.1920x1080.jpg?t=1786554168",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/ss_d836f0a5b0447fb6a2bdb0a6ac5f954949d3c41e.1920x1080.jpg?t=1786554168"
    ],
    "genres": [
      "Indie",
      "RPG",
      "Simulation"
    ],
    "createdAt": "2026-10-02T06:00:00.000Z"
  },
  {
    "id": "game-hades",
    "title": "Hades",
    "slug": "hades",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/library_600x900.jpg",
    "description": "Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.",
    "platforms": [
      {
        "id": "prog-hades-pc-0",
        "platform": "PC",
        "gamertag": "Zagreus",
        "level": 77,
        "achievementsCount": 36,
        "totalAchievements": 49,
        "lastPlayed": "2026-10-06T23:10:00.000Z"
      },
      {
        "id": "prog-hades-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "Zagreus_PS",
        "level": 41,
        "achievementsCount": 18,
        "totalAchievements": 49,
        "lastPlayed": "2026-09-03T20:25:00.000Z"
      },
      {
        "id": "prog-hades-xbox-2",
        "platform": "XBOX",
        "gamertag": "ZagreusX",
        "level": 19,
        "achievementsCount": 7,
        "totalAchievements": 49,
        "lastPlayed": "2026-07-27T18:50:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/ss_c0fed447426b69981cf1721756acf75369801b31.1920x1080.jpg?t=1758127023",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/ss_8a9f0953e8a014bd3df2789c2835cb787cd3764d.1920x1080.jpg?t=1758127023",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/ss_68300459a8c3daacb2ec687adcdbf4442fcc4f47.1920x1080.jpg?t=1758127023",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/ss_bcb499a0dd001f4101823f99ec5094d2872ba6ee.1920x1080.jpg?t=1758127023"
    ],
    "genres": [
      "Action",
      "Indie",
      "RPG"
    ],
    "createdAt": "2026-10-02T12:00:00.000Z"
  },
  {
    "id": "game-terraria",
    "title": "Terraria",
    "slug": "terraria",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900.jpg",
    "description": "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!",
    "platforms": [
      {
        "id": "prog-terraria-pc-0",
        "platform": "PC",
        "gamertag": "Terrarian",
        "level": 88,
        "achievementsCount": 74,
        "totalAchievements": 137,
        "lastPlayed": "2026-09-30T20:45:00.000Z"
      },
      {
        "id": "prog-terraria-mobi-1",
        "platform": "MOBILE",
        "gamertag": "Terrarian_Pocket",
        "level": 41,
        "achievementsCount": 32,
        "totalAchievements": 137,
        "lastPlayed": "2026-10-09T13:20:00.000Z"
      },
      {
        "id": "prog-terraria-play-2",
        "platform": "PLAYSTATION",
        "gamertag": "Terrarian_PS",
        "level": 26,
        "achievementsCount": 18,
        "totalAchievements": 137,
        "lastPlayed": "2026-08-11T19:55:00.000Z"
      },
      {
        "id": "prog-terraria-xbox-3",
        "platform": "XBOX",
        "gamertag": "TerrarianX",
        "level": 15,
        "achievementsCount": 9,
        "totalAchievements": 137,
        "lastPlayed": "2026-06-29T17:35:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/ss_8c03886f214d2108cafca13845533eaa3d87d83f.1920x1080.jpg?t=1769844435",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/ss_ae168a00ab08104ba266dc30232654d4b3c919e5.1920x1080.jpg?t=1769844435",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/ss_9edd98caaf9357c2f40758f354475a56e356e8b0.1920x1080.jpg?t=1769844435",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/ss_75ea9a7e39eb34b40efa1e6dfd2536098dc4734b.1920x1080.jpg?t=1769844435"
    ],
    "genres": [
      "Action",
      "Adventure",
      "Indie",
      "RPG"
    ],
    "createdAt": "2026-10-02T18:00:00.000Z"
  },
  {
    "id": "game-forza-horizon-5",
    "title": "Forza Horizon 5",
    "slug": "forza-horizon-5",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900.jpg",
    "description": "Explore the vibrant open world landscapes of Mexico with limitless, fun driving action in the world’s greatest cars.",
    "platforms": [
      {
        "id": "prog-forza-horizon-5-pc-0",
        "platform": "PC",
        "gamertag": "RoadTripper",
        "level": 63,
        "achievementsCount": 58,
        "totalAchievements": 164,
        "lastPlayed": "2026-10-05T19:05:00.000Z"
      },
      {
        "id": "prog-forza-horizon-5-xbox-1",
        "platform": "XBOX",
        "gamertag": "RoadTripperX",
        "level": 47,
        "achievementsCount": 41,
        "totalAchievements": 164,
        "lastPlayed": "2026-09-24T21:35:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/ss_cf56e25a0290556ba83229eb0ab370d10be0407c.1920x1080.jpg?t=1788546569",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/ss_00f0090174380eeaf8753bd3d1028b6772c3aebf.1920x1080.jpg?t=1788546569",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/ss_b65236b365315ebb6da6114ce42cd74b59cab3c8.1920x1080.jpg?t=1788546569",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/ss_0a13a7ccd38e7c3e6a5f1720050732833b53b6a8.1920x1080.jpg?t=1788546569"
    ],
    "genres": [
      "Action",
      "Adventure",
      "Racing",
      "Simulation",
      "Sports"
    ],
    "createdAt": "2026-10-03T00:00:00.000Z"
  },
  {
    "id": "game-ea-sports-fc-24",
    "title": "EA SPORTS FC 24",
    "slug": "ea-sports-fc-24",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_600x900.jpg",
    "description": "EA SPORTS FC™ 24 welcomes you to The World’s Game: the most true-to-football experience ever with HyperMotionV, PlayStyles optimised by Opta, and an enhanced Frostbite™ Engine.",
    "platforms": [
      {
        "id": "prog-ea-sports-fc-24-pc-0",
        "platform": "PC",
        "gamertag": "UltimateSquad",
        "level": 34,
        "achievementsCount": 15,
        "totalAchievements": 40,
        "lastPlayed": "2026-10-10T20:15:00.000Z"
      },
      {
        "id": "prog-ea-sports-fc-24-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "UltimateSquad_PS",
        "level": 52,
        "achievementsCount": 24,
        "totalAchievements": 40,
        "lastPlayed": "2026-10-07T21:50:00.000Z"
      },
      {
        "id": "prog-ea-sports-fc-24-xbox-2",
        "platform": "XBOX",
        "gamertag": "UltimateSquadX",
        "level": 21,
        "achievementsCount": 8,
        "totalAchievements": 40,
        "lastPlayed": "2026-09-14T18:40:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2195250/ss_f3d31c7cffc2a6ab42fb76aaac2bc9d5258bc142.1920x1080.jpg?t=1752167366",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2195250/ss_6c1ef918ffe94050e72dcb2cfad3a95ee3d69f08.1920x1080.jpg?t=1752167366",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2195250/ss_eb8f5def662f28726c875e641cd5faff75e6b16d.1920x1080.jpg?t=1752167366",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2195250/ss_96496b17bd35a97ceb926231e963762d3b86c3c8.1920x1080.jpg?t=1752167366"
    ],
    "genres": [
      "Simulation",
      "Sports"
    ],
    "createdAt": "2026-10-03T06:00:00.000Z"
  },
  {
    "id": "game-street-fighter-6",
    "title": "Street Fighter 6",
    "slug": "street-fighter-6",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/library_600x900.jpg",
    "description": "Here comes Capcom’s newest challenger! Street Fighter™ 6 launches worldwide on June 2nd, 2023 and represents the next evolution of the Street Fighter™ series! Street Fighter 6 spans three distinct game modes, including World Tour, Fighting Ground and Battle Hub.",
    "platforms": [
      {
        "id": "prog-street-fighter-6-pc-0",
        "platform": "PC",
        "gamertag": "FrameTrap",
        "level": 58,
        "achievementsCount": 29,
        "totalAchievements": 43,
        "lastPlayed": "2026-10-02T22:20:00.000Z"
      },
      {
        "id": "prog-street-fighter-6-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "FrameTrap_PS",
        "level": 66,
        "achievementsCount": 33,
        "totalAchievements": 43,
        "lastPlayed": "2026-10-11T20:30:00.000Z"
      },
      {
        "id": "prog-street-fighter-6-xbox-2",
        "platform": "XBOX",
        "gamertag": "FrameTrapX",
        "level": 24,
        "achievementsCount": 11,
        "totalAchievements": 43,
        "lastPlayed": "2026-08-30T17:55:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/ss_387137f8cccb048c35a8685634372e97785d40aa.1920x1080.jpg?t=1791866175",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/ss_a381f1b3b450c18900d47b991ce8e7456e9cdba5.1920x1080.jpg?t=1791866175",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/ss_f62ce93269a6d8e0027853358af4d6368e2c4b93.1920x1080.jpg?t=1791866175",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/ss_d186566a92ada8cdb08b04769a8c95cd1e380006.1920x1080.jpg?t=1791866175"
    ],
    "genres": [
      "Action",
      "Adventure"
    ],
    "createdAt": "2026-10-03T12:00:00.000Z"
  },
  {
    "id": "game-mortal-kombat-1",
    "title": "Mortal Kombat 1",
    "slug": "mortal-kombat-1",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/library_600x900.jpg",
    "description": "Discover a reborn Mortal Kombat™ Universe created by the Fire God Liu Kang. Mortal Kombat™ 1 ushers in a new era of the iconic franchise with a new fighting system, game modes, and fatalities!",
    "platforms": [
      {
        "id": "prog-mortal-kombat-1-pc-0",
        "platform": "PC",
        "gamertag": "Kombatant",
        "level": 44,
        "achievementsCount": 21,
        "totalAchievements": 50,
        "lastPlayed": "2026-10-09T21:05:00.000Z"
      },
      {
        "id": "prog-mortal-kombat-1-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "Kombatant_PS",
        "level": 51,
        "achievementsCount": 25,
        "totalAchievements": 50,
        "lastPlayed": "2026-09-28T22:15:00.000Z"
      },
      {
        "id": "prog-mortal-kombat-1-xbox-2",
        "platform": "XBOX",
        "gamertag": "KombatantX",
        "level": 19,
        "achievementsCount": 7,
        "totalAchievements": 50,
        "lastPlayed": "2026-08-22T18:25:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_7eb14734a264570367c607698371e492415f48a4.1920x1080.jpg?t=1778795130",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_29b0a9e87d5a4981d7403994b661c43117a87d84.1920x1080.jpg?t=1778795130",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_18eadd6859ed15531d25cd67fe1d2402e9bf75b3.1920x1080.jpg?t=1778795130",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_02b8c4f08fbf4d1a5affb9e6e64716d63df16760.1920x1080.jpg?t=1778795130"
    ],
    "genres": [
      "Action"
    ],
    "createdAt": "2026-10-03T18:00:00.000Z"
  },
  {
    "id": "game-palworld",
    "title": "Palworld",
    "slug": "palworld",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/library_600x900.jpg",
    "description": "Fight, farm, build and work alongside mysterious creatures called \"Pals\" in this completely new multiplayer, open world survival and crafting game!",
    "platforms": [
      {
        "id": "prog-palworld-pc-0",
        "platform": "PC",
        "gamertag": "PalTamer",
        "level": 67,
        "achievementsCount": 48,
        "totalAchievements": 75,
        "lastPlayed": "2026-09-27T20:40:00.000Z"
      },
      {
        "id": "prog-palworld-xbox-1",
        "platform": "XBOX",
        "gamertag": "PalTamerX",
        "level": 39,
        "achievementsCount": 26,
        "totalAchievements": 75,
        "lastPlayed": "2026-08-21T19:15:00.000Z"
      },
      {
        "id": "prog-palworld-play-2",
        "platform": "PLAYSTATION",
        "gamertag": "PalTamer_PS",
        "level": 22,
        "achievementsCount": 12,
        "totalAchievements": 75,
        "lastPlayed": "2026-10-01T21:25:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/ss_f81b7c4f20be3b99f76a1415c4cdb9b444c99b97.1920x1080.jpg?t=1790336367",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/648ed4266fc18f413292292741304ef648421c55/ss_648ed4266fc18f413292292741304ef648421c55.1920x1080.jpg?t=1790336367",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/ss_b3cea7c9f04a67d784d4c6a0c157a11d6268b189.1920x1080.jpg?t=1790336367",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/cd7b46028d10c21db8fc8217192094d309efcebc/ss_cd7b46028d10c21db8fc8217192094d309efcebc.1920x1080.jpg?t=1790336367"
    ],
    "genres": [
      "Action",
      "Adventure",
      "Indie",
      "RPG"
    ],
    "createdAt": "2026-10-04T00:00:00.000Z"
  },
  {
    "id": "game-lethal-company",
    "title": "Lethal Company",
    "slug": "lethal-company",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/library_600x900.jpg",
    "description": "A co-op horror about scavenging at abandoned moons to sell scrap to the Company.",
    "platforms": [
      {
        "id": "prog-lethal-company-pc-0",
        "platform": "PC",
        "gamertag": "Employee_No7",
        "level": 31,
        "achievementsCount": 14,
        "totalAchievements": 20,
        "lastPlayed": "2026-10-12T23:45:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/ss_78075e9a94675823024f12fce9d69b243cca94f8.1920x1080.jpg?t=1775380053",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/ss_51860be59845771c01a3a4d9ab1ebf773f16fef5.1920x1080.jpg?t=1775380053",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/ss_08fa3ef83b6eb70313119096f82285fa411f02e5.1920x1080.jpg?t=1775380053",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/ss_568d97dfa9d8d3128157d84c9437030ccc1011b0.1920x1080.jpg?t=1775380053"
    ],
    "genres": [
      "Action",
      "Adventure",
      "Indie",
      "Early Access"
    ],
    "createdAt": "2026-10-04T06:00:00.000Z"
  },
  {
    "id": "game-pubg",
    "title": "PUBG: BATTLEGROUNDS",
    "slug": "pubg-battlegrounds",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/library_600x900.jpg",
    "description": "PUBG: BATTLEGROUNDS, the high-stakes winner-take-all shooter that started the Battle Royale craze, is free-to-play! Drop into diverse maps, loot unique weapons and supplies, and survive in an ever-shrinking zone where every turn could be your last.",
    "platforms": [
      {
        "id": "prog-pubg-pc-0",
        "platform": "PC",
        "gamertag": "ChickenDinner",
        "level": 120,
        "achievementsCount": 26,
        "totalAchievements": 37,
        "lastPlayed": "2026-10-08T21:30:00.000Z"
      },
      {
        "id": "prog-pubg-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "ChickenDinner_PS",
        "level": 64,
        "achievementsCount": 14,
        "totalAchievements": 37,
        "lastPlayed": "2026-09-19T20:10:00.000Z"
      },
      {
        "id": "prog-pubg-xbox-2",
        "platform": "XBOX",
        "gamertag": "ChickenDinnerX",
        "level": 45,
        "achievementsCount": 9,
        "totalAchievements": 37,
        "lastPlayed": "2026-08-24T18:55:00.000Z"
      },
      {
        "id": "prog-pubg-mobi-3",
        "platform": "MOBILE",
        "gamertag": "ChickenDinner_Pocket",
        "level": 88,
        "achievementsCount": 21,
        "totalAchievements": 37,
        "lastPlayed": "2026-10-12T13:40:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/c16e2f2d122cae77a1cbaca19263df0f2d2214fa/ss_c16e2f2d122cae77a1cbaca19263df0f2d2214fa.1920x1080.jpg?t=1786493086",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/aa1c51a9b45c88e770b443d8d3cd28f3024b0760/ss_aa1c51a9b45c88e770b443d8d3cd28f3024b0760.1920x1080.jpg?t=1786493086",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/bf9b3de5896d4ec7ef9531938b26946cded81fdf/ss_bf9b3de5896d4ec7ef9531938b26946cded81fdf.1920x1080.jpg?t=1786493086",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/faa4f9f6caa9613f07fd1193a143f66e0fac489c/ss_faa4f9f6caa9613f07fd1193a143f66e0fac489c.1920x1080.jpg?t=1786493086"
    ],
    "genres": [
      "Action",
      "Adventure",
      "Massively Multiplayer",
      "Free To Play"
    ],
    "createdAt": "2026-10-04T12:00:00.000Z"
  },
  {
    "id": "game-dota-2",
    "title": "Dota 2",
    "slug": "dota-2",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/570/library_600x900.jpg",
    "description": "Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it's their 10th hour of play or 1,000th, there's always something new to discover. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has taken on a life of its own.",
    "platforms": [
      {
        "id": "prog-dota-2-pc-0",
        "platform": "PC",
        "gamertag": "HeraldOfAncient",
        "level": 820,
        "achievementsCount": 31,
        "totalAchievements": 50,
        "lastPlayed": "2026-10-12T22:55:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/570/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_ad8eee787704745ccdecdfde3a5cd2733704898d.1920x1080.jpg?t=1791407503",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_7ab506679d42bfc0c0e40639887176494e0466d9.1920x1080.jpg?t=1791407503",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_c9118375a2400278590f29a3537769c986ef6e39.1920x1080.jpg?t=1791407503",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_f9ebafedaf2d5cfb80ef1f74baa18eb08cad6494.1920x1080.jpg?t=1791407503"
    ],
    "genres": [
      "Action",
      "Strategy",
      "Free To Play"
    ],
    "createdAt": "2026-10-04T18:00:00.000Z"
  },
  {
    "id": "game-counter-strike-2",
    "title": "Counter-Strike 2",
    "slug": "counter-strike-2",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/730/library_600x900.jpg",
    "description": "For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.",
    "platforms": [
      {
        "id": "prog-counter-strike-2-pc-0",
        "platform": "PC",
        "gamertag": "ClutchKing",
        "level": 18,
        "achievementsCount": 12,
        "totalAchievements": 25,
        "lastPlayed": "2026-10-11T23:25:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/730/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/9c8b8fd6ebb2c84a1c38541369e6c05db7f1fbe0/ss_9c8b8fd6ebb2c84a1c38541369e6c05db7f1fbe0.1920x1080.jpg?t=1791824795",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/4ef95eed5fcd98c576bf13e024bc6c845b622132/ss_4ef95eed5fcd98c576bf13e024bc6c845b622132.1920x1080.jpg?t=1791824795",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_13bb35638c0267759276f511ee97064773b37a51.1920x1080.jpg?t=1791824795",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_0f8cf82d019c614760fd20801f2bb4001da7ea77.1920x1080.jpg?t=1791824795"
    ],
    "genres": [
      "Action",
      "Free To Play"
    ],
    "createdAt": "2026-10-05T00:00:00.000Z"
  },
  {
    "id": "game-overwatch-2",
    "title": "Overwatch",
    "slug": "overwatch-2",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/library_600x900.jpg",
    "description": "Overwatch®, A FUTURE WORTH FIGHTING FOR! Overwatch® is an always-on and ever-evolving free-to-play, team-based action game set in an optimistic future, where every match is the ultimate 5v5 or 6v6 battlefield brawl.",
    "platforms": [
      {
        "id": "prog-overwatch-2-pc-0",
        "platform": "PC",
        "gamertag": "PayloadProdigy",
        "level": 98,
        "achievementsCount": 62,
        "totalAchievements": 164,
        "lastPlayed": "2026-10-09T20:50:00.000Z"
      },
      {
        "id": "prog-overwatch-2-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "PayloadProdigy_PS",
        "level": 54,
        "achievementsCount": 31,
        "totalAchievements": 164,
        "lastPlayed": "2026-09-26T21:20:00.000Z"
      },
      {
        "id": "prog-overwatch-2-xbox-2",
        "platform": "XBOX",
        "gamertag": "PayloadProdigyX",
        "level": 33,
        "achievementsCount": 17,
        "totalAchievements": 164,
        "lastPlayed": "2026-08-31T19:05:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/c48aa3d3379473f92df5f2665e1a28144900b1f8/ss_c48aa3d3379473f92df5f2665e1a28144900b1f8.1920x1080.jpg?t=1791576843",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/6cea8a8817ae0a8dd5198052ffeba742b1a90b8e/ss_6cea8a8817ae0a8dd5198052ffeba742b1a90b8e.1920x1080.jpg?t=1791576843",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/2830b5babd473e7e76fa522d4c1858386d3acfb1/ss_2830b5babd473e7e76fa522d4c1858386d3acfb1.1920x1080.jpg?t=1791576843",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/b17b61def60cb8b3f693cb3a6b80152f7963b04e/ss_b17b61def60cb8b3f693cb3a6b80152f7963b04e.1920x1080.jpg?t=1791576843"
    ],
    "genres": [
      "Action",
      "Free To Play"
    ],
    "createdAt": "2026-10-05T06:00:00.000Z"
  },
  {
    "id": "game-destiny-2",
    "title": "Destiny 2",
    "slug": "destiny-2",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/library_600x900.jpg",
    "description": "Explore the mysteries of Sol and experience exhilirating first-person shooter combat in Destiny 2. Unlock powerful abilities and collect unique gear across story missions, co-op, and PvP modes.",
    "platforms": [
      {
        "id": "prog-destiny-2-pc-0",
        "platform": "PC",
        "gamertag": "Guardian",
        "level": 76,
        "achievementsCount": 15,
        "totalAchievements": 23,
        "lastPlayed": "2026-10-10T22:10:00.000Z"
      },
      {
        "id": "prog-destiny-2-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "Guardian_PS",
        "level": 61,
        "achievementsCount": 11,
        "totalAchievements": 23,
        "lastPlayed": "2026-09-22T20:35:00.000Z"
      },
      {
        "id": "prog-destiny-2-xbox-2",
        "platform": "XBOX",
        "gamertag": "GuardianX",
        "level": 38,
        "achievementsCount": 6,
        "totalAchievements": 23,
        "lastPlayed": "2026-08-17T18:20:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/d7038cee22b9de60003e7bbc07d65069ad6044ab/ss_d7038cee22b9de60003e7bbc07d65069ad6044ab.1920x1080.jpg?t=1781815889",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/766aedcb8d2eb8fcb08002919ee10f5ac6c02d79/ss_766aedcb8d2eb8fcb08002919ee10f5ac6c02d79.1920x1080.jpg?t=1781815889",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/d3a51ac12ac9b30af96b7e7a5bcef8f56abf5ca4/ss_d3a51ac12ac9b30af96b7e7a5bcef8f56abf5ca4.1920x1080.jpg?t=1781815889",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/2349f3a573a24b1b655c6572cac875dc5b2a614b/ss_2349f3a573a24b1b655c6572cac875dc5b2a614b.1920x1080.jpg?t=1781815889"
    ],
    "genres": [
      "Action",
      "Adventure",
      "Free To Play"
    ],
    "createdAt": "2026-10-05T12:00:00.000Z"
  },
  {
    "id": "game-rainbow-six-siege",
    "title": "Tom Clancy's Rainbow Six Siege",
    "slug": "tom-clancys-rainbow-six-siege",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/359550/library_600x900.jpg",
    "description": "Tom Clancy's Rainbow Six Siege is an elite, tactical team-based shooter where superior planning and execution triumph.",
    "platforms": [
      {
        "id": "prog-rainbow-six-siege-pc-0",
        "platform": "PC",
        "gamertag": "SiegeMain",
        "level": 240,
        "achievementsCount": 30,
        "totalAchievements": 48,
        "lastPlayed": "2026-10-07T21:45:00.000Z"
      },
      {
        "id": "prog-rainbow-six-siege-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "SiegeMain_PS",
        "level": 115,
        "achievementsCount": 16,
        "totalAchievements": 48,
        "lastPlayed": "2026-09-11T20:20:00.000Z"
      },
      {
        "id": "prog-rainbow-six-siege-xbox-2",
        "platform": "XBOX",
        "gamertag": "SiegeMainX",
        "level": 67,
        "achievementsCount": 9,
        "totalAchievements": 48,
        "lastPlayed": "2026-08-05T17:50:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/359550/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/2efed3587d876f560cbf3f25d9a72fbd387b74e6/ss_2efed3587d876f560cbf3f25d9a72fbd387b74e6.1920x1080.jpg?t=1792001976",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/ee34a63203916d39dc50d96c14aefc24dc3ff34e/ss_ee34a63203916d39dc50d96c14aefc24dc3ff34e.1920x1080.jpg?t=1792001976",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/00fb4ac1f236cfd2e364ebfecb599a30b72560fe/ss_00fb4ac1f236cfd2e364ebfecb599a30b72560fe.1920x1080.jpg?t=1792001976",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/0fa7bb7203d3839f29861c4b5e2436cd2694291b/ss_0fa7bb7203d3839f29861c4b5e2436cd2694291b.1920x1080.jpg?t=1792001976"
    ],
    "genres": [
      "Action",
      "Free To Play"
    ],
    "createdAt": "2026-10-05T18:00:00.000Z"
  },
  {
    "id": "game-assassins-creed-mirage",
    "title": "Assassin's Creed Mirage",
    "slug": "assassins-creed-mirage",
    "thumbnail": "https://cdn.cloudflare.steamstatic.com/steam/apps/3035570/library_600x900.jpg",
    "description": "Become a deadly Master Assassin in this action-adventure game. Explore the streets of ninth-century Baghdad through the eyes of Basim. Take down your targets while seeking justice as part of the Hidden Ones.",
    "platforms": [
      {
        "id": "prog-assassins-creed-mirage-pc-0",
        "platform": "PC",
        "gamertag": "HiddenOne",
        "level": 42,
        "achievementsCount": 33,
        "totalAchievements": 61,
        "lastPlayed": "2026-09-25T20:30:00.000Z"
      },
      {
        "id": "prog-assassins-creed-mirage-play-1",
        "platform": "PLAYSTATION",
        "gamertag": "HiddenOne_PS",
        "level": 37,
        "achievementsCount": 28,
        "totalAchievements": 61,
        "lastPlayed": "2026-10-03T21:40:00.000Z"
      },
      {
        "id": "prog-assassins-creed-mirage-xbox-2",
        "platform": "XBOX",
        "gamertag": "HiddenOneX",
        "level": 16,
        "achievementsCount": 10,
        "totalAchievements": 61,
        "lastPlayed": "2026-08-19T18:05:00.000Z"
      }
    ],
    "thumbnails": [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/3035570/library_600x900.jpg",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3035570/7333a21ec2f874f5b5a09064b1770852bb269b86/ss_7333a21ec2f874f5b5a09064b1770852bb269b86.1920x1080.jpg?t=1786637416",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3035570/c57033e45330656cda1316de6dbd67bec7a8bcdd/ss_c57033e45330656cda1316de6dbd67bec7a8bcdd.1920x1080.jpg?t=1786637416",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3035570/94c88c2c51d78930b4f1a9307eb92c3687e2eda8/ss_94c88c2c51d78930b4f1a9307eb92c3687e2eda8.1920x1080.jpg?t=1786637416",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3035570/623373b7bfa16381e083cd713c9743f1da8bb5ec/ss_623373b7bfa16381e083cd713c9743f1da8bb5ec.1920x1080.jpg?t=1786637416"
    ],
    "genres": [
      "Action",
      "Adventure"
    ],
    "createdAt": "2026-10-06T00:00:00.000Z"
  }
];
