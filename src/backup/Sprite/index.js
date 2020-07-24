import React, { useEffect, useState, useRef } from "react";
import AnimationContainer from '../AnimationContainer - bck'
import TwoActions from '../TwoStepAnimations'
import MovingSprite from '../MovingSprite'
import Random from '../RandomAnimations'
import { creatures } from '../../animations/animations'

import Konva from 'konva';

import { Stage, Layer, Star, Text, Image } from 'react-konva';
import useImage from 'use-image';
import { atom } from "recoil";


function Sprite(actions) {
    const [yScale, setYScale] = useState(1)
    const [selected, setSelected] = useState(false)
    const [entityState, setEntityState] = useState('ground')

    const [images, setImages] = useState()

    let b = []
    const [a] = useImage(process.env.PUBLIC_URL + '/images/bird/idle/1.png');



        const [image] = useImage('https://konvajs.org/assets/lion.png');

    const imageLoader = () => {
        console.log(actions.actions)
        
        const acts = actions.actions.map((item, index) => {
            return [...Array(actions[index])].map((_, i) => {

                // const [index] = useImage(`/images/bird/idle/${index}.png`)
                return image
            })
        })
    }


    useEffect(() => {
        !images && actions && imageLoader()

    }, [])
    return (<Image
        x={500}
        y={500}
        shadowOpacity={0.6}
        draggable={true}
        // onDragStart={(e) => handleDragStart(e)}
        // onDragEnd={(e) => handleDragEnd(e)}
        listening={true}
        onClick={() => { console.log('lolo') }}
        image={a}


    />
    );
}

export default Sprite;