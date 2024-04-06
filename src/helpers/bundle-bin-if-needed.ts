import path from 'path';
import { rollup, type Plugin } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from '@rollup/plugin-swc';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';

import { getSwcConfig } from './get-swc-config';
import type { OptimalPkgModel } from '$models/optimal-pkg';
import type { OptionsModel } from '$models/options';
import { jsExtensions } from '$constants/js-extensions';
import type { ContextModel } from '$models/context';
import { isTs } from '$utils/is-ts';
import { isJsx } from '$utils/is-jsx';

export const bundleBinIfNeeded = async (
  options: OptionsModel,
  pkg: OptimalPkgModel,
  ctx: ContextModel
) => {
  if (!pkg['bin:source'] || !pkg.bin) return;

  const ts = isTs(pkg['bin:source']);
  const jsx = isJsx(pkg['bin:source']);

  const bundle = await rollup({
    input: path.resolve(options.cwd, pkg['bin:source']),
    treeshake: 'recommended',
    plugins: [
      PeerDepsExternalPlugin({
        includeDependencies: true,
        packageJsonPath: ctx.pkgPath,
      }) as Plugin<any>,
      typescriptPaths({
        preserveExtensions: true,
      }),
      json(),
      swc({ swc: getSwcConfig(pkg) }),
      commonjs({ extensions: jsExtensions }),
      nodeResolve({ rootDir: options.cwd }),
    ],
  });

  await bundle.write({
    file: path.resolve(options.cwd, pkg.bin),
    format: 'cjs',
    sourcemap: true,
  });
};
