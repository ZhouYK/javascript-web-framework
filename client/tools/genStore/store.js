let genStore;
if (process.env.NODE_ENV === 'development') {
  genStore = require('./store.local').default;
} else {
  genStore = require('./store.prod').default;
}
module.exports = genStore;
