import { routerReducer } from 'react-router-redux';
import { destruct } from 'glue-redux';
import * as models from '../pages/model';
import store from '../store/index';

const { dispatch } = store;
const destructor = destruct({ dispatch })(models);
const { reducers } = destructor;

const reducer = {
  router: routerReducer,
  ...reducers,
};
export default reducer;
