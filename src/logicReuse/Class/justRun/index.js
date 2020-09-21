import React, { Component } from 'react';

class App extends Component {
    state = {
        isHov1: false,
        isHov2: false
    }
    ele1MouseEnter() {
        this.setState({
            ...this.state,
            isHov1: true,
        })
    }
    ele2MouseEnter() {
        this.setState({
            ...this.state,
            isHov2: true,
        })
    }
    ele1MouseLeave() {
        this.setState({
            ...this.state,
            isHov1: false,
        })
    }
    ele2MouseLeave() {
        this.setState({
            ...this.state,
            isHov2: false,
        })
    }
    componentDidMount() {
        this.ele1.addEventListener('mouseenter', this.ele1MouseEnter.bind(this));
        this.ele1.addEventListener('mouseleave', this.ele1MouseLeave.bind(this));
        this.ele2.addEventListener('mouseenter', this.ele2MouseEnter.bind(this));
        this.ele2.addEventListener('mouseleave', this.ele2MouseLeave.bind(this));
    }
    componentWillUnmount() {
        this.ele1.removeEventListener('mouseenter', this.ele1MouseEnter.bind(this));
        this.ele1.removeEventListener('mouseleave', this.ele1MouseLeave.bind(this));
        this.ele2.removeEventListener('mouseenter', this.ele2MouseEnter.bind(this));
        this.ele2.removeEventListener('mouseleave', this.ele2MouseLeave.bind(this));
    }
    render() {
        return (
            <>
                <div ref={target => this.ele1 = target}>元素1</div>
                <div ref={target => this.ele2 = target}>元素2</div>
                <div>当前被hover的是：{this.state.isHov1 ? '元素1' : this.state.isHov2 ? '元素2' : '其他区域'}</div>
            </>
        )
    }
}
export default App;