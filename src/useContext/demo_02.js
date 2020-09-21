import React, {useContext} from 'react';
import {Context} from './demo_01';

export default function App(){
    const {setcount} = useContext(Context);
    return (
        <div onClick={() => setcount(count => count + 1)}>点击setcount</div>
    )
}