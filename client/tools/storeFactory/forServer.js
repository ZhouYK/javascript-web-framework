/**
 * Created by ink on 2018/4/10.
 */
import { applyMiddleware, combineReducers } from 'redux';
import { middleware } from './common';
import configureStore from '../storeGen/store';

const store = reducers => configureStore(
  combineReducers(reducers),
  {},
  applyMiddleware(...middleware),
);
export default store;
