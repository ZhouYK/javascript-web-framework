import { combineReducers } from 'redux';
import { destruct } from 'react-glux';
import storeFactory, { historyConf } from '../tools/storeConf/forBrowser';
import models from '../reducers';

export const history = historyConf({
  basename: '', // 根据需要添加，默认为空串
});

const defaultReducers = {
  // 无用，只是为了初始化store
  defaultFnc: () => ({}),
};
const store = storeFactory(defaultReducers, history);
const { reducers, connect } = destruct(store)(models);
store.replaceReducer(combineReducers(reducers));

export {
  connect,
};

export default store;
