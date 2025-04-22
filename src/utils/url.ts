import path from 'path';
import { normalizePath } from './path';

export function getUrlOfPartial(url: string): string {
  const { dir, base } = path.parse(url);

  return dir ? `${normalizePath(dir)}/_${base}` : `_${base}`;
}
