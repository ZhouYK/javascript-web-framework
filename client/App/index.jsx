import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import load from '../tools/lazyLoad';
import Loader from '../Components/Loader';

const lazyLoad = load('pages/', Loader);
const App = () => (
  <Fragment>
    <Route path="/demo" component={lazyLoad('Demo')} />
  </Fragment>
);
const mapStateToProps = (state) => {
  const { demo } = state;
  return {
    demo,
  };
};

export default connect(mapStateToProps)(App);
