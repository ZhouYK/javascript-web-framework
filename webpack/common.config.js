/**
 * Created by ink on 2018/4/4.
 */
import path from 'path';
import webpack from 'webpack';

import { vendorPath } from './webpack.config.dll.babel';

export const contentPath = path.resolve(__dirname, '../dist');
// 这里可以路径前一个名称作为页面区分
const entry = {
  index: ['./client/index.jsx'],
};
const rules = [{
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: ['eslint-loader'],
}, {
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  use: ['source-map-loader'],
}, {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: ['babel-loader'],
}];
const plugins = [
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(`${vendorPath}/vendors.manifest.json`),
  }),
];
const config = {
  entry,
  target: 'web',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    libraryTarget: 'umd',
  },
  module: {
    rules,
  },
  resolve: {
    mainFiles: ['index.web', 'index'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'client'),
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
