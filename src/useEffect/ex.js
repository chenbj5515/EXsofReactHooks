import React, {useEffect, useReducer, useState} from 'react';

function request(path, params) {
    console.log(path, params);
}

function App(){
    const [userId, setuserId] = useState(6208);
    // const [state, dispatch] = useReducer(reducer, 6208) 
    // function reducer(state, action) {
    //     switch (action.type) {
    //         case 'random': state + Math.random * 1000;
    //         default: state
    //     }
    // }
    useEffect(() => {
        setInterval(() => {
            setuserId(userId => userId + 1);
        }, 1000);
        // const timer = setInterval(() => {
        //     request('/live/quiz/getQuizStas', state);
        // }, 3000);
        // return () => {
        //     console.log('卸载');
        //     clearInterval(timer);
        // }
    }, []);
    return (
        <div>
            <div>{userId}</div>
            <div onClick={() => setuserId(Math.random())}>Change ID</div>
        </div>
    )
}

export default App;

