/* eslint-disable */
// 在useLayout的effect中再次更改count，就是一次渲染，自然也就不会出现闪烁
import React, {useState, useLayoutEffect} from 'react';

function App() {
    const [count, setCount] = useState(0);
    useLayoutEffect(() => {
      if (count === 0) {
        const randomNum = 10 + Math.random()*200
        setCount(randomNum);
      }
    }, [count]);
    const clickHandle = () => {
        // debugger
        setCount(0);
    }
    return (
        <div onClick={clickHandle}>{count}</div>
    );
  }
  
  

export default App;

