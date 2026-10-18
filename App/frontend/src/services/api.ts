import { authClient } from '../lib/auth-client.ts';

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

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
}

interface BetterAuthUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
}

function toSessionUser(user: BetterAuthUser): SessionUser {
  return { id: user.id, email: user.email, name: user.name, avatar: user.image ?? null };
}

export async function signIn(email: string, password: string): Promise<SessionUser> {
  const { data, error } = await authClient.signIn.email({ email, password });
  if (error) {
    throw new Error(error.message ?? 'Could not sign you in');
  }
  return toSessionUser(data.user);
}

export async function signUp(name: string, email: string, password: string): Promise<SessionUser> {
  const { data, error } = await authClient.signUp.email({ name, email, password });
  if (error) {
    if (/exist/i.test(error.message ?? '')) {
      throw new Error('That email is already registered — sign in instead.');
    }
    throw new Error(error.message ?? 'Could not create your account');
  }
  return toSessionUser(data.user);
}

export async function fetchSession(): Promise<SessionUser | null> {
  const { data } = await authClient.getSession();
  return data?.user ? toSessionUser(data.user) : null;
}

export async function logout(): Promise<void> {
  await authClient.signOut().catch(() => undefined);
}

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
