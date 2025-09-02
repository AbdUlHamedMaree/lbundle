import path from 'path';
import { rollup, type Plugin } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { swc } from 'rollup-plugin-swc3';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';

import { getSwcConfig } from './get-swc-config';
import { jsExtensions } from '../constants/js-extensions';
import type { ContextModel } from '../models/context';
import { isNil } from '../utils/checks';
import { stylesExtensions } from '../constants/styles-extensions';
import { allAssetExtensions } from '../constants/asset-extensions';
import { getRollupAssetPluginsForBin } from './get-rollup-asset-plugins';

export const bundleBinIfNeeded = async (ctx: ContextModel) => {
  const { pkg, pkgPath, options, binOutput } = ctx;

  if (isNil(pkg['bin:source']) || isNil(binOutput)) return;

  const bundle = await rollup({
    input: path.resolve(options.cwd, pkg['bin:source']),
    plugins: [
      PeerDepsExternalPlugin({
        includeDependencies: true,
        packageJsonPath: pkgPath,
      }) as Plugin<any>,
      typescriptPaths({
        preserveExtensions: true,
      }),
      json(),
      ...getRollupAssetPluginsForBin(),
      swc({
        ...getSwcConfig(ctx, binOutput),
        tsconfig: ctx.tsconfigPath ?? false,
      }),
      commonjs({ extensions: jsExtensions }),
      nodeResolve({
        rootDir: options.cwd,
        extensions: [...jsExtensions, ...stylesExtensions, ...allAssetExtensions],
      }),
    ],
  });

  await bundle.write(binOutput);
};
