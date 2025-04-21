import type { ContextModel } from '../models/context';
import { stylesExtensions } from '../constants/styles-extensions';
import postcss from '../forks/rollup-plugin-postcss/src/index.js';
import postcssImport from 'postcss-import';

export const getRollupStylesPlugin = ({ options }: Pick<ContextModel, 'options'>) =>
  postcss({
    extract: true,
    extensions: stylesExtensions,
    plugins: [
      postcssImport({
        root: options.cwd,
      }),
    ],
  });
