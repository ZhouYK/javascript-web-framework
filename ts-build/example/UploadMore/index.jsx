/**
 * Created by zhouyunkui on 2017/6/21.
 */
import React from 'react';
import Hoc from '../hoc/Hoc';
import './index.less';
import UploadMore from '../../Components/UploadMore';
class Index extends Hoc {
    constructor(options) {
        super(options);
        /**
         * 请求函数，需要在请求结束向加载更多组件传递状态（通过回调）
         * @param callback
         */
        this.request = (callback) => {
            setTimeout(() => {
                callback({
                    text: '加载更多',
                    loading: false,
                });
            }, 2000);
        };
        this.getRef = (div) => {
            console.log('getRef', div);
            this.setState({
                reference: div,
            });
        };
        this.state = {
            reference: null,
        };
        this.inlineStyle = {
            width: '100%',
            height: 30,
        };
    }
    componentDidMount() {
        super.componentDidMount();
    }
    render() {
        const { reference } = this.state;
        return (<div>
        <div className="code-source">
          <a href="https://github.com/ZhouYK/iron/blob/master/assets/js/components/UploadMore/index.js" target="blank">
示例代码
          </a>
        </div>
        <div ref={this.getRef} className="upload-more-test">
          <ul>
            <li>
1
            </li>
            <li>
2
            </li>
            <li>
3
            </li>
            <li>
1
            </li>
            <li>
1
            </li>
            <li>
1
            </li>
            <li>
1
            </li>
            <li>
1
            </li>
            <li>
1
            </li>
            <li>
1
            </li>
            <li>
1
            </li>
            <li>
1
            </li>
            <li>
1
            </li>
          </ul>
          {reference ? (<UploadMore reference={reference} request={this.request} className="test" style={this.inlineStyle}/>) : null}
        </div>
      </div>);
    }
}
export default Index;
//# sourceMappingURL=index.jsx.map