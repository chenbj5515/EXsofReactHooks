/* eslint-disable */
// useReducer会创建一个每次rerender产生的作用域之间公用的变量，通过dispatch修改也是能触发rerender的
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

