import { Command } from 'commander';

const pkg = require('../package.json');

export const prog = new Command(pkg.name);

prog.version(pkg.version);
prog.option('-c, --cwd <cwd>', undefined, '.');

prog.parse();
