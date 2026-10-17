import { useEffect, useState } from 'react';

export function useSlideshow(count: number, intervalMs = 2500): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (count <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [count, intervalMs]);

  return index;
}
