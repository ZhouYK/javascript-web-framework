const webpack = require('webpack');
const webpackConfigLoader = require('../config/loadConfig');
const Wba = require('../tools/wba');

const wba = (env) => {
  const webpackConfig = webpackConfigLoader('build', env);
  webpackConfig.plugins.push(new Wba({
    analyzerPort: '8989'
  }));
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err || stats);
    }
  })
};
module.exports = wba;
