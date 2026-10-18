const images = new Map<string, HTMLImageElement>();
const promises = new Map<string, Promise<string>>();
const queue: { url: string; resolve: (resultUrl: string) => void }[] = [];
let active = 0;
const MAX_CONCURRENT = 4;
const MAX_DISPLAY_WIDTH = 960;

async function toDisplayUrl(image: HTMLImageElement): Promise<string> {
  try {
    if (typeof createImageBitmap !== 'function' || typeof OffscreenCanvas !== 'function') {
      return image.src;
    }
    const width = Math.min(MAX_DISPLAY_WIDTH, image.naturalWidth);
    const height = Math.max(1, Math.round(image.naturalHeight * (width / image.naturalWidth)));
    const bitmap = await createImageBitmap(image, {
      resizeWidth: width,
      resizeHeight: height,
      resizeQuality: 'medium',
    });
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const context = canvas.getContext('2d');
    if (!context) {
      bitmap.close();
      return image.src;
    }
    context.drawImage(bitmap, 0, 0);
    bitmap.close();
    const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.85 });
    return URL.createObjectURL(blob);
  } catch {
    return image.src;
  }
}

function pump() {
  while (active < MAX_CONCURRENT && queue.length > 0) {
    const { url, resolve } = queue.shift()!;
    active++;
    const image = new Image();
    image.decoding = 'async';
    images.set(url, image);
    const settle = (resultUrl: string) => {
      active--;
      resolve(resultUrl);
      pump();
    };
    image.addEventListener(
      'load',
      () => {
        if (image.naturalWidth === 0) {
          settle('');
          return;
        }
        toDisplayUrl(image).then(settle);
      },
      { once: true }
    );
    image.addEventListener('error', () => settle(''), { once: true });
    image.src = url;
  }
}

function ensure(url: string): Promise<string> {
  const existing = promises.get(url);
  if (existing) return existing;
  let resolve!: (resultUrl: string) => void;
  const promise = new Promise<string>((settle) => {
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
  return url ? ensure(url).then((result) => result.length > 0) : Promise.resolve(false);
}

export function whenImageUrlReady(url: string): Promise<string> {
  return url ? ensure(url) : Promise.resolve('');
}
