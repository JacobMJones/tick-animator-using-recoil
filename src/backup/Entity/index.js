import React, { useEffect, useState, useRef } from "react";
import AnimationContainer from '../AnimationContainer - bck'
import TwoActions from '../TwoStepAnimations'
import MovingSprite from '../MovingSprite'
import Random from '../RandomAnimations'
import { creatures } from '../../animations/animations'
import { useRecoilState, useRecoilValue } from 'recoil';
import { playerPosition, playerDirection, playerAnim, countState, entities, focusedEntity, mousePosition } from '../../recoil/atoms'


function Entity({ keyPressed, setKeyPressed, id }) {
    const [playerPos, setPlayerPosition] = useRecoilState(playerPosition);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 })
    const [playerAnimation, setPlayerAnimation] = useRecoilState(playerAnim)
    const count = useRecoilValue(countState)
    const [yScale, setYScale] = useState(1)
    const [selected, setSelected] = useState(false)
    const [isFlying, setIsFlying] = useState(false)
    const [focus, setFocusedEntity] = useRecoilState(focusedEntity)
    const [ents, setEntities] = useRecoilState(entities)
    const mousePos = useRecoilValue(mousePosition)



const removeFocus = () =>{

}

    const movementHandler = () => {
        ents && console.log('in position handler', ents[id].entityPosition)

        // ents[id].entityPosition
        switch (keyPressed.keyCode) {
            //a
            case 65:

                if (keyPressed.action === 'down') {
                    let p = ents.map(a => { return { ...a } })
                    p[id].entityPosition = { x: p[id].entityPosition.x - 20, y: p[id].entityPosition.y }
                    setEntities(p);

                }
                keyPressed.action === 'up' && setKeyPressed('no')
                break;
            //d
            case 68:
                if (keyPressed.action === 'down') {
                    let p = ents.map(a => { return { ...a } })
                    p[id].entityPosition = { x: p[id].entityPosition.x + 20, y: p[id].entityPosition.y }
                    setEntities(p);

                }

                keyPressed.action === 'up' && setKeyPressed('no')
                break;
            //w
            case 87:
                if (keyPressed.action === 'down') {
                    let p = ents.map(a => { return { ...a } })
                    p[id].entityPosition = { x: p[id].entityPosition.x, y: p[id].entityPosition.y - 20 }
                    setEntities(p);

                }
                keyPressed.action === 'up' && setKeyPressed('no')
                // setKeyPressed(0)

                break;
            //s
            case 83:
                if (keyPressed.action === 'down') {
                    let p = ents.map(a => { return { ...a } })
                    p[id].entityPosition = { x: p[id].entityPosition.x, y: p[id].entityPosition.y + 20 }
                    setEntities(p);

                }
                keyPressed.action === 'up' && setKeyPressed('no')
                // setKeyPressed(0)

                break;
            default: break;
        }

    }

    const placeHandler = () => {
        // console.log('place',playerPos)
        if (playerPos[id]) {

            if (playerPos[id].y <= window.innerHeight / 2) {
                setIsFlying(true)

            } else {
                setIsFlying(false)
            }
        }
    }


    useEffect(() => {


        keyPressed !== 'no' && focus === id && movementHandler()
        //    placeHandler()


        if (focus === id) {
            let p = ents.map(a => { return { ...a } })
            p[id].entityPosition = mousePos
            setEntities(p);
        }
    }, [count])
    return (

        <div

            onClick={() => {
                console.log('bird click', focus, id);
               

                //setFocusedEntity(43) 
               // console.log(focus)
            }}

            style={{
                position: 'absolute',
                height: 100,
                width: 100,
                left: ents[id].entityPosition.x,
                top: ents[id].entityPosition.y,
                // backgroundColor: focus === id && 'yellow'
                //d     transform: `scadleX(${yScale * playerDir.x}) scaleY(${yScale})`
            }}>
            <MovingSprite

                actionIndex={0}
                cr={creatures.bird}
                size={100}

                //d     playerDirection={playerDirection}
                a playerPosition={ents[id].entityPosition}
            />
        </div>




    );
}

export default Entity;

{/* <div style={{ zIndex: -10, position: 'absolute', left: 0, top: 780, width: '100vw', height: '2px' }}><ColoredLine color="brown" /></div> */ }