// 使用useRef，每次增加都set ref.current为最新值，就可以在任何地方获取到这个最新值了
import React from 'react';
import { useRef } from 'react';

function App(){
  const countRef = useRef(0)
  return (
      <div>
        <div onClick={() => countRef.current++}>点我增加count</div>
        <div>当前最新值为：{countRef.current}</div>
        <div
          onClick={() => setTimeout(() => alert(countRef.current), 3000)}
        >
          点我3s后弹出count
        </div>
      </div>
  )
}

export default App;

