import path from 'path';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import commonConfig from './common.config';
import packageObj from '../package.json';

const contentPath = path.resolve(__dirname, 'dist');
const publicPath = '/'; // 可自定义
const entry = Object.assign({}, commonConfig.entry);
const config = {
  devtool: 'eval-source-map',
  entry,
  target: commonConfig.target,
  output: Object.assign({}, commonConfig.output, {
    path: contentPath,
    publicPath,
  }),
  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    }, ...commonConfig.module.rules],
  },
  resolve: commonConfig.resolve,
  watchOptions: {
    aggregateTimeout: 400,
    poll: 1000,
    ignored: /node_modules/,
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: '8888',
    disableHostCheck: true,
    contentBase: contentPath,
    historyApiFallback: true,
    stats: 'minimal',
    compress: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new ManifestPlugin({
      fileName: 'mapping.json',
      publicPath,
      seed: {
        title: packageObj.name,
      },
    }),
    ...commonConfig.plugins,
  ],
};
export default config;
