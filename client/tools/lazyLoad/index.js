import Loadable from 'react-loadable';

export default (prefix, Loading) => path => Loadable({
  loader: () => import(`../../pages/${prefix}${path}`),
  loading: Loading,
  timeout: 10000,
});
