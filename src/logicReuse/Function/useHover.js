import {useEffect, useState} from 'react';
import {getTargetElement} from '../utils';

export const useHover = target => {
    const [isHov, setIsHov] = useState(false);
    function onMouseEnter() {
        setIsHov(true);
    }
    function onMouseLeave() {
        setIsHov(false);
    }
    useEffect(() => {
        const targetElement = getTargetElement(target);
        targetElement.addEventListener('mouseenter', onMouseEnter)
        targetElement.addEventListener('mouseleave', onMouseLeave)
        return () => {
            targetElement.removeEventListener('mouseenter', onMouseEnter)
            targetElement.removeEventListener('mouseleave', onMouseLeave)
        }
    }, []);
    return isHov;
}