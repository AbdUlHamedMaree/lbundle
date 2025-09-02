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
import { isEmptyArray, isNil, isString, isStringFull } from '../utils/checks';
import typescript from '@rollup/plugin-typescript';
import { getRollupTypescriptConfig } from './get-rollup-typescript-config';
import { stylesExtensions } from '../constants/styles-extensions';
import { allAssetExtensions } from '../constants/asset-extensions';
import { getRollupStylerPlugin } from './get-rollup-styler-plugin';
import { getRollupAssetPlugins } from './get-rollup-asset-plugins';

export const bundleLibIfNeeded = async (ctx: ContextModel) => {
  const { pkg, options, libOutputs, pkgPath, resolvedSource } = ctx;

  if (isNil(resolvedSource) || isEmptyArray(libOutputs)) return;

  await Promise.all(
    libOutputs.map(async output => {
      const bundle = await rollup({
        input: resolvedSource,
        plugins: [
          PeerDepsExternalPlugin({
            includeDependencies: true,
            packageJsonPath: pkgPath,
          }) as Plugin<any>,
          typescriptPaths({
            preserveExtensions: true,
          }),
          json(),
          ...getRollupAssetPlugins(),
          swc({
            ...getSwcConfig(ctx, output),
            tsconfig: ctx.tsconfigPath ?? false,
          }),
          commonjs({ extensions: jsExtensions }),
          nodeResolve({
            rootDir: options.cwd,
            extensions: [...jsExtensions, ...stylesExtensions, ...allAssetExtensions],
          }),
          getRollupStylerPlugin(ctx),
          isString(pkg.types) &&
            isStringFull(pkg.types) &&
            typescript(getRollupTypescriptConfig(ctx)),
        ],
      });

      await bundle.write(output);
    })
  );
};
