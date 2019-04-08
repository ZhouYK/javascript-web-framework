import { render } from 'react-dom';
import React from 'react';
import Root from './toc/Root';
import App from './toc/App';

if (window.Promise && !window.Promise.prototype.finally) {
  window.Promise = null;
} else if (!window.Promise) {
  require('es6-promise').polyfill();
}

render(
  <Root>
    <App />
  </Root>,
  document.getElementById('bd'),
);

