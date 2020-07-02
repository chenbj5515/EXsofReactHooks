/* eslint-disable */
// 这样是可以的，但是要知道someRef是一个用户自定义的ref名字，子组件中ref的value要用这个变量名
// 如果都是自己写的组件当然可以这样用，但是如果组件时第三方写的，它要怎么知道你用的什么名字呢
// 在这个例子中不知道的就是someRef这个名字
import React, {useRef} from 'react';

function Child({someRef}) {
    return (
        <input ref={someRef}/>
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
            <Child someRef={inputEl} />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}


export default App;

