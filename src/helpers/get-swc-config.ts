import { getReactRuntime } from '../utils/get-react-runtime';
import type { Options as SwcOptions } from '@swc/core';
import { getSwcEnv } from './get-swc-env';
import type { ContextModel } from '../models/context';

export type GetSwcConfigArg = {
  ts: boolean;
  jsx: boolean;
};

export const getSwcConfig = ({
  isTs,
  isJsx,
  pkg,
}: Pick<ContextModel, 'isJsx' | 'isTs' | 'pkg'>): SwcOptions => {
  const reactRuntime = getReactRuntime(pkg);

  return {
    env: getSwcEnv(pkg),
    jsc: {
      parser: isTs
        ? {
            syntax: 'typescript',
            tsx: isJsx,
          }
        : { syntax: 'ecmascript', jsx: isJsx },
      transform: reactRuntime
        ? {
            react: {
              runtime: reactRuntime,
            },
          }
        : undefined,
    },

    sourceMaps: true,
    swcrc: false,
  };
};
