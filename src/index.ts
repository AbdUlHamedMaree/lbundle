import merge from 'lodash.merge';
import fs from 'fs';
import path from 'path';
import type { OptimalPkgModel } from '$models/optimal-pkg';
import { getDefaultOptions } from '$helpers/get-default-options';
import { bundleLibIfNeeded } from '$helpers/bundle-lib-if-needed';
import type { ContextModel } from '$models/context';
import { bundleBinIfNeeded } from '$helpers/bundle-bin-if-needed';
import { bundleTypesIfNeeded } from '$helpers/bundle-types-if-needed';

export const lbundle = async (baseOptions: any) => {
  const options = merge(getDefaultOptions(), baseOptions);

  const pkgPath = path.resolve(options.cwd, 'package.json');

  const pkg = JSON.parse(await fs.promises.readFile(pkgPath, 'utf-8')) as OptimalPkgModel;

  const ctx: ContextModel = {
    pkgPath,
  };

  await Promise.all([
    bundleLibIfNeeded(options, pkg, ctx),
    bundleBinIfNeeded(options, pkg, ctx),
    bundleTypesIfNeeded(options, pkg, ctx),
  ]);
};
