import type { OutputOptions } from 'rollup';
import { isNil } from '../utils/checks';
import path from 'path';
import type { ContextModel } from '../models/context';

export const getBinOutput = ({
  options,
  pkg,
}: Pick<ContextModel, 'options' | 'pkg'>): OutputOptions | undefined => {
  if (isNil(pkg.bin)) return;

  return {
    format: 'cjs',

    file: path.resolve(options.cwd, pkg.bin),

    strict: true,
    sourcemap: true,
  };
};
