import { gluer } from 'glue-redux';

const person = gluer((data, state) => ({ ...state, ...data }), {
  title: '',
});

const demo = {
  person,
};

export default demo;
