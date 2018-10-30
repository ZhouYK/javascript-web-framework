import React, { PureComponent } from 'react';
import PT from 'prop-types';
import { connect } from '../../store';
import demoModel from '../models/demo';
import demoService from '../services/demo';
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
              输入任意名称：
            <input ref={this.ref} type="text" id="input" />
          </label>
          <button type="button" onClick={this.onClick}>
              提交
          </button>
        </form>
        <p>
            添加名称为：
          { person.title }
        </p>
      </div>
    );
  }
}

export default connect(demoModel)(Demo);
