import { AnimatePresence, motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { AtSign } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { Game } from '../services/api.ts';
import { PLATFORM_PILL } from './platformTheme.ts';
import { useSlideGallery } from '../hooks/useSlideGallery.ts';
import { hashSeed, seeded } from '../lib/random.ts';

const PALETTES = [
  'linear-gradient(160deg, #1e3a8a 0%, #2563eb 55%, #0ea5e9 100%)',
  'linear-gradient(160deg, #7c2d12 0%, #ea580c 50%, #f59e0b 100%)',
  'linear-gradient(160deg, #4c1d95 0%, #7c3aed 50%, #db2777 100%)',
  'linear-gradient(160deg, #065f46 0%, #059669 50%, #84cc16 100%)',
  'linear-gradient(160deg, #0f172a 0%, #334155 50%, #64748b 100%)',
];

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

  const slides = (game.thumbnails.length > 0 ? game.thumbnails : [game.thumbnail]).filter(
    Boolean
  );
  const rootRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          element.dataset.sheen = entry.isIntersecting ? 'on' : 'off';
        }
      },
      { rootMargin: '80px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  let phase = 0;
  for (const ch of game.id) phase = (phase * 31 + ch.charCodeAt(0)) % 2400;
  const { index: slideIndex, ready } = useSlideGallery(slides, {
    phaseMs: phase,
    target: rootRef,
  });
  const hasAnyThumbnail = slides.length > 0;
  const slideReady = hasAnyThumbnail && ready[slideIndex];
  const artStyle: CSSProperties = {
    backgroundImage: `url('${slides[slideIndex] ?? ''}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const rand = seeded(hashSeed(`${game.id}:look`));
  const tiltAngle = 8 + Math.round(rand() * 5);
  const hoverScale = 1.02 + rand() * 0.04;
  const glareOpacity = 0.28 + rand() * 0.17;
  const barDelay = 0.25 + rand() * 0.85;
  const barDuration = 0.8 + rand() * 0.6;
  const cardStyle = {
    '--sheen-dur': `${(6 + rand() * 5).toFixed(1)}s`,
    '--sheen-delay': `-${(rand() * 9).toFixed(1)}s`,
  } as CSSProperties;

  return (
    <Tilt
      className="h-full overflow-hidden rounded-3xl"
      tiltEnable
      tiltMaxAngleX={tiltAngle}
      tiltMaxAngleY={tiltAngle}
      scale={hoverScale}
      glareEnable
      glareMaxOpacity={glareOpacity}
      glareColor="rgba(59,130,246,0.5)"
      glarePosition="all"
      transitionSpeed={340 + Math.round(rand() * 140)}
    >
      <button
        type="button"
        ref={rootRef}
        onClick={() => onOpen?.(game)}
        aria-label={`Open ${game.title}`}
        style={cardStyle}
        className="card-frame group relative flex h-full min-h-72 w-full flex-col overflow-hidden text-left"
      >
        <div
          className="game-thumb absolute inset-0"
          style={{ background: paletteFor(game.id) }}
          aria-hidden="true"
        />
        <AnimatePresence initial={false}>
          {slideReady && (
            <motion.div
              key={slideIndex}
              className="game-thumb absolute inset-0"
              style={artStyle}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {!hasAnyThumbnail && (
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

        <span className="absolute top-3 left-3 z-[2] flex items-center gap-1.5" aria-hidden="true">
          {slides.map((_, position) => (
            <span
              key={position}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                position === slideIndex
                  ? 'w-5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                  : 'w-2.5 bg-white/40'
              }`}
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
                  transition={{ duration: barDuration, delay: barDelay, ease: 'easeOut' }}
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
