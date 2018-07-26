import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import commonConfig, { contentPath } from './common.config';
import packageObj from '../package.json';

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
    new HtmlWebpackPlugin({
      template: './html/index.html',
      filename: 'index.html',
      templateParameters: {
        vendor: `${publicPath}dll/vendors.dll.js`,
        title: packageObj.name,
      },
      inject: true,
    }),
    ...commonConfig.plugins,
  ],
};
export default config;
