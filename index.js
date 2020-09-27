#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const { version, name } = require('./package.json');
const log = require('tracer').colorConsole();
const fetch = require('node-fetch');
const decompress = require('decompress');
const util = require('util');
const fs = require('fs');
const fsPromises = require('fs').promises;
const streamPipeline = util.promisify(require('stream').pipeline);

program.version(version).name(name);

program.description('cli-study脚手架工具下载');
program.command('create <project>')
  .action(function(project){
    log.info('使用例子：node index.js create myproject')
    fetch('https://github.com/chenhx2015/skeleton/archive/master.zip')
      .then(function(response) {
      if(response.status == 302) {
        log.info('redirect to ', response.Location)
        return fetch(response.Location);
      } else {
        return response;
      }
    }).then(function(res) {
      if (res.ok) {
        return streamPipeline(res.body, fs.createWriteStream('./master.zip'));
      } else {
        return Promise.reject(res.status);
      }
    }).then(function(pipe) {
      return decompress('./master.zip', './');
    }).then(function() {
      return fsPromises.rename('skeleton-master', project);
    }).then(function() {
      return fsPromises.unlink('./master.zip');
    })
  });

program.parse(process.argv);


