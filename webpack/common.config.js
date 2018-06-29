/**
 * Created by ink on 2018/4/4.
 */
import path from 'path';
import ManifestPlugin from 'webpack-manifest-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// 这里可以路径前一个名称作为页面区分
const entry = {
  'js/index': ['babel-polyfill', './client/example/index.tsx'],
};
const rules = [{
  enforce: 'pre',
  test: /\.(jsx?)|(tsx?)$/,
  exclude: /node_modules/,
  use: ['eslint-loader'],
}, {
  enforce: 'pre',
  test: /\.js?$/,
  use: ['source-map-loader'],
}, {
  test: /\.jsx?$/,
  use: ['babel-loader'],
}, {
  test: /\.tsx?$/,
  use: [{
    loader: 'babel-loader',
  }, {
    loader: 'ts-loader',
  }],
}, {
  test: /\.(png|jpg|gif)$/,
  use: ['url-loader'],
}];
const plugins = [
  new ManifestPlugin({
    fileName: 'mapping.json',
  }),
  new HtmlWebpackPlugin({
    title: 'My App',
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
