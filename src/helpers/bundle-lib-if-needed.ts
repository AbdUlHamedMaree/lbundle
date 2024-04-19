import path from 'path';
import { rollup, type Plugin } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from '@rollup/plugin-swc';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';

import type { OptimalPkgModel } from '$models/optimal-pkg';
import type { OptionsModel } from '$models/options';
import { getSwcConfig } from './get-swc-config';
import { jsExtensions } from '$constants/js-extensions';
import type { ContextModel } from '$models/context';
import { getOutputExtensions } from './get-output-extensions';
import { stylesExtensions } from '$constants/styles-extensions';

export const bundleLibIfNeeded = async (
  options: OptionsModel,
  pkg: OptimalPkgModel,
  ctx: ContextModel
) => {
  if (!pkg.source || (!pkg.main && !pkg.module)) return;

  const extensions = getOutputExtensions(pkg.type);

  const bundle = await rollup({
    input: path.resolve(options.cwd, pkg.source),
    treeshake: 'recommended',
    plugins: [
      postcss({
        extract: true,
        extensions: stylesExtensions,
        plugins: [],
      }),
      PeerDepsExternalPlugin({
        includeDependencies: true,
        packageJsonPath: ctx.pkgPath,
      }) as Plugin<any>,
      typescriptPaths({
        preserveExtensions: true,
      }),
      json(),
      swc({ swc: getSwcConfig(pkg), exclude: /node_modules/ }),
      commonjs({ extensions: jsExtensions }),
      nodeResolve({ rootDir: options.cwd }),
    ],
  });

  await Promise.all([
    pkg.module
      ? bundle.write({
          dir: path.dirname(path.resolve(options.cwd, pkg.module)),
          format: 'esm',
          entryFileNames: `[name]${extensions.esm}`,
          sourcemap: true,
          preserveModules: true,
          strict: true,
        })
      : Promise.resolve(),
    pkg.main
      ? bundle.write({
          dir: path.dirname(path.resolve(options.cwd, pkg.main)),
          format: 'cjs',
          entryFileNames: `[name]${extensions.cjs}`,
          sourcemap: true,
          preserveModules: true,
          strict: true,
          esModule: true,
        })
      : Promise.resolve(),
  ]);
};
