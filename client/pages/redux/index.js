import action from './actions';
import store from '../../store/index';
import reducer from './reducers';
import { destruct } from '../../tools/destruct';

const destructor = destruct({ store });
const { degradeActions, degradeReducers } = destructor;

export const actions = degradeActions(action);
console.log('最后的actions', actions.demo.person.toString());
export const reducers = degradeReducers(reducer);
console.log('最后的reducer：', reducers);
