/* eslint-disable */
// 使用React.memo实现了props中每个属性都没有变化的话子组件就不rerender
import React, {useState} from 'react';


let Name = function ({name}) {
  console.log('child rerender')
  return (
    <div>{name}</div>
  )
}

Name = React.memo(Name);
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

