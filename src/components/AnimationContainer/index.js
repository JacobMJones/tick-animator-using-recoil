import React, { useEffect, useState } from "react";
import { countState } from '../../recoil/atoms'
import { useRecoilValue } from 'recoil';

import { plantEyeAnimations } from '../../animations/plant-eye'
function AnimationContainer() {
    const count = useRecoilValue(countState);
    const [switching, setSwitching] = useState(false)
    const [playbackDirection, setPlaybackDirection] = useState('forward')
    const [flipHorizontal, setFlipHorizontal] = useState(1)
    const [animation, setAnimation] = useState(plantEyeAnimations.idle)
    const [internalCount, setInternalCount] = useState(1)
    const [nextAnimation, setNextAnimation] = useState()
    const clickHandler = (event) => {



console.log(animation.name)
    var rect = event.target.getBoundingClientRect();
    var x = event.clientX - rect.left; 
    var y = event.clientY - rect.top;
    if(animation.name ==='idle'){
        x > 250  ? setFlipHorizontal(1) : setFlipHorizontal(-1)
    }
        if (!animation.transition) {
       
            setSwitching(!switching)
        } else {
            setAnimation(plantEyeAnimations.lookSide)
            setNextAnimation(playbackDirection === 'forward' 
            ? plantEyeAnimations[plantEyeAnimations[animation.name].backwardAnimation] 
            : plantEyeAnimations[plantEyeAnimations[animation.name].forwardAnimation] );
             setPlaybackDirection(playbackDirection === 'forward' ? 'backward' : 'forward');     
        }
    }

    const sw = () => {
        console.log(animation.name, playbackDirection)

        if (internalCount === animation.length) {
            console.log('now switch')
            setSwitching(false)
            switch (animation.name) {
                case 'idle': setAnimation(plantEyeAnimations.lookSide); setInternalCount(1); setNextAnimation(plantEyeAnimations.lookSideIdle);
                    return;
                case 'lookSideIdle': setAnimation(plantEyeAnimations.lookSide); 
                    setInternalCount(plantEyeAnimations.lookSide.length);
                    setPlaybackDirection('backward'); setNextAnimation(plantEyeAnimations.idle);
                    return;
            }
        } else {

        }



    }
    useEffect(() => {

        if (playbackDirection === 'forward') {
            if (internalCount === animation.length) {
                if (animation.transition) {
                    setAnimation(nextAnimation); setInternalCount(1);
                }
                setInternalCount(1)
            } else {
                setInternalCount(internalCount + 1)
            }

        }
        else if (playbackDirection === 'backward') {
            if (internalCount === 1) {
                if (animation.transition) {
                    setAnimation(nextAnimation); setInternalCount(1);
                    setPlaybackDirection('forward')
                }

            } else {
                setInternalCount(internalCount - 1)
            }

        }

        switching && !animation.transition && sw()


    }, [count]);

    return (
        <div onClick={(event) => { clickHandler(event) }}  style={{position:'relative', height:'500px', width:'500px'}}>

           <img style={{transform:`scaleX(${flipHorizontal})`}} src={process.env.PUBLIC_URL + `/images/${animation.name}/${animation.name}-${internalCount}.png`} /> 
        </div>
    );
}

export default AnimationContainer;
