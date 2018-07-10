import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import load from '../tools/lazyLoad';
import Loader from '../components/Loader';
import 'normalize.css';

const lazyLoad = load('', Loader);

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
