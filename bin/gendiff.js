#!/usr/bin/env node
const { Command } = require('commander');

const program = new Command();

program
  .description ('Compares two configuration files and shoes a difference.')
  .version('')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1> <filepath2>')

program.parse();
