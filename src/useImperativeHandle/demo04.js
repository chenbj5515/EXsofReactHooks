/* eslint-disable */
// 子组件上使用ref需要配合React.forwardRef
// 相比于上一个demo，这才是通用的获取子组件DOM的方案
import React, {useRef} from 'react';

function Child(props, ref) {
    return (
        <input ref={ref} type="text"/>
    )
}
Child = React.forwardRef(Child);
function App() {
    const someRef = useRef(null);
    const onButtonClick = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        someRef.current.focus();
    };
    return (
        <>
            <Child ref={someRef}/>
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}


export default App;

