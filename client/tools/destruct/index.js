export const destruct = ({ store }) => {
  /**
   * 判断类型
   * @param arg
   * @returns {string}
   */
  const getType = arg => Object.prototype.toString.call(arg);
  /**
   * 生成顶层节点的reducer函数：将叶子节点的fnc进行重新包装成返回相应嵌套结构的state
   * @param k
   * @param redu
   * @returns {function(*, *=): {[p: string]: *}}
   */
  const transformReducerToNestFnc = (k, redu) => {
    const kArr = k.split('-');
    // 去除顶层节点，因为顶层节点会在 generateRealReducer进行函数包装
    kArr.shift();
    return kArr.reduceRight((pre, cur) => (state, ac) => ({ ...state, [`${cur}`]: pre(state[`${cur}`], ac) }), redu);
  };

  const setValueToObj = (keyStr, targetObj) => {
    const arr = keyStr.slice(1);
    let obj = targetObj;
    for (let i = 0; i < arr.length - 2; i += 1) {
      obj = obj[arr[i]];
    }
    return obj;
  };
  /**
   * 递归对象，生成标准的action以及链接reducer对象的键值与action的type
   * @param msg
   * @param target
   * @returns {function(*=, *=, *=): {}}
   */
  const degrade = ({ target }) => {
    const inner = (obj, keyStr = [], parent) => {
      let result;
      if (getType(obj) === '[object Object]') {
        result = {};
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          keyStr.push(key);
          // 如果是函数则检索中止
          if (getType(value) === '[object Function]') {
            if (!parent) {
              throw new Error(`${target} : 顶层节点 ${key} 必须为对象`);
            }
            const str = keyStr.join('-');
            if (target === 'action') {
              // 找到原始actions对象中，当前key值所在的对象
              const smallParentObj = setValueToObj(keyStr, parent);
              // 如果为action，则进行类似bindActionCreators的动作
              smallParentObj[key] = (...args) => {
                const actionEntity = value(...args);
                if (getType(actionEntity) === '[object Function]') {
                  return store.dispatch(actionEntity);
                }
                return store.dispatch({ type: str, data: actionEntity });
              };
            } else if (target === 'reducer') {
              // 如果为reducer，则直接用属性联结行程的字符串作为对象键值赋值
              // parent为顶层对象引用
              /* eslint-disable no-param-reassign */
              parent[str] = transformReducerToNestFnc(str, value);
            }
            // 中止后返回上一节点检索
            keyStr.pop();
          } else if (getType(value) === '[object Object]') {
            // p在此处作为是否为顶层节点的属性的标识
            let p = parent;
            if (!p) {
              // 不允许在顶层节点中使用defaultValue这个键值
              if (key === 'defaultValue') {
                // 如果是 关键字 defaultValue，则直接赋值
                throw new Error('不能在顶层节点的属性中，使用defaultValue键值');
              }
              p = value;
            }
            inner(value, [...keyStr], p);
            result[key] = p;
            // 返回到顶层节点后，推出节点重新检索兄弟顶层节点
            keyStr.shift();
          } else {
            throw new Error(`传入的 ${target}：${keyStr.join('.')}的值非法，应为对象或者函数`);
          }
        });
      } else {
        throw new Error(`传入的待处理的${target}s必须是对象!`);
      }
      return result;
    };
    return inner;
  };
  /**
   * 删除原始对象中的原生属性，保留衍生属性
   * @param obj
   * @param tk
   * @returns {*}
   */
  const deleteOriginValue = (obj, tk) => {
    Object.keys(obj).forEach((key) => {
      if (!key.startsWith(`${tk}-`)) {
        delete obj[key];
      }
    });
    return obj;
  };
  /**
   * 根据原始的reducer对象去生成函数reducer
   * @param originReducer
   * @returns {{[p: string]: *}}
   */
  const generateRealReducer = originReducer => Object.keys(originReducer).reduce((pre, key) => {
    const value = deleteOriginValue(originReducer[key], key);
    const { defaultValue } = value;
    // 定义顶层reducer，根据action type调用对应的子reducer
    const fnc = (state = defaultValue, ac) => {
      const { type } = ac;
      const acFnc = value[type];
      if (acFnc) {
        // 一但调用，会返回新的值
        return acFnc(state, ac);
      }
      // 没有对应的reducer，直接返回原值
      return state;
    };
    return { ...pre, [`${key}`]: fnc };
  }, {});

  const degradeActions = actions => degrade({ target: 'action' })(actions);
  const degradeReducers = rd => generateRealReducer(degrade({ target: 'reducer' })(rd));

  return {
    degradeActions,
    degradeReducers,
  };
};

export default {
  destruct,
};

// export const actions = degradeActions(action);
// console.log('最后的actions', actions.demo.person.toString());
// const originReducer = degradeReducers(reducer);
// console.log('原始reducer对象：', originReducer);
// export const reducers = generateRealReducer(originReducer);
// console.log('最后的reducer：', reducers);
