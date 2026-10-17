import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import GameCard from './GameCard.tsx';
import type { Game } from '../services/api.ts';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
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

export default function GameCardGrid({ games, onOpenGame }: GameCardGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {games.map((game) => (
        <motion.div key={game.id} variants={item} className="h-full">
          <GameCard game={game} onOpen={onOpenGame} />
        </motion.div>
      ))}
    </motion.div>
  );
}
