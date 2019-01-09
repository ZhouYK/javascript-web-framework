/**
 * Created by ink on 2018/4/10.
 */
import { applyMiddleware } from 'redux';
import { middleware } from './common';
import genStore from '../genStore/store';

const defaultReducer = () => ({});

const store = (reducers = defaultReducer) => {
  const middlewares = [...middleware];
  return genStore(
    reducers,
    {},
    applyMiddleware(...middlewares),
  );
};
export default store;
