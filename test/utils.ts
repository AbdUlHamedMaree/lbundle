import path from 'path';
import fs from 'fs';

const __dirname = import.meta.dir;

const rootDir = path.resolve(__dirname, '..');

export const cleanLibraryDist = (libDir: string) =>
  fs.promises.rm(path.resolve(__dirname, libDir, 'dist'), {
    force: true,
    recursive: true,
  });

export const getLibraryCleanerAndBuilder =
  (libDir: string) =>
  async (args: string[] = []) => {
    await cleanLibraryDist(libDir);

    const proc = Bun.spawn(
      ['bun', '--bun', './src/cli.ts', '--cwd', `./test/${libDir}`, ...args],
      {
        cwd: rootDir,
        stdio: ['inherit', 'inherit', 'inherit'],
      }
    );

    const code = await proc.exited;

    if (code > 0) {
      console.error('[lbundle] Failed to build');
      process.exit(code);
    }
  };

export const getLibraryBuildFileContentGetter =
  (libDir: string) =>
  (...paths: string[]) => {
    const file = Bun.file(path.resolve(__dirname, libDir, 'dist', ...paths));

    return file.text();
  };
