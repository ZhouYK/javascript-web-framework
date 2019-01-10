import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import commonConfig, { contentPath } from './common.config';
import packageObj from '../package.json';
import swVersion from '../dist/sw-version';

const nodeEnv = 'development';
const publicPath = '/'; // 可自定义
const entry = Object.assign({}, commonConfig.entry);
const config = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry,
  target: commonConfig.target,
  output: Object.assign({}, commonConfig.output, {
    path: contentPath,
    publicPath,
  }),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'eslint-loader',
          options: {
            cache: true,
            quiet: true,
            failOnError: true,
          },
        }],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      ...commonConfig.module.rules,
    ],
  },
  resolve: commonConfig.resolve,
  externals: commonConfig.externals,
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      'process.env.JENKINS_ENV': JSON.stringify('test'),
    }),
    new ManifestPlugin({
      fileName: 'mapping.json',
      publicPath,
      seed: {
        title: packageObj.name,
      },
    }),
    new HtmlWebpackPlugin({
      template: './html/index.html',
      filename: 'index.html',
      templateParameters: {
        version: `/forsw.gif?${swVersion}`,
        vendor: `${publicPath}dll/${nodeEnv}/vendors.dll.js`,
        title: packageObj.name,
      },
      inject: true,
    }),
    ...commonConfig.plugins,
  ],
};
export default config;
