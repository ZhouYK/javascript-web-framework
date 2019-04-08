#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const packageInfo = require('./package.json');
const service = require('./service');

program
  .version(packageInfo.version, '-v, --version')
  .arguments('')
  .parse(process.argv);
program
  .command('start')
  .option('-e, --env [environment]', 'specify the environment', 'local')
  .action(function (cmd) {
    console.log(chalk.green(`Starting for ${cmd.env}`));
    service.webpack.start(cmd.env);
  });
program
  .command('build')
  .option('-e, --env [environment]', 'specify the environment', 'local')
  .action(function (cmd) {
    console.log(chalk.blue(`Building for ${cmd.env}`));
    service.webpack.build(cmd.env);
  });
program
  .command('wba')
  .option('-e, --env [environment]', 'specify the environment', 'local')
  .action(function (cmd) {
    console.log(chalk.yellow(`building for wba ${cmd.env}`));
    service.webpack.wba(cmd.env);
  });
program.parse(process.argv);
