import path from 'path';
import { getExportsFilenames } from '../utils/get-exports-filenames';
import type { ContextModel } from '../models/context';

export const getCSSFilename = ({ pkg }: Pick<ContextModel, 'pkg'>) => {
  const filenames = getExportsFilenames(pkg.exports);

  return filenames.find(filename => path.extname(filename) === '.css');
};
