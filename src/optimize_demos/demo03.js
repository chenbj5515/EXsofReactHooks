/* eslint-disable */
// 当一个引用类型的函数作为参数传给子组件时，React.memo失效了，在这个Demo中，点击刷新数字，子组件仍会rerender
import React, {useState} from 'react';


let Name = function ({name, emitClick}) {
  console.log('child rerender')
  return (
      <>
        <div>{name}</div>
        <div onClick={() => emitClick()}>点我，我在子组件</div>
      </>
  )
}

Name = React.memo(Name);
function App(){
  const [count, setcount] = useState(0);
  const [name, setname] = useState('chenbj');
  function onChildClick() {
    console.log('子组件中点击');
  }
  return (
      <div>
        <div onClick={() => setcount(count + 1)}>点我刷新数字</div>
        <div onClick={() => setname(name + 'pr')}>父组件中刷新名字</div>
        <div>计数{count}</div>
        <Name name={name} emitClick={onChildClick}/>
      </div>
  )
}

export default App;

