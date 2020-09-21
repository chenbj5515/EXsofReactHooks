
let flag = false;
export const useHover = (that, target, isHover) => {
    function onMouseEnter() {
        that.setState({
            ...that.state,
            [isHover]: true
        })
    }
    function onMouseLeave() {
        that.setState({
            ...that.state,
            [isHover]: false
        })
    }
    target.addEventListener('mouseenter', onMouseEnter);
    target.addEventListener('mouseleave', onMouseLeave);
    let preUnmount = that.componentWillUnmount;
    function newUnmount() {
        target.removeEventListener('mouseenter', onMouseEnter);
        target.removeEventListener('mouseleave', onMouseLeave);
        preUnmount();
    }
    if (!flag) {
        preUnmount = newUnmount;
        flag = true;
    }
}