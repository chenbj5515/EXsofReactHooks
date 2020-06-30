/* eslint-disable */
// 这个Demo中使用useMemo完成了大开销计算结果的缓存，只有依赖改变才会重新计算
import React, {useState, useMemo} from 'react';

function App(){
  const [baseCount, setbaseCount] = useState(1);
  const [irrelevantCount, setirrelevantCount] = useState(0);
  const result = useMemo(() => {
    console.log('执行了一次大开销计算');
    let result = 0;
    for(let i = baseCount; i < 1000; i++) {
      result += i;
    }
    return result;
  }, [baseCount])
  return (
      <div>
        <div onClick={() => setbaseCount(baseCount + 1)}>点我更新基准数</div>
        <div>基准数: {baseCount}</div>
        <div>基于基准数复杂计算的结果为：{result}</div>
        <div>------------------------------分割线------------------------------</div>
        <div>这是一个无关的数字: {irrelevantCount}</div>
        <div onClick={() => setirrelevantCount(irrelevantCount + 1)}>点我更新无关的数字</div>
      </div>
  )
}

export default App;

