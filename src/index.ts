import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from '@rollup/plugin-swc';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

import { rollup, type Plugin, type OutputOptions } from 'rollup';
import merge from 'lodash.merge';
import fs from 'fs';
import path from 'path';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import type { Options as SwcOptions } from '@swc/core';

export type OptimalPkg = {
  source: string;
  main?: string;
  module?: string;
  bin?: string;
  'bin:source'?: string;
};

export const extensions = [
  '.mtsx',
  '.ctsx',
  '.tsx',
  '.mts',
  '.cts',
  '.ts',
  '.mtsx',
  '.ctsx',
  '.tsx',
  '.mts',
  '.cts',
  '.ts',
];

const getDefaultOptions = () => ({
  cwd: '.',
});

const getDefaultSwcConfig = ({ ts, jsx }: { ts: boolean; jsx: boolean }): SwcOptions => ({
  env: {
    targets: 'defaults',
    coreJs: '3.36.1',
    mode: 'usage',
    bugfixes: true,
  },
  jsc: {
    parser: ts
      ? {
          syntax: 'typescript',
          tsx: jsx,
        }
      : { syntax: 'ecmascript', jsx },
  },

  swcrc: false,
});

export const getRollupTask = ({
  input,
  pkgPath,
  isTs,
  isJsx,
  cwd,
}: {
  input: string;
  pkgPath: string;
  isTs: boolean;
  isJsx: boolean;
  cwd: string;
}) =>
  rollup({
    input,
    treeshake: 'smallest',
    plugins: [
      PeerDepsExternalPlugin({
        includeDependencies: true,
        packageJsonPath: pkgPath,
      }) as Plugin<any>,
      typescriptPaths({}),
      swc({ swc: getDefaultSwcConfig({ ts: isTs, jsx: isJsx }) }),
      commonjs({ extensions: extensions }),
      nodeResolve({ rootDir: cwd }),
    ],
  });

export const lbundle = async (baseOptions: any) => {
  const options = merge(getDefaultOptions(), baseOptions);
  const cwd = path.resolve(process.cwd(), options.cwd);

  const rootResolve = (...paths: string[]) => path.resolve(cwd, ...paths);

  const pkgPath = rootResolve('package.json');

  const pkg = JSON.parse(await fs.promises.readFile(pkgPath, 'utf-8')) as OptimalPkg;

  const inputExt = path.extname(pkg.source);

  const isTs = inputExt.includes('ts');
  const isJsx = inputExt.includes('sx');

  await Promise.all([
    getRollupTask({
      input: rootResolve(pkg.source),
      pkgPath,
      isTs,
      isJsx,
      cwd,
    }).then(async bundle => {
      const outputs = (
        [
          typeof pkg.module === 'string' && {
            dir: path.dirname(rootResolve(pkg.module)),
            format: 'esm',
            sourcemap: true,
            preserveModules: true,
            strict: true,
          },
          typeof pkg.main === 'string' && {
            dir: path.dirname(rootResolve(pkg.main)),
            format: 'cjs',
            sourcemap: true,
            preserveModules: true,
            strict: true,
            esModule: true,
          },
        ] as (false | OutputOptions)[]
      ).filter(Boolean) as OutputOptions[];

      await Promise.all(outputs.map(bundle.write));
    }),
    pkg['bin:source']
      ? getRollupTask({
          input: rootResolve(pkg['bin:source']),
          pkgPath,
          isTs: path.extname(pkg['bin:source']).includes('ts'),
          isJsx: false,
          cwd,
        }).then(async bundle => {
          const outputs = (
            [
              typeof pkg.bin === 'string' && {
                file: rootResolve(pkg.bin),
                format: 'cjs',
              },
            ] as (false | OutputOptions)[]
          ).filter(Boolean) as OutputOptions[];

          await Promise.all(outputs.map(bundle.write));
        })
      : Promise.resolve(),
  ]);
};
