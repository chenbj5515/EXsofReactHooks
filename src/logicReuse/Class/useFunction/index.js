import React, { Component, createRef } from 'react';
import {useHover} from './useHover';

class App extends Component {
    ele1
    ele2
    state = {
        isHov1: false,
        isHov2: false
    }
    componentDidMount() {
        useHover(this, this.ele1, 'isHov1', App);
        useHover(this, this.ele2, 'isHov2', App);
    }
    componentDidUpdate() {
        console.log('comp update');
    }
    componentWillUnmount() {
        console.log('组件卸载')
    }
    render() {
        return (
            <>
                <div ref={ele => this.ele1 = ele}>元素1</div>
                <div ref={ele => this.ele2 = ele}>元素2</div>
                <div>当前被hover的是：{this.state.isHov1 ? '元素1' : this.state.isHov2 ? '元素2' : '其他区域'}</div>
            </>
        )
    }
}
export default App;