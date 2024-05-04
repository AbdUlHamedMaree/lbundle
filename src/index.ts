import { bundleLibIfNeeded } from './helpers/bundle-lib-if-needed';
import { bundleBinIfNeeded } from './helpers/bundle-bin-if-needed';
import type { OptionsModel } from './models/options';
import { getCtx } from './helpers/get-ctx';

export const lbundle = async (baseOptions: Partial<OptionsModel>) => {
  const ctx = await getCtx(baseOptions);

  await Promise.all([bundleLibIfNeeded(ctx), bundleBinIfNeeded(ctx)]);
};
