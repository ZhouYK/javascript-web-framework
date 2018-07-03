import { routerReducer } from 'react-router-redux';
import { reducers } from '../pages/redux';

const reducer = {
  router: routerReducer,
  ...reducers,
};
export default reducer;
