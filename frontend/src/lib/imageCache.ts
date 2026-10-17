const loaded = new Map<string, HTMLImageElement>();

export function getImage(url: string): HTMLImageElement {
  let image = loaded.get(url);
  if (!image) {
    image = new Image();
    image.decoding = 'async';
    image.src = url;
    loaded.set(url, image);
  }
  return image;
}

export function preloadImage(url: string): void {
  if (url) getImage(url);
}

export function whenImageReady(url: string): Promise<boolean> {
  if (!url) return Promise.resolve(false);
  const image = getImage(url);
  if (image.complete) return Promise.resolve(image.naturalWidth > 0);
  return new Promise((resolve) => {
    const settle = () => resolve(image.naturalWidth > 0);
    image.addEventListener('load', settle, { once: true });
    image.addEventListener('error', settle, { once: true });
  });
}
