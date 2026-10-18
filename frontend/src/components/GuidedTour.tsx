import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface GuidedTourProps {
  open: boolean;
  onDone: () => void;
}

interface Step {
  selector: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    selector: '[data-tour="library"]',
    title: 'Your game library',
    body: 'Every game you track lands here — cover art, gamertag, level, and linked platforms at a glance.',
  },
  {
    selector: '.card-frame',
    title: 'Cross-platform analytics',
    body: 'Tap any card to open its detail view: your progress on mobile, PC, and console compared side by side.',
  },
  {
    selector: '.card-frame',
    title: 'Your credentials vault',
    body: 'Inside each game, "Check Login Details" reveals the stored username and password for every platform.',
  },
];

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function GuidedTour({ open, onDone }: GuidedTourProps) {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  const measure = useCallback((index: number) => {
    const element = document.querySelector(STEPS[index].selector);
    if (!element) {
      setRect(null);
      return;
    }
    const bounds = element.getBoundingClientRect();
    setRect({
      top: Math.max(bounds.top - 8, 8),
      left: Math.max(bounds.left - 8, 8),
      width: Math.min(bounds.width + 16, window.innerWidth - 16),
      height: Math.min(bounds.height + 16, window.innerHeight - 16),
    });
  }, []);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setRect(null);
      return;
    }
    measure(step);
    const onChange = () => measure(step);
    window.addEventListener('resize', onChange);
    window.addEventListener('scroll', onChange, { passive: true });
    return () => {
      window.removeEventListener('resize', onChange);
      window.removeEventListener('scroll', onChange);
    };
  }, [open, step, measure]);

  const last = step === STEPS.length - 1;
  const current = STEPS[step];

  const tooltipTop =
    rect && rect.top + rect.height + 20 + 170 < window.innerHeight
      ? rect.top + rect.height + 20
      : null;

  return (
    <AnimatePresence>
      {open && rect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Feature tour"
        >
          <div className="absolute inset-0 bg-ink-950/75" onClick={onDone} aria-hidden="true" />

          <motion.div
            key={`ring-${step}`}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute rounded-2xl shadow-[0_0_0_3px_rgba(34,211,238,0.85),0_0_36px_rgba(34,211,238,0.5)]"
            style={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            }}
            aria-hidden="true"
          />

          <motion.div
            key={`tip-${step}`}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="edge-glow absolute z-10 w-[19rem] rounded-2xl border border-outline bg-surface-raised p-5 shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
            style={
              tooltipTop !== null
                ? { top: tooltipTop, left: Math.min(Math.max(rect.left, 16), window.innerWidth - 320) }
                : {
                    top: Math.max(rect.top - 190, 16),
                    left: Math.min(Math.max(rect.left, 16), window.innerWidth - 320),
                  }
            }
          >
            <div className="flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.2em] text-highlight uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-highlight" aria-hidden="true" />
              Step {step + 1} of {STEPS.length}
            </div>
            <h3 className="mt-2 text-lg font-extrabold tracking-tight text-on-surface">
              {current.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-secondary">{current.body}</p>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={onDone}
                className="rounded-lg px-3 py-2 text-xs font-bold text-on-surface-muted transition-colors duration-200 hover:text-on-surface"
              >
                Skip tour
              </button>
              <button
                type="button"
                onClick={() => (last ? onDone() : setStep((index) => index + 1))}
                className="rounded-lg bg-gradient-to-r from-primary to-highlight px-4 py-2 text-xs font-bold text-white transition-transform duration-200 hover:scale-[1.04] active:scale-[0.96]"
              >
                {last ? 'Done' : 'Next'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
