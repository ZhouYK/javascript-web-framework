import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import demoService from '../service/demo';
import './index.less';

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

  onClick = async () => {
    const { value } = this.ref.current;
    const ac = await demoService.asyncGetPerson({
      title: value,
    }).then((action) => {
      console.log('返回的action：', action);
      return action;
    });
    console.log('awaite 后获取到的数据：', ac);
  }

  render() {
    const { person } = this.props;
    return (
      <div className="demo-container">
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
          { person.title }
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
