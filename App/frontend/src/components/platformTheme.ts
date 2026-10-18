import type { Platform } from '../services/api.ts';

export const PLATFORM_PILL: Record<Platform, string> = {
  PLAYSTATION: 'border-primary/50 bg-primary/15 text-primary',
  XBOX: 'border-success/50 bg-success/15 text-success',
  PC: 'border-highlight/50 bg-highlight/15 text-highlight',
  MOBILE: 'border-tertiary/50 bg-tertiary/15 text-tertiary',
};

export const PLATFORM_DOT: Record<Platform, string> = {
  PLAYSTATION: 'bg-primary',
  XBOX: 'bg-success',
  PC: 'bg-highlight',
  MOBILE: 'bg-tertiary',
};

export const PLATFORM_TEXT: Record<Platform, string> = {
  PLAYSTATION: 'text-primary',
  XBOX: 'text-success',
  PC: 'text-highlight',
  MOBILE: 'text-tertiary',
};

export const PLATFORM_BG: Record<Platform, string> = {
  PLAYSTATION: 'bg-primary',
  XBOX: 'bg-success',
  PC: 'bg-highlight',
  MOBILE: 'bg-tertiary',
};

export const PLATFORM_STROKE: Record<Platform, string> = {
  PLAYSTATION: 'stroke-primary',
  XBOX: 'stroke-success',
  PC: 'stroke-highlight',
  MOBILE: 'stroke-tertiary',
};
