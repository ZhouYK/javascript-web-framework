/**
 * 创建符合预期的reducer对象
 * @param obj
 * @returns {function(*): any}
 */
export const createGlue = obj => defaultValue => Object.create({
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
/**
 * 解构glue对象，生成对应的reducer以及action的调用函数
 * @param dispatch
 * @returns {function(*=): {reducers: *, actions: (function(*=, *=, *=): {})}}
 */
export const destruct = ({ dispatch }) => {
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
  /**
   * 获取倒数第二层对象
   * @param keyStr
   * @param targetObj
   * @returns {*}
   */
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
  const degrade = (obj, keyStr = [], parent) => {
    let result;
    if (getType(obj) === '[object Object]') {
      result = {};
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        keyStr.push(key);
        // if (getType(value) === '[object Function]') {
        // 如果是generator函数则检索中止
        if (typeof value === 'function') {
          if (!parent) {
            throw new Error(`顶层节点 ${key} 必须为对象`);
          }
          const str = keyStr.join('-');
          let actionFn;
          let reducerFn;
          if (getType(value) === '[object GeneratorFunction]') {
            const iterator = value();
            const stepOne = iterator.next();
            const stepTwo = iterator.next(stepOne.value);
            const stepThree = iterator.next(stepTwo.value);
            const { action, reducer } = stepThree.value;
            actionFn = action;
            reducerFn = reducer;
          } else {
            // 普通函数会被当成单纯的action
            actionFn = value;
          }
          // 找到原始actions对象中，当前key值所在的对象
          const smallParentObj = setValueToObj(keyStr, parent);
          // 如果为action，则进行类似bindActionCreators的动作
          smallParentObj[key] = (...args) => {
            const actionEntity = actionFn(...args);
            if (getType(actionEntity) === '[object Function]') {
              return dispatch(actionEntity);
            }
            return dispatch({ type: str, data: actionEntity });
          };
          if (reducerFn) {
            // 如果为reducer，则直接用属性联结行程的字符串作为对象键值赋值
            // parent为顶层对象引用
            /* eslint-disable no-param-reassign */
            parent[str] = transformReducerToNestFnc(str, reducerFn);
          }
          // 中止后返回上一节点检索
          keyStr.pop();
        } else if (getType(value) === '[object Object]') {
          // p在此处作为是否为顶层节点的属性的标识
          let p = parent;
          if (!p) {
            // 不允许在顶层节点中使用defaultValue这个键值
            if (key === 'defaultValue') {
              throw new Error('不能在顶层节点的属性中，使用defaultValue键值');
            }
            p = value;
          }
          degrade(value, [...keyStr], p);
          result[key] = p;
          // 返回到顶层节点后，推出节点重新检索兄弟顶层节点
          keyStr.shift();
        } else {
          throw new Error(`传入的 ${keyStr.join('.')}的值非法，应为对象或者函数`);
        }
      });
    } else {
      throw new Error('传入的待处理数据必须是对象!');
    }
    return result;
  };
  /**
   * 复制并删除原始对象中的衍生属性，保留原生属性
   * @param obj
   * @param tk
   * @returns {*}
   */
  const deleteDerivedProps = (obj, tk) => {
    Object.keys(obj).forEach((key) => {
      if (key.startsWith(`${tk}-`)) {
        delete obj[key];
      }
    });
    console.log('删除后的对象', obj);
  };
  /**
   * 根据原始的reducer对象去生成函数reducer
   * @param originReducer
   * @returns {{[p: string]: *}}
   */
  const generateRealReducer = originReducer => Object.keys(originReducer).reduce((pre, key) => {
    const value = { ...originReducer[key] };
    console.log('defaultValue', originReducer[key].defaultValue);
    const { defaultValue } = originReducer[key];
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
    deleteDerivedProps(originReducer[key], key);
    return { ...pre, [`${key}`]: fnc };
  }, {});
  const deriveActionsAndReducers = (structure) => {
    console.log('传入的结构', structure);
    const stagedStructure = degrade(structure);
    // reducer组成的对象，将来传给combinereducers
    const reducers = generateRealReducer(stagedStructure);
    console.log('获得的reducers，', reducers);
    const actions = stagedStructure;
    console.log('获得的actions，', actions.demo.person.toString());
    console.log('原始的actions，', structure.demo.person.toString());
    return {
      reducers,
      actions,
    };
  };
  return deriveActionsAndReducers;
};
/**
 * 生成一对action和reducer
 * @param actionCreator
 * @param reducerFnc
 * @returns {function(): {action: *, reducer: *}}
 */
export const gluePair = (actionCreator, reducerFnc) => function* () {
  let errorMsg = '';
  if (typeof actionCreator !== 'function') {
    errorMsg = 'actionCreator必须为函数';
  }
  if (typeof reducerFnc !== 'function') {
    errorMsg = `${errorMsg}，reducer必须为函数`;
  }
  if (errorMsg) {
    throw new Error(errorMsg);
  }
  const action = yield actionCreator;
  const reducer = yield reducerFnc;
  return {
    action,
    reducer,
  };
};

export default {
  destruct,
  gluePair,
};

// export const glue = degradeActions(action);
// console.log('最后的actions', glue.demo.person.toString());
// const originReducer = degradeReducers(reducer);
// console.log('原始reducer对象：', originReducer);
// export const reducers = generateRealReducer(originReducer);
// console.log('最后的reducer：', reducers);
