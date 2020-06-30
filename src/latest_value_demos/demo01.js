/* eslint-disable */
// 先点击“点我5s后弹出count”，再点击"点我增加count"，会发现alert的并不是最新值
import React, {useState} from 'react';

function App(){
  const [count, setcount] = useState(0);
  function clickHandle() {
    setTimeout(() => {
        alert(count)
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

