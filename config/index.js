const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

class Config {
  async processDefault(options) {
    const { server: devServer, empShare, port, host, dev } = options;
    return {
      context: process.cwd(),
      mode: "development",
      devtool: dev ? "source-map" : "eval-source-map",
      entry: {
        app: "./src/index.js",
      },
      output: {
        path: path.resolve(process.cwd(), "dist"),
        filename: "[name].js",
      },
      devServer: {
        port,
        host,
        open: true,
        hot: true,
        static: {
          directory: path.join(process.cwd(), "public"),
        },
        ...devServer,
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "../template/index.html"),
        }),
        // 模块联邦
        new ModuleFederationPlugin({
          filename: 'emp.js',
          ...empShare
        })
      ],
      // module: {
      //   rules: {
      //     test: /\.js$/,
      //     exclude: /node_modules/,
      //     use: {
      //       loader: "babel-loader",
      //       options: {
      //         presets: [
      //           require.resolve("@babel/preset-env"),
      //           require.resolve("@babel/preset-react"),
      //         ],
      //       },
      //     },
      //   },
      // },
    };
  }
  async getConfig(options) {
    const { port, host, dev } = options;
    const empConfigPath = path.resolve(process.cwd(), "emp-config.js");
    const empConfig = await require(empConfigPath);
    return await this.processDefault({ ...empConfig, port, host, dev });
  }
}

module.exports = new Config();
