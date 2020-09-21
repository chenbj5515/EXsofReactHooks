import React, {useState} from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    return (
        <>
            <div>{count}</div>
            <div onClick={() => setCount(count => count + 1)}>
                click to add count
            </div>
        </>
    )
}