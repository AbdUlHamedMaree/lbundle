import { defineConfig, type Plugin } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import swc from '@rollup/plugin-swc';
import { dts } from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';

import pkg from './package.json';
import { readFileSync } from 'fs';

const swcConfig = JSON.parse(readFileSync('./.swcrc', 'utf-8'));

const extensions = [
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

export default defineConfig([
  {
    input: pkg.source,
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: 'cjs',
        esModule: true,
        sourcemap: true,
      },
    ],

    treeshake: 'smallest',
    plugins: [
      peerDepsExternal({ includeDependencies: true }) as Plugin<any>,
      typescriptPaths(),
      json(),
      swc({
        swc: {
          ...swcConfig,
          swcrc: false,
        },
      }),
      commonjs({ extensions: extensions }),
      nodeResolve(),
    ],
  },
  {
    input: pkg['bin:source'],
    output: {
      file: pkg.bin,
      format: 'cjs',
      sourcemap: true,
    },

    treeshake: 'smallest',
    plugins: [
      peerDepsExternal({ includeDependencies: true }) as Plugin<any>,
      typescriptPaths(),
      json(),
      swc({
        swc: {
          ...swcConfig,
          swcrc: false,
        },
      }),
      commonjs({ extensions: extensions }),
      nodeResolve(),
    ],
  },
  {
    input: pkg.source,
    output: {
      file: pkg.types,
      format: 'es',
    },

    treeshake: 'smallest',
    plugins: [json(), dts()],
  },
]);
