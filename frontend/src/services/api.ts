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
  thumbnails: string[];
  genres: string[];
  description: string;
  platforms: PlatformProgress[];
  createdAt: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001/api/v1';

export async function fetchGames(): Promise<Game[]> {
  const response = await fetch(`${API_BASE}/games`);
  if (!response.ok) {
    throw new Error(`Failed to load games (HTTP ${response.status})`);
  }
  return response.json();
}

export async function fetchPopularGames(): Promise<Game[]> {
  const response = await fetch(`${API_BASE}/games/popular-games`);
  if (!response.ok) {
    throw new Error(`Failed to load popular games (HTTP ${response.status})`);
  }
  return response.json();
}

export async function addGame(slug: string): Promise<Game> {
  const response = await fetch(`${API_BASE}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug }),
  });
  if (!response.ok) {
    throw new Error(`Failed to add game (HTTP ${response.status})`);
  }
  return response.json();
}

export async function fetchGame(id: string): Promise<Game> {
  const response = await fetch(`${API_BASE}/games/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to load game (HTTP ${response.status})`);
  }
  return response.json();
}
