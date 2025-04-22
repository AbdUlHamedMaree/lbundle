import path from 'path';
import fs from 'fs';
import merge from 'lodash.merge';

import type { OptimalPkgModel } from '../models/optimal-pkg';
import type { OptionsModel } from '../models/options';
import { getDefaultOptions } from './get-default-options';
import { getLibOutputs } from './get-lib-outputs';
import type { ContextModel } from '../models/context';
import { getBinOutput } from './get-bin-output';
import { isNil } from '../utils/checks';
import { getCSSFilename } from './get-css-filename';
import { pascalCase } from 'change-case';
import { isTs } from '../utils/is-ts';
import { isJsx } from '../utils/is-jsx';

export const getCtx = async (
  baseOptions: Partial<OptionsModel>
): Promise<ContextModel> => {
  const options = merge(getDefaultOptions(), baseOptions);

  const pkgPath = path.resolve(options.cwd, 'package.json');

  const pkg = JSON.parse(await fs.promises.readFile(pkgPath, 'utf-8')) as OptimalPkgModel;

  const tsconfigPath = path.resolve(options.cwd, 'tsconfig.json');

  const swcPath = path.resolve(options.cwd, '.swc');

  if (isNil(pkg.source) && isNil(pkg['bin:source'])) {
    throw new Error(
      '[bundle] provide source entry for you library, set `package.json` `source` or `bin:source` field'
    );
  }

  const isModule = pkg.type === 'module';

  const globalName = pascalCase(pkg.name);

  const cssFilename = getCSSFilename({ pkg }) ?? 'index.css';

  const libOutputs = getLibOutputs({ pkg, globalName, options, isModule, cssFilename });
  const binOutput = getBinOutput({ pkg, options, isModule });

  const resolvedSource = pkg.source ? path.resolve(options.cwd, pkg.source) : undefined;
  const resolvedBinSource = pkg['bin:source']
    ? path.resolve(options.cwd, pkg['bin:source'])
    : undefined;

  const ts = isTs(pkg);
  const jsx = isJsx(pkg);

  return {
    baseOptions: baseOptions,
    options: options,

    globalName,

    pkgPath,
    pkg,

    swcPath: fs.existsSync(swcPath) ? swcPath : undefined,

    tsconfigPath: fs.existsSync(tsconfigPath) ? tsconfigPath : undefined,

    isModule,

    resolvedSource,
    resolvedBinSource,

    isTs: ts,
    isJsx: jsx,

    libOutputs,
    binOutput,

    cssFilename,
  };
};
