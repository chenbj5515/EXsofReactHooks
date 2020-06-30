/* eslint-disable */
// 这里例子中使用useCallback处理了函数类型的参数
// useCallback可以实现只有父组件rerender时deps改变了才会生成新的地址
import React, {useState} from 'react';
import { useCallback } from 'react';


let Name = function ({name, emitClick}) {
  console.log('child rerender')
  return (
      <>
        <div>——————————————这里是子组件——————————————</div>
        <div>{name}</div>
        <div onClick={() => emitClick()}>点我调用callback</div>
      </>
  )
}

Name = React.memo(Name);
function App(){
  const [count, setcount] = useState(0);
  const [name, setname] = useState('chenbj');
  const onChildClick = useCallback(() => {
    console.log('子组件中点击');
  }, []);
  return (
      <div>
        <div>——————————————这里是父组件——————————————</div>
        <div onClick={() => setcount(count + 1)}>点我刷新数字</div>
        <div onClick={() => setname(name + 'pr')}>点我刷新名字</div>
        <div>计数{count}</div>
        <Name name={name} emitClick={onChildClick}/>
      </div>
  )
}

export default App;

