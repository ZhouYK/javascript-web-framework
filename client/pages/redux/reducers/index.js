const demo = {
  addPerson: (state = [], action) => [...state, action.data],
  kity: {
    wawo: (state = '', action) => {
      console.log('进来处理', action.type);
      return state + action.data.name;
    },
    heihei: {
      say: (state = 'heihei say', action) => state + action.data.name,
    },
    jiji: {
      name: {
        ha: (state = '测试', action) => state + action.data,
        test: (state = '测试', action) => state + action.data,
      },
    },
  },
  defaultValue: 'demo',
};
const name = {
  hello: () => ({}),
  defaultValue: {},
};
export default {
  demo,
  name,
};
