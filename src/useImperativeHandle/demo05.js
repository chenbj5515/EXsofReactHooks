/* eslint-disable */
// 通过useImperativeHandle定义子组件可以接受的修改类型，父组件只能进行这些类型的修改
import React, {useRef, useImperativeHandle} from 'react';

function FancyInput(props, ref) {
    console.log(props.name);
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));
    return <input ref={inputRef} />;
}
FancyInput = React.forwardRef(FancyInput);
function App() {
    const someRef = useRef(null);
    const onButtonClick = () => {
        someRef.current.focus()
    };
    return (
        <>
            <FancyInput ref={someRef} name="chenbj"/>
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}


export default App;

