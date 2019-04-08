const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfigLoader = require('../config/loadConfig');
const chalk = require('chalk');

const start = (env) => {
  const webpackConfig = webpackConfigLoader('start', env);
  const devServerConfig = webpackConfig.devServer;
  // 配合热更新配置
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);
  console.log(`\n${chalk.green('Starting server on')} ${chalk.blue(`${devServerConfig.host}:${devServerConfig.port}`)} \n`)
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, devServerConfig);
  server.listen(devServerConfig.port, devServerConfig.host, () => {
  })
};
module.exports = start;
