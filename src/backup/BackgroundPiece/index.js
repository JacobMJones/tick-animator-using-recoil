import React, { useEffect, useState, useRef } from "react";
import AnimationContainer from '../AnimationContainer - bck'
import TwoActions from '../TwoStepAnimations'
import MovingSprite from '../MovingSprite'
import Random from '../RandomAnimations'
import { creatures } from '../../animations/animations'
import { useRecoilState, useRecoilValue } from 'recoil';
import { playerPosition, playerDirection, playerAnim, countState } from '../../recoil/atoms'


function BackgroundPiece({ cr, startPos, modifier, scale }) {
    const [playerPos, setPlayerPosition] = useRecoilState(playerPosition);

    const [playerAnimation, setPlayerAnimation] = useRecoilState(playerAnim)
    const count = useRecoilValue(countState)
    const [yScale, setYScale] = useState(1)
    const [selected, setSelected] = useState(false)
    const [entityState, setEntityState] = useState('ground')







    useEffect(() => {



    }, [count])
    return (
        <div
            style={{zIndex:-5, position: 'absolute', left: startPos.x - playerPos.x * modifier, top: startPos.y }}

        >

            <img
                style={{

                    //    opacity: internalCount === x && animationObject.name === playerAnimation.name ? 1 : 0,
                    height: 100 * scale,

                    width: 'auto'
                }}
                src={`${cr.path}/idle/1.png`} />

        </div>
    );
}

export default BackgroundPiece;
