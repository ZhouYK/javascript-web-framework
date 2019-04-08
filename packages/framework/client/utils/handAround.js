function date2str(x, y) {
  /* eslint-disable */
  const z = {
    y: x.getFullYear(), M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds(),
  };
  return y.replace(/(y+|M+|d+|h+|m+|s+)/g, v => ((v.length > 1 ? '0' : '') + eval(`z.${v.slice(-1)}`)).slice(-(v.length > 2 ? v.length : 2)));
};

function queryStringToObj(str) {
  if (!str) return {};
  let str_one = str;
  if (str.startsWith('?')) {
    str_one = str.substring(1);
  }
  if (!str_one) return {};
  const splitArr = str_one.split('&');
  const obj = {};
  splitArr.reduce((pre, cur, i, or) => {
    const temp = cur.split('=');
    if ( temp.length === 1 ) {
      temp.push('');
    }
    pre[temp[0]] = temp[1];
    return pre;
  }, obj);
  return obj;
}

function objToQueryString(obj) {
  const keys = Object.keys(obj);
  return keys.reduce((pre, cur, index) => {
    let temp = obj[cur];
    let connector = '&';
    if (index === keys.length - 1) {
      connector = '';
    }
    if (Object.is(temp, undefined)) temp = '';
    return `${pre}${cur}=${encodeURIComponent(temp)}${connector}`
  }, '')
}

function decodeStr(str) {
  let temp;
  try {
    temp = decodeURIComponent(str);
  } catch (e) {
    temp = str;
  }
  return temp;
}

export default {
  date2str,
  queryStringToObj,
  objToQueryString,
  decodeStr
}
