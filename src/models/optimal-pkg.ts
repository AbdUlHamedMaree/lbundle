import type { PkgType } from './pkg-type';

export type OptimalPkgModel = {
  source?: string;
  main?: string;
  module?: string;
  bin?: string;
  'bin:source'?: string;
  'types'?: string;
  type?: PkgType;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};
