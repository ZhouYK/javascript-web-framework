import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import React from 'react';
import history from './history';

let RootComponent;
if (process.env.NODE_ENV === 'development') {
  RootComponent = require('./Local').default;
} else {
  RootComponent = require('./Prod').default;
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

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  componentDidCatch(err, msg) {
    console.error(err, msg);
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
const Root = props => (
  <ErrorCatch>
    <Router history={history}>
      <RootComponent>
        { props.children }
      </RootComponent>
    </Router>
  </ErrorCatch>
);

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Root;
