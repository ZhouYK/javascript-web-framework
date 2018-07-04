import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import { actions } from '../redux';

class Demo extends PureComponent {
  static propTypes = {
    person: PT.shape({
      name: PT.string,
    }).isRequired,
  }

  constructor(options) {
    super(options);
    this.ref = React.createRef();
  }

  onClick = () => {
    const { demo } = actions;
    const { value } = this.ref.current;
    demo.asyncGetPerson({
      name: value,
    });
  }

  render() {
    const { person } = this.props;
    return (
      <div style={{ height: '200px', margin: '20px auto' }}>
        <form action="/" method="get">
          <label htmlFor="input">
            输入任意内容：
            <input ref={this.ref} type="text" id="input" />
          </label>
          <button type="button" onClick={this.onClick}>
            提交
          </button>
        </form>
        <p>
          添加的人名为：
          { person.name }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { demo } = state;
  const { person } = demo;
  return {
    person,
  };
};
export default connect(mapStateToProps)(Demo);
