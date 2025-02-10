import type { Options as SwcOptions } from '@swc/core';
import { getSwcEnv } from './get-swc-env';
import type { ContextModel } from '../models/context';
import type { ModuleFormat, OutputOptions } from 'rollup';

export type GetSwcConfigArg = {
  ts: boolean;
  jsx: boolean;
};

export const getSwcConfig = (
  { isTs, isJsx, pkg }: Pick<ContextModel, 'isJsx' | 'isTs' | 'pkg'>,
  { format }: Pick<OutputOptions, 'format'>
): SwcOptions => {
  return {
    env: getSwcEnv(pkg),
    jsc: {
      target: undefined,
      parser: isTs
        ? {
            syntax: 'typescript',
            tsx: isJsx,
          }
        : { syntax: 'ecmascript', jsx: isJsx },
    },

    module: {
      type: formatToTypeMap[format ?? 'es'],
    },

    sourceMaps: true,
    swcrc: false,
  };
};

const formatToTypeMap: Record<
  ModuleFormat,
  'es6' | 'commonjs' | 'umd' | 'amd' | 'nodenext' | 'systemjs'
> = {
  amd: 'amd',

  umd: 'umd',
  iife: 'umd',

  system: 'systemjs',
  systemjs: 'systemjs',

  cjs: 'commonjs',
  commonjs: 'commonjs',

  es: 'es6',
  esm: 'es6',
  module: 'es6',
};
