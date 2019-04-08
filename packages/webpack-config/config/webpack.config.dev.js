const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./common.config');
const pwd = process.cwd();
const contentPath = path.resolve(pwd, './dist');
const swVersion = require(path.resolve(pwd, './dist/sw/sw-version'));

const nodeEnv = 'development';
const config = (config, env) => {
  const publicPath = config.publicPaths[env];
  const title = config.html.title;
  return {
    devtool: 'eval-source-map',
    mode: nodeEnv,
    entry: config.entry,
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
              cache: false,
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
    devServer: Object.assign({
      contentBase: contentPath
    }, config.devServer),
    plugins: [
      // 如果是通过命令行 --hot的，则不用添加此配置，因为她会自动启用
      // 如果是通过配置项的，则需要手动开启
      // 如果是通过node启动，需要和后面进行配合 addDevServerEntrypoints
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(nodeEnv),
        'process.env.BUILD_ENV': JSON.stringify(env),
      }),
      new ManifestPlugin({
        fileName: 'mapping.json',
        publicPath,
        seed: {
          title,
        },
      }),
      new HtmlWebpackPlugin({
        template: './html/index.html',
        filename: 'index.html',
        version: `/sw/forsw.gif?${swVersion}`,
        title,
        inject: true,
        favicon: 'html/favicon.ico',
      }),
      ...commonConfig.plugins,
    ],
  }
};
module.exports = config;
