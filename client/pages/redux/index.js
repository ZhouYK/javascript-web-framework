import action from './actions';
import store from '../../store/index';
import reducer from './reducers';

const getType = arg => Object.prototype.toString.call(arg);
/**
 * 递归对象，生成标准的action以及链接reducer对象的键值与action的type
 * @param msg
 * @param target
 * @returns {function(*=, *=, *=): {}}
 */
const degrade = ({ msg, target }) => {
  const inner = (obj, keyStr = [], parent) => {
    let result;
    if (typeof obj === 'object') {
      result = {};
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        keyStr.push(key);
        if (typeof value === 'function') {
          const str = keyStr.join('-');
          if (target === 'action') {
            result[key] = (...args) => store.dispatch({ type: str, ...value(...args) });
          } else if (target === 'reducer') {
            if (parent) {
              /* eslint-disable no-param-reassign */
              parent[str] = value;
            }
            result[str] = value;
          }
          keyStr.pop();
        } else if (getType(value) === '[object Object]') {
          if (target === 'reducer') {
            let p = parent;
            if (!p) {
              p = value;
            }
            inner(value, [...keyStr], p);
            result[key] = p;
          } else {
            result[key] = inner(value, [...keyStr]);
          }
          keyStr.shift();
        } else if (key === 'defaultValue') {
          result[key] = value;
        } else {
          throw new Error(msg);
        }
      });
    } else {
      throw new Error(msg);
    }
    return result;
  };
  return inner;
};
/**
 * 根据原始的reducer对象去生成，函数reducer
 * @param originReducer
 * @returns {{[p: string]: *}}
 */
const generateRealReducer = originReducer => Object.keys(originReducer).reduce((pre, key) => {
  const value = originReducer[key];
  const { defaultValue } = value;
  const fnc = (state = defaultValue, ac) => {
    const { type } = ac;
    const acFnc = value[type];
    return ((acFnc && acFnc(state, ac)) || state);
  };
  return { ...pre, [`${key}`]: fnc };
}, {});

const degradeActions = actions => degrade({ msg: 'actions must be assigned function', target: 'action' })(actions);

const degradeReducers = rd => degrade({ msg: 'reducers must be assigned function', target: 'reducer' })(rd);

export const actions = degradeActions(action);
const originReducer = degradeReducers(reducer);
export const reducers = generateRealReducer(originReducer);
