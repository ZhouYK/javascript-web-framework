const createObj = obj => defaultValue => Object.create({
  defaultValue,
}, Object.keys(obj).reduce((pre, cur) => {
  /* eslint-disable no-param-reassign */
  pre[cur] = {
    writable: true,
    configurable: true,
    value: obj[cur],
    enumerable: true,
  };
  return pre;
}, {}));

// Demo模块

const demoStruc = {
  person: (state, action) => ({ ...state, ...action.data }),
};

const demoDefaultValue = {
  person: {
    name: '',
  },
};

const demo = createObj(demoStruc)(demoDefaultValue);

export default {
  demo,
};
