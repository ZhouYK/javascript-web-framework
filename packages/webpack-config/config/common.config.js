/**
 * Created by ink on 2018/4/4.
 */
const path = require('path');
const chalk = require('chalk');
const ProgressPlugin = require('progress-bar-webpack-plugin');
const rules = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: false,
    },
  }],
}, {
  test: /\.(png|gif|jpe?g)$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 100000,
    },
  }],
}];

const plugins = [
  new ProgressPlugin({
    format: `${chalk.green.bold('Build')} ${chalk.green(':bar')} ${chalk.blue(':percent')} ${chalk.blue('(:elapsed seconds)')}`,
    clear: false,
    width: 60
  }),
];
const config = {
  context: path.resolve(__dirname, '../'),
  stats: 'minimal',
  target: 'web',
  output: {
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    // 这个会影响externals的配置
    // libraryTarget: 'umd',
  },
  module: {
    rules,
  },
  resolve: {
    //alias: {
    //  $tools: path.resolve(pwd, './client/tools/'),
    //  $utils: path.resolve(pwd, './client/utils/'),
    //},
    mainFiles: ['index.web', 'index'],
    // 不要设置，会导致包找不到
    //modules: [
    //  path.resolve(pwd, './node_modules'),
    //  path.resolve(pwd, './client'),
    //],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins,
};
module.exports = config;
