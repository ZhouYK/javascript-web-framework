/**
 * Created by ink on 2018/4/4.
 */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import packageObj from '../package.json';
// 这里可以路径前一个名称作为页面区分
const entry = {
  'js/index': ['babel-polyfill', './client/index.jsx'],
};
const rules = [{
  enforce: 'pre',
  test: /\.(jsx?)|(tsx?)$/,
  exclude: /node_modules/,
  use: ['eslint-loader'],
}, {
  enforce: 'pre',
  test: /\.js?$/,
  exclude: /node_modules/,
  use: ['source-map-loader'],
}, {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: ['babel-loader'],
}];
const plugins = [
  new HtmlWebpackPlugin({
    title: packageObj.name,
    template: './html/index.html',
    filename: 'index.html',
    inject: true,
  }),
];
const config = {
  entry,
  target: 'web',
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    libraryTarget: 'umd',
  },
  module: {
    rules,
  },
  resolve: {
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
