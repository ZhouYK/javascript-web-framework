import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

let RealContent;
if (process.env.NODE_ENV === 'development') {
  RealContent = require('./Local').default;
} else {
  RealContent = require('./Prod').default;
}
const Error = p => (
  <section
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 400,
      height: 200,
      marginTop: 200,
      borderRadius: 10,
      textAlign: 'center',
      backgroundColor: '#fff1f0',
      fontSize: 18,
      overflow: 'scroll',
      paddingTop: 50,
    }}
  >
    /(ㄒoㄒ)/~~页面发生了异常
    <p
      style={{ fontSize: 14, color: 'red', marginTop: 15 }}
    >
      {p.children}
    </p>
  </section>
);
class ErrorCatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidCatch(err, msg) {
    console.error(err, msg);
    this.setState({
      error: err,
    });
  }

  render() {
    return this.state.error ? (
      <Error>
        {this.state.error.message}
      </Error>
    ) : this.props.children;
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
