import axios from 'axios';


// Demo模块action
const demo = {
  person: data => (data),
  asyncGetPerson: info => () => axios({
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
  }).then(data => demo.person(data.data)),
};
export default {
  demo, // action导出的域名必须和对应的reducer一样
};
