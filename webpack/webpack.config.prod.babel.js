import path from 'path';
import webpack from 'webpack';
import ExtractCssChunks from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import commonConfig from './common.config';
import packageObj from '../package.json';

const contentPath = path.resolve(__dirname, 'dist');
const publicPath = '/'; // 可自定义

const config = {
  devtool: 'source-map',
  entry: commonConfig.entry,
  output: Object.assign({}, commonConfig.output, {
    path: contentPath,
    publicPath,
  }),
  module: {
    rules: [{
      test: /\.less$/,
      use: ExtractCssChunks.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'less-loader'],
      }),
    }, {
      test: /\.css$/,
      use: ExtractCssChunks.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader'],
      }),
    }, ...commonConfig.module.rules],
  },
  resolve: commonConfig.resolve,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractCssChunks({
      filename: '[name].[hash:8].css',
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
