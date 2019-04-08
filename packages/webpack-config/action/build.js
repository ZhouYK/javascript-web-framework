const webpack = require('webpack');
const webpackConfigLoader = require('../config/loadConfig');

const build = (env) => {
  const webpackConfig = webpackConfigLoader('build', env);
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err || stats);
    }
  })
};
module.exports = build;
