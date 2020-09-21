// 先点击“点我5s后弹出count”，再点击"点我增加count"，会发现alert的并不是最新值
import React from 'react';

function App(props){
    return (
        <>
            <div>---------Child---------</div>
            <div onClick={() => {console.log(props.countRef.count)}}>click to check count in Child</div>
            <div onClick={() => {props.countRef.count += 1}}>click to add count</div>
        </>
    )
}

export default App;

