import fetch from '../../utils/request';
import demo from '../models/demo';

const asyncGetPerson = info => fetch({
  url: './mapping.json',
  method: 'get',
  params: {
    ...info,
  },
}).then(() => demo.person(info));

export default {
  asyncGetPerson,
};
