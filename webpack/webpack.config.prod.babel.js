import path from 'path';
import webpack from 'webpack';
import ExtractCssChunks from 'extract-text-webpack-plugin';
import commonConfig from './common.config';

const contentPath = path.resolve(__dirname, 'dist');
const publicPath = '/';

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
    ...commonConfig.plugins,
  ],
};
export default config;
