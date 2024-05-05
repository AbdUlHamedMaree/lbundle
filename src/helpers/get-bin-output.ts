import type { OutputOptions } from 'rollup';
import { isEmptyObject, isNil, isObject, isString } from '../utils/checks';
import path from 'path';
import type { ContextModel } from '../models/context';

export const getBinOutput = ({
  options,
  pkg,
}: Pick<ContextModel, 'options' | 'pkg'>): OutputOptions | undefined => {
  if (isNil(pkg.bin) || (isObject(pkg.bin) && isEmptyObject(pkg.bin))) return;

  if (isObject(pkg.bin) && Object.keys(pkg.bin).length > 1) {
    console.warn("[lbundle] multiple bin isn't supported yet");
  }

  const binSource = isString(pkg.bin) ? pkg.bin : Object.values(pkg.bin)[0];

  return {
    format: 'cjs',

    file: path.resolve(options.cwd, binSource!),

    strict: true,
    sourcemap: true,
  };
};
