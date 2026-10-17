import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { whenImageReady } from '../lib/imageCache.ts';

export interface SlideGallery {
  index: number;
  ready: boolean[];
}

interface SlideGalleryOptions {
  intervalMs?: number;
  phaseMs?: number;
  target?: RefObject<HTMLElement | null>;
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
  const { intervalMs = 2500, phaseMs = 0, target } = options;
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState<boolean[]>(() => slides.map(() => false));
  const readyRef = useRef(ready);
  readyRef.current = ready;
  const key = slides.join('|');

  useEffect(() => {
    setIndex(0);
    setReady(slides.map(() => false));
    let cancelled = false;
    slides.forEach((url, position) => {
      whenImageReady(url).then((ok) => {
        if (cancelled) return;
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
  }, [key]);

  useEffect(() => {
    if (slides.length <= 1) return;
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
  }, [slides.length, intervalMs, phaseMs, target]);

  return { index, ready };
}
