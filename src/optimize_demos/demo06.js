/* eslint-disable */
// 这个Demo设计了一个会引起不必要的大开销计算的情景
// 更改基准数，复杂计算是基于这个基准数的，基准数更改，重新执行大开销计算没有问题
// 但是更改无关数字，还是会执行这个大开销计算，如何优化？
import React, {useState} from 'react';

function App(){
  const [baseCount, setbaseCount] = useState(1);
  const [irrelevantCount, setirrelevantCount] = useState(0);
  function getCount() {
    console.log('执行了一次大开销计算');
    let result = 0;
    for(let i = baseCount; i < 1000; i++) {
      result += i;
    }
    return result;
  }
  return (
      <div>
        <div onClick={() => setbaseCount(baseCount + 1)}>点我更新基准数</div>
        <div>基准数: {baseCount}</div>
        <div>基于基准数复杂计算的结果为：{getCount()}</div>
        <div>------------------------------分割线------------------------------</div>
        <div>这是一个无关的数字: {irrelevantCount}</div>
        <div onClick={() => setirrelevantCount(irrelevantCount + 1)}>点我更新无关的数字</div>
      </div>
  )
}

export default App;

