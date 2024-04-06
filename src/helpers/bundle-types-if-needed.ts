import path from 'path';
import { rollup } from 'rollup';
import { dts } from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';

import type { OptimalPkgModel } from '$models/optimal-pkg';
import type { OptionsModel } from '$models/options';
import type { ContextModel } from '$models/context';
import { stylesExtensions } from '$constants/styles-extensions';

export const bundleTypesIfNeeded = async (
  options: OptionsModel,
  pkg: OptimalPkgModel,
  _ctx: ContextModel
) => {
  if (!pkg.source || !pkg.types) return;

  const bundle = await rollup({
    input: path.resolve(options.cwd, pkg.source),
    treeshake: 'recommended',
    plugins: [
      postcss({
        extract: false,
        extensions: stylesExtensions,
        plugins: [],
      }),
      json(),
      dts(),
    ],
  });

  await bundle.write({
    dir: path.dirname(path.resolve(options.cwd, pkg['types'])),
    preserveModules: true,
    entryFileNames: '[name].d.ts',
    format: 'es',
  });
};
