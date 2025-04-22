import type { ContextModel } from '../models/context';
import { stylesExtensions } from '../constants/styles-extensions';
import styles from 'rollup-plugin-styler';
import postcssImport from 'postcss-import';
import path from 'path';
import { getUrlOfPartial } from '../utils/url';
import { packageFilterBuilder, resolveSync } from '../utils/resolve';

const finalize = (id: string) => ({ file: id.replace(/\.css$/i, '') });
const conditions = ['sass', 'style'];

export const getRollupStylerPlugin = ({
  options,
  cssFilename,
}: Pick<ContextModel, 'options' | 'cssFilename'>) =>
  styles({
    autoModules: true,
    extensions: stylesExtensions,
    mode: ['extract', cssFilename],
    sourceMap: true,
    to: cssFilename,
    sass: {
      importer: (url: string, importer: string) => {
        if (path.isAbsolute(url) || url.startsWith('.')) return null;

        const partialUrl = getUrlOfPartial(url);

        const resolverOptions = {
          caller: 'Sass importer',
          basedirs: [path.dirname(importer)],
          extensions: stylesExtensions,
          packageFilter: packageFilterBuilder(url, { conditions }),
        };

        try {
          return finalize(resolveSync([partialUrl, url], resolverOptions));
        } catch {
          return null;
        }
      },
    } as any,
    plugins: [
      postcssImport({
        root: options.cwd,
      }),
    ],
  });
