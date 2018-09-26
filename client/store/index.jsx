import storeFactory, { historyConf } from '../tools/storeConf/forBrowser';

export const history = historyConf({
  basename: '', // 根据需要添加，默认为空串
});

const defaultReducers = {
  // 无用，只是为了初始化store
  defaultFnc: () => ({}),
};
const store = storeFactory(defaultReducers, history);

export default store;
