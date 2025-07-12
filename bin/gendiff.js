#!/usr/bin/env node

import { Command } from 'commander'
import getDiff from '../src/index.js'
const program = new Command()

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    return console.log(getDiff(filepath1, filepath2, program.opts().format))
  })

program.parse()
