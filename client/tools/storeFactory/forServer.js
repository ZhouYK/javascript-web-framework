/**
 * Created by ink on 2018/4/10.
 */
import { applyMiddleware, combineReducers } from 'redux';
import { middleware } from './common';
import genStore from '../storeGen/store';

const store = reducers => genStore(
  combineReducers(reducers),
  {},
  applyMiddleware(...middleware),
);
export default store;
