import type { ContextModel } from '../models/context';
import { stylesExtensions } from '../constants/styles-extensions';
import styles from 'rollup-plugin-styler';
import postcssImport from 'postcss-import';

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
    plugins: [
      postcssImport({
        root: options.cwd,
      }),
    ],
  });
