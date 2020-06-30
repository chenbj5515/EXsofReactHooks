/* eslint-disable */
// 点击刷新名字，子组件要渲染的name数据更新，rerender没有问题
// 但是点击刷新数字，count更新，但是count和子组件一点关系也没有，子组件完全不需要渲染，但是可以看到还是会渲染，这就是我们要避免的不必要渲染
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

