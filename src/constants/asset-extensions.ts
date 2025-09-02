export const imageExtensions = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.avif',
  '.ico',
  '.bmp',
  '.tiff',
  '.tif',
];

export const videoExtensions = [
  '.mp4',
  '.webm',
  '.ogg',
  '.avi',
  '.mov',
  '.wmv',
  '.flv',
  '.mkv',
];

export const audioExtensions = ['.mp3', '.wav', '.ogg', '.aac', '.flac', '.m4a'];

export const fontExtensions = ['.woff', '.woff2', '.eot', '.ttf', '.otf'];

export const documentExtensions = ['.pdf', '.doc', '.docx', '.txt', '.md'];

export const svgExtensions = ['.svg'];

// All asset extensions combined (excluding SVG as it needs special handling)
export const assetExtensions = [
  ...imageExtensions,
  ...videoExtensions,
  ...audioExtensions,
  ...fontExtensions,
  ...documentExtensions,
];

// All extensions including SVG
export const allAssetExtensions = [...assetExtensions, ...svgExtensions];
