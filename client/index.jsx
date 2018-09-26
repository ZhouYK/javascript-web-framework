import React from 'react';
import { render } from 'react-dom';
import { combineReducers } from 'redux';
import Root from './top/Root';
import App from './top/App';
import reducers from './reducers';
import store, { history } from './store';

store.replaceReducer(combineReducers(reducers));
render(
  <Root store={store} history={history} component={App} />,
  document.getElementById('bd'),
);
