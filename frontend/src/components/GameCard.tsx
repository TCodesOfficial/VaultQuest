import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { AtSign } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Game, Platform } from '../services/api.ts';

const PALETTES = [
  'linear-gradient(160deg, #1e3a8a 0%, #2563eb 55%, #0ea5e9 100%)',
  'linear-gradient(160deg, #7c2d12 0%, #ea580c 50%, #f59e0b 100%)',
  'linear-gradient(160deg, #4c1d95 0%, #7c3aed 50%, #db2777 100%)',
  'linear-gradient(160deg, #065f46 0%, #059669 50%, #84cc16 100%)',
  'linear-gradient(160deg, #0f172a 0%, #334155 50%, #64748b 100%)',
];

const PLATFORM_PILL: Record<Platform, string> = {
  PLAYSTATION: 'border-primary/50 bg-primary/15 text-primary',
  XBOX: 'border-success/50 bg-success/15 text-success',
  PC: 'border-highlight/50 bg-highlight/15 text-highlight',
  MOBILE: 'border-tertiary/50 bg-tertiary/15 text-tertiary',
};

const PLATFORM_DOT: Record<Platform, string> = {
  PLAYSTATION: 'bg-primary',
  XBOX: 'bg-success',
  PC: 'bg-highlight',
  MOBILE: 'bg-tertiary',
};

function paletteFor(id: string): string {
  let hash = 0;
  for (const ch of id) {
    hash = (hash * 31 + ch.charCodeAt(0)) % PALETTES.length;
  }
  return PALETTES[hash];
}

interface GameCardProps {
  game: Game;
  onOpen?: (game: Game) => void;
}

export default function GameCard({ game, onOpen }: GameCardProps) {
  const topProgress = [...game.platforms].sort((a, b) => b.level - a.level)[0];
  const topAchievementProgress = [...game.platforms].sort(
    (a, b) =>
      b.achievementsCount / b.totalAchievements - a.achievementsCount / a.totalAchievements
  )[0];
  const achievementPct = topAchievementProgress
    ? Math.round(
        (topAchievementProgress.achievementsCount / topAchievementProgress.totalAchievements) * 100
      )
    : 0;

  const initials = game.title
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const hasThumbnail = Boolean(game.thumbnail);
  const artStyle: CSSProperties = hasThumbnail
    ? {
        backgroundImage: `url('${game.thumbnail}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { background: paletteFor(game.id) };

  return (
    <Tilt
      className="h-full overflow-hidden rounded-3xl"
      tiltEnable
      tiltMaxAngleX={11}
      tiltMaxAngleY={11}
      scale={1.03}
      glareEnable
      glareMaxOpacity={0.4}
      glareColor="rgba(59,130,246,0.5)"
      glarePosition="all"
      transitionSpeed={400}
    >
      <button
        type="button"
        onClick={() => onOpen?.(game)}
        aria-label={`Open ${game.title}`}
        className="card-frame group relative flex h-full min-h-72 w-full flex-col overflow-hidden text-left"
      >
        <div className="game-thumb absolute inset-0" style={artStyle} aria-hidden="true" />

        {!hasThumbnail && (
          <div
            className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center pb-32"
            aria-hidden="true"
          >
            <span className="text-6xl font-extrabold tracking-tight text-white/85 drop-shadow-[0_6px_26px_rgba(0,0,0,0.55)]">
              {initials}
            </span>
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-56 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-ink-950/0 transition-colors duration-300 group-hover:bg-ink-950/60"
          aria-hidden="true"
        />

        <span className="absolute top-3 left-3 z-[2] flex gap-1.5" aria-hidden="true">
          {game.platforms.map((progress) => (
            <span
              key={progress.id}
              className={`h-2.5 w-2.5 rounded-full border-2 border-ink-950/70 ${PLATFORM_DOT[progress.platform]}`}
            />
          ))}
        </span>

        {topProgress && (
          <span className="absolute top-3 right-3 z-[2] rounded-full border border-secondary/60 bg-ink-950/80 px-2.5 py-1 text-[0.7rem] font-bold tracking-widest text-secondary shadow-[0_0_18px_rgba(245,158,11,0.25)]">
            LV {topProgress.level}
          </span>
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-5 z-[2] hidden justify-center px-4 md:flex"
          aria-hidden="true"
        >
          <span className="max-w-full truncate rounded-full border border-white/15 bg-ink-950/65 px-4 py-1.5 text-sm font-bold tracking-tight text-white shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
            {game.title}
          </span>
        </div>

        <div className="relative z-[2] mt-auto w-full p-4 md:pb-16">
          <div className="text-base font-bold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] transition-colors duration-200 group-hover:text-highlight md:hidden">
            {game.title}
          </div>

          <div className="mt-2 overflow-hidden opacity-100 transition-all duration-300 ease-out md:mt-1 md:opacity-0 md:group-hover:mt-2 md:group-hover:opacity-100 md:group-focus-visible:mt-2 md:group-focus-visible:opacity-100">
            <div className="flex items-center gap-1.5 text-sm text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
              <AtSign size={13} className="text-highlight" />
              {topProgress ? topProgress.gamertag : 'No linked platforms'}
            </div>

            <div className="mt-2 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[0.68rem] tracking-wide text-white/60 uppercase">
                <span>Achievements</span>
                <strong className="font-semibold text-white/90">{achievementPct}%</strong>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-highlight to-secondary shadow-[0_0_10px_rgba(34,211,238,0.55)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${achievementPct}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {game.platforms.map((progress) => (
                <span
                  key={progress.id}
                  className={`rounded-full border px-2.5 py-0.5 text-[0.64rem] font-bold tracking-wider ${PLATFORM_PILL[progress.platform]}`}
                >
                  {progress.platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>
    </Tilt>
  );
}
