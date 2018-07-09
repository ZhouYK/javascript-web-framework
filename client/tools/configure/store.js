let configureStore;
if (process.env.NODE_ENV === 'development') {
  configureStore = require('./store.local').default;
} else {
  configureStore = require('./store.prod').default;
}
module.exports = configureStore;
