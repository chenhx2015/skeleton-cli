#! /usr/bin/env node

const inquirer = require('inquirer');
const program = require('commander');
const chalk = require('chalk'); // 注意此处版本问题，5.x.x 版本的不支持 require 引入，只能 import @todo 可研究如何使用最新版本

// 2.chalk 命令行美化 

// 1.添加命令(创建命令)
// 执行 npx skeleton-cli create demoapp 的时候会打印出来 “project name is demoapp”
program
  .version('0.1.0')
  .command('create <name>')
  .description('create a new project')
  // 4. 命令和参数
  .option('-f, --force', 'overwrite target directory if it exist') // 可以支持添加 -f 参数
  .action((name, options) => {
    // 打印命令行输入的值
    console.log("project name is: " + chalk.green(name)) // chalk 命令行美化
    console.log("options: " + options) // @todo 打印的有点不对，应该打印出来 {force: true}, 现在打印 [object, object]
    console.log("options: " + options.force) // 这个打印出来是 true / undefined 
    require('./libs/create')(name, options)
  })

// 4.1
program
  // 4.3配置版本号信息
  .version(`v${require('./package.json').version}`)
  .usage('<command> [option]')

// program.parse()
// 4.2 解析用户执行命令传入参数
program.parse(process.argv)


// 3.询问 命令行交互工具
// inquirer.prompt([
//   {
//     type: 'input', // type： input, number, confirm, list, checkbox ... 
//     name: 'name',
//     message: 'you name',
//     default: 'my skeleton-cli',
//   }
// ]).then(answers => {
//   console.log('answers', answers);
// })
