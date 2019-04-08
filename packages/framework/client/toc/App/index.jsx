import React, { Fragment, Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import Loader from '../../components/Loader/index';
import 'normalize.css';

const Demo = lazy(() => import('../../pages/Demo'));

const App = () => (
  <Fragment>
    <Suspense fallback={<Loader />}>
      <Route path="/demo" component={Demo} />
      <Route path="*" component={Demo} />
    </Suspense>
  </Fragment>
);

export default App;
