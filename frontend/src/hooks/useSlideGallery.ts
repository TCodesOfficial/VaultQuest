import { useEffect, useRef, useState } from 'react';
import { whenImageReady } from '../lib/imageCache.ts';

export interface SlideGallery {
  index: number;
  ready: boolean[];
}

export function useSlideGallery(slides: string[], intervalMs = 2500): SlideGallery {
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
    const id = window.setInterval(() => {
      setIndex((current) => {
        for (let step = 1; step <= slides.length; step++) {
          const candidate = (current + step) % slides.length;
          if (readyRef.current[candidate]) return candidate;
        }
        return current;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  return { index, ready };
}
