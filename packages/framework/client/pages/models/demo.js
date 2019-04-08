import { gluer } from 'react-glue-redux-hook';

const person = gluer((data, state) => ({ ...state, ...data }), {
  title: '',
});

const demo = {
  person,
};

export default demo;
