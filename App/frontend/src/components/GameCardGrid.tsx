import { useCallback, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GameCard from './GameCard.tsx';
import type { Game } from '../services/api.ts';
import { hashSeed, seeded } from '../lib/random.ts';

const FULL_TOP = 0.2;
const FULL_BOTTOM = 0.55;
const TILT_RATIO = 0.22;
const MAX_TILT = 7;
const MIN_SCALE = 0.5;

interface Entry {
  element: HTMLDivElement;
  centerY: number;
  scale: number;
  rotate: number;
  tiltMul: number;
}

interface GameCardGridProps {
  games: Game[];
  onOpenGame: (game: Game) => void;
}

interface ScrollCardProps {
  game: Game;
  onOpenGame: (game: Game) => void;
  register: (id: string, element: HTMLDivElement | null) => void;
}

function documentCenterY(element: HTMLElement): number {
  let y = 0;
  let node: HTMLElement | null = element;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y + element.offsetHeight / 2;
}

function ScrollCard({ game, onOpenGame, register }: ScrollCardProps) {
  const ref = useCallback(
    (element: HTMLDivElement | null) => register(game.id, element),
    [register, game.id]
  );
  const reduced = useReducedMotion();

  const rand = seeded(hashSeed(`${game.id}:enter`));
  const entrance = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      }
    : {
        initial: {
          opacity: 0,
          x: (rand() * 2 - 1) * 16,
          y: 26 + rand() * 26,
          scale: 0.85 + rand() * 0.05,
        },
        animate: { opacity: 1, x: 0, y: 0, scale: 1 },
        transition: {
          type: 'spring' as const,
          stiffness: 200 + rand() * 140,
          damping: 16 + rand() * 11,
          delay: 0.05 + rand() * 0.4,
        },
      };

  return (
    <motion.div layout className="h-full" {...entrance}>
      <div ref={ref} className="h-full">
        <GameCard game={game} onOpen={onOpenGame} />
      </div>
    </motion.div>
  );
}

export default function GameCardGrid({ games, onOpenGame }: GameCardGridProps) {
  const reduced = useReducedMotion();
  const registry = useRef(new Map<string, Entry>());

  const register = useCallback((id: string, element: HTMLDivElement | null) => {
    const entries = registry.current;
    if (element) {
      const existing = entries.get(id);
      if (existing?.element === element) return;
      entries.set(id, {
        element,
        centerY: documentCenterY(element),
        scale: existing?.scale ?? 1,
        rotate: existing?.rotate ?? 0,
        tiltMul: existing?.tiltMul ?? 0.7 + seeded(hashSeed(`${id}:tilt`))() * 0.6,
      });
    } else {
      entries.delete(id);
    }
  }, []);

  useEffect(() => {
    if (reduced) return;
    const entries = registry.current;
    let frame = 0;
    let dirty = true;

    const measure = () => {
      for (const entry of entries.values()) {
        entry.centerY = documentCenterY(entry.element);
      }
      dirty = true;
    };

    const apply = () => {
      frame = 0;
      if (!dirty) return;
      dirty = false;
      const viewportH = window.innerHeight;
      const scrollY = window.scrollY;
      for (const entry of entries.values()) {
        const p = (entry.centerY - scrollY) / viewportH;
        let scale = 1;
        let rotate = 0;
        if (p < FULL_TOP) {
          const u = Math.min((FULL_TOP - p) / FULL_TOP, 1);
          scale = 1 - (1 - MIN_SCALE) * u;
          const tiltT = Math.min((FULL_TOP - p) / TILT_RATIO, 1);
          rotate = -MAX_TILT * entry.tiltMul * tiltT;
        } else if (p > FULL_BOTTOM) {
          const u = Math.min((p - FULL_BOTTOM) / (1 - FULL_BOTTOM), 1);
          scale = 1 - (1 - MIN_SCALE) * u;
          const tiltT = Math.min((p - FULL_BOTTOM) / TILT_RATIO, 1);
          rotate = MAX_TILT * entry.tiltMul * tiltT;
        }
        if (Math.abs(scale - entry.scale) < 0.002 && Math.abs(rotate - entry.rotate) < 0.05) {
          continue;
        }
        entry.scale = scale;
        entry.rotate = rotate;
        entry.element.style.transform = `scale(${scale.toFixed(3)}) rotate(${rotate.toFixed(2)}deg)`;
      }
    };

    const schedule = () => {
      dirty = true;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    apply();
    const settle = window.setTimeout(onResize, 500);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(settle);
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced, games]);

  return (
    <motion.div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {games.map((game) => (
        <ScrollCard
          key={game.id}
          game={game}
          onOpenGame={onOpenGame}
          register={register}
        />
      ))}
    </motion.div>
  );
}
