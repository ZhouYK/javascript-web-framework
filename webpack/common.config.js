/**
 * Created by ink on 2018/4/4.
 */
import path from 'path';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

export const contentPath = path.resolve(__dirname, '../dist');
// 这里可以路径前一个名称作为页面区分
const entry = {
  index: ['./client/index.jsx'],
};
const rules = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
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
  new ProgressBarPlugin({
    format: '\u001b[90m\u001b[44mBuild\u001b[49m\u001b[39m [:bar] \u001b[32m\u001b[1m:percent\u001b[22m\u001b[39m (:elapseds) \u001b[2m:msg\u001b[22m\r',
    renderThrottle: 100,
    summary: true,
    clear: false,
  }),
];
const config = {
  entry,
  target: 'web',
  output: {
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    libraryTarget: 'umd',
  },
  module: {
    rules,
  },
  resolve: {
    alias: {
      $tools: path.resolve(__dirname, '../client/tools/'),
      $utils: path.resolve(__dirname, '../client/utils/'),
    },
    mainFiles: ['index.web', 'index'],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../client'),
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins,
};
export default config;
