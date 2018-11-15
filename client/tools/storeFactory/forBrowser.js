/**
 * Created by ink on 2018/4/10.
 */
import { applyMiddleware } from 'redux';
import { middleware } from './common';
import genStore from '../storeGen/store';


const store = () => {
  const middlewares = [...middleware];
  return genStore(
    () => ({}),
    {},
    applyMiddleware(...middlewares),
  );
};
export default store;
