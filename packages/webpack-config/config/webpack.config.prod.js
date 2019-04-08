const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
//mini-css-extract-plugin已经优化了
//const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./common.config');
const curAbsoulutePath = process.cwd();
const contentPath = path.resolve(curAbsoulutePath, './dist');

const swVersion = require(path.resolve(curAbsoulutePath, './dist/sw/sw-version'));


const nodeEnv = 'production';
const getConfig = (config, env) => {
  const publicPath = config.publicPaths[env];
  const title = config.html.title;
  return {
    mode: nodeEnv,
    devtool: 'source-map',
    entry: config.entry,
    output: Object.assign({}, commonConfig.output, {
      path: contentPath,
      publicPath,
    }),
    module: {
      rules: [{
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
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
        //new OptimizeCssPlugin({
        //  cssProcessorOptions: {
        //    discardComments: { removeAll: true },
        //    // 避免 cssnano 重新计算 z-index
        //    safe: true,
        //  },
        //}),
      ],
      namedModules: true,
      occurrenceOrder: false,
    },
    resolve: commonConfig.resolve,
    externals: commonConfig.externals,
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(nodeEnv),
        'process.env.BUILD_ENV': JSON.stringify(env),
      }),
      new CleanWebpackPlugin(['dist'], {
        root: curAbsoulutePath,
        exclude: ['dll', 'sw', 'sw.js'],
        verbose: true,
        dry: false,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:8].css',
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
    // stats: 'minimal',
  }
};
module.exports = getConfig;
