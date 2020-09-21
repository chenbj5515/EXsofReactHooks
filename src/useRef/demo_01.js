// 先点击“点我5s后弹出count”，再点击"点我增加count"，会发现alert的并不是最新值
import React, {useState} from 'react';
import Child from './child';

const countRef = {
    count: 0
}

const ref = {
    current: {
      count: 0
    }
}

function App(){
    // 初始化，获取ref
    const countRef = useRef(initialValue);
    // 直接修改
    countRef.current = 0;
    // 获取最新值
    console.log(countRef.current);

//   const [count, setcount] = useState(0);
  function clickHandle() {
    setTimeout(() => {
        alert(countRef.count)
    }, 5000);
  }
  function assign(ref, otherObj = {name: 'chenbj'}) {
      ref = {
        ...ref,
        ...otherObj
      }
  }
  function assignWithCurrent(ref, otherObj = {name: 'chenbj'}) {
    ref.current = {
      ...ref.current,
      ...otherObj
    }
  }
  return (
      <div>
        <div onClick={() => countRef.count += 1}>点我增加count</div>
        <div>当前最新值为：{countRef.count}</div>
        <div onClick={clickHandle}>点我5s后弹出count</div>
        <div onClick={() => {console.log(countRef)}}>click to check count(没有current的情况)</div>
        <div onClick={() => {console.log(ref)}}>click to check count(有current的情况)</div>
        <div onClick={() => assign(countRef)}>click to execute assign(没有current的情况)</div>
        <div onClick={() => assignWithCurrent(ref)}>click to execute assign(有current的情况)</div>
      </div>
  )
}

export default App;

