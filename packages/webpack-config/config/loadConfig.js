const fs = require('fs');
const path = require('path');
const config = require('./defaultCustomerConfig');
const customerConfigPath = path.resolve(process.cwd(), './webpack-config.js');
if (fs.existsSync(customerConfigPath)) {
  const customerConfig = require(customerConfigPath);
  const configKeys = Object.keys(config);
  configKeys.forEach((key) => {
    Object.assign(config[key], customerConfig[key]);
  });
}
const getConfig = {
  build: require('./webpack.config.prod'),
  start: require('./webpack.config.dev'),
}

const loadConfig = (command, env = 'prod') => getConfig[command](config, env);

module.exports = loadConfig;

