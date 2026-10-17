import { motion } from 'framer-motion';
import { Gamepad2, Moon, Sun } from 'lucide-react';
import type { Theme } from '../App.tsx';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const isDark = theme === 'dark';

  return (
    <motion.header
      initial={{ opacity: 0, y: -26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="edge-glow sticky top-0 z-20 flex items-center justify-between border-b border-outline bg-surface-glass px-7 py-3.5 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2.5">
        <Gamepad2 className="icon-glow" size={28} />
        <span className="text-flow text-xl font-extrabold tracking-tight">VaultQuest</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-outline bg-surface-raised text-on-surface-secondary transition-colors duration-200 hover:text-secondary"
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <div
          className="pulse-ring grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-highlight font-bold text-white"
          title="Guest player"
        >
          V
        </div>
      </div>
    </motion.header>
  );
}
