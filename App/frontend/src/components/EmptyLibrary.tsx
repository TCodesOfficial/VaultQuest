import { motion } from 'framer-motion';
import { Gamepad2, Sparkles } from 'lucide-react';

interface EmptyLibraryProps {
  onTrack: () => void;
}

export default function EmptyLibrary({ onTrack }: EmptyLibraryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="card-frame mx-auto mt-4 max-w-2xl px-8 py-12 text-center"
    >
      <span
        className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary/35 to-highlight/20 text-highlight shadow-[0_0_30px_rgba(34,211,238,0.25)]"
        aria-hidden="true"
      >
        <Gamepad2 size={30} />
      </span>

      <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-on-surface">
        Your vault is empty
      </h2>

      <p className="mx-auto mt-3 max-w-lg leading-relaxed text-on-surface-secondary">
        No games tracked yet. Add a title and VaultQuest pulls its cover art,
        platforms, and progress straight into your library — start with one of the
        popular picks everyone links first.
      </p>

      <button
        type="button"
        onClick={onTrack}
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-highlight px-7 py-3 font-bold text-white shadow-[0_6px_24px_rgba(34,211,238,0.35)] transition-transform duration-200 hover:scale-105"
      >
        <Sparkles size={17} />
        Track your first game
      </button>
    </motion.div>
  );
}
