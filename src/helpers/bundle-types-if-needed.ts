import path from 'path';
import { rollup } from 'rollup';
import { dts } from 'rollup-plugin-dts';

import type { OptimalPkgModel } from '$models/optimal-pkg';
import type { OptionsModel } from '$models/options';
import type { ContextModel } from '$models/context';
import json from '@rollup/plugin-json';

export const bundleTypesIfNeeded = async (
  options: OptionsModel,
  pkg: OptimalPkgModel,
  _ctx: ContextModel
) => {
  if (!pkg.source || !pkg.types) return;

  const bundle = await rollup({
    input: path.resolve(options.cwd, pkg.source),
    treeshake: 'smallest',
    plugins: [json(), dts()],
  });

  await bundle.write({
    dir: path.dirname(path.resolve(options.cwd, pkg['types'])),
    preserveModules: true,
    entryFileNames: '[name].d.ts',
    format: 'es',
  });
};
