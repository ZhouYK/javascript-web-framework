import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import load from '../tools/lazyLoad';
import Loader from '../Components/Loader';
// import Demo from '../pages/Demo';

const lazyLoad = load('pages/', Loader);

const Demo = lazyLoad('Demo');

const App = () => (
  <Fragment>
    <Route path="/demo" component={Demo} />
    <Route path="*" component={Demo} />
  </Fragment>
);
const mapStateToProps = (state) => {
  const { demo } = state;
  return {
    demo,
  };
};

export default connect(mapStateToProps)(App);
