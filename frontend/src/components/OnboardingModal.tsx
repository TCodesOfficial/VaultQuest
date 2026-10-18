import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gamepad2, KeyRound, Layers, X } from 'lucide-react';

interface OnboardingModalProps {
  open: boolean;
  onFinish: () => void;
}

const SLIDES = [
  {
    icon: Gamepad2,
    title: 'Your gaming life, fragmented',
    body: 'Progress on mobile, different levels on PC, achievements stranded on console — and passwords forgotten everywhere. Switching platforms keeps meaning starting over.',
    accent: 'from-secondary to-secondary-strong',
  },
  {
    icon: Layers,
    title: 'One vault for every identity',
    body: 'VaultQuest pulls your gamertags, levels, and unlocks from PlayStation, Xbox, PC, and Mobile into a single launcher-style dashboard that feels like yours.',
    accent: 'from-primary to-highlight',
  },
  {
    icon: KeyRound,
    title: 'Compare, then just play',
    body: 'See your progress side by side on every platform, and pull up any stored login details the moment you need them. Your gaming identity, everywhere.',
    accent: 'from-highlight to-success',
  },
];

export default function OnboardingModal({ open, onFinish }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const slide = SLIDES[step];
  const Icon = slide.icon;
  const last = step === SLIDES.length - 1;

  const next = () => {
    if (last) {
      onFinish();
    } else {
      setStep((current) => current + 1);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 px-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to VaultQuest"
        >
          <button
            type="button"
            onClick={onFinish}
            aria-label="Skip onboarding"
            className="absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-outline bg-surface-raised text-on-surface-muted transition-colors duration-200 hover:text-on-surface"
          >
            <X size={17} />
          </button>

          <div className="edge-glow relative w-full max-w-lg overflow-hidden rounded-3xl border border-outline bg-surface-raised px-9 py-11 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 36, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -36, filter: 'blur(6px)' }}
                transition={{ duration: 0.38, ease: 'easeOut' }}
              >
                <span
                  className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${slide.accent} text-white shadow-[0_8px_30px_rgba(34,211,238,0.3)]`}
                >
                  <Icon size={30} />
                </span>
                <h2 className="mt-6 text-2xl font-extrabold tracking-tight md:text-3xl">
                  {slide.title}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-on-surface-secondary md:text-base">
                  {slide.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-9 flex items-center justify-center gap-2.5" aria-hidden="true">
              {SLIDES.map((_, index) => (
                <span
                  key={index}
                  className={`rounded-full transition-all duration-400 ${
                    index === step
                      ? 'w-7 bg-gradient-to-r from-primary to-highlight'
                      : 'w-2.5 bg-on-surface-muted/40'
                  } h-2.5`}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onFinish}
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-on-surface-muted transition-colors duration-200 hover:text-on-surface"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-xl bg-gradient-to-r from-primary to-highlight px-6 py-3 text-sm font-bold text-white shadow-[0_6px_24px_rgba(34,211,238,0.35)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                {last ? 'Get Started' : 'Next'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
