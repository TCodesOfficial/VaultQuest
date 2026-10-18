import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Loader2, Lock, Mail } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string) => Promise<void>;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('player@vaultquest.dev');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      await onLogin(email);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  };

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="edge-glow relative w-full max-w-md overflow-hidden rounded-3xl border border-outline bg-surface-raised p-8"
      >
        <div className="flex flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-highlight text-white shadow-[0_6px_28px_rgba(34,211,238,0.4)]">
            <Gamepad2 size={26} />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight">
            Vault<span className="text-flow">Quest</span>
          </h1>
          <p className="mt-2 text-sm text-on-surface-secondary">
            Sign in to open your gaming identity vault.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
          <label className="group flex items-center gap-3 rounded-xl border border-outline bg-surface-glass px-4 py-3 transition-colors duration-200 focus-within:border-primary/60">
            <Mail size={16} className="shrink-0 text-on-surface-muted transition-colors duration-200 group-focus-within:text-primary" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              aria-label="Email"
              required
              className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-muted focus:outline-none"
            />
          </label>

          <label className="group flex items-center gap-3 rounded-xl border border-outline bg-surface-glass px-4 py-3 transition-colors duration-200 focus-within:border-primary/60">
            <Lock size={16} className="shrink-0 text-on-surface-muted transition-colors duration-200 group-focus-within:text-primary" />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              aria-label="Password"
              className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-muted focus:outline-none"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-secondary/40 bg-secondary/10 px-3 py-2 text-xs font-semibold text-secondary">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-highlight px-5 py-3 text-sm font-bold text-white shadow-[0_6px_24px_rgba(34,211,238,0.35)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Lock size={15} strokeWidth={3} />}
            {busy ? 'Opening your vault…' : 'Enter Vault'}
          </button>
        </form>

        <p className="mt-5 text-center text-[0.68rem] font-semibold tracking-wide text-on-surface-muted uppercase">
          Demo build — any email and password gets you in
        </p>
      </motion.div>
    </div>
  );
}
