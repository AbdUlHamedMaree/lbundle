import path from 'path';

export const getFilenameOutputFormat = (
  filename: string,
  isModule = false
): 'esm' | 'cjs' | 'umd' | 'amd' | 'iife' => {
  const ext = path.extname(filename);

  filename.substring;

  switch (ext) {
    case '.mjs':
      return 'esm';
    case '.cjs':
      return 'cjs';
  }

  const filenameWithoutExt = filename.substring(0, filename.length - ext.length);

  const luxuryExt = path.extname(filenameWithoutExt);

  if (!luxuryExt) {
    return isModule ? 'esm' : 'cjs';
  }

  switch (luxuryExt) {
    case '.umd':
      return 'umd';
    case '.amd':
      return 'amd';
    case '.iife':
      return 'iife';
  }

  throw new Error('[lbundle] unknown output format for filename: ' + filename);
};
