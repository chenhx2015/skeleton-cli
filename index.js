#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const { version, name } = require('./package.json');
const log = require('tracer').colorConsole();
const fetch = require('node-fetch');
const decompress = require('decompress');
const util = require('util');
const fs = require('fs');
const streamPipeline = util.promisify(require('stream').pipeline);

program.version(version).name(name);

program.description('cli-study脚手架工具下载');
program.command('create <tpl> <project>')
  .action(function(tpl, project){
    log.info('目前支持以下模版：')
    log.info('使用例子：node index.js create myproject')
    if (tpl && project) {
      
    } else {
      log.error('正确命令例子：x-cli x-express myproject')
    }
    
    fetch('https://github.com/chenhx2015/skeleton/archive/master.zip')
      .then(response => {
      // console.log('response', response);
      if(response.status == 302) {
        log.info('redirect to ', response.Location)
        return fetch(response.Location);
      } else {
        return response;
      }
    }).then(res =>{
      if (res.ok) {
        return streamPipeline(res.body, fs.createWriteStream('./master.zip'));
      }else{
        return Promise.reject(res.status);
      }
    }).then( (pipe)=>{
      return decompress('./master.zip', project);
    })
  });

program.parse(process.argv);


