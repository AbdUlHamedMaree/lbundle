import type { PkgType } from '$models/pkg-type';

export const getOutputExtensions = (type?: PkgType) =>
  type === 'module'
    ? {
        esm: '.js',
        cjs: '.cjs',
      }
    : {
        esm: '.mjs',
        cjs: '.js',
      };
