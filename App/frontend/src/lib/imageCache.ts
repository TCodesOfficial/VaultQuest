const images = new Map<string, HTMLImageElement>();
const promises = new Map<string, Promise<string>>();
const queue: { url: string; resolve: (resultUrl: string) => void }[] = [];
let active = 0;
const MAX_CONCURRENT = 4;
const MAX_DISPLAY_WIDTH = 960;

const DB_NAME = 'vq-image-cache-v1';
const STORE = 'blobs';

let dbPromise: Promise<IDBDatabase | null> | null = null;

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

function getDb(): Promise<IDBDatabase | null> {
  dbPromise ??= openDb();
  return dbPromise;
}

function idbGet(url: string): Promise<Blob | null> {
  return getDb().then(
    (db) =>
      new Promise<Blob | null>((resolve) => {
        if (!db) return resolve(null);
        try {
          const request = db.transaction(STORE, 'readonly').objectStore(STORE).get(url);
          request.onsuccess = () => resolve(request.result instanceof Blob ? request.result : null);
          request.onerror = () => resolve(null);
        } catch {
          resolve(null);
        }
      })
  );
}

function idbPut(url: string, blob: Blob): void {
  getDb().then((db) => {
    if (!db) return;
    try {
      db.transaction(STORE, 'readwrite').objectStore(STORE).put(blob, url);
    } catch {
      // storage unavailable — keep the in-memory path only
    }
  });
}

async function toDisplayBlob(image: HTMLImageElement): Promise<Blob | null> {
  try {
    if (typeof createImageBitmap !== 'function' || typeof OffscreenCanvas !== 'function') {
      return null;
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
      return null;
    }
    context.drawImage(bitmap, 0, 0);
    bitmap.close();
    return await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.85 });
  } catch {
    return null;
  }
}

function pump() {
  while (active < MAX_CONCURRENT && queue.length > 0) {
    const { url, resolve } = queue.shift()!;
    active++;
    const settle = (resultUrl: string) => {
      active--;
      resolve(resultUrl);
      pump();
    };
    const begin = (allowCorsFallback: boolean) => {
      const image = new Image();
      image.decoding = 'async';
      if (allowCorsFallback) image.crossOrigin = 'anonymous';
      images.set(url, image);
      image.addEventListener(
        'load',
        () => {
          if (image.naturalWidth === 0) {
            if (allowCorsFallback) {
              begin(false);
            } else {
              settle('');
            }
            return;
          }
          toDisplayBlob(image).then((blob) => {
            if (blob) {
              idbPut(url, blob);
              settle(URL.createObjectURL(blob));
            } else if (allowCorsFallback) {
              begin(false);
            } else {
              settle(image.src);
            }
          });
        },
        { once: true }
      );
      image.addEventListener(
        'error',
        () => {
          if (allowCorsFallback) {
            begin(false);
          } else {
            settle('');
          }
        },
        { once: true }
      );
      image.src = url;
    };
    begin(true);
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
  idbGet(url)
    .then((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
        return;
      }
      queue.push({ url, resolve });
      pump();
    })
    .catch(() => {
      queue.push({ url, resolve });
      pump();
    });
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
