import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { whenImageUrlReady } from '../lib/imageCache.ts';

export interface SlideGallery {
  index: number;
  ready: boolean[];
  resolved: string[];
}

interface SlideGalleryOptions {
  intervalMs?: number;
  phaseMs?: number;
  target?: RefObject<HTMLElement | null>;
  enabled?: boolean;
}

let pageScrolling = false;
let scrollTimer = 0;
if (typeof window !== 'undefined') {
  window.addEventListener(
    'scroll',
    () => {
      pageScrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        pageScrolling = false;
      }, 180);
    },
    { passive: true }
  );
}

export function useSlideGallery(slides: string[], options: SlideGalleryOptions = {}): SlideGallery {
  const { intervalMs = 2500, phaseMs = 0, target, enabled = true } = options;
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState<boolean[]>(() => slides.map(() => false));
  const [resolved, setResolved] = useState<string[]>(() => [...slides]);
  const readyRef = useRef(ready);
  readyRef.current = ready;
  const key = slides.join('|');

  useEffect(() => {
    if (!enabled) return;
    setIndex(0);
    setReady(slides.map(() => false));
    setResolved([...slides]);
    let cancelled = false;
    slides.forEach((url, position) => {
      whenImageUrlReady(url).then((finalUrl) => {
        if (cancelled) return;
        const ok = finalUrl.length > 0;
        setResolved((previous) => {
          if (previous[position] === finalUrl) return previous;
          const next = [...previous];
          next[position] = finalUrl;
          return next;
        });
        setReady((previous) => {
          if (previous[position] === ok) return previous;
          const next = [...previous];
          next[position] = ok;
          return next;
        });
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  useEffect(() => {
    if (!enabled || slides.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const element = target?.current;
    let visible = true;
    let observer: IntersectionObserver | undefined;
    if (element && typeof IntersectionObserver !== 'undefined') {
      visible = false;
      observer = new IntersectionObserver(
        (entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
        },
        { rootMargin: '100px' }
      );
      observer.observe(element);
    }

    const advance = () => {
      if (!visible || pageScrolling) return;
      setIndex((current) => {
        for (let step = 1; step <= slides.length; step++) {
          const candidate = (current + step) % slides.length;
          if (readyRef.current[candidate]) return candidate;
        }
        return current;
      });
    };

    let interval = 0;
    const first = window.setTimeout(() => {
      advance();
      interval = window.setInterval(advance, intervalMs);
    }, phaseMs);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
      observer?.disconnect();
    };
  }, [enabled, slides.length, intervalMs, phaseMs, target]);

  return { index, ready, resolved };
}
