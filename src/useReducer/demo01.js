// 使用useRef获取DOM元素
import React, {useState} from 'react';

function login(name, pwd) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < .5) {
                resolve('sucess')
            }
            else {
                reject('fail')
            }
        }, 3000);
    });
}


function App() {
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const [state, setState] = useState({
        isLoading: false,
        hasLogin: false,
        errMsg: ''
    });
    function run() {
        setState({
            ...state,
            isLoading: true,
            errMsg: ''
        })
        login(name, pwd).then(res => {
            setState({
                isLoading: false,
                hasLogin: true,
                errMsg: ''
            })
        }).catch(err => {
            setState({
                ...state,
                isLoading: false,
                errMsg: err
            })
        })
    }
    if (state.isLoading) {
        return <>loading...</>
    }
    if (state.errMsg) {
        return <>{errMsg}</>
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

