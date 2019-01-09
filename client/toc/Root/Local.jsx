/**
 * Created by ink on 2018/4/9.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DevTools from '../../tools/devTools';
import store from '../../store';

const DT = DevTools();
const Content = props => (
  <Fragment>
    { props.children }
    <DT store={store} />
  </Fragment>
);
Content.displayName = 'LocalRoot';
Content.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Content;
