"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhouyunkui on 2017/6/21.
 */
const react_1 = require("react");
const Hoc_1 = require("../hoc/Hoc");
require("./index.less");
const UploadMore_1 = require("../../Components/UploadMore");
class Index extends Hoc_1.default {
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
          {reference ? (<UploadMore_1.default reference={reference} request={this.request} className="test" style={{ width: '100%', height: 30 }}/>) : null}
        </div>
      </div>);
    }
}
exports.default = Index;
//# sourceMappingURL=index.js.map