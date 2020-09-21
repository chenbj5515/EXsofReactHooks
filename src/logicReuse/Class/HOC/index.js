import React, { Component, createRef, forwardRef} from 'react';
import withHover from './withHover';

class App extends Component {
    static ele1 = createRef();
    static ele2 = createRef();
    componentDidMount() {
        console.log('Comp');
    }
    render() {
        return (
            <>
                <div ref={App.ele1}>元素1</div>
                <div ref={App.ele2}>元素2</div>
                <div>当前被hover的是：{this.props.isHov1 ? '元素1' : this.props.isHov2 ? '元素2' : '其他区域'}</div>
            </>
        )
    }
}
export default withHover(App, [App.ele1, App.ele2]);