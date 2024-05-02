import { Command } from 'commander';
import pkg from '../package.json';

export const prog = new Command(pkg.name);

prog
  .version(pkg.version)
  .option('-c, --cwd <cwd>', 'root dir path of your lib', '.')
  // .option('-s, --single', 'do you want to build to single file?', false)
  .parse();
