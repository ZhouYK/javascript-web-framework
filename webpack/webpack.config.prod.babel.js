import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import OptimizeCssPlugin from 'optimize-css-assets-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import UglifyjsWebpackPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

import commonConfig, { contentPath } from './common.config';

const smp = new SpeedMeasurePlugin();

const nodeEnv = 'production';
const getConfig = (publicPath, env) => (smp.wrap({
  mode: nodeEnv,
  devtool: 'source-map',
  entry: commonConfig.entry,
  output: Object.assign({}, commonConfig.output, {
    path: contentPath,
    publicPath,
  }),
  module: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
      }, {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        },
      }],
    }, {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
      }],
    }, ...commonConfig.module.rules],
  },
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        uglifyOptions: {
          parse: {
            // we want uglify-js to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCssPlugin({
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          // 避免 cssnano 重新计算 z-index
          safe: true,
        },
      }),
    ],
    namedModules: true,
    occurrenceOrder: false,
  },
  resolve: commonConfig.resolve,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      'process.env.JENKINS_ENV': JSON.stringify(env),
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      exclude: ['dll'],
      verbose: true,
      dry: false,
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest: require(path.join(__dirname, `../dist/dll/${nodeEnv}/vendors.manifest.json`)),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
    }),
    new ManifestPlugin({
      fileName: 'mapping.json',
      publicPath,
      seed: {
        title: '后台管理系统',
      },
    }),
    new HtmlWebpackPlugin({
      template: './html/index.html',
      filename: 'index.html',
      templateParameters: {
        vendor: `${publicPath}dll/${nodeEnv}/vendors.dll.js`,
        title: '中后台管理系统',
      },
      inject: true,
      favicon: 'html/favicon.ico',
    }),
    ...commonConfig.plugins,
  ],
  stats: 'minimal',
}));
export default getConfig;
