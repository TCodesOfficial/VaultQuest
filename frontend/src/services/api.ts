export type Platform = 'PLAYSTATION' | 'XBOX' | 'PC' | 'MOBILE';

export interface PlatformProgress {
  id: string;
  platform: Platform;
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

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001/api/v1';

export async function fetchGames(): Promise<Game[]> {
  const response = await fetch(`${API_BASE}/games`);
  if (!response.ok) {
    throw new Error(`Failed to load games (HTTP ${response.status})`);
  }
  return response.json();
}
