const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

export const vendorPath = path.resolve(__dirname, '../dist/dll');
const library = '[name]_lib';

export default {
  mode: 'production',
  entry: {
    vendors: [
      'axios',
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
    ],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
    }],
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
    new CleanWebpackPlugin([vendorPath]),
    new webpack.DllPlugin({
      path: path.join(vendorPath, '[name].manifest.json'),
      name: library,
    }),
  ],
};
