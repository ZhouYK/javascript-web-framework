import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import load from '../../tools/lazyLoad/index';
import Loader from '../../components/Loader/index';
import '../../../node_modules/normalize.css/normalize.css';

const lazyLoad = load(Loader);

const Demo = lazyLoad('Demo');

const App = () => (
  <Fragment>
    <Route path="/demo" component={Demo} />
    <Route path="*" component={Demo} />
  </Fragment>
);

export default App;
