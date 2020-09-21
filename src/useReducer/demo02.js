// 使用useRef获取DOM元素
import React, {useState, useReducer} from 'react';

function login(name, pwd) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < .2) {
                resolve('sucess')
            }
            else {
                reject('fail')
            }
        }, 3000);
    });
}

function reducer(state, action) {
    switch(action.type) {
        case 'login':
            return {
                ...state,
                isLoading: true,
                errMsg: ''
            }
        case 'success': 
            return {
                isLoading: false,
                hasLogin: true,
                errMsg: '',
            }
        case 'fail':
            return {
                ...state,
                isLoading: false,
                errMsg: action.errMsg
            }
    }
}

function App() {
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const initialState = {
        isLoading: false,
        hasLogin: false,
        errMsg: ''
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    function run() {
        dispatch({type: 'login'})
        login(name, pwd).then(res => {
            dispatch({type: 'success'})
        }).catch(err => {
            dispatch({type: 'fail', errMsg: err})
        })
    }
    if (state.isLoading) {
        return <>loading...</>
    }
    if (state.errMsg) {
        return <>{state.errMsg}</>
    }
    if (state.hasLogin) {
        return <>你已成功登录</>
    }
    return (
        <>
            <div>{state.hasLogin ? '用户已等录' : '登录/注册'}</div>
            用户名：<input onChange={e => setName(e.target.value)} type="text" />
            密码：<input onChange={e => setPwd(e.target.value)} type="text" />
            <button onClick={run}>Login</button>
        </>
    );
}

export default App;

