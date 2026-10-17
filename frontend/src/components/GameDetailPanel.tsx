import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AtSign, BarChart3, ChevronDown, Layers, Lock, Trophy, X } from 'lucide-react';
import { fetchGame } from '../services/api.ts';
import type { Game } from '../services/api.ts';
import {
  PLATFORM_BG,
  PLATFORM_PILL,
  PLATFORM_STROKE,
  PLATFORM_TEXT,
} from './platformTheme.ts';

interface GameDetailPanelProps {
  game: Game | null;
  onClose: () => void;
}

const DONUT_RADIUS = 54;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

function achievementPct(achievementsCount: number, totalAchievements: number): number {
  if (!totalAchievements) return 0;
  return Math.round((achievementsCount / totalAchievements) * 100);
}

export default function GameDetailPanel({ game, onClose }: GameDetailPanelProps) {
  const [detail, setDetail] = useState<Game | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(true);

  useEffect(() => {
    if (!game) {
      setDetail(null);
      return;
    }
    setDetail(null);
    setShowAnalytics(true);
    let cancelled = false;
    fetchGame(game.id)
      .then((fresh) => {
        if (!cancelled) setDetail(fresh);
      })
      .catch(() => {
        return undefined;
      });
    return () => {
      cancelled = true;
    };
  }, [game]);

  useEffect(() => {
    if (!game) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [game, onClose]);

  const active = detail ?? game;
  const platforms = active?.platforms ?? [];
  const byLevel = [...platforms].sort((a, b) => b.level - a.level);
  const peak = byLevel[0];
  const lowest = byLevel[byLevel.length - 1];
  const levelGap = peak && lowest ? peak.level - lowest.level : 0;
  const pctGap =
    peak && lowest
      ? achievementPct(peak.achievementsCount, peak.totalAchievements) -
        achievementPct(lowest.achievementsCount, lowest.totalAchievements)
      : 0;
  const maxLevel = platforms.reduce((max, p) => Math.max(max, p.level), 0) || 1;
  const totalUnlocked = platforms.reduce((sum, p) => sum + p.achievementsCount, 0);

  let arcOffset = 0;
  const arcs = platforms
    .filter((p) => totalUnlocked > 0 && p.achievementsCount > 0)
    .map((progress) => {
      const fraction = progress.achievementsCount / totalUnlocked;
      const arc = {
        key: progress.id,
        platform: progress.platform,
        dash: fraction * DONUT_CIRCUMFERENCE,
        offset: arcOffset,
      };
      arcOffset += arc.dash;
      return arc;
    });

  return (
    <AnimatePresence>
      {game && active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} details`}
        >
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="absolute inset-y-0 right-0 flex w-full flex-col border-l border-outline bg-surface/95 backdrop-blur-2xl sm:w-[70vw]"
          >
            <div className="relative h-44 shrink-0 overflow-hidden sm:h-56">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${active.thumbnail}')` }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close game details"
                className="absolute top-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-colors duration-200 hover:bg-black/80"
              >
                <X size={18} />
              </button>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="flex flex-wrap gap-1.5">
                  {platforms.map((progress) => (
                    <span
                      key={progress.id}
                      className={`rounded-full border px-2.5 py-0.5 text-[0.64rem] font-bold tracking-wider ${PLATFORM_PILL[progress.platform]}`}
                    >
                      {progress.platform}
                    </span>
                  ))}
                </div>

                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)] sm:text-3xl">
                  {active.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {peak && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-bold text-white/90 backdrop-blur-md">
                      <AtSign size={12} className="text-highlight" />
                      {peak.gamertag}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-bold text-white/90 backdrop-blur-md">
                    <Layers size={12} className="text-highlight" />
                    {platforms.length} active {platforms.length === 1 ? 'platform' : 'platforms'}
                  </span>
                  {peak && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/50 bg-black/55 px-3 py-1 text-xs font-bold text-secondary backdrop-blur-md">
                      <Trophy size={12} />
                      Peak LV {peak.level}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="px-5 pt-4 sm:px-6">
                <p className="text-sm leading-relaxed text-on-surface-secondary">
                  {active.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 px-5 py-4 sm:px-6">
                <button
                  type="button"
                  disabled
                  title="Credentials vault — arriving in a later slice, behind a session"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-gradient-to-r from-primary to-highlight px-5 py-2.5 text-sm font-bold text-white opacity-55 shadow-[0_4px_18px_rgba(34,211,238,0.3)]"
                >
                  <Lock size={15} />
                  Check Login Details
                </button>

                <button
                  type="button"
                  onClick={() => setShowAnalytics((value) => !value)}
                  aria-expanded={showAnalytics}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition-colors duration-200 ${
                    showAnalytics
                      ? 'border-primary/60 bg-primary/15 text-primary'
                      : 'border-outline bg-surface-raised text-on-surface-secondary hover:text-on-surface'
                  }`}
                >
                  <BarChart3 size={15} />
                  Cross-Platform Analytics
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${showAnalytics ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              <AnimatePresence initial={false}>
                {showAnalytics && (
                  <motion.section
                    key="analytics"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                    aria-label="Cross-platform comparison"
                  >
                    <div className="border-t border-outline px-5 pt-4 pb-8 sm:px-6">
                      {platforms.length >= 2 && peak && lowest && (
                        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-highlight/40 bg-highlight/10 p-3.5">
                          <BarChart3 size={17} className="mt-0.5 shrink-0 text-highlight" />
                          <p className="text-sm leading-relaxed text-on-surface">
                            {levelGap > 0 ? (
                              <>
                                <strong className="font-extrabold text-highlight">
                                  {peak.platform}
                                </strong>{' '}
                                leads{' '}
                                <strong className="font-extrabold text-on-surface">
                                  {lowest.platform}
                                </strong>{' '}
                                by{' '}
                                <strong className="font-extrabold text-highlight">
                                  {levelGap} {levelGap === 1 ? 'level' : 'levels'}
                                </strong>
                                {pctGap !== 0 && (
                                  <>
                                    {' '}
                                    — a <strong className="font-extrabold">{pctGap}%</strong>{' '}
                                    achievement gap
                                  </>
                                )}
                                .
                              </>
                            ) : (
                              <>Progress is dead even across every linked platform.</>
                            )}
                          </p>
                        </div>
                      )}

                      {platforms.length === 0 && (
                        <p className="py-3 text-center text-sm text-on-surface-muted">
                          No platforms linked yet.
                        </p>
                      )}

                      {platforms.length > 0 && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl border border-outline bg-surface-raised p-4">
                            <h4 className="text-[0.7rem] font-bold tracking-widest text-on-surface-muted uppercase">
                              Level comparison
                            </h4>
                            <div className="mt-4 flex flex-col gap-3">
                              {platforms.map((progress, index) => (
                                <div key={progress.id} className="flex items-center gap-3">
                                  <span
                                    className={`w-24 shrink-0 text-[0.64rem] font-bold tracking-wider ${PLATFORM_TEXT[progress.platform]}`}
                                  >
                                    {progress.platform}
                                  </span>
                                  <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-outline/40">
                                    <motion.div
                                      className={`h-full rounded-full ${PLATFORM_BG[progress.platform]}`}
                                      initial={{ width: 0 }}
                                      animate={{
                                        width: `${(progress.level / maxLevel) * 100}%`,
                                      }}
                                      transition={{
                                        duration: 0.9,
                                        delay: 0.1 + index * 0.08,
                                        ease: 'easeOut',
                                      }}
                                    />
                                  </div>
                                  <span className="w-7 shrink-0 text-right text-xs font-extrabold text-on-surface">
                                    {progress.level}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-2xl border border-outline bg-surface-raised p-4">
                            <h4 className="text-[0.7rem] font-bold tracking-widest text-on-surface-muted uppercase">
                              Achievement share
                            </h4>
                            <div className="mt-3 flex items-center gap-4">
                              <div className="relative h-32 w-32 shrink-0">
                                <svg
                                  viewBox="0 0 140 140"
                                  className="absolute inset-0 h-full w-full -rotate-90"
                                  aria-hidden="true"
                                >
                                  <circle
                                    cx="70"
                                    cy="70"
                                    r={DONUT_RADIUS}
                                    fill="none"
                                    strokeWidth="16"
                                    className="stroke-outline/40"
                                  />
                                  {arcs.map((arc, index) => (
                                    <motion.circle
                                      key={arc.key}
                                      cx="70"
                                      cy="70"
                                      r={DONUT_RADIUS}
                                      fill="none"
                                      strokeWidth="16"
                                      strokeLinecap="butt"
                                      className={PLATFORM_STROKE[arc.platform]}
                                      strokeDasharray={`${arc.dash} ${DONUT_CIRCUMFERENCE - arc.dash}`}
                                      strokeDashoffset={-arc.offset}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ duration: 0.4, delay: 0.15 + index * 0.12 }}
                                    />
                                  ))}
                                </svg>
                                <div className="absolute inset-0 grid place-items-center text-center">
                                  <div>
                                    <div className="text-2xl leading-none font-extrabold text-on-surface">
                                      {totalUnlocked}
                                    </div>
                                    <div className="mt-1 text-[0.56rem] font-bold tracking-widest text-on-surface-muted uppercase">
                                      Unlocked
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex min-w-0 flex-1 flex-col gap-2">
                                {platforms.map((progress) => (
                                  <div
                                    key={progress.id}
                                    className="flex items-center gap-2 text-xs"
                                  >
                                    <span
                                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${PLATFORM_BG[progress.platform]}`}
                                      aria-hidden="true"
                                    />
                                    <span className="truncate text-on-surface-secondary">
                                      {progress.platform}
                                    </span>
                                    <span className="ml-auto font-extrabold text-on-surface">
                                      {progress.achievementsCount}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {platforms.map((progress, index) => {
                          const pct = achievementPct(
                            progress.achievementsCount,
                            progress.totalAchievements
                          );
                          return (
                            <motion.div
                              key={progress.id}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.05 * index,
                                ease: 'easeOut',
                              }}
                              className="rounded-2xl border border-outline bg-surface-raised p-4"
                            >
                              <span
                                className={`inline-block rounded-full border px-2.5 py-0.5 text-[0.64rem] font-bold tracking-wider ${PLATFORM_PILL[progress.platform]}`}
                              >
                                {progress.platform}
                              </span>

                              <div className="mt-3 flex items-center gap-1.5 text-xs text-on-surface-secondary">
                                <AtSign size={12} className="text-on-surface-muted" />
                                {progress.gamertag}
                              </div>

                              <div className="mt-3 flex items-end justify-between">
                                <div>
                                  <div
                                    className={`text-3xl leading-none font-extrabold ${PLATFORM_TEXT[progress.platform]}`}
                                  >
                                    {progress.level}
                                  </div>
                                  <div className="mt-1 text-[0.6rem] font-bold tracking-widest text-on-surface-muted uppercase">
                                    Level
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg leading-none font-extrabold text-on-surface">
                                    {pct}%
                                  </div>
                                  <div className="mt-1 text-[0.6rem] font-bold tracking-widest text-on-surface-muted uppercase">
                                    Unlocked
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-outline/50">
                                <motion.div
                                  className="h-full rounded-full bg-gradient-to-r from-primary via-highlight to-secondary shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{
                                    duration: 0.9,
                                    delay: 0.15 + 0.05 * index,
                                    ease: 'easeOut',
                                  }}
                                />
                              </div>

                              <div className="mt-2 flex items-center justify-between text-[0.66rem] text-on-surface-muted">
                                <span>
                                  {progress.achievementsCount}/{progress.totalAchievements}{' '}
                                  achievements
                                </span>
                                <span>
                                  Last played {new Date(progress.lastPlayed).toLocaleDateString()}
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
