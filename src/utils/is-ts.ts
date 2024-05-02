import type { OptimalPkgModel } from '../models/optimal-pkg';
import path from 'path';

export const isTs = (pkg: OptimalPkgModel): boolean => {
  if (pkg.source && path.extname(pkg.source).includes('ts')) return true;

  return (
    !!pkg.dependencies?.typescript ||
    !!pkg.devDependencies?.typescript ||
    !!pkg.peerDependencies?.typescript
  );
};
