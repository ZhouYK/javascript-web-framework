/**
 * Created by ink on 2018/4/10.
 */
import { applyMiddleware } from 'redux';
import { middleware } from './common';
import genStore from '../genStore/store';

const defaultReducer = () => ({});

const store = (reducers = defaultReducer) => genStore(
  reducers,
  {},
  applyMiddleware(...middleware),
);
export default store;
