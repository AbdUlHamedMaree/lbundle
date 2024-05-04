import path from 'path';
import { rollup, type Plugin } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from '@rollup/plugin-swc';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';

import { getSwcConfig } from './get-swc-config';
import { jsExtensions } from '../constants/js-extensions';
import type { ContextModel } from '../models/context';
import { stylesExtensions } from '../constants/styles-extensions';
import { isEmptyArray, isNil } from '../utils/checks';
import typescript from '@rollup/plugin-typescript';

export const bundleLibIfNeeded = async (ctx: ContextModel) => {
  const { pkg, options, libOutputs, pkgPath, resolvedSource } = ctx;

  if (isNil(resolvedSource) || isEmptyArray(libOutputs)) return;

  const bundle = await rollup({
    input: resolvedSource,
    plugins: [
      postcss({
        extract: true,
        extensions: stylesExtensions,
        plugins: [],
      }),
      PeerDepsExternalPlugin({
        includeDependencies: true,
        packageJsonPath: pkgPath,
      }) as Plugin<any>,
      typescriptPaths({
        preserveExtensions: true,
      }),
      json(),
      swc({ swc: getSwcConfig(ctx), exclude: /node_modules/ }),
      commonjs({ extensions: jsExtensions }),
      nodeResolve({ rootDir: options.cwd }),
      !!pkg.types &&
        typescript({
          rootDir: path.dirname(resolvedSource),
          emitDeclarationOnly: true,
          declarationDir: path.resolve(options.cwd, path.dirname(pkg.types)),
          declaration: true,
        }),
    ],
  });

  await Promise.all(libOutputs.map(outputConfig => bundle.write(outputConfig)));
};
