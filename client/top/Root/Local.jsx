/**
 * Created by ink on 2018/4/9.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DevTools from '../../tools/devTools/index';
import store from '../../store';

const DT = DevTools();
const Content = (props) => {
  const { component: CustomerContent } = props;
  return (
    <Fragment>
      <CustomerContent />
      <DT store={store} />
    </Fragment>
  );
};
Content.displayName = 'LocalRoot';
Content.propTypes = {
  component: PropTypes.func.isRequired,
};
export default Content;
