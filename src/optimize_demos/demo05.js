/* eslint-disable */
// 这个Demo主要说明传给子组件的参数是Object类型时如何避免不必要的rerender
import React, {useState} from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';


let Name = function ({perInfo}) {
  console.log('child rerender')
  return (
      <>
        <div>——————————————这里是子组件——————————————</div>
        <div>{perInfo.name}</div>
      </>
  )
}

Name = React.memo(Name);
function App(){
  const [count, setcount] = useState(0);
//   const perInfo = {
//     name: 'chenbj',
//     age: 23
//   }
//   const ref = useRef(perInfo);
  const perInfo = useMemo(() => ({
    name: 'chenbj',
    age: 23
  }), []);
  return (
      <div>
        <div>——————————————这里是父组件——————————————</div>
        <div onClick={() => setcount(count + 1)}>点我刷新数字</div>
        <div>计数{count}</div>
        {/* <Name perInfo={ref.current}/> */}
        <Name perInfo={perInfo}/>
      </div>
  )
}

export default App;

