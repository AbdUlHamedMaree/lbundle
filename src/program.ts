import { Command } from 'commander';
import pkg from '../package.json';

export const prog = new Command(pkg.name);

prog
  .version(pkg.version)
  .option('-c, --cwd <cwd>', 'path to root of this build', '.')
  .option('-s, --single', 'do you want to build to single file?', false)
  .parse();
