import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronDown, Gamepad2, Layers, Plus, Search, Trophy, X } from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import GameCardGrid from './components/GameCardGrid.tsx';
import EmptyLibrary from './components/EmptyLibrary.tsx';
import GameDetailPanel from './components/GameDetailPanel.tsx';
import PopularGamesModal from './components/PopularGamesModal.tsx';
import LoginScreen from './components/LoginScreen.tsx';
import OnboardingModal from './components/OnboardingModal.tsx';
import GuidedTour from './components/GuidedTour.tsx';
import { fetchGames, fetchSession, signIn, signUp, logout as apiLogout } from './services/api.ts';
import type { Game, SessionUser } from './services/api.ts';

type LoadStatus = 'loading' | 'ready' | 'error';
type AuthStatus = 'checking' | 'anonymous' | 'authenticated';
export type Theme = 'dark' | 'light';

type SortKey = 'recent' | 'title' | 'level' | 'achievements' | 'platforms';

const maxLevelOf = (game: Game) => game.platforms.reduce((max, p) => Math.max(max, p.level), 0);
const totalUnlockedOf = (game: Game) =>
  game.platforms.reduce((sum, p) => sum + p.achievementsCount, 0);

const heroItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [libQuery, setLibQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('recent');
  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [session, setSession] = useState<SessionUser | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [theme, setTheme] = useState<Theme>(() =>
    typeof window !== 'undefined' && localStorage.getItem('app-theme') === 'light'
      ? 'light'
      : 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const beginArrival = useCallback(() => {
    if (localStorage.getItem('vq-onboarded') !== '1') {
      setShowOnboarding(true);
    } else if (localStorage.getItem('vq-tour-done') !== '1') {
      setShowTour(true);
    }
  }, []);

  useEffect(() => {
    fetchSession()
      .then((user) => {
        if (user) {
          setSession(user);
          setAuthStatus('authenticated');
          beginArrival();
        } else {
          setAuthStatus('anonymous');
        }
      })
      .catch(() => setAuthStatus('anonymous'));
  }, [beginArrival]);

  const loadGames = useCallback(async () => {
    try {
      const data = await fetchGames();
      setGames(data);
      setError(null);
      setStatus('ready');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    void loadGames();
  }, [authStatus, loadGames]);

  const handleLogin = useCallback(
    async (mode: 'signin' | 'signup', email: string, password: string, name?: string) => {
      const user =
        mode === 'signup'
          ? await signUp((name ?? email.split('@')[0]) || 'Player', email, password)
          : await signIn(email, password);
      setSession(user);
      setAuthStatus('authenticated');
      setStatus('loading');
      beginArrival();
    },
    [beginArrival]
  );

  const handleLogout = useCallback(async () => {
    await apiLogout();
    setSession(null);
    setGames([]);
    setStatus('loading');
    setAuthStatus('anonymous');
    setShowOnboarding(false);
    setShowTour(false);
  }, []);

  const handleOnboardingFinish = useCallback(() => {
    localStorage.setItem('vq-onboarded', '1');
    setShowOnboarding(false);
    if (localStorage.getItem('vq-tour-done') !== '1') {
      setShowTour(true);
    }
  }, []);

  const handleTourDone = useCallback(() => {
    localStorage.setItem('vq-tour-done', '1');
    setShowTour(false);
  }, []);

  const platformCount = new Set(games.flatMap((g) => g.platforms.map((p) => p.platform))).size;
  const achievementTotal = games.reduce(
    (sum, g) => sum + g.platforms.reduce((s, p) => s + p.achievementsCount, 0),
    0
  );

  const visibleGames = useMemo(() => {
    const query = libQuery.trim().toLowerCase();
    const filtered = query
      ? games.filter(
          (game) =>
            game.title.toLowerCase().includes(query) ||
            game.genres.some((genre) => genre.toLowerCase().includes(query)) ||
            game.platforms.some((progress) =>
              progress.gamertag.toLowerCase().includes(query)
            )
        )
      : games;
    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'level':
          return maxLevelOf(b) - maxLevelOf(a);
        case 'achievements':
          return totalUnlockedOf(b) - totalUnlockedOf(a);
        case 'platforms':
          return b.platforms.length - a.platforms.length;
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [games, libQuery, sortKey]);

  const stats = [
    { icon: Gamepad2, value: String(games.length), label: 'Games tracked' },
    { icon: Layers, value: String(platformCount), label: 'Platforms connected' },
    { icon: Trophy, value: achievementTotal.toLocaleString(), label: 'Achievements unlocked' },
  ];

  return (
    <>
      <div className="scene" aria-hidden="true">
        <div className="scene__base" />
        <div className="scene__grid" />
        <div className="scene__orb scene__orb--1" />
        <div className="scene__orb scene__orb--2" />
        <div className="scene__orb scene__orb--3" />
        <div className="scene__scan" />
      </div>

      {authStatus === 'checking' && (
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
            className="text-on-surface-secondary"
          >
            Checking your session…
          </motion.p>
        </div>
      )}

      {authStatus === 'anonymous' && <LoginScreen onLogin={handleLogin} />}

      {authStatus === 'authenticated' && (
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar
            theme={theme}
            user={session}
            onLogout={handleLogout}
            onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          />
        <main className="mx-auto w-full max-w-[1320px] flex-1 px-6 pt-5 pb-28">
          <section className="mb-6 text-center">
            <motion.div initial="hidden" animate="show" variants={heroContainer}>
              <motion.span
                variants={heroItem}
                className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface-glass px-3.5 py-1 text-[0.66rem] font-bold tracking-[0.2em] text-on-surface-secondary uppercase backdrop-blur-md"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-highlight shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                  aria-hidden="true"
                />
                One library · Every platform
              </motion.span>

              <motion.h1
                variants={heroItem}
                className="mt-3 w-full text-4xl leading-[1.05] font-extrabold tracking-tight md:text-5xl"
              >
                Your gaming identity, <span className="text-flow">everywhere.</span>
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-on-surface-secondary md:text-lg"
              >
                VaultQuest pulls your gamertags, levels, and unlocks out of PlayStation, Xbox,
                PC, and Mobile and lands them all in one launcher. Compare how your progress
                stacks up across platforms, remember exactly where you left off on any screen,
                and jump back in — no more digging through five different apps just to check
                where you stand.
              </motion.p>

              {status === 'ready' && games.length > 0 && (
                <motion.div
                  variants={heroItem}
                  className="mx-auto mt-5 flex max-w-3xl flex-wrap items-stretch justify-center gap-3"
                >
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-1 items-center gap-3 rounded-2xl border border-outline bg-surface-glass px-4 py-2.5 text-left backdrop-blur-md transition-colors duration-200 hover:border-primary/40"
                    >
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-highlight/15 text-highlight"
                        aria-hidden="true"
                      >
                        <stat.icon size={16} />
                      </span>
                      <div>
                        <div className="text-base leading-none font-extrabold text-on-surface">
                          {stat.value}
                        </div>
                        <div className="mt-1 text-[0.64rem] font-semibold tracking-widest text-on-surface-muted uppercase">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </section>

          {status === 'loading' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
              className="py-12 text-center text-on-surface-secondary"
            >
              Loading your library…
            </motion.p>
          )}

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 text-center text-secondary"
            >
              Could not reach the backend — is it running on port 3001? ({error})
            </motion.p>
          )}

          {status === 'ready' && games.length === 0 && (
            <EmptyLibrary onTrack={() => setShowPicker(true)} />
          )}

          {status === 'ready' && games.length > 0 && (
            <section data-tour="library">
              <motion.div
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
              >
                <div className="text-left">
                  <h2 className="text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
                    My <span className="text-flow">Games</span>
                  </h2>
                  <span className="mt-2 inline-block rounded-full border border-outline bg-surface-glass px-3.5 py-1.5 text-[0.66rem] font-bold tracking-widest text-on-surface-muted uppercase backdrop-blur-md">
                    {visibleGames.length === games.length
                      ? `${games.length} tracked`
                      : `${visibleGames.length} of ${games.length} tracked`}
                  </span>
                </div>

                <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto sm:justify-end">
                  <label className="group flex w-full items-center gap-2.5 rounded-full border border-outline bg-surface-glass/70 px-4 py-2.5 backdrop-blur-md transition-colors duration-200 focus-within:border-primary/50 sm:w-80">
                    <Search
                      size={16}
                      className="shrink-0 text-on-surface-muted transition-colors duration-200 group-focus-within:text-primary"
                    />
                    <input
                      value={libQuery}
                      onChange={(event) => setLibQuery(event.target.value)}
                      placeholder="Search your library…"
                      aria-label="Search my games"
                      className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-muted focus:outline-none"
                    />
                    {libQuery && (
                      <button
                        type="button"
                        onClick={() => setLibQuery('')}
                        aria-label="Clear library search"
                        className="shrink-0 text-on-surface-muted transition-colors duration-200 hover:text-on-surface"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </label>

                  <div className="relative">
                    <select
                      value={sortKey}
                      onChange={(event) => setSortKey(event.target.value as SortKey)}
                      aria-label="Sort games"
                      className="appearance-none rounded-full border border-outline bg-surface-glass/70 py-2.5 pr-9 pl-4 text-sm font-bold text-on-surface-secondary backdrop-blur-md transition-colors duration-200 focus:border-primary/50 focus:outline-none"
                    >
                      <option value="recent">Recently added</option>
                      <option value="title">Title A–Z</option>
                      <option value="level">Highest level</option>
                      <option value="achievements">Most achievements</option>
                      <option value="platforms">Most platforms</option>
                    </select>
                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-muted"
                    />
                  </div>
                </div>
              </motion.div>

              {visibleGames.length === 0 ? (
                <p className="py-12 text-center text-on-surface-secondary">
                  No games match “{libQuery}” — try a different title, genre, or gamertag.
                </p>
              ) : (
                <GameCardGrid games={visibleGames} onOpenGame={setSelectedGame} />
              )}
            </section>
          )}
        </main>

        {status === 'ready' && games.length > 0 && !showPicker && (
          <motion.button
            type="button"
            onClick={() => setShowPicker(true)}
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            aria-label="Add games to your library"
            className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-highlight px-5 py-3.5 text-sm font-bold text-white shadow-[0_6px_28px_rgba(34,211,238,0.45)] ring-1 ring-white/20 sm:right-7 sm:bottom-7"
          >
            <Plus size={18} strokeWidth={3} />
            Add Games
          </motion.button>
        )}

        <PopularGamesModal
          open={showPicker}
          onClose={() => setShowPicker(false)}
          onAdded={() => void loadGames()}
        />

        <GameDetailPanel game={selectedGame} onClose={() => setSelectedGame(null)} />

        <OnboardingModal open={showOnboarding} onFinish={handleOnboardingFinish} />
        <GuidedTour open={showTour} onDone={handleTourDone} />
        </div>
      )}
    </>
  );
}
