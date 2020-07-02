/* eslint-disable */
// 没法在子组件上使用ref
import React, {useRef} from 'react';

function Child(ref) {
    return (
        <input ref={ref}/>
    )
}

function App() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus();
    };
    return (
        <>
            <Child ref={inputEl} />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}


export default App;

