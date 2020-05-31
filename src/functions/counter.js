import {useRef, useEffect } from "react";
import {countState} from '../recoil/atoms'
import {  
    useSetRecoilState,
  } from 'recoil'

const Counter = () => {
    const setCount = useSetRecoilState(countState);
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = time => {
        setTimeout(function () {
            setCount(prevCount => ((prevCount === 4 ? 1 : prevCount + 1)));
            previousTimeRef.current = time;
            requestAnimationFrame(animate);
        }, 1000 / 6);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return null;

};

export default Counter;