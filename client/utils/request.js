import axios from 'axios';

const request = (options) => {
  const defaultOptions = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
    timeout: 10000,
    responseType: 'json',
    validateStatus: status => status >= 200 && status < 300,
  };
  return axios({
    ...defaultOptions,
    ...options,
  });
};

export default request;
