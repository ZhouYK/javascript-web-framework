#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');
//const cp = require('child_process');
const chalk = require('chalk');

const version = require('./package').version;
const deleteFolder = (filePath) => {
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    files.forEach(file => {
      const nextFolderPath = path.resolve(filePath, `./${file}`);
      const state = fs.statSync(nextFolderPath);
      if (state.isDirectory()) {
        deleteFolder(nextFolderPath)
      } else {
        fs.unlinkSync(nextFolderPath);
      }
    });
    fs.rmdirSync(filePath);
  }
};
program
  .version(version, '-v, --version')
  .usage('[options]')
  .option('-l, --scaffold-list', 'show scaffold list')
  .option('-s, --select-scaffold', 'show scaffold select list')
  .parse(process.argv);

if (program.scaffoldList) {
  const text = `Scaffold：
  1, page(js)
  `;
  console.log(text)
} else if (program.selectScaffold) {
  inquirer.prompt([{
    type: 'list',
    name: 'scaffold',
    message: 'scaffold list:',
    choices: [{
      name: 'page(js)',
      value: 'page-javascript',
      short: 'page-javascript',
    }]
  }]).then(choice => {
    // Use user feedback for... whatever!!
    inquirer.prompt({
      type: 'input',
      name: 'folder',
      message: 'folder name:'
    }).then(answer => {
      const p = path.resolve(process.cwd(), `./${answer.folder}`);
      const flag = fs.existsSync(p);
      if (!flag) {
        fs.mkdirSync(p);
        console.log(chalk.green('Digging...'));
        ncp('./node_modules/@zhouyk/javascript-web-framework', p, function (err) {
          if (err) {
            return console.error(chalk.red(err));
          }
          console.log(chalk.green('Done! Enjoy your work!'));
        })
      } else {
        console.log(chalk.red(`folder：${answer.folder} already exists`));
      }
    })
  });
} else {
  program.outputHelp();
}
