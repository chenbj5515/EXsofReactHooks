/* eslint-disable */
// 使用useRef，每次增加都set ref.current为最新值，就可以在任何地方获取到这个最新值了
import React, {useState, useEffect} from 'react';
import { useRef } from 'react';

function App(){
  const [count, setcount] = useState(0);
  const countRef = useRef(count)
  useEffect(() => {
    window.addEventListener('mousemove', e => {
      console.log(countRef.current);
    }) 
  }, []);
  // function clickHandle() {
  //   // setTimeout(() => {
  //   //     alert(countRef.current)
  //   // }, 5000);
    
  // }
  function add() {
    setcount(count => {
        countRef.current = count + 1;
        return count + 1;
    })
    
  }
  return (
      <div>
        <div onClick={add}>点我增加count</div>
        <div>当前最新值为：{count}</div>
        {/* <div onClick={clickHandle}>点我5s后弹出count</div> */}
      </div>
  )
}

export default App;

