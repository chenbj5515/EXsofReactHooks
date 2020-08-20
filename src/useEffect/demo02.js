/* eslint-disable */
// count变更引发了useEffect的回调中的effect
// 如果这个effect是再次更新count,那么最终你可能会看到两次渲染（从表象上来看就是闪烁）
import React, {useState, useEffect, useLayoutEffect} from 'react';

function App() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (count === 0) {
        const randomNum = 10 + Math.random()*200
        setCount(randomNum);
        debugger
      }
    }, [count]);
  
    return (
        <div onClick={() => setCount(0)}>{count}</div>
    );
  }
  
  

export default App;

