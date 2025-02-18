#!/usr/bin/env node
const { program } = require('commander');
const { version, name, description } = require('../package.json');
const { exec } = require('../cli/gemp');

// 设置版本号
program
  .name(name)
  .description(description)
  .version(version, '-v, --version', '输出版本号')
  .usage('<command> [options]');

program
  .command('init')
  .argument('[project-name]', '项目名', 'my-project')
  .description('创建项目')
  .option('-t, --template [template]', 'JSON数据 HTTP地址或文件的相对或绝对路径')
  .action((projectName, options) => {
    exec('init', options);
  });

program
  .command('dev')
  .description('启动开发服务')
  .option('-p, --port [port]', '端口号', '5000')
  .option('-h, --host [host]', 'host', '0.0.0.0')
  .option('-d, --dev [dev]', 'dev', true)
  .action((options) => {
    exec('dev', options);
  });

program.parse();