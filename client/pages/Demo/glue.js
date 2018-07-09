import axios from 'axios';
import { createGlue, gluePair } from '../../tools/destruct';

let demo;
const personActionCreator = data => data;
const personReducer = (state, ac) => ({ ...state, ...ac.data });
const asyncGetPerson = info => () => axios({
  url: '/mapping.json',
  method: 'get',
  transformRequest: [data => JSON.stringify(data)],
  transformResponse: [(data) => {
    console.log('返回的实体:', data);
    return data;
  }],
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  params: {
    ...info,
  },
  responseType: 'json',
  timeout: 10000,
}).then(() => demo.person(info));

const demoStructure = {
  person: gluePair(personActionCreator, personReducer),
  asyncGetPerson,
};
// demo的默认数据格式，要求每一个节点都必须有默认值
const demoDefaultValue = {
  person: {
    title: '',
  },
};
demo = createGlue(demoStructure)(demoDefaultValue);
export default demo;
