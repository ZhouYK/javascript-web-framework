const webpackService = {
  start: require('../action/start'),
  build: require('../action/build'),
  wba: require('../action/wba')
};

module.exports = {
  webpack: webpackService
};
