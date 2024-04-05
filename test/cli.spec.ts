// eslint-disable-next-line import/no-unresolved
import { expect, it, describe } from 'bun:test';
import path from 'path';
import fs from 'fs';
import targetPkg from './project/package.json';

const __dirname = import.meta.dir;

const rootDir = path.resolve(__dirname, '..');

const cleanDist = () =>
  fs.promises.rm(path.resolve(__dirname, 'project', 'dist'), {
    force: true,
    recursive: true,
  });

const cleanAndBuild = async (args: string[] = []) => {
  await cleanDist();

  const proc = Bun.spawn(
    ['bun', '--bun', './src/cli.ts', '--cwd', './test/project', ...args],
    {
      cwd: rootDir,
      stdout: 'inherit',
      stderr: 'inherit',
    }
  );

  const code = await proc.exited;

  console.log('pizza', code)

  if (code > 0) {
    console.error('[lbundle] Failed to build');
    process.exit(code);
  }
};

const getBuildFileContent = (fileName: string) => {
  const file = Bun.file(path.resolve(__dirname, 'project', 'dist', fileName));

  return file.text();
};

describe('cli option', () => {
  it('no options', async () => {
    await cleanAndBuild();

    const indexJs = await getBuildFileContent('index.js');

    expect(indexJs).toMatchSnapshot('default build');
  });
});
