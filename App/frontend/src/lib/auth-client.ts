import { createAuthClient } from 'better-auth/react';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001/api/v1';
const AUTH_BASE = API_BASE.replace(/\/api\/v1\/?$/, '/api/auth');

export const authClient = createAuthClient({
  baseURL: AUTH_BASE,
  fetchOptions: { credentials: 'include' },
});
