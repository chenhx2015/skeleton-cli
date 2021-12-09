#! /usr/bin/env node

const inquirer = require('inquirer');
const program = require('commander');
const chalk = require('chalk'); // 注意此处版本问题，5.x.x 版本的不支持 require 引入，只能 import @todo 可研究如何使用最新版本
const figlet = require('figlet');

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

// 5. 配置 config 命令 @todo 可以学习一下 vue-cli 里面的一些命令以及实现
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(value, options)
  })

// 配置 ui 命令
program
  .command('ui')
  .description('start add open roc-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(option)
  })

// 7. 完善帮助信息
program
  // 监听 --help 执行
  .on('--help', () => {

    // 7.1 使用 figlet 绘制 Logo
    // 先 yarn add figlet 一下
    console.log('\r\n' + figlet.textSync('skeleton', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 120,
      whitespaceBreak: true
    }));

    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`skeleton-cli <command> --help`)} for detailed usage of given command\r\n`)
  })


// program.parse()
// 4.2 解析用户执行命令传入参数
program.parse(process.argv)


// 3.询问 命令行交互工具
// 8.询问用户问题 并 获取创建所需要的信息
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
