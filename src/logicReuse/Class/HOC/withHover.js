import React, { Component } from 'react';

export default function withHover(Comp, targets) {
    class Hover extends Component {
        state = {
        }
        i = 1;
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
            target.current.addEventListener('mouseenter', this.mouseEnter.bind(this, target));
            target.current.addEventListener('mouseleave', this.mouseLeave.bind(this, target));
        }
        removeHover(target) {
            target.current.removeEventListener('mouseenter', this.mouseEnter.bind(this, target));
            target.current.removeEventListener('mouseleave', this.mouseLeave.bind(this, target));
        }
        componentDidMount() {
            targets.forEach(target => {
                this.myMap.set(target, `isHov${this.i++}`);
                this.addHover(target);
            })
        }
        componentWillUnmount() {
            targets.forEach(target => {
                this.removeHover(target);
            })
        }
        render() {
            return <Comp {...this.state}/>
        }
    }
    return Hover;
}
