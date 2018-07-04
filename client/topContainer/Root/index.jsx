import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Local from './Local';
import Prod from './Prod';

let RealContent;
if (process.env.NODE_ENV === 'development') {
  RealContent = Local;
} else {
  RealContent = Prod;
}
class ErrorCatch extends React.Component {
  componentDidCatch(err, msg) {
    console.log(err, msg);
  }

  render() {
    return this.props.children;
  }
}
ErrorCatch.propTypes = {
  children: PropTypes.node.isRequired,
};
const Root = (props) => {
  const { store, history, component } = props;
  return (
    <ErrorCatch>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <RealContent component={component} />
        </ConnectedRouter>
      </Provider>
    </ErrorCatch>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
};

export default Root;
