import React, {createContext, useState} from 'react';
export const Context = createContext();

export default function App(){
    const [count, setcount] = useState(0);
    return (
        <Context.Provider
            value={{
                setcount
            }}
        >
            <div>{count}</div>
        </Context.Provider>
    )
}