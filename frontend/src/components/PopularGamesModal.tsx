import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Check, Plus, Search, X } from 'lucide-react';
import { addGame, fetchPopularGames } from '../services/api.ts';
import type { Game } from '../services/api.ts';

interface PopularGamesModalProps {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function PopularGamesModal({ open, onClose, onAdded }: PopularGamesModalProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [addedSlugs, setAddedSlugs] = useState<string[]>([]);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setStatus('loading');
    setError(null);
    setQuery('');
    fetchPopularGames()
      .then((data) => {
        if (cancelled) return;
        setGames(data);
        setStatus('ready');
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return games;
    return games.filter((game) => game.title.toLowerCase().includes(q));
  }, [games, query]);

  const handleAdd = async (slug: string) => {
    setBusySlug(slug);
    try {
      await addGame(slug);
      setAddedSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
      onAdded();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusySlug(null);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-40 flex flex-col bg-surface/95 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Add games"
        >
          <div className="border-b border-outline bg-surface-glass/70 px-5 py-4 backdrop-blur-xl sm:px-8 sm:py-5">
            <div className="mx-auto flex w-full max-w-5xl items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-on-surface sm:text-2xl">
                  Add to My Games
                </h3>
                <p className="mt-1 text-sm text-on-surface-secondary">
                  Search the catalog, add what you play — it lands in your library instantly.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close add games"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-outline bg-surface-raised text-on-surface-secondary transition-colors duration-200 hover:text-secondary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mx-auto mt-4 w-full max-w-5xl">
              <div className="flex items-center gap-3 rounded-full border border-outline bg-surface-raised px-4 py-2.5 transition-colors duration-200 focus-within:border-primary/60 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.18)]">
                <Search size={17} className="shrink-0 text-on-surface-muted" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search games…"
                  aria-label="Search games"
                  className="w-full bg-transparent text-[0.95rem] text-on-surface placeholder:text-on-surface-muted focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="shrink-0 text-on-surface-muted transition-colors duration-200 hover:text-on-surface"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
            <div className="mx-auto w-full max-w-5xl">
              {status === 'loading' && (
                <p className="py-12 text-center text-on-surface-secondary">Loading picks…</p>
              )}

              {status === 'error' && (
                <p className="py-12 text-center text-secondary">
                  Could not load picks. ({error})
                </p>
              )}

              {status === 'ready' && filtered.length === 0 && (
                <p className="py-12 text-center text-on-surface-secondary">
                  No games match “{query}” — try another title.
                </p>
              )}

              {status === 'ready' && filtered.length > 0 && (
                <motion.div
                  variants={list}
                  initial="hidden"
                  animate="show"
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filtered.map((game) => {
                    const added = addedSlugs.includes(game.slug);
                    const busy = busySlug === game.slug;
                    return (
                      <motion.div
                        key={game.id}
                        variants={row}
                        className="flex items-center gap-3 rounded-2xl border border-outline bg-surface-raised p-2.5"
                      >
                        <span
                          className="h-16 w-12 shrink-0 rounded-xl bg-cover bg-center"
                          style={{ backgroundImage: `url('${game.thumbnail}')` }}
                          aria-hidden="true"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-bold text-on-surface">
                            {game.title}
                          </div>
                          <div className="mt-0.5 text-[0.62rem] font-semibold tracking-widest text-on-surface-muted uppercase">
                            {game.platforms.length} platforms
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={added || busy}
                          onClick={() => void handleAdd(game.slug)}
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                            added
                              ? 'cursor-default bg-success/15 text-success'
                              : 'bg-gradient-to-r from-primary to-highlight text-white hover:scale-105 disabled:opacity-60'
                          }`}
                        >
                          {added ? <Check size={14} /> : <Plus size={14} />}
                          {added ? 'Added' : busy ? 'Adding…' : 'Add'}
                        </button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
