import { createObj } from '../../../tools/destruct';

// Demo模块
// reducer以及其维护的demo的数据的结构
const demoStruc = {
  person: (state, action) => ({ ...state, ...action.data }),
};
// demo的默认数据格式，要求每一个节点都必须有默认值
const demoDefaultValue = {
  person: {
    title: '',
  },
};

const demo = createObj(demoStruc)(demoDefaultValue);

export default {
  demo, // reducer导出的名称必须和对应的action一样
};
