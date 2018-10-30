import React from 'react';
import { render } from 'react-dom';
import Root from './top/Root';
import App from './top/App';
import store, { history } from './store';

if (window.Promise && !window.Promise.prototype.finally) {
  window.Promise = null;
}

require('es6-promise').polyfill();

render(
  <Root store={store} history={history} component={App} />,
  document.getElementById('bd'),
);
