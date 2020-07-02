/* eslint-disable */
// setcount中使用传一个带参数的回调就可以拿到最新值
import React, {useState} from 'react';

function App(){
  const [count, setcount] = useState(0);
  function clickHandle() {
    setTimeout(() => {
        setcount(count => count + 1);
    }, 5000);
  }
  return (
      <div>
        <div onClick={() => setcount(count + 1)}>点我增加count</div>
        <div>当前最新值为：{count}</div>
        <div onClick={clickHandle}>点我5s后弹出count</div>
      </div>
  )
}

export default App;

