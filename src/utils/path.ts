import path from 'path';

export function normalizePath(...paths: string[]): string {
  const f = path.join(...paths).replaceAll('\\', '/');

  if (/^\.[/\\]/.test(paths[0])) return `./${f}`;

  return f;
}
