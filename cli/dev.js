const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

class DevServer {
  constructor() {
    this.server = null;
  }

  async setup(options) {
    this.start(options);
  }

  async start(options) {
    const configInstance = require('../config');
    const config = await configInstance.getConfig(options);
    const compiler = webpack(config);
    const server = new WebpackDevServer(config.devServer, compiler);
    this.server = server;
    await this.server.start();
  }

  async stop() {
    if(this.server) {}
  }
}

module.exports = new DevServer();