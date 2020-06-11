import React, { useEffect, useState } from "react";
import { countState } from '../../recoil/atoms'
import { useRecoilValue } from 'recoil';

function AnimationContainer({ cr }) {

    const count = useRecoilValue(countState);
    const [loadCount, setLoadCount] = useState(0)
    const [internalCount, setInternalCount] = useState(1)

    const [switching, setSwitching] = useState(false)
    const [playbackDirection, setPlaybackDirection] = useState('forward')
    const [flipHorizontal, setFlipHorizontal] = useState(1)
    const [nextAnimation, setNextAnimation] = useState()

    const [animation, setAnimation] = useState()
    const [creature, setCreature] = useState()
  
    

    const clickHandler = () => {

        if (!animation.transition) {
            setSwitching(!switching)
        } else {
            setAnimation(creature.lookSide)
            setNextAnimation(playbackDirection === 'forward'
                ? creature.idle
                : creature.lookSideIdle);
            setPlaybackDirection(playbackDirection === 'forward' ? 'backward' : 'forward');
        }
    }

    const switcher = () => {
        if (internalCount === animation.length) {
            setSwitching(false)
            switch (animation.name) {
                case 'idle': setAnimation(creature.lookSide); setInternalCount(1); setNextAnimation(creature.lookSideIdle);
                    return;
                case 'lookSideIdle': setAnimation(creature.lookSide);
                    setInternalCount(creature.lookSide.length);
                    setPlaybackDirection('backward');
                    setNextAnimation(creature.idle);
                    return;
            }
        }



    }

    const doRandom = (n) => {
        return Math.floor(Math.random() * n)
    }
    useEffect(() => {

        !creature && setCreature(cr)
        creature && !animation && setAnimation(creature.idle)
        creature && creature.random && doRandom(30) === 1 && clickHandler()

        if (animation) {
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
            switching && !animation.transition && switcher()
        }


    }, [count, loadCount]);

    return (
        <>
            {creature && animation && <div onClick={(event) => { clickHandler(event) }} style={{ position: 'relative', height: '500px', width: '500px' }}>
                {Object.values(creature).map((animationObject, index) => {
                    return Array.from({ length: animationObject.length }, (x, i) => i + 1).map(x => {
                        return <img onLoad={() => { setLoadCount(loadCount + 1) }}
                            style={{
                                position: 'absolute', transform: `scaleX(${flipHorizontal})`,
                                opacity: internalCount === x && animationObject.name === animation.name ? 1 : 0,
                                height: 400,
                                width: 'auto'
                            }}
                            src={`${creature.path}${animationObject.name}/${animationObject.name}-${x}.png`} />
                    })
                })}
                {internalCount}
                {animation.name}
            </div>}
            {creature && loadCount !== creature.totalImageCount && <div style={{ opacity: .99, backgroundColor: 'lightyellow', height: 500, width: 500, marginTop: -500 }}>LOADING</div>}
        </>
    );
}

export default AnimationContainer;

