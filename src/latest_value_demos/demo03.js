/* eslint-disable */
// dispatch时也是基于最新值的
import React, {useReducer} from 'react';

function App(){
  function clickHandle() {
    setTimeout(() => {
        alert(count)
    }, 5000);
  }
  const [count, dispatch] = useReducer((state, action) => {
      switch (action) {
          case 'add':
            return state + 1
          default:
            return state
      }
  })
  return (
      <div>
        <div onClick={() => dispatch('add')}>点我增加count</div>
        <div>当前最新值为：{count}</div>
        <div onClick={clickHandle}>点我5s后弹出count</div>
      </div>
  )
}

export default App;

