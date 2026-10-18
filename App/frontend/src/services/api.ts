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

const TOKEN_KEY = 'vq-session-token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(email: string): Promise<{ token: string; user: SessionUser }> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error(`Could not sign you in (HTTP ${response.status})`);
  }
  const data = await response.json();
  setToken(data.token);
  return data;
}

export async function fetchSession(): Promise<{ user: SessionUser }> {
  const response = await fetch(`${API_BASE}/auth/session`, { headers: authHeaders() });
  if (response.status === 401) {
    setToken(null);
    throw new UnauthorizedError();
  }
  if (!response.ok) {
    throw new Error(`Session check failed (HTTP ${response.status})`);
  }
  return response.json();
}

export async function logout(): Promise<void> {
  await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: authHeaders(),
  }).catch(() => undefined);
  setToken(null);
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Not signed in');
    this.name = 'UnauthorizedError';
  }
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
