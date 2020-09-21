import React, {useRef} from 'react';
import {useHover} from './useHover';

export default function() {
    const ele1Ref = useRef();
    const isHover1 = useHover(ele1Ref);
    const ele2Ref = useRef();
    const isHover2 = useHover(ele2Ref);
    return (
        <>
            <div ref={ele1Ref}>元素1</div>
            <div ref={ele2Ref}>元素2</div>
            <div>当前被hover的是：{isHover1 ? '元素1' : isHover2 ? '元素2' : '其他区域'}</div>
        </>
    )
}