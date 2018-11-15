import React from 'react';
import { render } from 'react-dom';
import Root from './top/Root';
import App from './top/App';

if (window.Promise && !window.Promise.prototype.finally) {
  window.Promise = null;
}

require('es6-promise').polyfill();

render(
  <Root>
    <App />
  </Root>,
  document.getElementById('bd'),
);
