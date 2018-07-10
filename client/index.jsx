import React from 'react';
import { render } from 'react-dom';
import { combineReducers } from 'redux';
import Root from './topContainer/Root/index';
import App from './app';
import reducers from './reducers';
import store, { history } from './store';

store.replaceReducer(combineReducers(reducers));
render(
  <Root store={store} history={history} component={App} />,
  document.getElementById('bd'),
);
