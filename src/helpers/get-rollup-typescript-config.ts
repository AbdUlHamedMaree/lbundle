import path from 'path';
import type { ContextModel } from '../models/context';
import type { RollupTypescriptOptions } from '@rollup/plugin-typescript';

export const getRollupTypescriptConfig = ({
  options,
  pkg,
  resolvedSource,
  tsconfigPath,
}: Pick<
  ContextModel,
  'options' | 'pkg' | 'resolvedSource' | 'tsconfigPath'
>): RollupTypescriptOptions => {
  const declarationOptions = pkg.types
    ? {
        emitDeclarationOnly: true,
        declaration: true,
        declarationDir: path.resolve(options.cwd, path.dirname(pkg.types)),
      }
    : {};

  return {
    tsconfig: tsconfigPath ?? false,

    rootDir: resolvedSource ? path.dirname(resolvedSource) : undefined,

    sourceMap: false,

    ...declarationOptions,
  };
};
