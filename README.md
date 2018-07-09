# 如何开始?
<pre>
  npm install
  npm start
</pre>

# 如何开发自己的页面？
## 第一步

<block>
  在 client/pages 下建立页面文件夹 <br/>
  <pre>
    pages/
      MyPage/
        glue.js
        index.jsx
  </pre>  
  glue文件为action和reducer的上层抽象，参照Demo实例创建
  
</block>

## 第二步

<block>
  在 client/App 中创建路由 <br/>
  <pre>
    const MyPage = lazyLoad('MyPage');
    ...
    &lt;Route path='/mypage' component={MyPage}&gt;&ltRoute/&gt;
  </pre>
</block>

## 第三步

<block>
  在 client/pages/glue/index.js 中引入MyPage/glue.js<br/>
  <pre>
    import mypage from '../MyPage/glue';
    ...
    const destructor = destruct({ dispatch })({
      // 此处添加新的模块的reducer
      demo,
      mypage,
    }); 
  </pre>
  至此mypage已经添加完毕，可以在store中获取到mypage的数据，state.mypage
</block>
