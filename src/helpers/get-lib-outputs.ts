import { type ModuleFormat, type OutputOptions } from 'rollup';
import { isDefined, isString } from '../utils/checks';
import { getExportsFilenames } from '../utils/get-exports-filenames';
import { getFilenameOutputFormat } from '../utils/get-filename-output-format';
import path from 'path';
import type { ContextModel } from '../models/context';

export const getLibOutputs = ({
  options,
  globalName,
  pkg,
  isModule,
  cssFilename,
}: Pick<
  ContextModel,
  'options' | 'pkg' | 'isModule' | 'globalName' | 'cssFilename'
>): OutputOptions[] => {
  const map = new Map<ModuleFormat, OutputOptions>();

  [pkg.main, pkg.module, pkg.unpkg, ...getExportsFilenames(pkg.exports)]
    .filter(
      (filename): filename is string =>
        isString(filename) && jsExtensions[path.extname(filename) as '.js']
    )
    .map<OutputOptions>(filename => {
      const format = getFilenameOutputFormat(filename, isModule);
      const ext = path.extname(filename);

      const preserveModules = preserveModulesFormats[format as 'esm'];

      const entryFileNames = preserveModules ? `[name]${ext}` : undefined;

      const dir = preserveModules
        ? path.resolve(options.cwd, path.dirname(filename))
        : undefined;

      const file = preserveModules ? undefined : path.resolve(options.cwd, filename);

      return {
        name: globalName,
        format,

        file,

        dir,
        entryFileNames,
        preserveModules,
        assetFileNames: ({ names }) => {
          const normalizedCssFilename = path.posix.normalize(cssFilename);

          if (names.includes(normalizedCssFilename)) {
            if (isDefined(dir))
              return path.relative(dir, path.resolve(options.cwd, normalizedCssFilename));

            return normalizedCssFilename;
          }

          return 'assets/[name]-[hash][extname]';
        },

        esModule: format === 'cjs',

        strict: true,
        sourcemap: true,
      };
    })
    .forEach(output => map.set(output.format!, output));

  return [...map.values()];
};

const preserveModulesFormats = {
  'esm': true,
  'cjs': true,
};

const jsExtensions = {
  '.js': true,
  '.cjs': true,
  '.mjs': true,
};
