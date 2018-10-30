import { routerReducer } from 'react-router-redux';
import models from '../pages/models';

const reducer = {
  router: routerReducer,
  ...models,
};
export default reducer;
