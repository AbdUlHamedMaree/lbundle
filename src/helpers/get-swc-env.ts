import type { OptimalPkgModel } from '../models/optimal-pkg';
import type { EnvConfig } from '@swc/core';

export const getSwcEnv = (pkg: OptimalPkgModel): EnvConfig => {
  const coreJsVersion =
    pkg.dependencies?.['core-js'] ??
    pkg.devDependencies?.['core-js'] ??
    pkg.peerDependencies?.['core-js'];

  if (!coreJsVersion) return { targets: 'defaults' };

  return {
    targets: 'defaults',
    coreJs: coreJsVersion,
    mode: 'usage',
    bugfixes: true,
  };
};
