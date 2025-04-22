import type { OutputOptions } from 'rollup';
import type { OptimalPkgModel } from './optimal-pkg';
import type { OptionsModel } from './options';

export type ContextModel = {
  baseOptions: Partial<OptionsModel>;
  options: OptionsModel;

  globalName: string;

  pkgPath: string;
  pkg: OptimalPkgModel;

  swcPath?: string;

  tsconfigPath?: string;

  isModule: boolean;

  resolvedSource?: string;
  resolvedBinSource?: string;

  isTs: boolean;
  isJsx: boolean;

  libOutputs: OutputOptions[];
  binOutput?: OutputOptions;

  cssFilename: string;
};
