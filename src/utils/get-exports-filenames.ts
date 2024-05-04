import type { OptimalPkgModel } from '../models/optimal-pkg';
import { isEmptyObject, isEmptyString, isNil, isObject, isString } from './checks';

export const getExportsFilenames = (exs: OptimalPkgModel['exports']): string[] => {
  if (
    isNil(exs) ||
    (isObject(exs) && isEmptyObject(exs)) ||
    (isString(exs) && isEmptyString(exs))
  )
    return [];

  if (isString(exs)) return [exs];

  return Object.values(exs).flatMap(ex => getExportsFilenames(ex));
};
