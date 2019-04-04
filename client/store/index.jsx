import { combineReducers } from 'redux';
import { destruct } from 'react-glue-redux-hook';
import storeFactory from '../tools/storeFactory/forBrowser';
import models from '../pages/models';

const store = storeFactory();
const { reducers, connect } = destruct(store)(models);
store.replaceReducer(combineReducers(reducers));

export {
  connect,
};

export default store;
