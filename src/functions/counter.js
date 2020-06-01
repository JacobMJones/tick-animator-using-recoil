import {useRef, useEffect } from "react";
import {countState, loopLength, animationSpeed, switchAnimation} from '../recoil/atoms'
import {  
    useSetRecoilState,
    useRecoilValue
  } from 'recoil'

const Counter = () => {
    const setCount = useSetRecoilState(countState);
    const length = useRecoilValue(loopLength)
    const speed = useRecoilValue(animationSpeed)
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = time => {
        setTimeout(function () {
            setCount(prevCount => (( prevCount + 1)));
            previousTimeRef.current = time;
            requestAnimationFrame(animate);
        }, 1000 / speed);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return null;

};

export default Counter;