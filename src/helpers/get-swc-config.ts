import type { OptimalPkgModel } from '$models/optimal-pkg';
import { getReactRuntime } from '$utils/get-react-runtime';
import { isJsx } from '$utils/is-jsx';
import { isTs } from '$utils/is-ts';
import type { Options as SwcOptions } from '@swc/core';

export type GetSwcConfigArg = {
  ts: boolean;
  jsx: boolean;
};

export const getSwcConfig = (pkg: OptimalPkgModel): SwcOptions => {
  const reactRuntime = getReactRuntime(pkg);

  const ts = isTs(pkg);
  const jsx = isJsx(pkg);

  return {
    env: {
      targets: 'defaults',
      coreJs: '3.36.1',
      mode: 'usage',
      bugfixes: true,
    },
    jsc: {
      parser: ts
        ? {
            syntax: 'typescript',
            tsx: jsx,
          }
        : { syntax: 'ecmascript', jsx },
      transform: {
        react: {
          runtime: reactRuntime,
        },
      },
    },

    sourceMaps: true,
    swcrc: false,
  };
};
