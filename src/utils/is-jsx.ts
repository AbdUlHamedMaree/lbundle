import type { OptimalPkgModel } from '../models/optimal-pkg';
import path from 'path';

export const isJsx = (pkg: OptimalPkgModel): boolean => {
  if (pkg.source && path.extname(pkg.source).includes('sx')) return true;

  return (
    !!pkg.dependencies?.react ||
    !!pkg.devDependencies?.react ||
    !!pkg.peerDependencies?.react
  );
};
