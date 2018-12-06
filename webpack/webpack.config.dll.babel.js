const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const vendorPath = path.resolve(__dirname, `../dist/dll/${process.env.NODE_ENV}`);
const library = '[name]Lib';

export default {
  mode: process.env.NODE_ENV,
  entry: {
    vendors: './baseLib/index.js'
  },
  resolve: {
    mainFiles: ['index.web', 'index'],
    modules: [
      'node_modules',
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  output: {
    filename: '[name].dll.js',
    path: vendorPath,
    library,
  },

  plugins: [
    new CleanWebpackPlugin([`dist/dll/${process.env.NODE_ENV}`], {
      root: path.resolve(__dirname, '../'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
