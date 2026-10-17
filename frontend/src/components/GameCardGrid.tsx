import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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

interface GameCardGridProps {
  games: Game[];
  onOpenGame: (game: Game) => void;
}

interface ScrollCardProps {
  game: Game;
  onOpenGame: (game: Game) => void;
}

function ScrollCard({ game, onOpenGame }: ScrollCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.88]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  return (
    <motion.div ref={ref} variants={item} layout className="h-full">
      <motion.div style={reduced ? undefined : { scale, rotate }} className="h-full">
        <GameCard game={game} onOpen={onOpenGame} />
      </motion.div>
    </motion.div>
  );
}

export default function GameCardGrid({ games, onOpenGame }: GameCardGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {games.map((game) => (
        <ScrollCard key={game.id} game={game} onOpenGame={onOpenGame} />
      ))}
    </motion.div>
  );
}
