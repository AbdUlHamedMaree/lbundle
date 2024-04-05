import { Command } from 'commander';
import pkg from '../package.json';

export const prog = new Command(pkg.name);

prog.version(pkg.version);
prog.option('-c, --cwd <cwd>', undefined, '.');

prog.parse();
