import { getType } from './getType';
import { forPurposeKey, forPurposeValue } from './contants';

export const createGlue = obj => (defaultValue) => {
  if (getType(defaultValue) !== '[object Object]') throw new Error('请传入默认值对象');
  if (getType(obj) !== '[object Object]') throw new Error('请传入结构对象');
  const defualtKeys = Object.keys(defaultValue);
  return Object.create({
    defaultValue,
    ...obj,
  }, Object.keys(obj).reduce((pre, cur) => {
    /* eslint-disable no-param-reassign */
    const value = obj[cur];
    // 如果顶层属性类型为generator函数，则必须有默认值
    if (defualtKeys.indexOf(cur) === -1 && value[forPurposeKey] === forPurposeValue) {
      throw new Error(`请设置${cur} 的 默认值`);
    }
    pre[cur] = {
      writable: true,
      configurable: true,
      value,
      enumerable: true,
    };
    return pre;
  }, {}));
};

export default createGlue;
