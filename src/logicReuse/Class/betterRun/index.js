import React, { Component } from 'react';

class App extends Component {
    state = {
        isHov1: false,
        isHov2: false
    }
    myMap = new Map();
    mouseEnter(target) {
        this.setState({
            ...this.state,
            [this.myMap.get(target)]: true
        });
    }
    mouseLeave(target) {
        this.setState({
            ...this.state,
            [this.myMap.get(target)]: false
        });
    }
    addHover(target) {
        target.addEventListener('mouseenter', this.mouseEnter.bind(this, target));
        target.addEventListener('mouseleave', this.mouseLeave.bind(this, target));
    }
    removeHover(target) {
        target.removeEventListener('mouseenter', this.mouseEnter.bind(this, target));
        target.removeEventListener('mouseleave', this.mouseLeave.bind(this, target));
    }
    componentDidMount() {
        this.myMap.set(this.ele1, 'isHov1')
        this.myMap.set(this.ele2, 'isHov2')
        this.addHover(this.ele1);
        this.addHover(this.ele2);
    }
    componentWillUnmount() {
        this.removeHover(this.ele1);
        this.removeHover(this.ele2);
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