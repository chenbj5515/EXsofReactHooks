/* eslint-disable */

import React, {useState} from 'react';


function Name({name}) {
  console.log('child rerender')
  return (
    <div>{name}</div>
  )
}
function App(){
  const [count, setcount] = useState(0);
  const [name, setname] = useState('chenbj');
  return (
      <div>
        <div onClick={() => setcount(count + 1)}>点我刷新数字</div>
        <div onClick={() => setname(name + "1")}>点我刷新名字</div>
        <div>计数{count}</div>
        <Name name={name}/>
      </div>
  )
}

export default App;

