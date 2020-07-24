import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue, useRecoilState } from 'recoil';
import { playerPosition, playerDirection, playerAnim, countState, entities, focusedEntity } from '../../recoil/atoms'

import Konva from 'konva';

import { Stage, Layer, Star, Text, Image } from 'react-konva';
import useImage from 'use-image';


function MovingSprite({ random, cr, size, actionIndex, playerPosition }) {

    const count = useRecoilValue(countState);
    const [loadCount, setLoadCount] = useState(0)
    const [internalCount, setInternalCount] = useState(1)
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 })
    const [playerAnimation, setPlayerAnimation] = useState()
    const [playerDir, setPlayerDirection] = useRecoilState(playerDirection);
    const [ents, setEntities] = useRecoilState(entities)

    const doRandom = (n) => {
        return Math.floor(Math.random() * n)
    }


    const animationHandler = () => {

        if (playerAnimation) {
            let prevAnim = playerAnimation
            if (lastPos === playerPosition) {
                if (playerPosition.y <= 480) {
                    setPlayerAnimation(cr.actions[2])
                } else {
                    setPlayerAnimation(cr.actions[0])
                }
            }
            else {
                if (playerPosition.y <= 600) {
                    if (playerPosition.x !== lastPos.x) {
                        if (playerPosition.x > lastPos.x) {
                            setPlayerDirection({ x: -1, y: 1 })
                        } else {
                            setPlayerDirection({ x: 1, y: 1 })
                        }
                    }
                    setPlayerAnimation(cr.actions[2])
                }
                else {
                    if (playerPosition.x !== lastPos.x) {
                        if (playerPosition.x > lastPos.x) {
                            setPlayerDirection({ x: -1, y: 1 })
                        } else {
                            setPlayerDirection({ x: 1, y: 1 })
                        }
                    }
                    setPlayerAnimation(cr.actions[1])
                }
            }



            //advance index or restart count
            if (internalCount >= playerAnimation.length) {
                setInternalCount(1)
            } else {
                setInternalCount(internalCount + 1)
            }

            setLastPos(playerPosition)

        }
        else {
            setPlayerAnimation(cr.actions[0])
        }
    }

    useEffect(() => {
        animationHandler()
    }, [count, loadCount]);


    const [a] = useImage(process.env.PUBLIC_URL + '/images/bird/idle/1.png');

    return (
        <>


            <Image
                x={Math.random() * window.innerWidth}
                y={Math.random() * window.innerHeight}
                shadowOpacity={0.6}
                draggable={true}
                // onDragStart={(e) => handleDragStart(e)}
                // onDragEnd={(e) => handleDragEnd(e)}
                listening={true}
                onClick={() => { console.log('lolo') }}
                image={a} />
            {/* {playerAnimation &&
                <>
                    {cr.actions.map((animationObject, index) => {
                        return Array.from({ length: animationObject.length }, (x, i) => i + 1).map(x => {
                            return <img onLoad={() => { setLoadCount(loadCount + 1) }}
                                style={{
                                    position: 'absolute', transform: `scaleX(${playerDir.x})`,
                                    opacity: internalCount === x && animationObject.name === playerAnimation.name ? 1 : 0,
                                    height: size,
                                    scale: '1.4',
                                    width: 'auto'
                                }}
                                src={`${cr.path}${animationObject.name}/${x}.png`} />
                        })
                    })}



                    {loadCount !== cr.totalImageCount
                        && <div style={{ opacity: .99, backgroundColor: 'lightyellow', height: size, width: size, marginTop: -size }}>
                            LOADING</div>}
                </>} */}
        </>
    );
}

export default MovingSprite;
