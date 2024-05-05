import type { PkgType } from './pkg-type';

export type OptimalPkgModel = {
  name: string;
  version: string;

  source?: string;
  'bin:source'?: string;

  main?: string;
  module?: string;

  'types'?: string;

  bin?: string | Record<string, string | undefined>;
  unpkg?: string;

  type?: PkgType;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  exports?: string | (ExportsModel & Record<string, ExportsModel | undefined>);
};

export type ExportsModel = {
  default?: string | ExportsModel;
  node?: string | ExportsModel;
  require?: string | ExportsModel;
  import?: string | ExportsModel;
  types?: string | ExportsModel;
};
