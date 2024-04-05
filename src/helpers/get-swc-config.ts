import type { Options as SwcOptions } from '@swc/core';

export type GetSwcConfigArg = {
  ts: boolean;
  jsx: boolean;
};

export const getSwcConfig = ({ jsx, ts }: GetSwcConfigArg): SwcOptions => {
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
    },

    sourceMaps: true,
    swcrc: false,
  };
};
