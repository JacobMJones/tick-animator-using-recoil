import React, { useEffect, useState, useRef } from "react";
import AnimationContainer from '../AnimationContainer - bck'
import TwoActions from '../TwoStepAnimations'
import MovingSprite from '../MovingSprite'
import Random from '../RandomAnimations'
import { creatures } from '../../animations/animations'
import { useRecoilState, useRecoilValue } from 'recoil';
import { playerPosition, playerDirection, playerAnim, countState } from '../../recoil/atoms'
import Entity from '../Entity/index'
import BackgroundPiece from '../BackgroundPiece/index'
function DevInfo() {

    const count = useRecoilValue(countState)
    const [yScale, setYScale] = useState(1)
    const [selected, setSelected] = useState(false)
    const [keyPressed, setKeyPressed] = useState(0)

    const view = useRef()

    useEffect(() => {
        
    }, [])
    return (
        <div>
        Dev INfo
  

        </div>
    );
}

export default Layout;