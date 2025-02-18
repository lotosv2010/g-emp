const axios = require('axios');
const { createSpinner } = require('nanospinner');
const git = require('git-promise');
const fs = require('fs-extra');
const path = require('path');

class Init {
  constructor() {
    this.templates = {};
  }

  async checkTemplate(url) {
    const { data } = await axios.get(url);
    return data;
  }
  async setup(options) {
    if(typeof options.template === 'string') {
      this.templates = await this.checkTemplate(options.template);
    }
    await this.selectTemplates(this.templates);
  }

  async selectTemplates(templates) {
    const inquirer = require('inquirer');

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入项目名',
        default: () => {
          return 'gemp-app'
        }
      },
      {
        type: 'list',
        name: 'template',
        message: '请选择模板',
        choices: Object.keys(templates)
      }
    ]);

    const gitRepo = templates[answers.template];
    await this.downloadRepo(gitRepo, answers.name);
  }

  async downloadRepo(repoPatah, localPath) {
    const spinner = createSpinner()
    spinner.start({
      text: '正在下载模板...\n'
    });

    try {
      await git(`clone ${repoPatah} ./${localPath}`)
    } catch (err) {
      console.log("MESSAGE");
      console.log(err.message);
      console.log("ERROR CODE");
      console.log(err.code);
    }

    spinner.success({
      text: `
        模板下载成功
        cd ${localPath}
        npm install
        npm run dev
      `
    });
  }
}

module.exports = new Init();