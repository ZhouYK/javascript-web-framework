import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import { actions } from '../pages/redux';

const onClick = () => {
  console.log(actions.demo.kity.wawo({ name: '测试' }));
};
const onButton = () => {
  console.log(actions.demo.kity.heihei.say({ name: 'hello' }));
};
const App = props => (
  <Fragment>
    <button type="button" onClick={onClick}>
      点我
    </button>
    <button type="button" onClick={onButton}>
      再点
    </button>
    <div>
      {
      props.demo
    }
    </div>
  </Fragment>
);
App.propTypes = {
  demo: PT.any,
};
App.defaultProps = {
  demo: '',
};
const mapStateToProps = (state) => {
  const { demo } = state;
  console.log('值是多少', demo, state);
  return {
    demo,
  };
};

export default connect(mapStateToProps)(App);
