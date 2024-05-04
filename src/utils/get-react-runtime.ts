import type { OptimalPkgModel } from '../models/optimal-pkg';
import { satisfies } from 'compare-versions';

const automaticRuntimeVersions = ['^16.14.0', '^15.7.0', '>=17.0.0'];

export const getReactRuntime = (
  pkg: OptimalPkgModel
): 'classic' | 'automatic' | undefined => {
  const reactVersion =
    pkg.dependencies?.react ?? pkg.devDependencies?.react ?? pkg.peerDependencies?.react;

  if (!reactVersion) return;

  if (automaticRuntimeVersions.some(version => satisfies(reactVersion, version)))
    return 'automatic';

  return 'classic';
};
