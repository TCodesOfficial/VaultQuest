import { useCallback, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import GameCard from './GameCard.tsx';
import type { Game } from '../services/api.ts';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
};

const TILT_START = 0.06;
const MAX_TILT = 7;
const MIN_SCALE = 0.74;

interface Entry {
  element: HTMLDivElement;
  centerY: number;
  scale: number;
  rotate: number;
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

  return (
    <motion.div variants={item} layout className="h-full">
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
      const focusLine = window.scrollY + viewportH * (window.innerWidth < 640 ? 0.5 : 0.7);
      const range = viewportH * 0.5;
      for (const entry of entries.values()) {
        const dist = entry.centerY - focusLine;
        const t = Math.min(Math.abs(dist) / range, 1);
        const scale = 1 - (1 - MIN_SCALE) * t;
        const tiltSpan = Math.max(range - TILT_START * viewportH, 1);
        const tiltT = Math.min(Math.max((Math.abs(dist) - TILT_START * viewportH) / tiltSpan, 0), 1);
        const rotate = (dist >= 0 ? MAX_TILT : -MAX_TILT) * tiltT;
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
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
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
