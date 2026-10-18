const images = new Map<string, HTMLImageElement>();
const promises = new Map<string, Promise<boolean>>();
const queue: { url: string; resolve: (ok: boolean) => void }[] = [];
let active = 0;
const MAX_CONCURRENT = 4;

function pump() {
  while (active < MAX_CONCURRENT && queue.length > 0) {
    const { url, resolve } = queue.shift()!;
    active++;
    const image = new Image();
    image.decoding = 'async';
    images.set(url, image);
    const settle = () => {
      active--;
      resolve(image.naturalWidth > 0);
      pump();
    };
    image.addEventListener('load', settle, { once: true });
    image.addEventListener('error', settle, { once: true });
    image.src = url;
  }
}

function ensure(url: string): Promise<boolean> {
  const existing = promises.get(url);
  if (existing) return existing;
  let resolve!: (ok: boolean) => void;
  const promise = new Promise<boolean>((settle) => {
    resolve = settle;
  });
  promises.set(url, promise);
  queue.push({ url, resolve });
  pump();
  return promise;
}

export function preloadImage(url: string): void {
  if (url) ensure(url);
}

export function whenImageReady(url: string): Promise<boolean> {
  return url ? ensure(url) : Promise.resolve(false);
}
