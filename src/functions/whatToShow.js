import { useEffect } from "react";
import { countState, loopLength, animationSpeed, switchAnimation, currentlyPlaying } from '../recoil/atoms'
import {
    useRecoilState,
    useRecoilValue
} from 'recoil'

const WhatToShow = () => {
    const [imageName, setImageName] = useRecoilState(currentlyPlaying)
    const [count, setCount] = useRecoilState(countState)
    const [switching, setSwitching] = useRecoilState(switchAnimation)
    const [length, setLength] = useRecoilState(loopLength)

    const c = () => {
       //
      console.log('c called', count, length)
        if (count === length) {
            console.log('now switch')
            setSwitching(false)
            switch (imageName) {
                case 'idle': setImageName('look-side'); setLength(14); setCount(1);
                    return;
                case 'look-side': setImageName('look-side-idle'); setLength(3); setCount(1);
                    return;
                case 'look-side-idle': setImageName('look-side'); setLength(14); setCount(1);
            }
        } else {
            console.log('not yet')
        }
      


    }


    useEffect(() => {
        //   console.log('what to show called', count, switching)
        switching && c()
    }, [count]);

    return null;

};

export default WhatToShow;