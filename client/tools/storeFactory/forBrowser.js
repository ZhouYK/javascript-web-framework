/**
 * Created by ink on 2018/4/10.
 */
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { middleware } from './common';
import genStore from '../storeGen/store';


const store = (reducers, history) => {
  const middlewares = [...middleware, routerMiddleware(history)];
  return genStore(
    combineReducers(reducers),
    {},
    applyMiddleware(...middlewares),
  );
};
export const historyConf = options => createBrowserHistory(options);
export default store;
