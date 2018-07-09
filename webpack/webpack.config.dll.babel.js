const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

export const vendorPath = path.resolve(__dirname, '../public');
console.log('vendorPath，', vendorPath);
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
